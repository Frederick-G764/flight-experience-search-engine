import Link from 'next/link';
import { mockFlights } from '@/lib/mockData';
import FlightCard from '@/components/FlightCard';

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string; date?: string; class?: string };
}) {
  return (
    <main className="relative flex-1 pb-24">
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute inset-x-0 top-10 mx-auto h-[420px] w-[85%] max-w-6xl rounded-[60px] bg-gradient-to-br from-slate-950/90 via-purple-950/60 to-blue-950/70 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-4 py-2 text-sm font-medium text-slate-100 transition-all duration-200 hover:border-white/40 hover:text-white"
            >
              ← Back to search
            </Link>
            <h1 className="mt-6 text-3xl font-semibold text-white md:text-5xl">Available premium cabins</h1>
            <p className="mt-3 text-sm text-slate-200 md:text-base">
              {searchParams.from && searchParams.to ? (
                <>
                  {searchParams.from} → {searchParams.to}
                  {searchParams.date && ` • ${searchParams.date}`}
                  {searchParams.class && ` • ${searchParams.class}`}
                </>
              ) : (
                'Pick any route to see live curated options.'
              )}
            </p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-slate-950/70 p-5 text-sm text-slate-200 backdrop-blur">
            <p className="font-semibold text-slate-50">How to read the indicators</p>
            <ul className="mt-3 space-y-1">
              <li>✓ Excellent • ⚠️ Fair • ✕ Poor</li>
              <li>Hover any row for ranking context</li>
              <li>Signals update every 15 minutes</li>
            </ul>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {mockFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>

        {/* Results Summary */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center text-slate-200">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Explorer summary</p>
          <p className="text-lg text-slate-50">Showing {mockFlights.length} flights curated for comfort-first travellers.</p>
          <p className="text-xs text-slate-300">Share this view with your crew or add flights to a collaborative list.</p>
        </div>
      </div>
    </main>
  );
}
