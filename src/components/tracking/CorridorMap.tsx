import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CORRIDOR_STOPS } from '../../data/corridor';
import { BusService } from '../../types';
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';

interface CorridorMapProps {
  interactive?: boolean;
  activeBusId?: string | null;
  onSelectBus?: (busId: string) => void;
  heightClass?: string;
}

export const CorridorMap: React.FC<CorridorMapProps> = ({
  interactive = true,
  activeBusId: controlledBusId,
  onSelectBus,
  heightClass = 'h-[520px]'
}) => {
  const navigate = useNavigate();
  const { buses, selectedBusId, setSelectedBusId, isSimulating, toggleSimulation, resetSimulation } = useApp();
  
  const currentBusId = controlledBusId !== undefined ? controlledBusId : selectedBusId;
  const [filterDirection, setFilterDirection] = useState<'all' | 'mumbai-to-pune' | 'pune-to-mumbai'>('all');
  const [hoveredBus, setHoveredBus] = useState<BusService | null>(null);

  // Filter visible buses
  const visibleBuses = buses.filter(b => {
    if (filterDirection === 'all') return true;
    return b.direction === filterDirection;
  });

  const activeBus = buses.find(b => b.id === currentBusId) || buses[0];

  const handleBusClick = (busId: string) => {
    if (onSelectBus) {
      onSelectBus(busId);
    } else {
      setSelectedBusId(busId);
      navigate(`/track/${busId}`);
    }
  };

  // Helper to map 0-100 progress percent to (x, y) along the curved highway corridor
  const getBusCoordinates = (bus: BusService) => {
    const normalizedProgress = bus.direction === 'mumbai-to-pune' 
      ? bus.progressPercent 
      : (100 - bus.progressPercent);

    const totalKm = 168;
    const currentKm = (normalizedProgress / 100) * totalKm;

    let p1 = CORRIDOR_STOPS[0];
    let p2 = CORRIDOR_STOPS[CORRIDOR_STOPS.length - 1];

    for (let i = 0; i < CORRIDOR_STOPS.length - 1; i++) {
      if (currentKm >= CORRIDOR_STOPS[i].distanceFromMumbaiKm && currentKm <= CORRIDOR_STOPS[i + 1].distanceFromMumbaiKm) {
        p1 = CORRIDOR_STOPS[i];
        p2 = CORRIDOR_STOPS[i + 1];
        break;
      }
    }

    const segmentSpan = (p2.distanceFromMumbaiKm - p1.distanceFromMumbaiKm) || 1;
    const t = Math.max(0, Math.min(1, (currentKm - p1.distanceFromMumbaiKm) / segmentSpan));

    const laneOffset = bus.direction === 'mumbai-to-pune' ? -1.2 : 1.2;
    const x = p1.mapCoord.x + (p2.mapCoord.x - p1.mapCoord.x) * t;
    const y = p1.mapCoord.y + (p2.mapCoord.y - p1.mapCoord.y) * t + laneOffset;

    return { x, y };
  };

  const highwayPathString = CORRIDOR_STOPS.reduce((acc, stop, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${stop.mapCoord.x} ${stop.mapCoord.y}`;
  }, '');

  return (
    <div className="w-full bg-[#18191B] text-white border border-brand-border relative overflow-hidden flex flex-col">
      
      {/* Top Map Toolbar */}
      <div className="bg-[#202226] border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3 z-20">
        
        {/* Direction Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-white/50 mr-1">
            Corridor:
          </span>
          <button
            onClick={() => setFilterDirection('all')}
            className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors ${
              filterDirection === 'all'
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'bg-white/5 text-white/70 border-white/15 hover:border-white/30'
            }`}
          >
            All Services ({buses.length})
          </button>
          <button
            onClick={() => setFilterDirection('mumbai-to-pune')}
            className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors ${
              filterDirection === 'mumbai-to-pune'
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'bg-white/5 text-white/70 border-white/15 hover:border-white/30'
            }`}
          >
            Mumbai ➔ Pune
          </button>
          <button
            onClick={() => setFilterDirection('pune-to-mumbai')}
            className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider border transition-colors ${
              filterDirection === 'pune-to-mumbai'
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'bg-white/5 text-white/70 border-white/15 hover:border-white/30'
            }`}
          >
            Pune ➔ Mumbai
          </button>
        </div>

        {/* Controls and Simulated Notice */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 text-xs">
            <button
              onClick={toggleSimulation}
              className="flex items-center gap-1 text-white/80 hover:text-white uppercase tracking-wider font-semibold"
              title={isSimulating ? 'Pause movement' : 'Resume movement'}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isSimulating ? 'Pause' : 'Play'}</span>
            </button>
            <span className="text-white/20 mx-1">|</span>
            <button
              onClick={resetSimulation}
              title="Reset locations"
              className="text-white/50 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="text-[11px] text-white/50 uppercase tracking-wider">
            Simulated locations
          </span>
        </div>

      </div>

      {/* Main Map Canvas Area */}
      <div className={`relative w-full ${heightClass} bg-[#161719] select-none overflow-hidden`}>
        
        {/* Subtle Map Grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />

        {/* Area Names */}
        <div className="absolute top-5 left-6 pointer-events-none z-10">
          <span className="font-bold text-xl font-bold uppercase tracking-tight text-white/25 block">
            MUMBAI TERMINALS
          </span>
          <span className="text-[10px] tracking-wider uppercase text-white/40">
            Dadar • Sion • Vashi
          </span>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 text-center">
          <span className="font-bold text-base font-bold uppercase tracking-tight text-white/20 block">
            BHOR GHAT / KHANDALA
          </span>
          <span className="text-[10px] tracking-wider uppercase text-white/35">
            Expressway Elevation 600m
          </span>
        </div>

        <div className="absolute bottom-5 right-6 pointer-events-none z-10 text-right">
          <span className="font-bold text-xl font-bold uppercase tracking-tight text-white/25 block">
            PUNE TERMINALS
          </span>
          <span className="text-[10px] tracking-wider uppercase text-white/40">
            Wakad • Swargate
          </span>
        </div>

        {/* SVG Route Rendering */}
        <svg 
          viewBox="0 0 104 100" 
          className="w-full h-full absolute inset-0 z-10"
          preserveAspectRatio="none"
        >
          {/* Background Highway Bed */}
          <path
            d={highwayPathString}
            fill="none"
            stroke="#26292E"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Expressway Route Line */}
          <path
            d={highwayPathString}
            fill="none"
            stroke="#F15B2A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Center Road Markings */}
          <path
            d={highwayPathString}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.5"
            strokeDasharray="1.2, 1.8"
            opacity="0.6"
          />

          {/* Stop Points */}
          {CORRIDOR_STOPS.map((stop) => {
            const isHub = stop.isKeyHub;
            return (
              <g key={stop.id} className="cursor-pointer">
                <circle
                  cx={stop.mapCoord.x}
                  cy={stop.mapCoord.y}
                  r={isHub ? 1.6 : 1.0}
                  fill={isHub ? '#18191B' : '#2A2D35'}
                  stroke={isHub ? '#F15B2A' : '#737373'}
                  strokeWidth={isHub ? '0.7' : '0.4'}
                />
                <circle
                  cx={stop.mapCoord.x}
                  cy={stop.mapCoord.y}
                  r={isHub ? 0.7 : 0.4}
                  fill="#FFFFFF"
                />
              </g>
            );
          })}

          {/* Bus Markers */}
          {visibleBuses.map((bus) => {
            const coords = getBusCoordinates(bus);
            const isSelected = bus.id === activeBus?.id;
            const isMumbaiToPune = bus.direction === 'mumbai-to-pune';

            return (
              <g
                key={bus.id}
                transform={`translate(${coords.x}, ${coords.y})`}
                className="cursor-pointer transition-transform duration-700 ease-out"
                onClick={() => handleBusClick(bus.id)}
                onMouseEnter={() => setHoveredBus(bus)}
                onMouseLeave={() => setHoveredBus(null)}
              >
                {/* Clean rectangular bus marker */}
                <rect
                  x="-2.2"
                  y="-1.7"
                  width="4.4"
                  height="3.4"
                  fill={isSelected ? '#F15B2A' : '#FFFFFF'}
                  stroke="#111111"
                  strokeWidth="0.5"
                />
                {/* Direction pointer */}
                <path
                  d={isMumbaiToPune ? 'M -0.7 -0.5 L 0.7 0 L -0.7 0.5 Z' : 'M 0.7 -0.5 L -0.7 0 L 0.7 0.5 Z'}
                  fill={isSelected ? '#FFFFFF' : '#111111'}
                />
              </g>
            );
          })}
        </svg>

        {/* Major Stop Labels */}
        <div className="absolute inset-0 pointer-events-none">
          {CORRIDOR_STOPS.filter(s => s.isKeyHub).map((stop) => (
            <div
              key={stop.id}
              className="absolute transform -translate-x-1/2 -translate-y-6 pointer-events-auto"
              style={{ left: `${stop.mapCoord.x}%`, top: `${stop.mapCoord.y}%` }}
            >
              <span className="bg-[#202226] border border-white/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {stop.name.split(' (')[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Selected / Hovered Bus Information Box */}
        {(hoveredBus || activeBus) && (
          <div className="absolute bottom-4 left-4 z-30 max-w-sm w-full bg-[#1C1E22] border border-white/20 p-4 shadow-xl">
            {(() => {
              const bus = hoveredBus || activeBus;
              const isDelayed = bus.delayMinutes > 0;
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <h4 className="font-bold text-base font-bold uppercase text-white leading-none">
                        {bus.busNumber}
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider text-white/60">
                        {bus.serviceName}
                      </span>
                    </div>

                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 border ${
                      isDelayed 
                        ? 'border-amber-400/40 text-amber-300 bg-amber-500/10'
                        : 'border-emerald-400/40 text-emerald-300 bg-emerald-500/10'
                    }`}>
                      {isDelayed ? `+${bus.delayMinutes}m Delay` : 'On Time'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-white/50 block uppercase">Current Stop / Area</span>
                      <span className="font-medium text-white truncate block">
                        {bus.currentLocationName.split(' • ')[1] || bus.currentLocationName}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block uppercase">Next Stop</span>
                      <span className="font-medium text-brand-orange truncate block">
                        {bus.nextStopName.split(' (')[0]}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block uppercase">Speed</span>
                      <span className="font-mono text-white font-semibold">
                        {bus.speedKmH} km/h
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block uppercase">Predicted Arrival</span>
                      <span className="font-medium text-white">
                        {bus.aiPredictedArrival.split(' (')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => handleBusClick(bus.id)}
                      className="px-3 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <span>View Bus Tracking</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>

      {/* Bottom Horizontal Quick-Select Strip */}
      {interactive && (
        <div className="bg-[#1F2125] border-t border-white/10 p-3 overflow-x-auto no-scrollbar z-20">
          <div className="flex items-center gap-3 min-w-max">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 pl-2">
              Select Bus:
            </span>
            {visibleBuses.map((bus) => {
              const isSelected = bus.id === activeBus?.id;
              return (
                <button
                  key={bus.id}
                  onClick={() => handleBusClick(bus.id)}
                  className={`px-3 py-1.5 border text-left transition-colors flex items-center gap-2.5 ${
                    isSelected
                      ? 'border-brand-orange bg-brand-orange/20 text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-2 h-2 ${isSelected ? 'bg-brand-orange' : 'bg-white/40'}`} />
                  <div>
                    <div className="font-bold font-bold text-xs uppercase">{bus.busNumber}</div>
                    <div className="text-[10px] text-white/50">
                      {bus.direction === 'mumbai-to-pune' ? 'MUM ➔ PUN' : 'PUN ➔ MUM'} • {bus.speedKmH} km/h
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
