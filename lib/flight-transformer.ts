/**
 * Flight Data Transformer
 *
 * Transforms Amadeus API flight offers into our FlightData format
 * Enriches basic API data with cabin specifications and feature indicators
 */

import {
  AmadeusFlightOffer,
  Segment,
  Dictionaries,
} from './amadeus-types';
import { FlightData, IndicatorStatus, Feature } from './mockData';
import { cabinSpecsDatabase } from './cabin-specs-database';

// ============================================================================
// Time Formatting Utilities
// ============================================================================

/**
 * Parse ISO8601 duration to human-readable format
 * @param duration ISO8601 duration string (e.g., "PT9H15M")
 * @returns Formatted duration (e.g., "9h 15m")
 */
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  if (!match) return duration;

  const hours = match[1] ? match[1].replace('H', 'h ') : '';
  const minutes = match[2] ? match[2].replace('M', 'm') : '';

  return (hours + minutes).trim();
}

/**
 * Format ISO datetime to time only
 * @param datetime ISO8601 datetime (e.g., "2023-11-01T21:50:00")
 * @returns Time only (e.g., "21:50")
 */
function formatTime(datetime: string): string {
  return datetime.split('T')[1]?.substring(0, 5) || datetime;
}

/**
 * Calculate duration between two ISO datetimes
 * @param start ISO8601 datetime
 * @param end ISO8601 datetime
 * @returns Formatted duration (e.g., "9h 15m")
 */
function calculateDuration(start: string, end: string): string {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const diffMs = endTime - startTime;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
}

// ============================================================================
// Aircraft & Cabin Specs Lookup
// ============================================================================

/**
 * Get cabin specifications for an aircraft/airline combination
 * @param airlineCode IATA airline code
 * @param aircraftCode IATA aircraft code
 * @param cabin Travel class
 * @returns Cabin specifications or defaults
 */
function getCabinSpecs(
  airlineCode: string,
  aircraftCode: string,
  cabin: string
) {
  const key = `${airlineCode}_${aircraftCode}_${cabin}`;
  return cabinSpecsDatabase[key] || cabinSpecsDatabase.DEFAULT;
}

// ============================================================================
// Feature Indicator Calculation
// ============================================================================

/**
 * Calculate indicator status based on value comparison
 * @param value Current value
 * @param excellent Threshold for excellent
 * @param fair Threshold for fair
 * @param reverse If true, lower is better
 * @returns Indicator status
 */
function calculateStatus(
  value: number,
  excellent: number,
  fair: number,
  reverse = false
): IndicatorStatus {
  if (reverse) {
    if (value <= excellent) return 'excellent';
    if (value <= fair) return 'fair';
    return 'poor';
  } else {
    if (value >= excellent) return 'excellent';
    if (value >= fair) return 'fair';
    return 'poor';
  }
}

/**
 * Create feature indicator with tooltip
 */
function createFeature(
  icon: string,
  name: string,
  value: string,
  status: IndicatorStatus,
  description: string,
  rank: string,
  average: string,
  best: string
): Feature {
  return {
    icon,
    name,
    value,
    status,
    tooltip: {
      description,
      rank,
      average,
      best,
    },
  };
}

// ============================================================================
// Main Transformation Function
// ============================================================================

/**
 * Transform Amadeus flight offer to FlightData format
 * @param offer Amadeus flight offer
 * @param dictionaries Amadeus dictionaries (aircraft, carriers, locations)
 * @param allOffers All offers for comparative ranking
 * @returns FlightData for UI display
 */
