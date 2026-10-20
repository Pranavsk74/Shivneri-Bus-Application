import React from 'react';
import { Link } from 'react-router-dom';
import { BusService } from '../../types';
import { ArrowRight, Clock, MapPin } from 'lucide-react';

interface BusServiceCardProps {
  bus: BusService;
}

export const BusServiceCard: React.FC<BusServiceCardProps> = ({ bus }) => {
  const isDelayed = bus.delayMinutes > 0;

  return (
    <div className="w-full bg-white border border-brand-border hover:border-brand-black transition-colors p-5 lg:p-6 shadow-xs">
      
      {/* Top Meta Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-brand-border text-xs">
        
        <div className="flex items-center gap-3">
          <span className="font-mono font-bold text-brand-black uppercase text-sm">
            {bus.busNumber}
          </span>
          <span className="text-brand-border">|</span>
          <span className="font-medium text-brand-muted uppercase text-[11px]">
            {bus.busType}
          </span>
        </div>

        {/* Arrival Status */}
        <div className="flex items-center gap-2">
          {isDelayed ? (
            <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-semibold uppercase tracking-wider">
              +{bus.delayMinutes}m Traffic Delay
            </span>
          ) : (
            <span className="px-2.5 py-0.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] font-semibold uppercase tracking-wider">
              On Schedule
            </span>
          )}
          
          <span className="text-xs text-brand-muted">
            Speed: <strong className="text-brand-black font-mono">{bus.speedKmH} km/h</strong>
          </span>
        </div>

      </div>

      {/* Main Schedule & Timing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-5 items-center">
        
        {/* Departure & Arrival Column */}
        <div className="md:col-span-6 flex items-center justify-between">
          
          {/* Departure */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block">
              Departure
            </span>
            <div className="font-bold text-2xl lg:text-3xl font-bold tracking-tight text-brand-black mt-0.5">
              {bus.departureTime}
            </div>
            <div className="text-xs text-brand-muted flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-brand-orange" />
              <span>{bus.origin.split(' (')[0]}</span>
            </div>
          </div>

          {/* Journey Duration Line */}
          <div className="flex flex-col items-center px-4">
            <span className="text-xs font-mono font-medium text-brand-muted mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-brand-muted" />
              <span>{bus.duration}</span>
            </span>
            <div className="w-24 lg:w-32 h-[1px] bg-brand-border relative flex items-center justify-center">
              <div className="w-2 h-2 bg-brand-orange" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-brand-muted mt-1">
              Expressway
            </span>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block">
              Predicted Arrival
            </span>
            <div className="font-bold text-2xl lg:text-3xl font-bold tracking-tight text-brand-black mt-0.5">
              {bus.aiPredictedArrival.split(' (')[0]}
            </div>
            <div className="text-xs text-brand-muted flex items-center justify-end gap-1 mt-1">
              <MapPin className="w-3 h-3 text-brand-orange" />
              <span>{bus.destination.split(' (')[0]}</span>
            </div>
          </div>

        </div>

        {/* Current Location & Next Stop */}
        <div className="md:col-span-3 border-l-0 md:border-l border-brand-border md:pl-6 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block">
            Current Position
          </span>
          <p className="text-xs font-medium text-brand-black truncate" title={bus.currentLocationName}>
            {bus.currentLocationName}
          </p>
          <div className="text-xs text-brand-muted pt-1">
            Next stop: <strong className="text-brand-black">{bus.nextStopName.split(' (')[0]}</strong>
          </div>
        </div>

        {/* Pricing Column */}
        <div className="md:col-span-3 border-l-0 md:border-l border-brand-border md:pl-6 flex flex-col items-start md:items-end justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
              Indicative Fare
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-brand-muted font-medium">₹</span>
              <span className="font-bold text-3xl font-bold text-brand-black">
                {bus.baseFare}
              </span>
              <span className="text-xs text-brand-muted"> / seat</span>
            </div>
            <div className="text-[11px] text-brand-muted mt-0.5">
              {bus.availableSeats} seats available
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-brand-border">
        
        {/* Subtle note */}
        <div className="text-xs text-brand-muted">
          Sample schedule • 2x2 luxury air-conditioned coach
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to={`/bus/${bus.id}`}
            className="px-3.5 py-1.5 border border-brand-border hover:border-brand-black text-brand-black text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Route Details
          </Link>
          <Link
            to={`/track/${bus.id}`}
            className="px-3.5 py-1.5 border border-brand-border hover:border-brand-black text-brand-black text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Track on Map
          </Link>
          <Link
            to={`/booking/${bus.id}`}
            className="px-5 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <span>Book Seat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};
