import Link from 'next/link';
import { mockFlights } from '@/lib/mockData';
import FlightCard from '@/components/FlightCard';

export default function ResultsPage({
  searchParams,
}: {
  searchParams: { from?: string; to?: string; date?: string; class?: string };
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Search
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Available Flights</h1>
          <p className="text-gray-600">
            {searchParams.from && searchParams.to && (
              <>
                {searchParams.from} → {searchParams.to}
                {searchParams.date && ` • ${searchParams.date}`}
                {searchParams.class && ` • ${searchParams.class}`}
              </>
            )}
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-blue-900">
            <strong>How to read the indicators:</strong> ✓ = Excellent • ⚠️ = Fair • ✕ = Poor.
            Hover over any feature to see how it compares to other available flights.
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockFlights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>

        {/* Results Summary */}
        <div className="mt-8 text-center text-gray-600">
          Showing {mockFlights.length} flights
        </div>
      </div>
    </div>
  );
}
