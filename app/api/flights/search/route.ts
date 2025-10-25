import { NextRequest, NextResponse } from 'next/server';
import { amadeusClient } from '@/lib/amadeus-client';
import { mockFlights } from '@/lib/mockData';
import { transformFlightOffers } from '@/lib/flight-transformer';

/**
 * Flight Search API Route
 *
 * Searches for flights using the Amadeus API and transforms the data for our UI.
 * Falls back to mock data if Amadeus credentials are not configured.
 *
 * Usage:
 * GET /api/flights/search?origin=JFK&destination=LHR&date=2024-12-25&class=BUSINESS
 */

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  try {
    const searchParams = request.nextUrl.searchParams;
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');
    const cabinClass = searchParams.get('class') || 'BUSINESS';
    const nonStop = searchParams.get('nonStop') === 'true';
    const maxResults = parseInt(searchParams.get('max') || '50');

    // Validate required parameters
    if (!origin || !destination || !date) {
      return NextResponse.json(
        { error: 'Missing required parameters: origin, destination, date' },
        { status: 400 }
      );
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    // Check if API credentials are configured
    if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
      console.warn('Amadeus API credentials not configured, returning mock data');
      return NextResponse.json({
        data: mockFlights,
        source: 'mock',
        message: 'Using mock data. Set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to use real data.',
        meta: {
          count: mockFlights.length,
          searchTime: Date.now() - startTime,
        },
      });
    }

    // Search flights using Amadeus API
    console.log(`Searching flights: ${origin} -> ${destination} on ${date} (${cabinClass})`);

    const amadeusResponse = await amadeusClient.searchFlights({
      origin,
      destination,
      departureDate: date,
      adults: 1,
      travelClass: cabinClass as any,
      nonStop,
      maxResults,
      currencyCode: 'USD',
    });

    console.log(`Found ${amadeusResponse.data.length} flight offers from Amadeus`);

    // Transform Amadeus data to our FlightData format
    const transformedFlights = transformFlightOffers(
      amadeusResponse.data,
      amadeusResponse.dictionaries
    );

    return NextResponse.json({
      data: transformedFlights,
      source: 'amadeus',
      meta: {
        count: transformedFlights.length,
        searchTime: Date.now() - startTime,
        dictionaries: amadeusResponse.dictionaries,
      },
    });

  } catch (error) {
    console.error('Flight search error:', error);

    // Determine if this is an API error or a transformation error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isApiError = errorMessage.includes('Amadeus') || errorMessage.includes('API');

    // If it's an API error and we have mock data as fallback, return mock data
    if (isApiError) {
      console.warn('Amadeus API error, falling back to mock data:', errorMessage);
      return NextResponse.json({
        data: mockFlights,
        source: 'mock_fallback',
        message: 'Using mock data due to API error. Check logs for details.',
        error: errorMessage,
        meta: {
          count: mockFlights.length,
          searchTime: Date.now() - startTime,
        },
      });
    }

    // For other errors, return error response
    return NextResponse.json(
      {
        error: 'Failed to search flights',
        message: errorMessage,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint for more complex search requests
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      cabinClass = 'BUSINESS',
      passengers = { adults: 1, children: 0, infants: 0 },
      nonStop = false,
      maxResults = 50,
    } = body;

    // Validate required parameters
    if (!origin || !destination || !departureDate) {
      return NextResponse.json(
        { error: 'Missing required parameters: origin, destination, departureDate' },
        { status: 400 }
      );
    }

    // Check if API credentials are configured
    if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
      console.warn('Amadeus API credentials not configured, returning mock data');
      return NextResponse.json({
        data: mockFlights,
        source: 'mock',
        message: 'Using mock data. Set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to use real data.',
        meta: {
          count: mockFlights.length,
          searchTime: Date.now() - startTime,
        },
      });
    }

    // Search flights using Amadeus API
    console.log(
      `Searching flights (POST): ${origin} -> ${destination} on ${departureDate} (${cabinClass})`
    );

    const amadeusResponse = await amadeusClient.searchFlights({
      origin,
      destination,
      departureDate,
      returnDate,
      adults: passengers.adults || 1,
      children: passengers.children || 0,
      infants: passengers.infants || 0,
      travelClass: cabinClass as any,
      nonStop,
      maxResults,
      currencyCode: 'USD',
    });

    console.log(`Found ${amadeusResponse.data.length} flight offers from Amadeus`);

    // Transform Amadeus data to our FlightData format
    const transformedFlights = transformFlightOffers(
      amadeusResponse.data,
      amadeusResponse.dictionaries
    );

    return NextResponse.json({
      data: transformedFlights,
      source: 'amadeus',
      meta: {
        count: transformedFlights.length,
        searchTime: Date.now() - startTime,
        dictionaries: amadeusResponse.dictionaries,
      },
    });

  } catch (error) {
    console.error('Flight search error (POST):', error);

    // Determine if this is an API error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isApiError = errorMessage.includes('Amadeus') || errorMessage.includes('API');

    // If it's an API error, return mock data as fallback
    if (isApiError) {
      console.warn('Amadeus API error, falling back to mock data:', errorMessage);
      return NextResponse.json({
        data: mockFlights,
        source: 'mock_fallback',
        message: 'Using mock data due to API error. Check logs for details.',
        error: errorMessage,
        meta: {
          count: mockFlights.length,
          searchTime: Date.now() - startTime,
        },
      });
    }

    // For other errors, return error response
    return NextResponse.json(
      {
        error: 'Failed to search flights',
        message: errorMessage,
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