export function transformFlightOffer(
  offer: AmadeusFlightOffer,
  dictionaries: Dictionaries,
  allOffers: AmadeusFlightOffer[] = []
): FlightData {
  // Get first segment for primary details
  const firstSegment = offer.itineraries[0]?.segments[0];
  const lastSegment = offer.itineraries[0]?.segments[offer.itineraries[0].segments.length - 1];

  if (!firstSegment || !lastSegment) {
    throw new Error('Invalid flight offer: missing segments');
  }

  // Get cabin class from traveler pricing
  const cabin = offer.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin || 'BUSINESS';

  // Get airline and aircraft info
  const airlineCode = firstSegment.carrierCode;
  const aircraftCode = firstSegment.aircraft.code;
  const airlineName = dictionaries.carriers?.[airlineCode] || airlineCode;
  const aircraftName = dictionaries.aircraft?.[aircraftCode] || `Aircraft ${aircraftCode}`;

  // Get cabin specifications
  const cabinSpecs = getCabinSpecs(airlineCode, aircraftCode, cabin);

  // Build route information
  const route = {
    from: firstSegment.departure.iataCode,
    to: lastSegment.arrival.iataCode,
    departTime: formatTime(firstSegment.departure.at),
    arriveTime: formatTime(lastSegment.arrival.at),
    duration: formatDuration(offer.itineraries[0].duration),
  };

  // Extract price
  const price = parseFloat(offer.price.total);

  // Build feature indicators with rankings
  const features = buildFeatureIndicators(cabinSpecs, allOffers, dictionaries);

  // Build detailed specifications
  const details = {
    seatAndSleep: {
      seatWidth: cabinSpecs.seatWidth,
      seatPitch: cabinSpecs.seatPitch,
      recline: cabinSpecs.recline,
      bedLength: cabinSpecs.bedLength,
      bedWidth: cabinSpecs.bedWidth,
      bedType: cabinSpecs.bedType,
      comfortFeatures: cabinSpecs.comfortFeatures,
      bedding: cabinSpecs.bedding,
    },
    entertainment: {
      screenSize: cabinSpecs.screenSize,
      resolution: cabinSpecs.resolution,
      systemName: cabinSpecs.systemName,
      contentLibrary: cabinSpecs.contentLibrary,
      audio: cabinSpecs.audio,
      gaming: cabinSpecs.gaming,
    },
    connectivity: {
      wifiAvailability: cabinSpecs.wifiAvailability,
      wifiSpeed: cabinSpecs.wifiSpeed,
      wifiPricing: cabinSpecs.wifiPricing,
      powerOutlets: cabinSpecs.powerOutlets,
      deviceStorage: cabinSpecs.deviceStorage,
      holders: cabinSpecs.holders,
    },
    dining: {
      serviceStyle: cabinSpecs.serviceStyle,
      menuQuality: cabinSpecs.menuQuality,
      beverages: cabinSpecs.beverages,
      timingOptions: cabinSpecs.timingOptions,
    },
    privacyAndLayout: {
      configuration: cabinSpecs.configuration,
      directAisleAccess: cabinSpecs.directAisleAccess,
      privacyFeatures: cabinSpecs.privacyFeatures,
      windowVsAisle: cabinSpecs.windowVsAisle,
      totalSeats: cabinSpecs.totalSeats,
    },
    environment: {
      cabinAltitude: cabinSpecs.cabinAltitude,
      noiseLevel: cabinSpecs.noiseLevel,
      airQuality: cabinSpecs.airQuality,
      lightingControl: cabinSpecs.lightingControl,
      temperatureControl: cabinSpecs.temperatureControl,
      cabinAge: cabinSpecs.cabinAge,
    },
  };

  // Generate flight number
  const flightNumber = `${airlineCode}${firstSegment.number}`;

  return {
    id: offer.id,
    airline: airlineName,
    aircraft: aircraftName,
    route,
    flightNumber,
    price,
    features,
    details,
    images: [
      '/placeholder-cabin.jpg',
      '/placeholder-seat.jpg',
      '/placeholder-entertainment.jpg',
      '/placeholder-dining.jpg',
    ],
  };
}

/**
 * Build feature indicators with status and tooltips
 */
