/**
 * Amadeus Flight Offers Search API TypeScript Types
 * Based on Amadeus Flight Offers Search API v2.9.1
 *
 * Reference: https://developers.amadeus.com/self-service/category/flights/api-doc/flight-offers-search
 */

// ============================================================================
// API Response Types
// ============================================================================

export interface AmadeusFlightOffersResponse {
  meta: CollectionMeta;
  data: AmadeusFlightOffer[];
  dictionaries: Dictionaries;
  warnings?: Issue[];
}

export interface CollectionMeta {
  count: number;
  links?: {
    self?: string;
    next?: string;
    previous?: string;
    last?: string;
    first?: string;
    up?: string;
  };
}

export interface Issue {
  status: number;
  code: number;
  title: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
    example?: string;
  };
}

// ============================================================================
// Flight Offer
// ============================================================================

export interface AmadeusFlightOffer {
  type: 'flight-offer';
  id: string;
  source: 'GDS';
  instantTicketingRequired: boolean;
  disablePricing?: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  paymentCardRequired?: boolean;
  lastTicketingDate?: string;
  lastTicketingDateTime?: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions?: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

// ============================================================================
// Itinerary & Segments
// ============================================================================

export interface Itinerary {
  duration: string; // ISO8601 format: PT9H15M
  segments: Segment[];
}

export interface Segment {
  id: string;
  departure: FlightEndPoint;
  arrival: FlightEndPoint;
  carrierCode: string; // IATA carrier code (2 chars)
  number: string; // Flight number
  aircraft: AircraftEquipment;
  operating?: OperatingFlight;
  duration: string; // ISO8601 format
  numberOfStops?: number;
  blacklistedInEU?: boolean;
  co2Emissions?: Co2Emission[];
  stops?: FlightStop[];
}

export interface FlightEndPoint {
  iataCode: string; // Airport IATA code (3 chars)
  terminal?: string;
  at: string; // ISO8601 datetime: 2023-11-01T21:50:00
}

export interface FlightStop {
  iataCode: string;
  duration?: string;
  arrivalAt?: string;
  departureAt?: string;
}

export interface AircraftEquipment {
  code: string; // IATA aircraft code (3 chars)
}

export interface OperatingFlight {
  carrierCode: string;
}

export interface Co2Emission {
  weight: number;
  weightUnit: string;
  cabin: TravelClass;
}

// ============================================================================
// Pricing
// ============================================================================

export interface Price {
  currency: string; // ISO 4217 currency code
  total: string;
  base: string;
  fees?: Fee[];
  taxes?: Tax[];
  refundableTaxes?: string;
  grandTotal?: string;
  billingCurrency?: string;
  additionalServices?: AdditionalService[];
  margin?: string;
}

export interface Fee {
  amount: string;
  type: 'TICKETING' | 'FORM_OF_PAYMENT' | 'SUPPLIER';
}

export interface Tax {
  amount: string;
  code: string;
}

export interface AdditionalService {
  amount: string;
  type: 'CHECKED_BAGS' | 'MEALS' | 'SEATS' | 'OTHER_SERVICES';
}

export interface PricingOptions {
  fareType?: ('PUBLISHED' | 'NEGOTIATED' | 'CORPORATE')[];
  includedCheckedBagsOnly?: boolean;
  refundableFare?: boolean;
  noRestrictionFare?: boolean;
  noPenaltyFare?: boolean;
}

// ============================================================================
// Traveler Pricing
// ============================================================================

export interface TravelerPricing {
  travelerId: string;
  fareOption: TravelerPricingFareOption;
  travelerType: TravelerType;
  associatedAdultId?: string;
  price: Price;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: TravelClass;
  fareBasis?: string;
  brandedFare?: string;
  class: string; // Booking class code (1 char)
  isAllotment?: boolean;
  allotmentDetails?: AllotmentDetails;
  sliceDiceIndicator?: SliceDiceIndicator;
  includedCheckedBags?: BaggageAllowance;
  additionalServices?: {
    chargeableCheckedBags?: ChargeableCheckedBags;
    chargeableSeat?: ChargeableSeat;
    chargeableSeatNumber?: string;
    otherServices?: ServiceName[];
  };
}

export interface AllotmentDetails {
  tourName?: string;
  tourReference?: string;
}

export interface BaggageAllowance {
  quantity?: number;
  weight?: number;
  weightUnit?: string;
}

export interface ChargeableCheckedBags extends BaggageAllowance {
  id?: string;
}

export interface ChargeableSeat {
  id?: string;
  number?: string;
}

// ============================================================================
// Dictionaries
// ============================================================================

export interface Dictionaries {
  locations?: Record<string, LocationValue>;
  aircraft?: Record<string, string>;
  currencies?: Record<string, string>;
  carriers?: Record<string, string>;
}

export interface LocationValue {
  cityCode: string;
  countryCode: string;
}

// ============================================================================
// Enums & Types
// ============================================================================

export type TravelClass =
  | 'ECONOMY'
  | 'PREMIUM_ECONOMY'
  | 'BUSINESS'
  | 'FIRST';

export type TravelerType =
  | 'ADULT'
  | 'CHILD'
  | 'SENIOR'
  | 'YOUNG'
  | 'HELD_INFANT'
  | 'SEATED_INFANT'
  | 'STUDENT';

export type TravelerPricingFareOption =
  | 'STANDARD'
  | 'INCLUSIVE_TOUR'
  | 'SPANISH_MELILLA_RESIDENT'
  | 'SPANISH_CEUTA_RESIDENT'
  | 'SPANISH_CANARY_RESIDENT'
  | 'SPANISH_BALEARIC_RESIDENT'
  | 'AIR_FRANCE_METROPOLITAN_DISCOUNT_PASS'
  | 'AIR_FRANCE_DOM_DISCOUNT_PASS'
  | 'AIR_FRANCE_COMBINED_DISCOUNT_PASS'
  | 'AIR_FRANCE_FAMILY'
  | 'ADULT_WITH_COMPANION'
  | 'COMPANION';

export type SliceDiceIndicator =
  | 'LOCAL_AVAILABILITY'
  | 'SUB_OD_AVAILABILITY_1'
  | 'SUB_OD_AVAILABILITY_2';

export type ServiceName =
  | 'PRIORITY_BOARDING'
  | 'AIRPORT_CHECKIN';

export type Coverage =
  | 'MOST_SEGMENTS'
  | 'AT_LEAST_ONE_SEGMENT'
  | 'ALL_SEGMENTS';

// ============================================================================
// Request Types
// ============================================================================

export interface FlightOffersSearchParams {
  // Required
  originLocationCode: string; // IATA code (3 chars)
  destinationLocationCode: string; // IATA code (3 chars)
  departureDate: string; // YYYY-MM-DD format
  adults: number; // 1-9

