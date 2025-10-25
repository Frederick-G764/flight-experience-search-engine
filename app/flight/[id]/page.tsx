import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockFlights } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import FeatureIndicator from '@/components/FeatureIndicator';
import DetailTabs from '@/components/DetailTabs';

export async function generateStaticParams() {
  return mockFlights.map((flight) => ({
    id: flight.id,
  }));
}

export default function FlightDetailPage({ params }: { params: { id: string } }) {
  const flight = mockFlights.find((f) => f.id === params.id);

  if (!flight) {
    notFound();
  }

  return (
    <main className="relative flex-1 pb-24">
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute inset-x-0 top-10 mx-auto h-[420px] w-[88%] max-w-6xl rounded-[60px] bg-gradient-to-br from-slate-950/90 via-emerald-950/60 to-blue-950/70 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-12">
        {/* Back Button */}
        <Link
          href="/results"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-4 py-2 text-sm font-medium text-slate-100 transition-all duration-200 hover:border-white/40 hover:text-white"
        >
          ← Back to results
        </Link>

        {/* Hero Section */}
        <div className="mt-8 overflow-hidden rounded-[32px] border border-white/15 bg-slate-950/70 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <div className="relative grid gap-8 p-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-200">
                <span className="rounded-full border border-white/20 bg-slate-950/60 px-3 py-1">Signature route</span>
                <span className="rounded-full border border-white/20 bg-slate-950/60 px-3 py-1">Cabin refreshed {flight.features.cabinAge.value}</span>
              </div>
              <h1 className="mt-6 text-3xl font-semibold text-white md:text-5xl">
                {flight.airline} {flight.aircraft}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-slate-200">
                <span className="text-lg font-semibold text-slate-50">
                  {flight.route.from} → {flight.route.to}
                </span>
                <span className="text-white/30">•</span>
                <span>
                  {flight.route.departTime} - {flight.route.arriveTime}
                </span>
                <span className="text-white/30">•</span>
                <span>{flight.route.duration}</span>
                <span className="text-white/30">•</span>
                <span className="text-sm uppercase tracking-[0.3em] text-slate-200">Flight {flight.flightNumber}</span>
              </div>

              <div className="mt-8 grid gap-4 text-sm text-slate-200 md:grid-cols-3">
                <div className="rounded-2xl border border-white/20 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Suite rating</p>
                  <p className="mt-2 text-2xl font-semibold text-white">9.4</p>
                  <p className="text-xs text-slate-200">Top 3% for privacy</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Dining</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Chef-led</p>
                  <p className="text-xs text-slate-200">Seasonal tasting menu</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Connectivity</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Faststream</p>
                  <p className="text-xs text-slate-200">Unlimited devices</p>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-between rounded-3xl border border-white/20 bg-gradient-to-br from-slate-950/90 via-blue-950/60 to-slate-900/80 p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-200">
                <span>Fare snapshot</span>
                <span>Updated 5m ago</span>
              </div>
              <div className="mt-6 text-right">
                <div className="text-sm uppercase tracking-[0.3em] text-slate-200">from</div>
                <div className="text-4xl font-semibold text-white">{formatPrice(flight.price)}</div>
                <div className="mt-2 text-xs text-slate-200">per traveller • taxes included</div>
              </div>
              <button className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/20">
                Add to shared plan →
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Key features</h2>
          <p className="mt-2 text-sm text-slate-200">Hover to compare how this suite ranks across our database.</p>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FeatureIndicator feature={flight.features.bedLength} />
            <FeatureIndicator feature={flight.features.aisleAccess} />
            <FeatureIndicator feature={flight.features.wifi} />
            <FeatureIndicator feature={flight.features.screenSize} />
            <FeatureIndicator feature={flight.features.privacy} />
            <FeatureIndicator feature={flight.features.cabinAge} />
          </div>
        </div>

        {/* Detailed Specs */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Detailed specifications</h2>
          <p className="mt-2 text-sm text-slate-200">Dive into the granular data pulled from airline manuals and traveller communities.</p>
          <div className="mt-6">
            <DetailTabs flight={flight} />
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white">Cabin gallery</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {flight.images.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800/60 via-slate-900 to-slate-950"
              >
                <div className="absolute inset-0 flex items-center justify-center text-4xl text-white/70 transition-transform duration-200 group-hover:scale-110">
                  📸
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-slate-300">
            Placeholder images - actual cabin photography will appear here in production.
          </p>
        </div>

        {/* Book Button */}
        <div className="mt-12 rounded-3xl border border-white/15 bg-slate-950/70 p-6 shadow-xl shadow-slate-950/40 backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-200">Total price estimate</div>
              <div className="mt-2 text-3xl font-semibold text-white">{formatPrice(flight.price)}</div>
              <div className="text-xs text-slate-200">Based on current partner rates • taxes and fees included</div>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition-transform duration-200 hover:-translate-y-0.5">
              Hold this fare →
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 text-center text-xs text-slate-300">
          Prototype preview: booking flows are simulated for design exploration only.
        </div>
      </div>
    </main>
  );
}