function buildFeatureIndicators(
  cabinSpecs: any,
  allOffers: AmadeusFlightOffer[],
  dictionaries: Dictionaries
): FlightData['features'] {
  // Parse numeric values for comparison
  const bedLengthCm = parseInt(cabinSpecs.bedLength) || 198;
  const screenSizeInch = parseInt(cabinSpecs.screenSize) || 18;
  const wifiSpeedMbps = parseInt(cabinSpecs.wifiSpeed) || 15;
  const cabinAgeYears = parseInt(cabinSpecs.cabinAge) || 5;

  // Calculate statuses
  const bedStatus = calculateStatus(bedLengthCm, 203, 198);
  const aisleStatus: IndicatorStatus = cabinSpecs.directAisleAccess === 'Yes - all seats' ? 'excellent' : 'fair';
  const wifiStatus = calculateStatus(wifiSpeedMbps, 30, 15);
  const screenStatus = calculateStatus(screenSizeInch, 21, 17);
  const privacyStatus: IndicatorStatus =
    cabinSpecs.privacyFeatures.includes('Closing door') ? 'excellent' :
    cabinSpecs.privacyFeatures.includes('High dividers') ? 'fair' : 'poor';
  const ageStatus = calculateStatus(cabinAgeYears, 3, 6, true);

  return {
    bedLength: createFeature(
      '🛏️',
      'Bed Length',
      cabinSpecs.bedLength,
      bedStatus,
      bedStatus === 'excellent' ? 'Excellent - Among the longest available' :
      bedStatus === 'fair' ? 'Fair - Acceptable length' : 'Poor - Shorter than average',
      'Comparative rank unavailable',
      '198cm',
      '205cm'
    ),
    aisleAccess: createFeature(
      '🚪',
      'Aisle Access',
      cabinSpecs.configuration,
      aisleStatus,
      aisleStatus === 'excellent' ? 'Excellent - Direct aisle access' : 'Fair - Limited access',
      'Comparative rank unavailable',
      '1-2-1 configuration',
      '1-2-1 Direct'
    ),
    wifi: createFeature(
      '📡',
      'WiFi',
      `${cabinSpecs.wifiPricing}, ${cabinSpecs.wifiSpeed}`,
      wifiStatus,
      wifiStatus === 'excellent' ? 'Excellent - Fast and reliable' :
      wifiStatus === 'fair' ? 'Fair - Moderate speed' : 'Poor - Slow connection',
      'Comparative rank unavailable',
      '25 Mbps',
      '50+ Mbps'
    ),
    screenSize: createFeature(
      '📺',
      'Screen Size',
      cabinSpecs.screenSize,
      screenStatus,
      screenStatus === 'excellent' ? 'Excellent - Large display' :
      screenStatus === 'fair' ? 'Fair - Standard size' : 'Poor - Small screen',
      'Comparative rank unavailable',
      '19.5"',
      '24"'
    ),
    privacy: createFeature(
      '🔒',
      'Privacy',
      cabinSpecs.privacyFeatures[0] || 'Standard',
      privacyStatus,
      privacyStatus === 'excellent' ? 'Excellent - Full privacy suite' :
      privacyStatus === 'fair' ? 'Fair - Partial privacy' : 'Poor - Limited privacy',
      'Comparative rank unavailable',
      'Enclosed Suite',
      'Door Suite'
    ),
    cabinAge: createFeature(
      '🎂',
      'Cabin Age',
      cabinSpecs.cabinAge,
      ageStatus,
      ageStatus === 'excellent' ? 'Excellent - Brand new cabin' :
      ageStatus === 'fair' ? 'Fair - Moderately aged' : 'Poor - Outdated cabin',
      'Comparative rank unavailable',
      '6 years',
      '2 years'
    ),
  };
}

/**
 * Transform multiple Amadeus flight offers
 * @param response Complete Amadeus API response
 * @returns Array of FlightData for UI
 */
export function transformFlightOffers(
  offers: AmadeusFlightOffer[],
  dictionaries: Dictionaries
): FlightData[] {
  return offers.map((offer) => transformFlightOffer(offer, dictionaries, offers));
}
