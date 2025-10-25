import Link from 'next/link';
import { FlightData } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import FeatureIndicator from './FeatureIndicator';

interface FlightCardProps {
  flight: FlightData;
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/30 transition-all duration-200 hover:-translate-y-1 hover:border-white/25">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 translate-x-1/4 bg-gradient-to-br from-sky-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative border-b border-white/10 pb-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-200">
              Suite verified
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              {flight.airline} {flight.aircraft}
            </h3>
            <div className="mt-1 text-xs uppercase tracking-widest text-slate-200">
              Flight {flight.flightNumber}
            </div>
          </div>
          <div className="flex items-end gap-3 text-right">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-200">from</div>
              <div className="text-3xl font-semibold text-white">{formatPrice(flight.price)}</div>
            </div>
            <div className="text-[11px] text-slate-200">per traveller</div>
          </div>
        </div>

        {/* Route Info */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200">
          <span className="font-semibold text-slate-50">{flight.route.from}</span>
          <span>→</span>
          <span className="font-semibold text-slate-50">{flight.route.to}</span>
          <span className="text-white/30">•</span>
          <span>
            {flight.route.departTime} - {flight.route.arriveTime}
          </span>
          <span className="text-white/30">•</span>
          <span>{flight.route.duration}</span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative mt-6 grid gap-3">
        <FeatureIndicator feature={flight.features.bedLength} compact />
        <FeatureIndicator feature={flight.features.aisleAccess} compact />
        <FeatureIndicator feature={flight.features.wifi} compact />
        <FeatureIndicator feature={flight.features.screenSize} compact />
        <FeatureIndicator feature={flight.features.privacy} compact />
        <FeatureIndicator feature={flight.features.cabinAge} compact />
      </div>

      {/* View Details Button */}
      <Link
        href={`/flight/${flight.id}`}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition-all duration-200 hover:-translate-y-0.5"
      >
        View full cabin story →
      </Link>
    </div>
  );
}
