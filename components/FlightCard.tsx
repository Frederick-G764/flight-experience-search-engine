import Link from 'next/link';
import { FlightData } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import FeatureIndicator from './FeatureIndicator';

interface FlightCardProps {
  flight: FlightData;
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {flight.airline} {flight.aircraft}
            </h3>
            <div className="text-sm text-gray-500 mt-1">Flight {flight.flightNumber}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{formatPrice(flight.price)}</div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>

        {/* Route Info */}
        <div className="flex items-center gap-2 text-sm text-gray-700 mt-3">
          <span className="font-semibold">{flight.route.from}</span>
          <span>→</span>
          <span className="font-semibold">{flight.route.to}</span>
          <span className="text-gray-400">•</span>
          <span>{flight.route.departTime} - {flight.route.arriveTime}</span>
          <span className="text-gray-400">•</span>
          <span>{flight.route.duration}</span>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-1 mb-6">
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
        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        View Details
      </Link>
    </div>
  );
}
