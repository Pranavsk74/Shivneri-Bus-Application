import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { CorridorMap } from '../components/tracking/CorridorMap';
import { RouteTimeline } from '../components/routes/RouteTimeline';
import { useApp } from '../context/AppContext';
import { Info, Ticket } from 'lucide-react';

export const LiveTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    buses, 
    selectedBusId, 
    setSelectedBusId 
  } = useApp();

  useEffect(() => {
    if (id && id !== selectedBusId) {
      setSelectedBusId(id);
    }
  }, [id, selectedBusId, setSelectedBusId]);

  const activeBus = buses.find(b => b.id === (id || selectedBusId)) || buses[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-brand-black text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-1.5">
            <span className="text-[11px] uppercase font-bold tracking-widest text-brand-orange block">
              MSRTC Shivneri Fleet
            </span>
            
            <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
              MUMBAI ↔ PUNE BUS TRACKING
            </h1>
            
            <p className="text-xs text-white/70 max-w-lg">
              Simulated positions for active Shivneri intercity services along the expressway corridor.
            </p>
          </div>

          {/* Quick Bus Selector Dropdown */}
          <div className="bg-white/10 border border-white/20 p-3 max-w-xs w-full">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">
              Select Bus to Track:
            </label>
            <select
              value={activeBus.id}
              onChange={(e) => setSelectedBusId(e.target.value)}
              className="w-full bg-[#1C1E22] border border-white/30 text-white font-mono font-bold text-xs p-2 focus:outline-none focus:border-brand-orange"
            >
              {buses.map(b => (
                <option key={b.id} value={b.id}>
                  {b.busNumber} ({b.direction === 'mumbai-to-pune' ? 'MUM➔PUN' : 'PUN➔MUM'}) - {b.speedKmH} km/h
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Prominent Demo Notice Bar */}
      <div className="bg-brand-warm border-b border-brand-border px-4 py-2.5 text-center text-xs text-brand-muted flex items-center justify-center gap-2">
        <Info className="w-4 h-4 text-brand-orange shrink-0" />
        <span>
          <strong className="text-brand-black">Simulated locations — not live GPS.</strong> Vehicle positions and arrival estimates are generated for demonstration purposes.
        </span>
      </div>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 flex-1">
        
        {/* Vector Map */}
        <div className="border border-brand-border">
          <CorridorMap 
            activeBusId={activeBus.id}
            onSelectBus={(busId) => setSelectedBusId(busId)}
            heightClass="h-[540px]"
          />
        </div>

        {/* Selected Bus Telemetry Card */}
        <div className="bg-white border border-brand-border p-6 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Bus Info */}
            <div className="md:col-span-5 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-brand-orange text-white text-xs font-mono font-bold uppercase">
                  {activeBus.busNumber}
                </span>
                <span className="text-xs uppercase font-bold text-brand-black">
                  {activeBus.serviceName}
                </span>
              </div>

              <div className="text-xs text-brand-muted space-y-1">
                <div>Route: <strong className="text-brand-black">{activeBus.origin} ➔ {activeBus.destination}</strong></div>
                <div>Driver: <strong className="text-brand-black">{activeBus.driverName}</strong></div>
                <div>Road condition: <strong className="text-brand-black">{activeBus.ghatCondition}</strong></div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  to={`/booking/${activeBus.id}`}
                  className="px-5 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Book This Bus</span>
                </Link>
                <Link
                  to={`/bus/${activeBus.id}`}
                  className="px-4 py-2 border border-brand-border text-brand-black hover:border-brand-black text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Full Details
                </Link>
              </div>
            </div>

            {/* Metrics */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 border-l-0 md:border-l border-brand-border md:pl-6">
              
              <div className="p-3 bg-brand-warm border border-brand-border">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                  Speed
                </span>
                <div className="font-bold text-2xl font-bold text-brand-black mt-0.5 flex items-baseline gap-1">
                  <span>{activeBus.speedKmH}</span>
                  <span className="text-xs font-mono text-brand-muted">km/h</span>
                </div>
                <span className="text-[10px] text-brand-muted block mt-0.5">
                  Controlled speed
                </span>
              </div>

              <div className="p-3 bg-brand-warm border border-brand-border">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                  Next Stop
                </span>
                <div className="font-bold text-lg font-bold text-brand-orange mt-0.5 truncate" title={activeBus.nextStopName}>
                  {activeBus.nextStopName.split(' (')[0]}
                </div>
                <span className="text-[10px] text-brand-muted block mt-0.5">
                  Upcoming stoppage
                </span>
              </div>

              <div className="p-3 bg-brand-warm border border-brand-border col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                  Predicted Arrival
                </span>
                <div className="font-bold text-lg font-bold text-brand-black mt-0.5">
                  {activeBus.aiPredictedArrival.split(' (')[0]}
                </div>
                <span className={`text-[10px] font-medium block mt-0.5 ${activeBus.delayMinutes > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
                  {activeBus.delayMinutes > 0 ? `+${activeBus.delayMinutes}m delay` : 'On time'}
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Timeline Breakdown */}
        <RouteTimeline bus={activeBus} />

      </main>

      <Footer />
    </div>
  );
};
