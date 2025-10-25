'use client';

import { FormEvent, useMemo, useState } from 'react';
import { FlightOfferSummary } from '@/lib/flight-transformer';
import { formatPrice } from '@/lib/utils';

type SearchFormState = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  adults: number;
  travelClass: string;
  nonStop: boolean;
};

const travelClassOptions = [
  { value: 'ECONOMY', label: 'Economy' },
  { value: 'PREMIUM_ECONOMY', label: 'Premium Economy' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'FIRST', label: 'First' },
];

interface FlightSearchResponse {
  data: FlightOfferSummary[];
  meta?: {
    count?: number;
    searchTime?: number;
  };
  error?: string;
  message?: string;
}

export default function SearchFlights() {
  const [form, setForm] = useState<SearchFormState>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    travelClass: 'ECONOMY',
    nonStop: false,
  });
  const [results, setResults] = useState<FlightOfferSummary[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<FlightSearchResponse['meta']>();

  const canSubmit = useMemo(() => {
    return Boolean(form.origin && form.destination && form.departureDate);
  }, [form]);

  const handleChange = (
    field: keyof SearchFormState,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || loading) return;

    const params = new URLSearchParams({
      origin: form.origin.trim().toUpperCase(),
      destination: form.destination.trim().toUpperCase(),
      date: form.departureDate,
      travelClass: form.travelClass,
      adults: String(form.adults),
    });

    if (form.returnDate) {
      params.append('returnDate', form.returnDate);
    }
    if (form.nonStop) {
      params.append('nonStop', 'true');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/flights/search?${params.toString()}`);
      const json: FlightSearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(json.error || json.message || 'Unable to search flights.');
      }

      setResults(json.data);
      setMeta(json.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to search flights.');
      setResults(null);
      setMeta(undefined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 backdrop-blur"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-200">
            <span className="font-medium text-white">Origin airport</span>
            <input
              type="text"
              value={form.origin}
              onChange={(event) => handleChange('origin', event.target.value)}
              placeholder="e.g. JFK"
              maxLength={3}
              className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 uppercase text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span className="font-medium text-white">Destination airport</span>
            <input
              type="text"
              value={form.destination}
              onChange={(event) => handleChange('destination', event.target.value)}
              placeholder="e.g. LHR"
              maxLength={3}
              className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 uppercase text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span className="font-medium text-white">Departure date</span>
            <input
              type="date"
              value={form.departureDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(event) => handleChange('departureDate', event.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span className="font-medium text-white">Return date (optional)</span>
            <input
              type="date"
              value={form.returnDate}
              min={form.departureDate || new Date().toISOString().split('T')[0]}
              onChange={(event) => handleChange('returnDate', event.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span className="font-medium text-white">Adults</span>
            <input
              type="number"
              min={1}
              max={9}
              value={form.adults}
              onChange={(event) => handleChange('adults', Number(event.target.value))}
              className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-200">
            <span className="font-medium text-white">Cabin</span>
            <select
              value={form.travelClass}
              onChange={(event) => handleChange('travelClass', event.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {travelClassOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <label className="inline-flex items-center gap-3 text-sm text-slate-200">
            <input
              type="checkbox"
              checked={form.nonStop}
              onChange={(event) => handleChange('nonStop', event.target.checked)}
              className="h-5 w-5 rounded border-white/20 bg-slate-900/80 text-sky-500 focus:ring-sky-400"
            />
            Non-stop flights only
          </label>

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? 'Searching…' : 'Search flights'}
          </button>
        </div>

        {error && (
          <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        )}
        {meta?.searchTime !== undefined && (
          <p className="text-xs text-slate-300">
            Search completed in {meta.searchTime} ms.
          </p>
        )}
      </form>

      {results && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Found {results.length} flight option{results.length === 1 ? '' : 's'}
          </h2>
          {results.length === 0 ? (
            <p className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-200">
              No flights matched your search. Try adjusting the dates or airports.
            </p>
          ) : (
            <ul className="space-y-4">
              {results.map((offer) => (
                <li key={offer.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
                  <FlightOffer offer={offer} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

function FlightOffer({ offer }: { offer: FlightOfferSummary }) {
  const firstItinerary = offer.itineraries[0];
  const outbound = firstItinerary?.segments ?? [];
  const firstSegment = outbound[0];
  const lastSegment = outbound[outbound.length - 1];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-slate-300">
            {offer.validatingCarrier}
            {offer.travelClass ? ` • ${offer.travelClass}` : ''}
            {offer.numberOfBookableSeats ? ` • Seats left: ${offer.numberOfBookableSeats}` : ''}
          </p>
          {firstSegment && lastSegment && (
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {firstSegment.departureAirport} → {lastSegment.arrivalAirport}
            </h3>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-slate-300">Total price</p>
          <p className="text-3xl font-semibold text-white">
            {formatPrice(offer.price.total, offer.price.currency)}
          </p>
        </div>
      </div>

      {offer.itineraries.map((itinerary, index) => (
        <div key={index} className="rounded-2xl border border-white/10 bg-slate-900/50 p-4">
          <div className="flex items-center justify-between text-sm text-slate-200">
            <span>
              {index === 0 ? 'Outbound' : 'Return'} • {itinerary.duration}
            </span>
            <span>{itinerary.stopCount === 0 ? 'Non-stop' : `${itinerary.stopCount} stop${itinerary.stopCount > 1 ? 's' : ''}`}</span>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-slate-100">
            {itinerary.segments.map((segment, segmentIndex) => (
              <li
                key={`${segment.flightNumber}-${segmentIndex}`}
                className="rounded-2xl border border-white/5 bg-slate-900/70 p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-base font-semibold text-white">
                      {segment.departureAirport} {segment.departureTime} → {segment.arrivalAirport} {segment.arrivalTime}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-slate-300">
                      {segment.carrierName} • {segment.flightNumber} • {segment.aircraft}
                    </p>
                  </div>
                  <span className="text-xs text-slate-300">{segment.duration}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}

      {offer.includedCheckedBags && (
        <p className="text-xs text-slate-300">Checked baggage allowance: {offer.includedCheckedBags}</p>
      )}
    </div>
  );
}
