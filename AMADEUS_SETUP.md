# Amadeus API Setup Guide

This guide will help you integrate the Amadeus API into the prototype for real flight data.

## Getting Amadeus API Credentials

### Step 1: Create Amadeus Account

1. Go to https://developers.amadeus.com
2. Click "Register" or "Sign In"
3. Create a free account (no credit card required)
4. Verify your email address

### Step 2: Create an Application

1. Log in to the Amadeus Developer Portal
2. Go to "My Apps" in the dashboard
3. Click "Create New App"
4. Fill in the details:
   - **App Name**: Flight Experience Search (or your preferred name)
   - **Description**: Premium flight search with cabin experience data
   - **Callback URL**: http://localhost:3000 (for development)
5. Click "Create"

### Step 3: Get Your Credentials

After creating the app, you'll see:
- **Client ID**: Your API key identifier
- **Client Secret**: Your API secret key

**IMPORTANT**: Copy both immediately and store them securely.

### Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   AMADEUS_CLIENT_ID=your_actual_client_id
   AMADEUS_CLIENT_SECRET=your_actual_client_secret
   AMADEUS_API_ENDPOINT=https://test.api.amadeus.com
   ```

3. **Never commit `.env.local`** - it's already in `.gitignore`

## Amadeus API Endpoints Needed

For this flight search prototype, you'll need these endpoints:

### 1. Flight Offers Search
**Endpoint**: `/v2/shopping/flight-offers`

Search for flight offers based on origin, destination, and date.

```typescript
GET https://test.api.amadeus.com/v2/shopping/flight-offers
  ?originLocationCode=NYC
  &destinationLocationCode=MAD
  &departureDate=2024-12-25
  &adults=1
  &travelClass=BUSINESS
```

### 2. Flight Offer Details
**Endpoint**: `/v1/shopping/flight-offers/pricing`

Get detailed pricing for a specific flight offer.

### 3. Aircraft Information
**Endpoint**: `/v1/reference-data/aircraft/{code}`

Get aircraft specifications (for cabin details).

### 4. Airline Information
**Endpoint**: `/v1/reference-data/airlines`

Get airline information and codes.

## API Rate Limits

### Test Environment (Free Tier)
- **10 API calls per second**
- **100,000 API calls per month**
- Sufficient for development and testing

### Production Environment
- Higher rate limits available
- Pay-as-you-go pricing
- Contact Amadeus for enterprise plans

## Authentication

Amadeus uses OAuth 2.0 Client Credentials flow:

```typescript
// Request access token
POST https://test.api.amadeus.com/v1/security/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
```

Response:
```json
{
  "access_token": "abc123...",
  "token_type": "Bearer",
  "expires_in": 1799
}
```

Use the token in requests:
```
Authorization: Bearer abc123...
```

## Mapping Amadeus Data to Our Model

### Cabin Features Mapping

Amadeus provides some cabin data, but you'll need to supplement with your own database for detailed features:

| Our Feature | Amadeus Data | Additional Source |
|-------------|--------------|-------------------|
| Bed Length | ❌ Not available | Manual database |
| Aisle Access | ✅ Cabin layout | Amadeus + manual |
| WiFi | ✅ Amenities | Amadeus API |
| Screen Size | ❌ Not available | Manual database |
| Privacy | ❌ Not available | Manual database |
| Cabin Age | ✅ Aircraft info | Amadeus API |

### Recommended Approach

1. **Use Amadeus for**:
   - Flight availability and pricing
   - Airlines and aircraft types
   - Basic amenities
   - Booking capabilities

2. **Supplement with your own database for**:
   - Detailed cabin specifications
   - Seat dimensions
   - Entertainment specs
   - Privacy features
   - Photos and images

## Example API Client Structure

```typescript
// lib/amadeus.ts
import axios from 'axios';

class AmadeusClient {
  private accessToken?: string;
  private tokenExpiry?: number;

