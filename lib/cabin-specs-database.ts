/**
 * Cabin Specifications Database
 *
 * Contains detailed cabin experience data for various aircraft/airline/cabin combinations
 * This data supplements the basic flight information from the Amadeus API
 *
 * Format: {AIRLINE_AIRCRAFT_CABIN: specs}
 * Example: LH_359_BUSINESS = Lufthansa A350-900 Business Class
 */

export interface CabinSpecs {
  // Seat & Sleep
  seatWidth: string;
  seatPitch: string;
  recline: string;
  bedLength: string;
  bedWidth: string;
  bedType: string;
  comfortFeatures: string[];
  bedding: string[];

  // Entertainment
  screenSize: string;
  resolution: string;
  systemName: string;
  contentLibrary: string;
  audio: string[];
  gaming: string;

  // Connectivity
  wifiAvailability: string;
  wifiSpeed: string;
  wifiPricing: string;
  powerOutlets: string[];
  deviceStorage: string;
  holders: string;

  // Dining
  serviceStyle: string;
  menuQuality: string;
  beverages: string[];
  timingOptions: string;

  // Privacy & Layout
  configuration: string;
  directAisleAccess: string;
  privacyFeatures: string[];
  windowVsAisle: string;
  totalSeats: string;

  // Environment
  cabinAltitude: string;
  noiseLevel: string;
  airQuality: string;
  lightingControl: string;
  temperatureControl: string;
  cabinAge: string;
}

// Default specifications (used when specific aircraft/airline combo is not in database)
const DEFAULT_BUSINESS_CLASS: CabinSpecs = {
  seatWidth: '21 inches',
  seatPitch: '60 inches',
  recline: 'Fully flat 180°',
  bedLength: '198cm (78 inches)',
  bedWidth: '53cm (21 inches)',
  bedType: 'Fully flat bed',
  comfortFeatures: ['Adjustable headrest', 'Footrest'],
  bedding: ['Blanket', 'Pillow'],

  screenSize: '18 inches',
  resolution: 'Full HD',
  systemName: 'In-flight entertainment system',
  contentLibrary: '200+ entertainment options',
  audio: ['Headphones included'],
  gaming: 'Limited gaming available',

  wifiAvailability: 'Available',
  wifiSpeed: '15 Mbps',
  wifiPricing: 'Varies by airline',
  powerOutlets: ['110V AC outlet', 'USB port'],
  deviceStorage: 'Storage compartments',
  holders: 'Basic device holder',

  serviceStyle: 'Menu service',
  menuQuality: 'Premium dining',
  beverages: ['Wine', 'Spirits', 'Soft drinks'],
  timingOptions: 'Set meal times',

  configuration: '1-2-1',
  directAisleAccess: 'Most seats',
  privacyFeatures: ['Dividers'],
  windowVsAisle: 'Window preferred',
  totalSeats: '40 business class seats',

  cabinAltitude: '6,500 feet',
  noiseLevel: 'Moderate',
  airQuality: 'Standard filtration',
  lightingControl: 'Cabin lighting',
  temperatureControl: 'Climate controlled',
  cabinAge: '5 years',
};

// ============================================================================
// Specific Aircraft/Airline/Cabin Combinations
// ============================================================================

