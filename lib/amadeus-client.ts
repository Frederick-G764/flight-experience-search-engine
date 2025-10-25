/**
 * Amadeus API Client
 *
 * This is a basic structure for future Amadeus API integration.
 * Currently not used - the prototype uses mock data from mockData.ts
 *
 * To use this:
 * 1. Set up environment variables (see .env.example)
 * 2. Get Amadeus API credentials (see AMADEUS_SETUP.md)
 * 3. Implement the methods below
 * 4. Replace mock data with real API calls
 */

interface AmadeusConfig {
  clientId: string;
  clientSecret: string;
  endpoint: string;
}

interface AccessToken {
  token: string;
  expiresAt: number;
}

interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  adults?: number;
  travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
  nonStop?: boolean;
  maxResults?: number;
}

interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Array<{
    segments: Array<{
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
      carrierCode: string;
      number: string;
      aircraft: {
        code: string;
      };
      duration: string;
    }>;
  }>;
  travelerPricings: Array<{
    fareDetailsBySegment: Array<{
      cabin: string;
      class: string;
      amenities?: Array<{
        description: string;
        isChargeable: boolean;
      }>;
    }>;
  }>;
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
   * Get or refresh access token
   */
  private async getAccessToken(): Promise<string> {
    // Check if token exists and is still valid
    if (this.accessToken && this.accessToken.expiresAt > Date.now()) {
      return this.accessToken.token;
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
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();

    this.accessToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000) - 60000, // Expire 1 min early
    };

    return this.accessToken.token;
  }

  /**
   * Search for flight offers
   */
  async searchFlights(params: FlightSearchParams): Promise<FlightOffer[]> {
    const token = await this.getAccessToken();

    const searchParams = new URLSearchParams({
      originLocationCode: params.origin,
      destinationLocationCode: params.destination,
      departureDate: params.departureDate,
      adults: String(params.adults || 1),
      travelClass: params.travelClass || 'BUSINESS',
      nonStop: String(params.nonStop || false),
      max: String(params.maxResults || 50),
    });

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
      throw new Error(`Flight search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  }

  /**
   * Get aircraft information
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
      throw new Error(`Failed to get aircraft info: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get airline information
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
      throw new Error(`Failed to get airline info: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Get flight offer pricing details
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
      throw new Error(`Failed to get pricing: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Test API connection
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
}

// Export singleton instance
export const amadeusClient = new AmadeusClient();

// Export types
export type { FlightSearchParams, FlightOffer, AmadeusConfig };
