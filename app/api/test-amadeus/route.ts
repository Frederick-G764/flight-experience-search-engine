import { NextResponse } from 'next/server';
import { amadeusClient } from '@/lib/amadeus-client';

/**
 * Amadeus API Connection Test Route
 *
 * Use this endpoint to verify your Amadeus API credentials are working.
 *
 * Usage:
 * GET /api/test-amadeus
 *
 * Returns:
 * - connected: true/false
 * - message: Status message
 * - config: API configuration (without secrets)
 */

export async function GET() {
  try {
    // Check if credentials are configured
    const hasClientId = !!process.env.AMADEUS_CLIENT_ID;
    const hasClientSecret = !!process.env.AMADEUS_CLIENT_SECRET;
    const endpoint = process.env.AMADEUS_API_ENDPOINT || 'https://test.api.amadeus.com';

    if (!hasClientId || !hasClientSecret) {
      return NextResponse.json({
        connected: false,
        configured: false,
        message: 'Amadeus API credentials not configured',
        hint: 'Add AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET to your .env.local file',
        config: {
          endpoint,
          hasClientId,
          hasClientSecret,
        },
        docs: 'See AMADEUS_SETUP.md for setup instructions',
      });
    }

    // Test the connection
    const isConnected = await amadeusClient.testConnection();

    if (isConnected) {
      return NextResponse.json({
        connected: true,
        configured: true,
        message: 'Successfully connected to Amadeus API',
        config: {
          endpoint,
          hasClientId: true,
          hasClientSecret: true,
        },
        nextSteps: [
          'Your Amadeus API connection is working!',
          'Head to the homepage and run a search with your preferred IATA codes.',
        ],
      });
    } else {
      return NextResponse.json({
        connected: false,
        configured: true,
        message: 'Amadeus API credentials configured but connection failed',
        hint: 'Check if your credentials are correct and not expired',
        config: {
          endpoint,
          hasClientId: true,
          hasClientSecret: true,
        },
        troubleshooting: [
          'Verify your Client ID and Secret in .env.local',
          'Check if you\'re using test vs production endpoint',
          'Ensure your Amadeus account is active',
          'Check the Amadeus dashboard for API status',
        ],
      }, { status: 503 });
    }

  } catch (error) {
    console.error('Amadeus connection test error:', error);
    return NextResponse.json({
      connected: false,
      error: 'Connection test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      troubleshooting: [
        'Check your internet connection',
        'Verify Amadeus API credentials',
        'Check Amadeus API service status',
        'Review server logs for details',
      ],
    }, { status: 500 });
  }
}