  // Optional
  returnDate?: string; // YYYY-MM-DD format
  children?: number; // 0-9
  infants?: number; // 0-9
  travelClass?: TravelClass;
  includedAirlineCodes?: string; // Comma-separated IATA codes
  excludedAirlineCodes?: string; // Comma-separated IATA codes
  nonStop?: boolean;
  currencyCode?: string; // ISO 4217 code (3 chars)
  maxPrice?: number;
  max?: number; // Max results (default 250)
}

export interface FlightOffersPostRequest {
  currencyCode?: string;
  originDestinations: OriginDestination[];
  travelers: TravelerInfo[];
  sources: ('GDS')[];
  searchCriteria?: SearchCriteria;
}

export interface OriginDestination {
  id: string;
  originLocationCode: string;
  destinationLocationCode: string;
  departureDateTimeRange?: DateTimeRange;
  arrivalDateTimeRange?: DateTimeRange;
  includedConnectionPoints?: string[];
  excludedConnectionPoints?: string[];
  originRadius?: number;
  alternativeOriginsCodes?: string[];
  destinationRadius?: number;
  alternativeDestinationsCodes?: string[];
}

export interface DateTimeRange {
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm:ss
  dateWindow?: string; // Format: [MPI][1-3]D
  timeWindow?: string; // Format: [1-12]H
}

export interface TravelerInfo {
  id: string;
  travelerType: TravelerType;
  associatedAdultId?: string;
}

export interface SearchCriteria {
  excludeAllotments?: boolean;
  addOneWayOffers?: boolean;
  maxFlightOffers?: number; // Max 250
  maxPrice?: number;
  allowAlternativeFareOptions?: boolean;
  oneFlightOfferPerDay?: boolean;
  additionalInformation?: {
    chargeableCheckedBags?: boolean;
    brandedFares?: boolean;
  };
  pricingOptions?: {
    includedCheckedBagsOnly?: boolean;
    refundableFare?: boolean;
    noRestrictionFare?: boolean;
    noPenaltyFare?: boolean;
  };
  flightFilters?: FlightFilters;
}

export interface FlightFilters {
  crossBorderAllowed?: boolean;
  moreOvernightsAllowed?: boolean;
  returnToDepartureAirport?: boolean;
  railSegmentAllowed?: boolean;
  busSegmentAllowed?: boolean;
  maxFlightTime?: number;
  carrierRestrictions?: CarrierRestrictions;
  cabinRestrictions?: CabinRestriction[];
  connectionRestriction?: ConnectionRestriction;
}

export interface CarrierRestrictions {
  blacklistedInEUAllowed?: boolean;
  excludedCarrierCodes?: string[];
  includedCarrierCodes?: string[];
}

export interface CabinRestriction {
  cabin: TravelClass;
  coverage?: Coverage;
  originDestinationIds?: string[];
}

export interface ConnectionRestriction {
  maxNumberOfConnections?: number; // 0, 1, or 2
  nonStopPreferred?: boolean;
  airportChangeAllowed?: boolean;
  technicalStopsAllowed?: boolean;
}

// ============================================================================
// Error Types
// ============================================================================

export interface AmadeusError {
  errors: Issue[];
}

// ============================================================================
// Authentication Types
// ============================================================================

export interface AmadeusAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number; // Seconds
  state?: string;
}

export interface AmadeusConfig {
  clientId: string;
  clientSecret: string;
  endpoint: string; // e.g., 'https://test.api.amadeus.com'
}
