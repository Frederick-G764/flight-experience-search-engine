import { NextRequest, NextResponse } from 'next/server';
import { amadeusClient } from '@/lib/amadeus-client';
import { transformFlightOffers } from '@/lib/flight-transformer';

function validateIata(value: string | null, label: string) {
  if (!value) {
    throw new Error(`Missing required parameter: ${label}`);
  }
  if (!/^[A-Z]{3}$/i.test(value)) {
    throw new Error(`${label} must be a three-letter IATA code.`);
  }
}

function validateDate(value: string | null, label: string) {
  if (!value) {
    throw new Error(`Missing required parameter: ${label}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${label} must use YYYY-MM-DD format.`);
  }
}

export async function GET(request: NextRequest) {
  const startedAt = Date.now();

  try {
    const params = request.nextUrl.searchParams;
    const origin = params.get('origin');
    const destination = params.get('destination');
    const date = params.get('date');
    const returnDate = params.get('returnDate');
    const travelClass = (params.get('travelClass') || 'ECONOMY').toUpperCase();
    const nonStop = params.get('nonStop') === 'true';
    const adults = Math.min(Math.max(parseInt(params.get('adults') || '1', 10), 1), 9);
    const maxResults = Math.min(Math.max(parseInt(params.get('max') || '20', 10), 1), 250);

    validateIata(origin, 'origin');
    validateIata(destination, 'destination');
    validateDate(date, 'date');
    if (returnDate) {
      validateDate(returnDate, 'returnDate');
    }

    if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
      return NextResponse.json(
        {
          error: 'Amadeus API credentials are missing.',
          message: 'Configure AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET in your environment to enable live searches.',
        },
        { status: 500 }
      );
    }

    const amadeusResponse = await amadeusClient.searchFlights({
      origin: origin!.toUpperCase(),
      destination: destination!.toUpperCase(),
      departureDate: date!,
      returnDate: returnDate || undefined,
      travelClass: travelClass as any,
      adults,
      nonStop,
      maxResults,
      currencyCode: 'USD',
    });

    const transformed = transformFlightOffers(amadeusResponse.data, amadeusResponse.dictionaries);

    return NextResponse.json({
      data: transformed,
      meta: {
        count: transformed.length,
        searchTime: Date.now() - startedAt,
      },
    });
  } catch (error) {
    console.error('Amadeus flight search error', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Unable to complete flight search.',
        message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const startedAt = Date.now();

  try {
    const body = await request.json();
    const {
      origin,
      destination,
      departureDate,
      returnDate,
      travelClass = 'ECONOMY',
      adults = 1,
      nonStop = false,
      maxResults = 20,
    } = body;

    validateIata(origin, 'origin');
    validateIata(destination, 'destination');
    validateDate(departureDate, 'departureDate');
    if (returnDate) {
      validateDate(returnDate, 'returnDate');
    }

    if (!process.env.AMADEUS_CLIENT_ID || !process.env.AMADEUS_CLIENT_SECRET) {
      return NextResponse.json(
        {
          error: 'Amadeus API credentials are missing.',
          message: 'Configure AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET in your environment to enable live searches.',
        },
        { status: 500 }
      );
    }

    const amadeusResponse = await amadeusClient.searchFlights({
      origin: origin.toUpperCase(),
      destination: destination.toUpperCase(),
      departureDate,
      returnDate,
      travelClass: travelClass.toUpperCase(),
      adults: Math.min(Math.max(Number(adults) || 1, 1), 9),
      nonStop,
      maxResults: Math.min(Math.max(Number(maxResults) || 20, 1), 250),
      currencyCode: 'USD',
    });

    const transformed = transformFlightOffers(amadeusResponse.data, amadeusResponse.dictionaries);

    return NextResponse.json({
      data: transformed,
      meta: {
        count: transformed.length,
        searchTime: Date.now() - startedAt,
      },
    });
  } catch (error) {
    console.error('Amadeus flight search error', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Unable to complete flight search.',
        message,
      },
      { status: 500 }
    );
  }
}
