import { NextRequest, NextResponse } from 'next/server';
import { amadeusClient } from '@/lib/amadeus-client';
import { mockFlights } from '@/lib/mockData';

/**
 * Flight Search API Route
 *
 * This route can be used to search for flights via the Amadeus API.
 * Currently returns mock data - uncomment the Amadeus code when ready to integrate.
 *
 * Usage:
 * GET /api/flights/search?origin=JFK&destination=LHR&date=2024-12-25&class=BUSINESS
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');
    const cabinClass = searchParams.get('class') || 'BUSINESS';

    // Validate required parameters
    if (!origin || !destination || !date) {
      return NextResponse.json(
        { error: 'Missing required parameters: origin, destination, date' },
        { status: 400 }
      );
    }

    // CURRENT: Return mock data
    // The prototype uses hardcoded mock data from lib/mockData.ts
    return NextResponse.json({
      data: mockFlights,
      source: 'mock',
      message: 'Using mock data. Set up Amadeus API credentials to use real data.',
    });

    // FUTURE: Uncomment this block to use Amadeus API
    /*
    // Check if API credentials are configured
    if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
      return NextResponse.json(
        {
          error: 'Amadeus API credentials not configured',
          hint: 'Set AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET in .env.local'
        },
        { status: 503 }
      );
    }

    // Search flights using Amadeus API
    const flights = await amadeusClient.searchFlights({
      origin,
      destination,
      departureDate: date,
      adults: 1,
      travelClass: cabinClass as any,
      nonStop: false,
      maxResults: 50,
    });

    // Transform Amadeus data to match our FlightData interface
    const transformedFlights = flights.map(flight => {
      // Here you would:
      // 1. Extract flight details from Amadeus response
      // 2. Look up cabin specifications from your database
      // 3. Combine them into our FlightData format
      // 4. Calculate feature indicators

      return {
        // Your transformation logic here
      };
    });

    return NextResponse.json({
      data: transformedFlights,
      source: 'amadeus',
      count: transformedFlights.length,
    });
    */

  } catch (error) {
    console.error('Flight search error:', error);
    return NextResponse.json(
      {
        error: 'Failed to search flights',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST endpoint for more complex search requests
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { origin, destination, departureDate, returnDate, cabinClass, passengers } = body;

    // Validate
    if (!origin || !destination || !departureDate) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // CURRENT: Return mock data
    return NextResponse.json({
      data: mockFlights,
      source: 'mock',
    });

    // FUTURE: Use Amadeus API with POST body parameters

  } catch (error) {
    console.error('Flight search error:', error);
    return NextResponse.json(
      { error: 'Failed to search flights' },
      { status: 500 }
    );
  }
}