  async getAccessToken() {
    const response = await axios.post(
      `${process.env.AMADEUS_API_ENDPOINT}/v1/security/oauth2/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_CLIENT_ID!,
        client_secret: process.env.AMADEUS_CLIENT_SECRET!,
      })
    );

    this.accessToken = response.data.access_token;
    this.tokenExpiry = Date.now() + response.data.expires_in * 1000;

    return this.accessToken;
  }

  async searchFlights(params: {
    origin: string;
    destination: string;
    departureDate: string;
    travelClass: string;
  }) {
    const token = await this.getAccessToken();

    const response = await axios.get(
      `${process.env.AMADEUS_API_ENDPOINT}/v2/shopping/flight-offers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          originLocationCode: params.origin,
          destinationLocationCode: params.destination,
          departureDate: params.departureDate,
          adults: 1,
          travelClass: params.travelClass.toUpperCase(),
        },
      }
    );

    return response.data;
  }
}

export const amadeus = new AmadeusClient();
```

## Testing Your Integration

1. **Start with test endpoints**:
   ```bash
   curl -X POST \
     https://test.api.amadeus.com/v1/security/oauth2/token \
     -H 'Content-Type: application/x-www-form-urlencoded' \
     -d 'grant_type=client_credentials&client_id=YOUR_ID&client_secret=YOUR_SECRET'
   ```

2. **Test flight search**:
   ```bash
   curl -X GET \
     'https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=NYC&destinationLocationCode=MAD&departureDate=2024-12-25&adults=1&travelClass=BUSINESS' \
     -H 'Authorization: Bearer YOUR_ACCESS_TOKEN'
   ```

3. **Check response structure** and map to your data model

## Common Issues & Solutions

### Issue: 401 Unauthorized
- Check your Client ID and Secret are correct
- Ensure token hasn't expired (they last 30 minutes)
- Verify you're using the correct endpoint (test vs production)

### Issue: Rate Limit Exceeded
- Implement caching to reduce API calls
- Store flight data temporarily
- Consider using Redis for caching

### Issue: No Results Returned
- Check airport codes are valid IATA codes
- Verify dates are in the future
- Ensure cabin class is valid (ECONOMY, PREMIUM_ECONOMY, BUSINESS, FIRST)

## Email Configuration

For sending booking confirmations and notifications:

### Option 1: Gmail (Development)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Google Account → Security → 2-Step Verification → App Passwords
3. Use the app password in `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your.email@gmail.com
   SMTP_PASSWORD=your_app_password
   ```

### Option 2: Resend (Recommended for Production)

1. Sign up at https://resend.com
2. Verify your domain
3. Get your API key
4. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   ```

### Option 3: SendGrid

1. Sign up at https://sendgrid.com
2. Create an API key
3. Add to `.env.local`:
   ```env
   SENDGRID_API_KEY=SG.your_api_key_here
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```

## Next Steps

1. **Phase 1**: Set up Amadeus credentials and test authentication
2. **Phase 2**: Implement flight search with Amadeus API
3. **Phase 3**: Build cabin details database to supplement Amadeus data
4. **Phase 4**: Combine Amadeus flight data with cabin specifications
5. **Phase 5**: Add booking functionality (Amadeus Flight Create Orders API)

## Useful Resources

- [Amadeus API Documentation](https://developers.amadeus.com/self-service)
- [Flight Offers Search API](https://developers.amadeus.com/self-service/category/flights/api-doc/flight-offers-search)
- [Amadeus Node SDK](https://github.com/amadeus4dev/amadeus-node)
- [API Reference](https://developers.amadeus.com/self-service/apis-docs)

## Cost Estimation

### Development (Test Environment)
- **Free**: 100,000 API calls/month
- Perfect for prototype and testing

### Production
- **Pay-as-you-go**: ~€0.10 - €0.50 per API call
- **Volume discounts** available
- **Booking fees**: Commission on bookings made through the API

## Security Best Practices

1. ✅ Never commit `.env.local` or API credentials
2. ✅ Use environment variables for all secrets
3. ✅ Implement rate limiting on your API routes
4. ✅ Cache API responses to reduce costs
5. ✅ Validate and sanitize all user inputs
6. ✅ Use HTTPS only in production
7. ✅ Rotate API credentials regularly
8. ✅ Monitor API usage in Amadeus dashboard

## Support

- **Amadeus Support**: https://developers.amadeus.com/support
- **Community Forum**: https://stackoverflow.com/questions/tagged/amadeus
- **Email**: developers@amadeus.com
