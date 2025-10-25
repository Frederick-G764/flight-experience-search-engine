import { AmadeusFlightOffer, Dictionaries } from './amadeus-types';

export interface SegmentSummary {
  departureAirport: string;
  departureTime: string;
  departureDateTime: string;
  arrivalAirport: string;
  arrivalTime: string;
  arrivalDateTime: string;
  carrierCode: string;
  carrierName: string;
  flightNumber: string;
  aircraft: string;
  duration: string;
}

export interface ItinerarySummary {
  duration: string;
  segments: SegmentSummary[];
  stopCount: number;
}

export interface FlightOfferSummary {
  id: string;
  price: {
    total: number;
    currency: string;
  };
  validatingCarrier: string;
  itineraries: ItinerarySummary[];
  numberOfBookableSeats: number;
  includedCheckedBags?: string;
  travelClass?: string;
}

function formatDuration(duration: string | undefined): string {
  if (!duration) return 'Unknown';
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return duration;
  const hours = match[1] ? `${match[1]}h` : '';
  const minutes = match[2] ? `${match[2]}m` : '';
  return [hours, minutes].filter(Boolean).join(' ') || duration;
}

function formatTime(datetime: string | undefined): string {
  if (!datetime) return 'Unknown';
  return datetime.substring(11, 16);
}

function formatCarrier(code: string, dictionaries?: Dictionaries): string {
  if (!code) return 'Unknown carrier';
  return dictionaries?.carriers?.[code] || code;
}

function formatAircraft(code: string | undefined, dictionaries?: Dictionaries): string {
  if (!code) return 'Aircraft TBD';
  return dictionaries?.aircraft?.[code] || code;
}

export function transformFlightOffers(
  offers: AmadeusFlightOffer[],
  dictionaries?: Dictionaries
): FlightOfferSummary[] {
  return offers.map((offer) => {
    const travelerPricing = offer.travelerPricings?.[0];
    const includedBag = travelerPricing?.fareDetailsBySegment?.[0]?.includedCheckedBags;

    const itineraries: ItinerarySummary[] = offer.itineraries.map((itinerary) => {
      const segments: SegmentSummary[] = itinerary.segments.map((segment) => {
        const carrierName = formatCarrier(segment.carrierCode, dictionaries);
        const aircraftName = formatAircraft(segment.aircraft?.code, dictionaries);

        return {
          departureAirport: segment.departure.iataCode,
          departureTime: formatTime(segment.departure.at),
          departureDateTime: segment.departure.at,
          arrivalAirport: segment.arrival.iataCode,
          arrivalTime: formatTime(segment.arrival.at),
          arrivalDateTime: segment.arrival.at,
          carrierCode: segment.carrierCode,
          carrierName,
          flightNumber: `${segment.carrierCode}${segment.number}`,
          aircraft: aircraftName,
          duration: formatDuration(segment.duration),
        };
      });

      return {
        duration: formatDuration(itinerary.duration),
        segments,
        stopCount: Math.max(segments.length - 1, 0),
      };
    });

    return {
      id: offer.id,
      price: {
        total: Number(offer.price.total),
        currency: offer.price.currency || offer.price.base?.split(' ')[0] || 'USD',
      },
      validatingCarrier: formatCarrier(offer.validatingAirlineCodes?.[0] || '', dictionaries),
      itineraries,
      numberOfBookableSeats: offer.numberOfBookableSeats || 0,
      includedCheckedBags: includedBag
        ? includedBag.weight
          ? `${includedBag.weight}${includedBag.weightUnit || ''}`
          : includedBag.quantity !== undefined
            ? `${includedBag.quantity} pc`
            : undefined
        : undefined,
      travelClass: travelerPricing?.fareDetailsBySegment?.[0]?.cabin,
    };
  });
}
