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
        <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-slate-950/70 px-3 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xl text-white/90">{feature.icon}</span>
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-200">
                {feature.name}
              </div>
              <div className="text-sm font-semibold text-slate-100">{feature.value}</div>
            </div>
          </div>
          <div
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full border-2 text-base font-bold shadow-lg shadow-slate-950/40',
              styles.bg,
              styles.border,
              styles.text
            )}
          >
            <span>{styles.symbol}</span>
          </div>
        </div>

        {/* Tooltip */}
        {showTooltip && feature.tooltip && (
          <div className="absolute left-0 right-0 top-full z-50 mt-3 rounded-2xl border border-white/15 bg-slate-950/95 p-4 text-xs text-slate-100 shadow-2xl shadow-slate-950/60 backdrop-blur">
            <div className="text-sm font-semibold text-white">
              {feature.tooltip.description}
            </div>

            {/* Visual bar */}
            <div className="my-3">
              <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={cn(
                    'absolute left-0 top-0 h-full rounded-full',
                    feature.status === 'excellent'
                      ? 'bg-emerald-400'
                      : feature.status === 'fair'
                        ? 'bg-amber-400'
                        : 'bg-rose-400'
                  )}
                  style={{
                    width:
                      feature.status === 'excellent'
                        ? '90%'
                        : feature.status === 'fair'
                          ? '50%'
                          : '20%'
                  }}
                />
              </div>
              <div className="mt-1 text-xs text-slate-200">
                {feature.tooltip.rank}
              </div>
            </div>

            <div className="space-y-1 text-slate-200">
              <div>Average: {feature.tooltip.average}</div>
              <div>Best: {feature.tooltip.best}</div>
            </div>

            {/* Arrow */}
            <div className="absolute -top-2 left-8 h-4 w-4 rotate-45 border-l border-t border-white/10 bg-slate-950" />
          </div>
        )}
      </div>
    );
  }

  // Full version for detail pages
  return (
    <div
      className={cn(
        'rounded-3xl border-2 p-6 transition-all duration-200',
        styles.bg,
        styles.border
      )}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl text-white/90">{feature.icon}</span>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-slate-200">
              {feature.name}
            </div>
            <div className={cn('mt-2 text-xl font-semibold', styles.text)}>{feature.value}</div>
          </div>
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-full border-2 text-2xl font-bold', styles.border, styles.text)}>
          {styles.symbol}
        </div>
      </div>

      {/* Tooltip for full version */}
      {showTooltip && feature.tooltip && (
        <div className="mt-6 rounded-2xl border border-white/15 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/40 backdrop-blur">
          <div className="text-sm font-semibold text-white">
            {feature.tooltip.description}
          </div>
          <div className="mt-3 space-y-1 text-sm text-slate-200">
            <div>{feature.tooltip.rank}</div>
            <div>Average: {feature.tooltip.average}</div>
            <div>Best: {feature.tooltip.best}</div>
          </div>
        </div>
      )}
    </div>
  );
}
