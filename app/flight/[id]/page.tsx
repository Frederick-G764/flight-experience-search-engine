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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Button */}
        <Link
          href="/results"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Back to Results
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Placeholder Image */}
          <div className="h-64 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">✈️</div>
              <div className="text-2xl font-bold">{flight.airline}</div>
              <div className="text-lg opacity-90">{flight.aircraft}</div>
            </div>
          </div>

          {/* Flight Header */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {flight.airline} {flight.aircraft}
                </h1>
                <div className="flex items-center gap-3 text-gray-600">
                  <span className="font-semibold text-lg">
                    {flight.route.from} → {flight.route.to}
                  </span>
                  <span>•</span>
                  <span>
                    {flight.route.departTime} - {flight.route.arriveTime}
                  </span>
                  <span>•</span>
                  <span>{flight.route.duration}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Flight {flight.flightNumber}
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600">{formatPrice(flight.price)}</div>
                <div className="text-sm text-gray-500">per person</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureIndicator feature={flight.features.bedLength} />
            <FeatureIndicator feature={flight.features.aisleAccess} />
            <FeatureIndicator feature={flight.features.wifi} />
            <FeatureIndicator feature={flight.features.screenSize} />
            <FeatureIndicator feature={flight.features.privacy} />
            <FeatureIndicator feature={flight.features.cabinAge} />
          </div>
        </div>

        {/* Detailed Specs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Specifications</h2>
          <DetailTabs flight={flight} />
        </div>

        {/* Photo Gallery */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cabin Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flight.images.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center"
              >
                <span className="text-4xl">📸</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Placeholder images - actual cabin photos would be displayed in production
          </p>
        </div>

        {/* Book Button */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Price</div>
              <div className="text-3xl font-bold text-gray-900">{formatPrice(flight.price)}</div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 text-lg">
              Book Now
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          This is a prototype. Booking functionality is not implemented.
        </div>
      </div>
    </div>
  );
}
