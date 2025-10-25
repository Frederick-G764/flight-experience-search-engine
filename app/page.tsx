import SearchForm from '@/components/SearchForm';

const highlightBadges = [
  'Live cabin specs from trusted sources',
  'Signals inspired by premium travel forums',
  'Personal collections ready to share',
];

const trendingCollections = [
  {
    title: 'Private Suites Spotlight',
    description: 'Iconic first class suites curated by travel creators.',
    metrics: '18 flights • 6 airlines',
  },
  {
    title: 'Red-Eye Recovery Picks',
    description: 'Beds with real mattress toppers and full privacy doors.',
    metrics: '24 flights • 9 airlines',
  },
  {
    title: 'Team Trip Favorites',
    description: 'Pods with collaborative seating and fast onboard Wi-Fi.',
    metrics: '12 flights • 4 airlines',
  },
];

const communitySignals = [
  {
    name: 'AviatorJane',
    route: 'LAX → SIN',
    note: 'Flagged Singapore A350 as the smoothest redeye this month.',
  },
  {
    name: 'NomadMark',
    route: 'DXB → JFK',
    note: 'Shared new photos of the Emirates Game Changer suite refresh.',
  },
  {
    name: 'SkyCollective',
    route: 'HND → CDG',
    note: 'Crowdsourced bedding scores from 200+ flyers last week.',
  },
];

export default function Home() {
  return (
    <main className="relative flex-1 pb-24">
      <div className="absolute inset-0 -z-10 opacity-80">
        <div className="absolute inset-x-0 top-16 mx-auto h-[460px] w-[90%] max-w-6xl rounded-[60px] bg-gradient-to-br from-slate-950/90 via-blue-900/70 to-emerald-900/60 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-12 md:pt-20">
        <header className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
              <span className="text-sm">◎</span>
              Precision Cabin Explorer
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
              Design your next flight like a travel creator.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-200 md:text-xl">
              Discover business and first class experiences curated with real specs, live comfort signals, and shareable collections inspired by AirBnB, GetYourGuide, and the world&apos;s favourite travel feeds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {highlightBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/20 bg-slate-950/70 px-4 py-2 text-sm text-slate-100 backdrop-blur"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-4 md:flex-col md:items-end">
            <div className="rounded-3xl border border-white/15 bg-slate-950/70 p-5 text-right shadow-xl shadow-blue-950/40 backdrop-blur">
              <p className="text-sm uppercase tracking-widest text-slate-200">Community uptime</p>
              <p className="mt-2 text-4xl font-semibold text-white">99.3%</p>
              <p className="mt-2 text-sm text-slate-200">Trusted by 18,400 frequent flyers syncing experiences weekly.</p>
            </div>
            <div className="hidden h-32 w-0.5 bg-gradient-to-b from-transparent via-white/30 to-transparent md:block" />
          </div>
        </header>

        <section className="mt-12">
          <SearchForm />
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-200">
            <span className="font-semibold text-slate-50">Trending searches:</span>
            {['NYC → DXB', 'SIN → CDG', 'LHR → HND'].map((route) => (
              <span
                key={route}
                className="rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-slate-100"
              >
                {route}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-white/15 bg-slate-950/70 p-10 backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white md:text-3xl">Curated collections</h2>
              <span className="text-sm font-medium text-slate-200">Updated hourly</span>
            </div>
            <div className="mt-8 grid gap-6">
              {trendingCollections.map((collection) => (
                <div
                  key={collection.title}
                  className="group rounded-2xl border border-white/20 bg-slate-950/80 p-6 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{collection.title}</h3>
                      <p className="mt-2 text-sm text-slate-200">{collection.description}</p>
                    </div>
                    <span className="rounded-full border border-white/20 bg-slate-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100">
                      Explore
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-slate-200">
                    <span>{collection.metrics}</span>
                    <span className="text-white/40">•</span>
                    <span>saved 220 times today</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-slate-950/90 via-blue-950/60 to-slate-900/80 p-8 backdrop-blur">
              <h2 className="text-xl font-semibold text-white">Live mood tracker</h2>
              <p className="mt-3 text-sm text-slate-200">
                Social sentiment and comfort signals aggregated from elite flyers and premium cabin communities.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
                <div className="rounded-2xl border border-white/15 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-200">Sleep</p>
                  <p className="mt-2 text-2xl font-semibold text-white">9.3</p>
                  <p className="text-xs text-slate-200">last 24h</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-200">Dining</p>
                  <p className="mt-2 text-2xl font-semibold text-white">8.7</p>
                  <p className="text-xs text-slate-200">fresh menus</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-widest text-slate-200">Productivity</p>
                  <p className="mt-2 text-2xl font-semibold text-white">8.1</p>
                  <p className="text-xs text-slate-200">Wi-Fi pace</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-slate-950/70 p-8 backdrop-blur">
              <h2 className="text-xl font-semibold text-white">Community signals</h2>
              <div className="mt-5 space-y-4">
                {communitySignals.map((signal) => (
                  <div key={signal.name} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-sm font-semibold text-white">
                      {signal.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{signal.name}</div>
                      <div className="text-xs uppercase tracking-widest text-slate-200">{signal.route}</div>
                      <p className="mt-1 text-sm text-slate-200">{signal.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-24 flex flex-col items-center gap-4 border-t border-white/15 py-10 text-center text-sm text-slate-200">
          <p>Built for travellers who obsess over every cabin detail before booking.</p>
          <div className="flex gap-6">
            <span>Privacy first</span>
            <span>Data verified weekly</span>
            <span>Shareable collections</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
