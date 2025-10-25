# Amadeus Flight Search API Integration

This document provides comprehensive information about the Amadeus Flight Offers Search API integration in the Flight Experience Search Engine.

## Table of Contents

1. [Overview](#overview)
2. [Setup Instructions](#setup-instructions)
3. [API Architecture](#api-architecture)
4. [Usage Examples](#usage-examples)
5. [Data Flow](#data-flow)
6. [Error Handling](#error-handling)
7. [Testing](#testing)
8. [Rate Limits](#rate-limits)
9. [Troubleshooting](#troubleshooting)

## Overview

The application integrates with the **Amadeus Flight Offers Search API v2.9.1** to provide real-time flight availability and pricing data. The integration includes:

- ✅ OAuth2 authentication with token caching
- ✅ Flight search (GET and POST methods)
- ✅ Data transformation from Amadeus format to our UI format
- ✅ Cabin specifications enrichment
- ✅ Automatic fallback to mock data
- ✅ Comprehensive error handling
- ✅ TypeScript type safety

## Setup Instructions

### 1. Get Amadeus API Credentials

1. Visit [Amadeus for Developers](https://developers.amadeus.com)
2. Create a free account
3. Create a new app in the dashboard
4. Copy your **Client ID** and **Client Secret**

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Amadeus API Configuration
AMADEUS_CLIENT_ID=your_client_id_here
AMADEUS_CLIENT_SECRET=your_client_secret_here
AMADEUS_API_ENDPOINT=https://test.api.amadeus.com

# For production, use:
# AMADEUS_API_ENDPOINT=https://api.amadeus.com
```

### 3. Verify Configuration

Run the test endpoint to verify your credentials:

```bash
curl http://localhost:3000/api/test-amadeus
```

Expected response:
```json
{
  "status": "connected",
  "message": "Amadeus API connection successful",
  "config": {
    "hasClientId": true,
    "hasClientSecret": true,
    "endpoint": "https://test.api.amadeus.com"
  }
}
```

## API Architecture

### Components

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│                   (React Components)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   /api/flights/search                        │
│                    (Next.js API Route)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Amadeus Client                            │
│              (lib/amadeus-client.ts)                         │
│  • OAuth2 Authentication                                     │
│  • Token Management                                          │
│  • API Requests                                              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Amadeus API Response                        │
│                (Raw Flight Offers)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Flight Transformer                           │
│            (lib/flight-transformer.ts)                       │
│  • Amadeus → UI format conversion                            │
│  • Cabin specs enrichment                                    │
│  • Feature indicator calculation                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│               Cabin Specs Database                           │
│          (lib/cabin-specs-database.ts)                       │
│  • Aircraft/Airline cabin details                            │
│  • Seat specifications                                       │
│  • Entertainment systems                                     │
│  • WiFi capabilities                                         │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
lib/
├── amadeus-types.ts           # TypeScript definitions for Amadeus API
├── amadeus-client.ts          # API client with authentication
├── flight-transformer.ts      # Data transformation logic
└── cabin-specs-database.ts    # Cabin specifications data

app/api/
└── flights/search/route.ts    # API endpoint handler
```

## Usage Examples

### Basic Flight Search (GET)

```typescript
// From the frontend
const response = await fetch(
  '/api/flights/search?' + new URLSearchParams({
    origin: 'JFK',
    destination: 'LHR',
    date: '2024-12-25',
    class: 'BUSINESS',
  })
);

const data = await response.json();
console.log(`Found ${data.meta.count} flights`);
```

### Advanced Flight Search (POST)

```typescript
const response = await fetch('/api/flights/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    origin: 'JFK',
    destination: 'LHR',
    departureDate: '2024-12-25',
    returnDate: '2025-01-05',
    cabinClass: 'BUSINESS',
    passengers: {
      adults: 2,
      children: 1,
      infants: 0,
    },
    nonStop: true,
    maxResults: 20,
  }),
});
```

### Direct Amadeus Client Usage

```typescript
import { amadeusClient } from '@/lib/amadeus-client';

// Search flights
const response = await amadeusClient.searchFlights({
  origin: 'JFK',
  destination: 'LHR',
  departureDate: '2024-12-25',
  adults: 1,
  travelClass: 'BUSINESS',
  maxResults: 50,
});

// Get aircraft information
const aircraftInfo = await amadeusClient.getAircraftInfo('359');

// Test connection
const isConnected = await amadeusClient.testConnection();
```

## Data Flow

### 1. Raw Amadeus Response

```json
{
  "data": [
    {
      "type": "flight-offer",
      "id": "1",
      "itineraries": [{
        "segments": [{
          "departure": { "iataCode": "JFK", "at": "2024-12-25T18:00:00" },
          "arrival": { "iataCode": "LHR", "at": "2024-12-26T06:30:00" },
          "carrierCode": "BA",
          "aircraft": { "code": "77W" }
        }]
      }],
      "price": { "total": "4500.00", "currency": "USD" }
    }
  ],
  "dictionaries": {
    "carriers": { "BA": "British Airways" },
    "aircraft": { "77W": "BOEING 777-300ER" }
  }
}
```

### 2. Transformed UI Format

```json
{
  "id": "1",
  "airline": "British Airways",
  "aircraft": "BOEING 777-300ER",
  "route": {
    "from": "JFK",
    "to": "LHR",
    "departTime": "18:00",
    "arriveTime": "06:30",
    "duration": "8h 30m"
  },
  "price": 4500,
  "features": {
    "bedLength": { "value": "198cm", "status": "excellent", ... },
    "screenSize": { "value": "18 inches", "status": "fair", ... }
  },
  "details": { ... }
}
```

## Error Handling

The integration includes comprehensive error handling:

### Automatic Fallback to Mock Data

If the Amadeus API is unavailable or credentials are not configured, the system automatically falls back to mock data:

```json
{
  "data": [...],
  "source": "mock_fallback",
  "message": "Using mock data due to API error",
  "error": "Failed to get access token: 401 Unauthorized"
}
```

### Error Types

1. **Authentication Errors** (401)
   - Invalid credentials
   - Expired token (auto-refreshed)

2. **Validation Errors** (400)
   - Missing required parameters
   - Invalid date format
   - Invalid airport codes

3. **API Errors** (500)
   - Amadeus service unavailable
   - Rate limit exceeded
   - Network timeout

### Handling Errors in Frontend

```typescript
const response = await fetch('/api/flights/search?...');
const data = await response.json();

if (data.source === 'mock' || data.source === 'mock_fallback') {
  console.warn('Using mock data:', data.message);
}

if (data.error) {
  console.error('API Error:', data.error);
}
```

## Testing

### Test Endpoints

```bash
# Test Amadeus connection
curl http://localhost:3000/api/test-amadeus

# Test flight search with mock data (no credentials needed)
curl "http://localhost:3000/api/flights/search?origin=JFK&destination=LHR&date=2024-12-25&class=BUSINESS"

# Test with real Amadeus API (requires credentials)
AMADEUS_CLIENT_ID=xxx AMADEUS_CLIENT_SECRET=yyy npm run dev
curl "http://localhost:3000/api/flights/search?origin=SYD&destination=BKK&date=2024-12-25&class=BUSINESS"
```

### Test Environment

The Amadeus test environment has limitations:

- **Limited Routes**: Only major airports with high traffic
- **Test Data**: May not reflect real-time availability
- **Rate Limits**: 10 calls/sec, 100k/month free tier

**Recommended Test Routes:**
- LON (London) ↔ NYC (New York)
- PAR (Paris) ↔ SYD (Sydney)
- FRA (Frankfurt) ↔ BKK (Bangkok)

## Rate Limits

### Test Environment

- **Rate**: 10 transactions/second
- **Monthly Quota**: 100,000 calls/month (free)
- **Token Validity**: 30 minutes

### Production Environment

- Contact Amadeus for production rate limits
- Typically higher limits with paid plans
- Token validity: 30 minutes

### Best Practices

1. **Cache Tokens**: Tokens are automatically cached and reused
2. **Implement Client-Side Caching**: Cache search results for 5-10 minutes
3. **Use Debouncing**: Debounce user input for autocomplete features
4. **Monitor Usage**: Track API calls to stay within limits

## Troubleshooting

### Issue: "Amadeus API credentials not configured"

**Solution**: Add credentials to `.env.local`:
```bash
AMADEUS_CLIENT_ID=your_client_id
AMADEUS_CLIENT_SECRET=your_client_secret
```

### Issue: "Flight search failed: 401 Unauthorized"

**Causes**:
- Invalid client ID or secret
- Credentials from wrong environment (test vs production)

**Solution**: Verify credentials in Amadeus dashboard

### Issue: "No results found"

**Causes**:
- Test environment has limited routes
- Date too far in the future
- Invalid airport codes

**Solutions**:
- Use major airports (LON, NYC, PAR, SYD)
- Search within next 6 months
- Verify IATA codes are valid

### Issue: Rate limit exceeded

**Solution**:
- Implement request throttling
- Cache results on client side
- Upgrade to paid plan

### Debug Mode

Enable detailed logging:

```typescript
// In amadeus-client.ts, add console.log statements
console.log('Searching flights with params:', params);
console.log('Amadeus response:', response);
```

## Additional Resources

- [Amadeus API Documentation](https://developers.amadeus.com/self-service/category/flights/api-doc/flight-offers-search)
- [Amadeus Support](https://developers.amadeus.com/support)
- [API Status Page](https://developers.amadeus.com/status)

## API Endpoints Reference

### GET /api/flights/search

Search for flights using query parameters.

**Parameters:**
- `origin` (required): IATA airport code
- `destination` (required): IATA airport code
- `date` (required): Departure date (YYYY-MM-DD)
- `class` (optional): BUSINESS, FIRST, ECONOMY, PREMIUM_ECONOMY (default: BUSINESS)
- `nonStop` (optional): true/false (default: false)
- `max` (optional): Maximum results (default: 50)

**Response:**
```json
{
  "data": [...],
  "source": "amadeus",
  "meta": {
    "count": 15,
    "searchTime": 1234
  }
}
```

### POST /api/flights/search

Advanced search with more options.

**Body:**
```json
{
  "origin": "JFK",
  "destination": "LHR",
  "departureDate": "2024-12-25",
  "returnDate": "2025-01-05",
  "cabinClass": "BUSINESS",
  "passengers": {
    "adults": 2,
    "children": 1,
    "infants": 0
  },
  "nonStop": true,
  "maxResults": 20
}
```

## Contributing

When adding new cabin specifications:

1. Add entry to `lib/cabin-specs-database.ts`
2. Use format: `{AIRLINE}_{AIRCRAFT}_{CABIN}`
3. Include all required fields
4. Test with real flight searches

---

**Last Updated**: 2025-10-25
**API Version**: Amadeus Flight Offers Search v2.9.1