export const cabinSpecsDatabase: Record<string, CabinSpecs> = {
  // Default fallback
  DEFAULT: DEFAULT_BUSINESS_CLASS,

  // ============================================================================
  // LUFTHANSA
  // ============================================================================

  // Lufthansa A350-900 Business Class (Allegris)
  LH_359_BUSINESS: {
    seatWidth: '22 inches',
    seatPitch: '76 inches',
    recline: 'Fully flat 180°',
    bedLength: '205cm (81 inches)',
    bedWidth: '55cm (22 inches)',
    bedType: 'Fully flat bed with memory foam',
    comfortFeatures: ['Adjustable headrest', 'Footrest', 'Lumbar support', 'Massage function'],
    bedding: ['Memory foam mattress pad', 'Duvet', '2 pillows'],

    screenSize: '24 inches',
    resolution: '4K Ultra HD',
    systemName: 'Allegris Entertainment',
    contentLibrary: '300+ movies, 200+ TV shows',
    audio: ['Noise-canceling headphones', 'Bluetooth connectivity'],
    gaming: 'Xbox controller compatible',

    wifiAvailability: 'Complimentary throughout flight',
    wifiSpeed: '50+ Mbps',
    wifiPricing: 'Free',
    powerOutlets: ['110V AC outlet', 'USB-A port', 'USB-C port'],
    deviceStorage: 'Multiple storage compartments',
    holders: 'Adjustable phone and tablet holders',

    serviceStyle: 'On-demand dining',
    menuQuality: 'Star chef designed menu',
    beverages: ['Premium wines', 'Champagne', 'Spirits', 'Fresh juice bar'],
    timingOptions: 'Dine anytime during flight',

    configuration: '1-2-1 (all aisle access)',
    directAisleAccess: 'Yes - all seats',
    privacyFeatures: ['Closing door', 'High dividers', 'Personal suite'],
    windowVsAisle: 'Both have equal benefits',
    totalSeats: '32 business class seats',

    cabinAltitude: '6,000 feet',
    noiseLevel: 'Very quiet',
    airQuality: 'Advanced HEPA filtration, 50% humidity',
    lightingControl: 'Personal LED controls with presets',
    temperatureControl: 'Individual climate zones',
    cabinAge: '2 years',
  },

  // Lufthansa A340-600 Business Class (Legacy)
  LH_346_BUSINESS: {
    seatWidth: '20 inches',
    seatPitch: '60 inches',
    recline: 'Fully flat 180°',
    bedLength: '193cm (76 inches)',
    bedWidth: '51cm (20 inches)',
    bedType: 'Fully flat bed',
    comfortFeatures: ['Basic headrest'],
    bedding: ['Blanket', 'Pillow'],

    screenSize: '15 inches',
    resolution: 'Standard definition',
    systemName: 'Legacy entertainment',
    contentLibrary: '100+ entertainment options',
    audio: ['Basic headphones'],
    gaming: 'No gaming',

    wifiAvailability: 'Available for purchase',
    wifiSpeed: '5 Mbps',
    wifiPricing: '$24.95 per flight',
    powerOutlets: ['110V AC outlet'],
    deviceStorage: 'Minimal storage',
    holders: 'No holders',

    serviceStyle: 'Tray service',
    menuQuality: 'Basic menu',
    beverages: ['House wines', 'Beer'],
    timingOptions: 'Fixed meal times',

    configuration: '2-2-2 (no aisle access)',
    directAisleAccess: 'No - middle seats blocked',
    privacyFeatures: ['Minimal dividers'],
    windowVsAisle: 'Aisle seats slightly better',
    totalSeats: '48 business class seats',

    cabinAltitude: '8,000 feet',
    noiseLevel: 'Louder',
    airQuality: 'Basic filtration, 30% humidity',
    lightingControl: 'Cabin lights only',
    temperatureControl: 'Cabin climate control',
    cabinAge: '11 years',
  },

  // ============================================================================
  // QATAR AIRWAYS
  // ============================================================================

  // Qatar Airways A350-900 Qsuite
  QR_359_BUSINESS: {
    seatWidth: '21.5 inches',
    seatPitch: '74 inches',
    recline: 'Fully flat 180°',
    bedLength: '203cm (80 inches)',
    bedWidth: '54cm (21.5 inches)',
    bedType: 'Fully flat bed',
    comfortFeatures: ['Adjustable headrest', 'Footrest', 'Lumbar support', 'Massage function'],
    bedding: ['Mattress pad', 'Duvet', '2 pillows'],

    screenSize: '21.5 inches',
    resolution: 'Full HD',
    systemName: 'Oryx One',
    contentLibrary: '4000+ entertainment options',
    audio: ['Noise-canceling headphones', 'Bluetooth connectivity'],
    gaming: 'Gaming options available',

    wifiAvailability: 'Complimentary throughout flight',
    wifiSpeed: '30 Mbps',
    wifiPricing: 'Free',
    powerOutlets: ['110V AC outlet', 'USB-A port', 'USB-C port'],
    deviceStorage: 'Multiple storage compartments',
    holders: 'Phone and tablet holders',

    serviceStyle: 'On-demand dining',
    menuQuality: 'Award-winning cuisine',
    beverages: ['Premium wines', 'Champagne', 'Spirits', 'Fresh juices'],
    timingOptions: 'Dine anytime during flight',

    configuration: '1-2-1 (all aisle access)',
    directAisleAccess: 'Yes - all seats',
    privacyFeatures: ['Closing door', 'High dividers', 'Personal suite'],
    windowVsAisle: 'Both have equal benefits',
    totalSeats: '36 business class seats',

    cabinAltitude: '6,000 feet',
    noiseLevel: 'Very quiet',
    airQuality: 'Advanced filtration, 45% humidity',
    lightingControl: 'Personal LED controls',
    temperatureControl: 'Individual climate zones',
    cabinAge: '4 years',
  },

  // ============================================================================
  // SINGAPORE AIRLINES
  // ============================================================================

  // Singapore Airlines A350-900 Business Class
  SQ_359_BUSINESS: {
    seatWidth: '25 inches',
    seatPitch: '60 inches',
    recline: 'Fully flat 180°',
    bedLength: '198cm (78 inches)',
    bedWidth: '63cm (25 inches)',
    bedType: 'Fully flat bed',
    comfortFeatures: ['Adjustable headrest', 'Footrest', 'Lumbar support'],
    bedding: ['Mattress pad', 'Blanket', 'Pillow'],

    screenSize: '18 inches',
    resolution: 'Full HD',
    systemName: 'KrisWorld',
    contentLibrary: '1800+ entertainment options',
    audio: ['Noise-canceling headphones'],
    gaming: 'Limited gaming options',

    wifiAvailability: 'Complimentary throughout flight',
    wifiSpeed: '25 Mbps',
    wifiPricing: 'Free',
    powerOutlets: ['110V AC outlet', 'USB-A port'],
    deviceStorage: 'Storage compartments',
    holders: 'Phone holder',

    serviceStyle: 'Menu service',
    menuQuality: 'Premium cuisine',
    beverages: ['Premium wines', 'Champagne', 'Spirits'],
    timingOptions: 'Set meal times with flexibility',

    configuration: '1-2-1 (all aisle access)',
    directAisleAccess: 'Yes - all seats',
    privacyFeatures: ['High dividers', 'Enclosed suite (no door)'],
    windowVsAisle: 'Both have equal benefits',
    totalSeats: '42 business class seats',

    cabinAltitude: '6,000 feet',
    noiseLevel: 'Quiet',
    airQuality: 'HEPA filtration, 40% humidity',
    lightingControl: 'Mood lighting controls',
    temperatureControl: 'Zone climate control',
    cabinAge: '5 years',
  },

  // ============================================================================
  // EMIRATES
  // ============================================================================

  // Emirates 777-300ER Business Class
  EK_77W_BUSINESS: {
    seatWidth: '20.5 inches',
    seatPitch: '72 inches',
    recline: 'Fully flat 180°',
    bedLength: '195cm (77 inches)',
    bedWidth: '52cm (20.5 inches)',
    bedType: 'Fully flat bed',
    comfortFeatures: ['Adjustable headrest', 'Footrest'],
    bedding: ['Mattress pad', 'Blanket', 'Pillow'],

    screenSize: '23 inches',
    resolution: 'Full HD',
    systemName: 'ICE',
    contentLibrary: '5000+ entertainment options',
    audio: ['Noise-canceling headphones'],
    gaming: 'Gaming available',

    wifiAvailability: 'Complimentary throughout flight',
    wifiSpeed: '15 Mbps',
    wifiPricing: 'Free',
    powerOutlets: ['110V AC outlet', 'USB port'],
    deviceStorage: 'Storage compartments',
    holders: 'Device holder',

    serviceStyle: 'Menu service',
    menuQuality: 'Multi-course dining',
    beverages: ['Premium wines', 'Spirits'],
    timingOptions: 'Set meal times',

    configuration: '1-2-1 (all aisle access)',
    directAisleAccess: 'Yes - all seats',
    privacyFeatures: ['High dividers', 'Enclosed suite (no door)'],
    windowVsAisle: 'Both have equal benefits',
    totalSeats: '42 business class seats',

    cabinAltitude: '7,000 feet',
    noiseLevel: 'Moderate',
    airQuality: 'Standard filtration, 35% humidity',
    lightingControl: 'Cabin mood lighting',
    temperatureControl: 'Cabin climate control',
    cabinAge: '7 years',
  },

  // ============================================================================
  // AMERICAN AIRLINES
  // ============================================================================

  // American Airlines 787-9 Business Class
  AA_789_BUSINESS: {
    seatWidth: '21 inches',
    seatPitch: '64 inches',
    recline: 'Fully flat 180°',
    bedLength: '193cm (76 inches)',
    bedWidth: '53cm (21 inches)',
    bedType: 'Fully flat bed',
    comfortFeatures: ['Adjustable headrest'],
    bedding: ['Blanket', 'Pillow'],

    screenSize: '16 inches',
    resolution: 'HD',
    systemName: 'Panasonic eX3',
    contentLibrary: '300+ entertainment options',
    audio: ['Basic headphones'],
    gaming: 'No gaming',

    wifiAvailability: 'Available for purchase',
    wifiSpeed: '10 Mbps',
    wifiPricing: '$19.95 per flight',
    powerOutlets: ['110V AC outlet', 'USB port'],
    deviceStorage: 'Limited storage',
    holders: 'No holders',

    serviceStyle: 'Tray service',
    menuQuality: 'Standard menu',
    beverages: ['House wines', 'Beer', 'Spirits'],
    timingOptions: 'Fixed meal times',

    configuration: '1-2-1 (all aisle access)',
    directAisleAccess: 'Yes - all seats',
    privacyFeatures: ['Low dividers'],
    windowVsAisle: 'Window seats preferred',
    totalSeats: '44 business class seats',

    cabinAltitude: '6,000 feet',
    noiseLevel: 'Moderate',
    airQuality: 'Standard filtration, 40% humidity',
    lightingControl: 'Basic cabin lighting',
    temperatureControl: 'Cabin climate control',
    cabinAge: '6 years',
  },
};

/**
 * Get cabin specs for a specific aircraft/airline/cabin combination
 * @param airlineCode IATA airline code (e.g., "LH")
 * @param aircraftCode IATA aircraft code (e.g., "359")
 * @param cabin Cabin class (e.g., "BUSINESS")
 * @returns Cabin specifications or default
 */
export function getCabinSpecs(
  airlineCode: string,
  aircraftCode: string,
  cabin: string
): CabinSpecs {
  const key = `${airlineCode}_${aircraftCode}_${cabin}`;
  return cabinSpecsDatabase[key] || cabinSpecsDatabase.DEFAULT;
}
