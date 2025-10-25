'use client';

import { useState } from 'react';
import { FlightData } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface DetailTabsProps {
  flight: FlightData;
}

type TabKey = 'seat' | 'entertainment' | 'connectivity' | 'dining' | 'privacy' | 'environment';

interface Tab {
  key: TabKey;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { key: 'seat', label: 'Seat & Sleep', icon: '🛏️' },
  { key: 'entertainment', label: 'Entertainment', icon: '📺' },
  { key: 'connectivity', label: 'Connectivity', icon: '📡' },
  { key: 'dining', label: 'Dining', icon: '🍽️' },
  { key: 'privacy', label: 'Privacy & Layout', icon: '🚪' },
  { key: 'environment', label: 'Environment', icon: '🌡️' },
];

export default function DetailTabs({ flight }: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('seat');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'seat':
        return (
          <div className="space-y-4">
            <DetailRow label="Seat Width" value={flight.details.seatAndSleep.seatWidth} />
            <DetailRow label="Seat Pitch" value={flight.details.seatAndSleep.seatPitch} />
            <DetailRow label="Recline" value={flight.details.seatAndSleep.recline} />
            <DetailRow label="Bed Length" value={flight.details.seatAndSleep.bedLength} />
            <DetailRow label="Bed Width" value={flight.details.seatAndSleep.bedWidth} />
            <DetailRow label="Bed Type" value={flight.details.seatAndSleep.bedType} />
            <DetailList
              label="Comfort Features"
              items={flight.details.seatAndSleep.comfortFeatures}
            />
            <DetailList label="Bedding" items={flight.details.seatAndSleep.bedding} />
          </div>
        );

      case 'entertainment':
        return (
          <div className="space-y-4">
            <DetailRow label="Screen Size" value={flight.details.entertainment.screenSize} />
            <DetailRow label="Resolution" value={flight.details.entertainment.resolution} />
            <DetailRow label="System Name" value={flight.details.entertainment.systemName} />
            <DetailRow
              label="Content Library"
              value={flight.details.entertainment.contentLibrary}
            />
            <DetailList label="Audio" items={flight.details.entertainment.audio} />
            <DetailRow label="Gaming" value={flight.details.entertainment.gaming} />
          </div>
        );

      case 'connectivity':
        return (
          <div className="space-y-4">
            <DetailRow
              label="WiFi Availability"
              value={flight.details.connectivity.wifiAvailability}
            />
            <DetailRow label="WiFi Speed" value={flight.details.connectivity.wifiSpeed} />
            <DetailRow label="WiFi Pricing" value={flight.details.connectivity.wifiPricing} />
            <DetailList label="Power Outlets" items={flight.details.connectivity.powerOutlets} />
            <DetailRow
              label="Device Storage"
              value={flight.details.connectivity.deviceStorage}
            />
            <DetailRow label="Holders" value={flight.details.connectivity.holders} />
          </div>
        );

      case 'dining':
        return (
          <div className="space-y-4">
            <DetailRow label="Service Style" value={flight.details.dining.serviceStyle} />
            <DetailRow label="Menu Quality" value={flight.details.dining.menuQuality} />
            <DetailList label="Beverages" items={flight.details.dining.beverages} />
            <DetailRow label="Timing Options" value={flight.details.dining.timingOptions} />
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4">
            <DetailRow
              label="Configuration"
              value={flight.details.privacyAndLayout.configuration}
            />
            <DetailRow
              label="Direct Aisle Access"
              value={flight.details.privacyAndLayout.directAisleAccess}
            />
            <DetailList
              label="Privacy Features"
              items={flight.details.privacyAndLayout.privacyFeatures}
            />
            <DetailRow
              label="Window vs Aisle"
              value={flight.details.privacyAndLayout.windowVsAisle}
            />
            <DetailRow label="Total Seats" value={flight.details.privacyAndLayout.totalSeats} />
          </div>
        );

      case 'environment':
        return (
          <div className="space-y-4">
            <DetailRow
              label="Cabin Altitude"
              value={flight.details.environment.cabinAltitude}
            />
            <DetailRow label="Noise Level" value={flight.details.environment.noiseLevel} />
            <DetailRow label="Air Quality" value={flight.details.environment.airQuality} />
            <DetailRow
              label="Lighting Control"
              value={flight.details.environment.lightingControl}
            />
            <DetailRow
              label="Temperature Control"
              value={flight.details.environment.temperatureControl}
            />
            <DetailRow label="Cabin Age" value={flight.details.environment.cabinAge} />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Tab Headers */}
      <div className="flex overflow-x-auto border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-1 min-w-[150px] px-6 py-4 text-sm font-semibold transition-colors duration-200 whitespace-nowrap',
              activeTab === tab.key
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">{renderTabContent()}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 border-b border-gray-100 last:border-0">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold text-right max-w-md">{value}</span>
    </div>
  );
}

function DetailList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="text-gray-600 font-medium mb-2">{label}</div>
      <ul className="list-disc list-inside text-gray-900 space-y-1">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
