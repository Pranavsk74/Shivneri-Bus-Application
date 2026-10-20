import React from 'react';
import { BusService } from '../../types';
import { generateStopSchedules } from '../../data/corridor';
import { Check, Clock } from 'lucide-react';

interface RouteTimelineProps {
  bus: BusService;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({ bus }) => {
  const stopSchedules = generateStopSchedules(
    bus.direction,
    bus.departureTime,
    bus.progressPercent,
    bus.delayMinutes
  );

  return (
    <div className="w-full bg-white border border-brand-border p-6 lg:p-8">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange block">
            Expressway Stops
          </span>
          <h3 className="font-bold text-2xl font-bold uppercase tracking-tight text-brand-black mt-0.5">
            Stop-by-Stop Route Schedule
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 bg-brand-warm border border-brand-border font-medium text-brand-black">
            Speed: <strong>{bus.speedKmH} km/h</strong>
          </div>
          <div className="px-3 py-1.5 bg-brand-warm border border-brand-border text-brand-muted">
            Distance: 168 km
          </div>
        </div>
      </div>

      {/* Stop Items List */}
      <div className="mt-6 relative">
        
        {/* Continuous background vertical rule */}
        <div className="absolute left-3 top-3 bottom-3 w-[1px] bg-brand-border" />
        
        {/* Active progress vertical bar */}
        <div 
          className="absolute left-3 top-3 w-[1px] bg-brand-orange transition-all duration-500"
          style={{ height: `${Math.min(100, Math.max(0, bus.progressPercent))}%` }}
        />

        <div className="space-y-4 relative">
          {stopSchedules.map((schedule, idx) => {
            const isPassed = schedule.status === 'passed';
            const isCurrent = schedule.status === 'current';

            return (
              <div 
                key={schedule.stopId}
                className={`flex items-start gap-4 p-2.5 transition-colors ${
                  isCurrent 
                    ? 'bg-brand-warm/80 border-l-2 border-brand-orange' 
                    : 'hover:bg-brand-warm/30'
                }`}
              >
                
                {/* Node Indicator */}
                <div className="relative z-10 shrink-0 mt-0.5">
                  {isPassed ? (
                    <div className="w-5 h-5 bg-brand-black text-white flex items-center justify-center font-bold text-[10px]">
                      <Check className="w-3 h-3" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-5 h-5 bg-brand-orange text-white flex items-center justify-center font-bold text-[10px]">
                      ●
                    </div>
                  ) : (
                    <div className="w-5 h-5 bg-white border border-brand-border flex items-center justify-center text-[10px] font-semibold text-brand-muted">
                      {idx + 1}
                    </div>
                  )}
                </div>

                {/* Stop Content */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                  
                  {/* Name */}
                  <div className="sm:col-span-6">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs font-bold uppercase tracking-tight ${
                        isCurrent ? 'text-brand-orange' : isPassed ? 'text-brand-black' : 'text-brand-muted'
                      }`}>
                        {schedule.stopName}
                      </h4>
                      {isCurrent && (
                        <span className="px-1.5 py-0.2 text-[9px] uppercase font-bold tracking-wider bg-brand-orange text-white">
                          Current Location
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-brand-muted">
                      Stop {idx + 1} of {stopSchedules.length}
                    </span>
                  </div>

                  {/* Scheduled Time */}
                  <div className="sm:col-span-3 text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted block">
                      Scheduled
                    </span>
                    <span className="font-mono text-xs font-medium text-brand-black">
                      {schedule.scheduledTime}
                    </span>
                  </div>

                  {/* Predicted Time */}
                  <div className="sm:col-span-3 text-left sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-brand-muted block">
                      Predicted Arrival
                    </span>
                    <div className="flex items-baseline sm:justify-end gap-1.5">
                      <span className="font-mono text-xs font-bold text-brand-black">
                        {schedule.aiPredictedTime}
                      </span>
                      {bus.delayMinutes > 0 && (
                        <span className="text-[10px] text-amber-800 font-semibold">
                          (+{bus.delayMinutes}m)
                        </span>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Corridor Road Condition Box */}
      <div className="mt-6 pt-4 border-t border-brand-border">
        <div className="bg-brand-warm border border-brand-border p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted block">
              Route & Road Status
            </span>
            <p className="font-medium text-brand-black mt-0.5">
              {bus.ghatCondition}
            </p>
          </div>
          <div className="text-[11px] font-mono text-brand-muted shrink-0">
            Updated: {bus.lastUpdated}
          </div>
        </div>
      </div>

    </div>
  );
};
