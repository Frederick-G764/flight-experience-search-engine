# Premium Flight Experience Search Prototype

A clickable prototype for a premium flight search platform that shows cabin experience features using visual indicators instead of subjective scores.

## Overview

This prototype demonstrates how travelers can search Business/First Class flights and see actual cabin features (seat dimensions, WiFi, privacy, entertainment) with objective data and visual indicators - NOT scores or ratings.

## Features

- **Search Form**: Simple search with 10 major airports, date picker, and cabin class selection
- **Results Page**: Shows 6 mock flights in a card grid with key feature indicators
- **Feature Indicators**: Visual system using ✓ (excellent) / ⚠️ (fair) / ✕ (poor)
- **Hover Tooltips**: Compare features against other available flights
- **Detail Pages**: Comprehensive specifications across 6 categories
- **Responsive Design**: Works on mobile and desktop

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- No database (uses hardcoded mock data)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the prototype.

### Build

```bash
npm run build
```

### Environment Variables (For Future API Integration)

This prototype currently uses mock data and doesn't require any environment variables. However, when you're ready to integrate real flight data:

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Add your API credentials** (see `.env.example` for all options)

3. **For Amadeus API integration**, see the detailed guide:
   - [AMADEUS_SETUP.md](./AMADEUS_SETUP.md) - Complete Amadeus API setup guide
   - Get credentials at https://developers.amadeus.com

4. **Key environment variables needed:**
   - `AMADEUS_CLIENT_ID` - Your Amadeus API client ID
   - `AMADEUS_CLIENT_SECRET` - Your Amadeus API secret key
   - `AMADEUS_API_ENDPOINT` - API endpoint (test or production)

**Note**: `.env.local` is gitignored and will not be committed to version control.

## Key Principles

1. **No Subjective Scores**: Never show ratings like "9.2/10" - only objective facts
2. **Visual Indicators**: Use ✓/⚠️/✕ system consistently
3. **Transparency**: Always show actual values (205cm, not just "excellent")
4. **Context on Hover**: Tooltips show position vs competition
5. **Factual Language**: "11 years old" not "aging product"
6. **Clean & Scannable**: Easy to compare flights at a glance

## Project Structure

```
/app
  /page.tsx                 - Search form page
  /results/page.tsx         - Results list
  /flight/[id]/page.tsx     - Flight detail page
  /layout.tsx               - Root layout

/components
  /SearchForm.tsx           - Search form component
  /FlightCard.tsx           - Flight card for results
  /FeatureIndicator.tsx     - Indicator with tooltip
  /DetailTabs.tsx           - Tabbed detail view

/lib
  /mockData.ts              - 6 flight configurations
  /utils.ts                 - Utility functions
```

## Mock Data

The prototype includes 6 detailed flight configurations:

1. **Lufthansa A350 Allegris** - Best overall (205cm bed, door suite, 50+ Mbps WiFi)
2. **Qatar Airways A350 Qsuite** - Excellent (203cm bed, door suite)
3. **Singapore Airlines A350** - Very good (198cm bed, enclosed suite)
4. **Emirates 777** - Good (195cm bed, large screen)
5. **American 787** - Acceptable (193cm bed, paid WiFi)
6. **Lufthansa A340 Old** - Weakest (193cm bed, 2-2-2 layout, old cabin)

## Indicator Logic

### Bed Length
- ✓ Excellent: ≥ 200cm
- ⚠️ Fair: 190-199cm
- ✕ Poor: < 190cm

### Aisle Access
- ✓ Excellent: All seats direct (1-2-1)
- ⚠️ Fair: Some seats have access
- ✕ Poor: Must climb over (2-2-2)

### WiFi
- ✓ Excellent: Free + fast (30+ Mbps)
- ⚠️ Fair: Free but slow, or paid but fast
- ✕ Poor: Paid and slow, or unavailable

### Screen Size
- ✓ Excellent: ≥ 21 inches
- ⚠️ Fair: 15-20 inches
- ✕ Poor: < 15 inches

### Privacy
- ✓ Excellent: Closing door
- ⚠️ Fair: High dividers/enclosed suite
- ✕ Poor: Open cabin

### Cabin Age
- ✓ Excellent: ≤ 3 years
- ⚠️ Fair: 4-8 years
- ✕ Poor: > 8 years

## Deployment to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js and configure build settings
6. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Configuration

No environment variables required for this prototype.

### Build Configuration

The project uses default Next.js build settings:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## What's NOT Included

This is a prototype demonstrating the UX concept. It does NOT include:

- User accounts or authentication
- Real API calls (Amadeus, etc.)
- Database or backend
- Filtering system
- Actual booking functionality
- Real airline data
- Payment processing

## Development Notes

- All flight data is hardcoded in `/lib/mockData.ts`
- Images are placeholders (actual cabin photos would be needed for production)
- The prototype shows all 6 flights regardless of search parameters
- "Book Now" buttons don't connect to any booking system

## Success Criteria

✅ User can search and see 6 flights
✅ Each flight shows 6 features with indicators (✓/⚠️/✕)
✅ Hover shows tooltip with position vs other flights
✅ Detail page shows comprehensive specs
✅ Everything is factual and objective (no scores)
✅ Clean, professional design
✅ Mobile responsive
✅ Ready to deploy to Vercel

## License

MIT

## Support

For issues or questions, please contact the project maintainer.
