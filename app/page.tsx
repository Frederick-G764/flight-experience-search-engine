import SearchFlights from '@/components/SearchFlights';

export default function Home() {
  return (
    <main className="relative flex-1 pb-24">
      <div className="absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-x-0 top-16 mx-auto h-[360px] w-[90%] max-w-5xl rounded-[60px] bg-gradient-to-br from-slate-950/90 via-blue-900/60 to-slate-900/70 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 pt-12 md:pt-20">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
            <span className="text-sm">◎</span>
            Live flight search
          </div>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Search real Amadeus flight offers in seconds.
          </h1>
          <p className="max-w-3xl text-lg text-slate-200">
            Enter IATA airport codes and dates to query the Amadeus Flight Offers Search API directly. Results display each segment, operating carrier, aircraft, and total fare so you can evaluate the itinerary before booking.
          </p>
        </header>

        <section className="mt-12">
          <SearchFlights />
        </section>

        <section className="mt-16 grid gap-6 rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-sm text-slate-200 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold text-white">IATA tips</h2>
            <p className="mt-2">Use three-letter airport codes such as JFK, LHR, SIN, DXB. The search requires valid codes recognised by Amadeus.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Authentication</h2>
            <p className="mt-2">Add your <code className="rounded bg-slate-900 px-1 py-0.5 text-xs">AMADEUS_CLIENT_ID</code> and <code className="rounded bg-slate-900 px-1 py-0.5 text-xs">AMADEUS_CLIENT_SECRET</code> in <code className="rounded bg-slate-900 px-1 py-0.5 text-xs">.env.local</code> to fetch live data.</p>
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Non-stop filter</h2>
            <p className="mt-2">Toggle the non-stop switch to limit results to direct flights. Leave it off to include itineraries with connections.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
