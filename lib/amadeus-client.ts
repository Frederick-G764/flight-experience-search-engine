/**
 * Amadeus API Client
 *
 * Comprehensive implementation of the Amadeus Flight Offers Search API v2.9.1
 * Provides methods to search for flights, get aircraft info, and manage authentication
 *
 * Reference: https://developers.amadeus.com/self-service/category/flights/api-doc/flight-offers-search
 */

import {
  AmadeusConfig,
  AmadeusFlightOffersResponse,
  FlightOffersSearchParams,
  FlightOffersPostRequest,
  AmadeusAuthResponse,
  AmadeusError,
  Dictionaries,
} from './amadeus-types';

interface AccessToken {
  token: string;
  expiresAt: number;
}

// Legacy interface for backward compatibility
interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  nonStop?: boolean;
  maxResults?: number;
  currencyCode?: string;
  maxPrice?: number;
}

class AmadeusClient {
  private config: AmadeusConfig;
  private accessToken?: AccessToken;

  constructor(config?: AmadeusConfig) {
    this.config = config || {
      clientId: process.env.AMADEUS_CLIENT_ID || '',
      clientSecret: process.env.AMADEUS_CLIENT_SECRET || '',
      endpoint: process.env.AMADEUS_API_ENDPOINT || 'https://test.api.amadeus.com',
    };
  }

  /**
   * Get or refresh access token using OAuth2 Client Credentials flow
   */
  private async getAccessToken(): Promise<string> {
    // Check if token exists and is still valid
    if (this.accessToken && this.accessToken.expiresAt > Date.now()) {
      return this.accessToken.token;
    }

    // Validate configuration
    if (!this.config.clientId || !this.config.clientSecret) {
      throw new Error(
        'Amadeus API credentials not configured. Set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET environment variables.'
      );
    }

    // Request new token
    const response = await fetch(`${this.config.endpoint}/v1/security/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Failed to get access token: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`
      );
    }

    const data: AmadeusAuthResponse = await response.json();

    this.accessToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000) - 60000, // Expire 1 min early
    };

    return this.accessToken.token;
  }

  /**
   * Search for flight offers using GET method (simple search)
   * @param params Flight search parameters
   * @returns Amadeus flight offers response with full metadata
   */
  async searchFlights(params: FlightSearchParams): Promise<AmadeusFlightOffersResponse> {
    const token = await this.getAccessToken();

    // Build search parameters
    const searchParams = new URLSearchParams({
      originLocationCode: params.origin,
      destinationLocationCode: params.destination,
      departureDate: params.departureDate,
      adults: String(params.adults || 1),
    });

    // Add optional parameters
    if (params.returnDate) {
      searchParams.append('returnDate', params.returnDate);
    }
    if (params.children !== undefined) {
      searchParams.append('children', String(params.children));
    }
    if (params.infants !== undefined) {
      searchParams.append('infants', String(params.infants));
    }
    if (params.travelClass) {
      searchParams.append('travelClass', params.travelClass);
    }
    if (params.nonStop !== undefined) {
      searchParams.append('nonStop', String(params.nonStop));
    }
    if (params.currencyCode) {
      searchParams.append('currencyCode', params.currencyCode);
    }
    if (params.maxPrice !== undefined) {
      searchParams.append('maxPrice', String(params.maxPrice));
    }
    searchParams.append('max', String(params.maxResults || 50));

    const response = await fetch(
      `${this.config.endpoint}/v2/shopping/flight-offers?${searchParams}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData: AmadeusError = await response.json().catch(() => ({
        errors: [{ status: response.status, code: 0, title: response.statusText }],
      }));
      throw new Error(
        `Flight search failed: ${response.status} ${response.statusText}. ${JSON.stringify(errorData.errors)}`
      );
    }

    const data: AmadeusFlightOffersResponse = await response.json();
    return data;
  }

  /**
   * Search for flight offers using POST method (advanced search)
   * @param request Complex flight search request with multiple origin/destinations
   * @returns Amadeus flight offers response with full metadata
   */
  async searchFlightsPost(request: FlightOffersPostRequest): Promise<AmadeusFlightOffersResponse> {
    const token = await this.getAccessToken();

    const response = await fetch(
      `${this.config.endpoint}/v2/shopping/flight-offers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-HTTP-Method-Override': 'GET',
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const errorData: AmadeusError = await response.json().catch(() => ({
        errors: [{ status: response.status, code: 0, title: response.statusText }],
      }));
      throw new Error(
        `Flight search (POST) failed: ${response.status} ${response.statusText}. ${JSON.stringify(errorData.errors)}`
      );
    }

    const data: AmadeusFlightOffersResponse = await response.json();
    return data;
  }

  /**
   * Get aircraft information from Amadeus reference data
   * @param aircraftCode IATA aircraft code (e.g., "320" for A320)
   * @returns Aircraft details including name
   */
  async getAircraftInfo(aircraftCode: string): Promise<any> {
    const token = await this.getAccessToken();

    const response = await fetch(
      `${this.config.endpoint}/v1/reference-data/aircraft/${aircraftCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get aircraft info: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get airline information from Amadeus reference data
   * @param airlineCode IATA airline code (e.g., "LH" for Lufthansa)
   * @returns Airline details including name
   */
  async getAirlineInfo(airlineCode: string): Promise<any> {
    const token = await this.getAccessToken();

    const response = await fetch(
      `${this.config.endpoint}/v1/reference-data/airlines?airlineCodes=${airlineCode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get airline info: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get accurate flight offer pricing (confirms price before booking)
   * @param flightOffer The flight offer to price
   * @returns Updated pricing information
   */
  async getFlightPricing(flightOffer: any): Promise<any> {
    const token = await this.getAccessToken();

    const response = await fetch(
      `${this.config.endpoint}/v1/shopping/flight-offers/pricing`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'flight-offers-pricing',
            flightOffers: [flightOffer],
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get pricing: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Test API connection and credentials
   * @returns true if connection successful, false otherwise
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.getAccessToken();
      return true;
    } catch (error) {
      console.error('Amadeus API connection test failed:', error);
      return false;
    }
  }

  /**
   * Get API configuration status
   * @returns Object with configuration details (credentials masked)
   */
  getConfigStatus() {
    return {
      hasClientId: !!this.config.clientId,
      hasClientSecret: !!this.config.clientSecret,
      endpoint: this.config.endpoint,
      hasActiveToken: !!(this.accessToken && this.accessToken.expiresAt > Date.now()),
      tokenExpiresAt: this.accessToken?.expiresAt
        ? new Date(this.accessToken.expiresAt).toISOString()
        : null,
    };
  }
}

// Export singleton instance
export const amadeusClient = new AmadeusClient();

// Export types
export type { FlightSearchParams, AmadeusConfig };
export * from './amadeus-types';
