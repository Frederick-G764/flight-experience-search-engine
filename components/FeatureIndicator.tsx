'use client';

import { useState } from 'react';
import { Feature } from '@/lib/mockData';
import { getIndicatorStyles, cn } from '@/lib/utils';

interface FeatureIndicatorProps {
  feature: Feature;
  compact?: boolean;
}

export default function FeatureIndicator({ feature, compact = false }: FeatureIndicatorProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const styles = getIndicatorStyles(feature.status);

  if (compact) {
    // Compact version for flight cards
    return (
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{feature.icon}</span>
            <div>
              <div className="text-xs text-gray-500">{feature.name}</div>
              <div className="text-sm font-semibold text-gray-900">{feature.value}</div>
            </div>
          </div>
          <div
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full border-2',
              styles.bg,
              styles.border,
              styles.text
            )}
          >
            <span className="text-sm font-bold">{styles.symbol}</span>
          </div>
        </div>

        {/* Tooltip */}
        {showTooltip && feature.tooltip && (
          <div className="absolute z-50 left-0 right-0 top-full mt-2 bg-gray-900 text-white text-xs rounded-lg p-4 shadow-xl min-w-[300px]">
            <div className="font-semibold mb-2">{feature.tooltip.description}</div>

            {/* Visual bar */}
            <div className="my-3">
              <div className="h-2 bg-gray-700 rounded-full relative overflow-hidden">
                <div
                  className={cn(
                    'absolute left-0 top-0 h-full rounded-full',
                    feature.status === 'excellent' ? 'bg-emerald-500' :
                    feature.status === 'fair' ? 'bg-amber-500' :
                    'bg-red-500'
                  )}
                  style={{
                    width: feature.status === 'excellent' ? '90%' :
                           feature.status === 'fair' ? '50%' :
                           '20%'
                  }}
                />
              </div>
              <div className="text-xs text-gray-300 mt-1">
                {feature.tooltip.rank}
              </div>
            </div>

            <div className="space-y-1 text-gray-300">
              <div>Average: {feature.tooltip.average}</div>
              <div>Best: {feature.tooltip.best}</div>
            </div>

            {/* Arrow */}
            <div className="absolute -top-2 left-8 w-4 h-4 bg-gray-900 transform rotate-45" />
          </div>
        )}
      </div>
    );
  }

  // Full version for detail pages
  return (
    <div
      className={cn(
        'p-6 rounded-xl border-2 transition-all duration-200',
        styles.bg,
        styles.border
      )}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{feature.icon}</span>
          <div>
            <div className="text-sm text-gray-600 mb-1">{feature.name}</div>
            <div className={cn('text-xl font-bold', styles.text)}>{feature.value}</div>
          </div>
        </div>
        <div className={cn('text-3xl font-bold', styles.text)}>
          {styles.symbol}
        </div>
      </div>

      {/* Tooltip for full version */}
      {showTooltip && feature.tooltip && (
        <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
          <div className="font-semibold text-gray-900 mb-2">
            {feature.tooltip.description}
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>{feature.tooltip.rank}</div>
            <div>Average: {feature.tooltip.average}</div>
            <div>Best: {feature.tooltip.best}</div>
          </div>
        </div>
      )}
    </div>
  );
}
