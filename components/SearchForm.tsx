'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { airports, cabinClasses } from '@/lib/mockData';

export default function SearchForm() {
  const router = useRouter();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [cabinClass, setCabinClass] = useState('Business Class');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For prototype, all searches go to results page
    if (origin && destination && date && cabinClass) {
      router.push(`/results?from=${origin}&to=${destination}&date=${date}&class=${cabinClass}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto rounded-3xl border border-white/20 bg-slate-950/70 p-8 shadow-xl shadow-blue-950/30 backdrop-blur"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Craft your premium itinerary</h2>
          <p className="text-sm text-slate-200">
            Instantly compare suites, lounges, and onboard comforts before you book.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-200">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          Live data sync enabled
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Origin */}
        <div>
          <label htmlFor="origin" className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span className="text-base">🛫</span>
            Origin
          </label>
          <select
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner focus:border-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          >
            <option value="">Select origin</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code} className="text-slate-900">
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="destination" className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span className="text-base">🛬</span>
            Destination
          </label>
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner focus:border-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          >
            <option value="">Select destination</option>
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code} className="text-slate-900">
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span className="text-base">📅</span>
            Departure Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="mt-2 w-full rounded-2xl border border-white/20 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner focus:border-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
        </div>

        {/* Cabin Class */}
        <div>
          <label htmlFor="cabinClass" className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span className="text-base">💺</span>
            Cabin Class
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {cabinClasses.map((cls) => {
              const active = cabinClass === cls;
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setCabinClass(cls)}
                  className={`rounded-2xl border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    active
                      ? 'border-white bg-white/20 text-white shadow-md shadow-sky-500/30'
                      : 'border-white/20 bg-slate-950/60 text-slate-200 hover:border-white/40 hover:text-white'
                  }`}
                >
                  {cls}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-10 w-full rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-900/50 transition-transform duration-200 hover:-translate-y-0.5"
      >
        Search flights now
      </button>
    </form>
  );
}
