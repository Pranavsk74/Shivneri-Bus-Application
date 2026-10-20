import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ArrowLeftRight, Search } from 'lucide-react';

interface RouteSearchFormProps {
  compact?: boolean;
}

export const RouteSearchForm: React.FC<RouteSearchFormProps> = ({ compact = false }) => {
  const navigate = useNavigate();
  const { direction, setDirection, swapDirection, searchParams, setSearchParams } = useApp();

  const handleSwap = (e: React.MouseEvent) => {
    e.preventDefault();
    swapDirection();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  const setCorridor = (dir: 'mumbai-to-pune' | 'pune-to-mumbai') => {
    setDirection(dir);
    if (dir === 'mumbai-to-pune') {
      setSearchParams({
        ...searchParams,
        from: 'Dadar (Asiad Terminal)',
        to: 'Swargate (Shivneri Stand)'
      });
    } else {
      setSearchParams({
        ...searchParams,
        from: 'Swargate (Shivneri Stand)',
        to: 'Dadar (Asiad Terminal)'
      });
    }
  };

  return (
    <div className={`w-full bg-white border border-brand-border ${compact ? 'p-5' : 'p-6 sm:p-8'} shadow-xs`}>
      
      {/* Route Selectors Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-border">
        
        {/* Two clear route selectors: Orange for active, neutral bordered for inactive */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setCorridor('mumbai-to-pune')}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border ${
              direction === 'mumbai-to-pune'
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'bg-white text-brand-black border-brand-border hover:border-brand-black'
            }`}
          >
            MUMBAI → PUNE
          </button>
          
          <button
            type="button"
            onClick={() => setCorridor('pune-to-mumbai')}
            className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border ${
              direction === 'pune-to-mumbai'
                ? 'bg-brand-orange text-white border-brand-orange'
                : 'bg-white text-brand-black border-brand-border hover:border-brand-black'
            }`}
          >
            PUNE → MUMBAI
          </button>
        </div>

        {/* Restrained corridor info */}
        <div className="text-xs text-brand-muted">
          Corridor: <span className="font-semibold text-brand-black uppercase">Mumbai–Pune Expressway</span> (168 km direct)
        </div>
      </div>

      {/* Aligned Form Controls */}
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          {/* Origin */}
          <div className="md:col-span-4">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
              Origin (Boarding Point)
            </label>
            <div className="relative">
              <select
                value={searchParams.from}
                onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                className="w-full h-12 px-3.5 py-2.5 bg-brand-warm border border-brand-border font-medium text-brand-black focus:outline-none focus:border-brand-orange focus:bg-white transition-colors appearance-none cursor-pointer text-sm"
              >
                {direction === 'mumbai-to-pune' ? (
                  <>
                    <option value="Dadar (Asiad Terminal)">Dadar (Asiad Terminal) — Mumbai</option>
                    <option value="Sion (Maitri Park / Circle)">Sion (Maitri Park / Circle) — Mumbai</option>
                    <option value="Chembur (Yogi Restaurant)">Chembur (Yogi Restaurant) — Mumbai</option>
                    <option value="Vashi (Highway Plaza)">Vashi (Highway Plaza) — Navi Mumbai</option>
                    <option value="CBD Belapur (Konkan Bhavan)">CBD Belapur — Navi Mumbai</option>
                    <option value="Kalamboli / Panvel (McD Circle)">Kalamboli / Panvel Toll Plaza</option>
                  </>
                ) : (
                  <>
                    <option value="Swargate (Shivneri Stand)">Swargate (Shivneri Stand) — Pune</option>
                    <option value="Chandani Chowk (Bavdhan)">Chandani Chowk (Bavdhan) — Pune</option>
                    <option value="Wakad (Hinjawadi Flyover Bridge)">Wakad (Hinjawadi Bridge) — Pune</option>
                    <option value="Somatane Phata">Somatane Phata — Pune</option>
                    <option value="Lonavala (Khandala Ghat Exit)">Lonavala (Khandala Exit)</option>
                  </>
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-brand-muted text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex items-center justify-center">
            <button
              type="button"
              onClick={handleSwap}
              title="Swap origin and destination"
              className="w-12 h-12 border border-brand-border bg-white hover:border-brand-black hover:text-brand-orange transition-colors flex items-center justify-center text-brand-black"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Destination */}
          <div className="md:col-span-4">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
              Destination (Drop Point)
            </label>
            <div className="relative">
              <select
                value={searchParams.to}
                onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                className="w-full h-12 px-3.5 py-2.5 bg-brand-warm border border-brand-border font-medium text-brand-black focus:outline-none focus:border-brand-orange focus:bg-white transition-colors appearance-none cursor-pointer text-sm"
              >
                {direction === 'mumbai-to-pune' ? (
                  <>
                    <option value="Swargate (Shivneri Stand)">Swargate (Shivneri Stand) — Pune</option>
                    <option value="Wakad (Hinjawadi Flyover Bridge)">Wakad (Hinjawadi Bridge) — Pune</option>
                    <option value="Chandani Chowk (Bavdhan)">Chandani Chowk (Bavdhan) — Pune</option>
                    <option value="Lonavala (Khandala Ghat Exit)">Lonavala (Khandala Exit)</option>
                  </>
                ) : (
                  <>
                    <option value="Dadar (Asiad Terminal)">Dadar (Asiad Terminal) — Mumbai</option>
                    <option value="Sion (Maitri Park / Circle)">Sion (Maitri Park / Circle) — Mumbai</option>
                    <option value="Chembur (Yogi Restaurant)">Chembur (Yogi Restaurant) — Mumbai</option>
                    <option value="Vashi (Highway Plaza)">Vashi (Highway Plaza) — Navi Mumbai</option>
                    <option value="CBD Belapur (Konkan Bhavan)">CBD Belapur — Navi Mumbai</option>
                    <option value="Kalamboli / Panvel (McD Circle)">Kalamboli / Panvel Circle</option>
                  </>
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-brand-muted text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-muted mb-1.5">
              Travel Date
            </label>
            <input
              type="date"
              value={searchParams.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
              className="w-full h-12 px-3 py-2.5 bg-brand-warm border border-brand-border font-medium text-brand-black focus:outline-none focus:border-brand-orange focus:bg-white transition-colors text-sm"
            />
          </div>

          {/* Search Action */}
          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full h-12 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>

        </div>
      </form>

      {/* Subtle Bottom Note */}
      <div className="mt-4 pt-3 border-t border-brand-border/80 flex flex-wrap items-center justify-between text-xs text-brand-muted gap-2">
        <span>MSRTC Shivneri luxury air-conditioned coaches (Scania, Volvo & Electric)</span>
        <span>Demonstration timetable · Hourly departures</span>
      </div>

    </div>
  );
};
