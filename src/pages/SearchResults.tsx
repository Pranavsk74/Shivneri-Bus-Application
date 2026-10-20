import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { RouteSearchForm } from '../components/booking/RouteSearchForm';
import { BusServiceCard } from '../components/buses/BusServiceCard';
import { useApp } from '../context/AppContext';
import { Filter, ArrowUpDown, RotateCcw } from 'lucide-react';

export const SearchResults: React.FC = () => {
  const { buses, direction, searchParams } = useApp();

  // Filter States
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [busTypeFilter, setBusTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'departure_asc' | 'fare_asc' | 'duration_asc'>('departure_asc');

  // Filter logic
  const filteredBuses = useMemo(() => {
    return buses.filter(bus => {
      if (bus.direction !== direction) return false;

      if (busTypeFilter !== 'all' && !bus.busType.toLowerCase().includes(busTypeFilter.toLowerCase())) {
        return false;
      }

      if (timeFilter !== 'all') {
        const [time, mod] = bus.departureTime.split(' ');
        let hour = parseInt(time.split(':')[0], 10);
        if (mod === 'PM' && hour < 12) hour += 12;
        if (mod === 'AM' && hour === 12) hour = 0;

        if (timeFilter === 'morning' && (hour < 5 || hour >= 12)) return false;
        if (timeFilter === 'afternoon' && (hour < 12 || hour >= 17)) return false;
        if (timeFilter === 'evening' && hour < 17) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'fare_asc') return a.baseFare - b.baseFare;
      if (sortBy === 'duration_asc') {
        const durA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split(' ')[1]);
        const durB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split(' ')[1]);
        return durA - durB;
      }
      return a.id.localeCompare(b.id);
    });
  }, [buses, direction, timeFilter, busTypeFilter, sortBy]);

  const resetFilters = () => {
    setTimeFilter('all');
    setBusTypeFilter('all');
    setSortBy('departure_asc');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      <Navbar />

      {/* Corridor Header */}
      <div className="bg-brand-black text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-2">
          <span className="text-[11px] uppercase font-bold tracking-widest text-brand-orange block">
            MSRTC Shivneri Services
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
            {direction === 'mumbai-to-pune' ? 'MUMBAI TO PUNE SERVICES' : 'PUNE TO MUMBAI SERVICES'}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/70 pt-1">
            <span>Date: <strong className="text-white">{searchParams.date}</strong></span>
            <span>Available: <strong className="text-white">{filteredBuses.length} departures</strong></span>
            <span>Direct Expressway non-stop</span>
          </div>
        </div>
      </div>

      {/* Search Edit Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 w-full">
        <RouteSearchForm compact={true} />
      </div>

      {/* Main Results & Filters Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Filters & Sorting Toolbar */}
        <div className="bg-white border border-brand-border p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          
          {/* Time & Vehicle Filters */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            
            <div className="flex items-center gap-1.5 text-brand-black font-bold uppercase tracking-wider mr-1">
              <Filter className="w-3.5 h-3.5 text-brand-orange" />
              <span>Filter:</span>
            </div>

            {/* Time of Day */}
            <div className="flex items-center border border-brand-border bg-brand-warm">
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-3 py-1.5 font-semibold transition-colors ${
                  timeFilter === 'all' ? 'bg-brand-black text-white' : 'text-brand-muted hover:text-brand-black'
                }`}
              >
                All Times
              </button>
              <button
                onClick={() => setTimeFilter('morning')}
                className={`px-3 py-1.5 font-semibold transition-colors ${
                  timeFilter === 'morning' ? 'bg-brand-black text-white' : 'text-brand-muted hover:text-brand-black'
                }`}
              >
                Morning
              </button>
              <button
                onClick={() => setTimeFilter('afternoon')}
                className={`px-3 py-1.5 font-semibold transition-colors ${
                  timeFilter === 'afternoon' ? 'bg-brand-black text-white' : 'text-brand-muted hover:text-brand-black'
                }`}
              >
                Afternoon
              </button>
              <button
                onClick={() => setTimeFilter('evening')}
                className={`px-3 py-1.5 font-semibold transition-colors ${
                  timeFilter === 'evening' ? 'bg-brand-black text-white' : 'text-brand-muted hover:text-brand-black'
                }`}
              >
                Evening
              </button>
            </div>

            {/* Coach Class */}
            <select
              value={busTypeFilter}
              onChange={(e) => setBusTypeFilter(e.target.value)}
              className="h-8.5 px-3 bg-brand-warm border border-brand-border text-brand-black font-semibold text-xs focus:outline-none focus:border-brand-orange"
            >
              <option value="all">All Coach Types</option>
              <option value="scania">Scania Multi-Axle</option>
              <option value="volvo">Volvo B11R</option>
              <option value="electric">Electric AC</option>
            </select>

            {(timeFilter !== 'all' || busTypeFilter !== 'all') && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-brand-orange font-bold hover:underline ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}

          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-brand-muted font-bold uppercase tracking-wider flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-orange" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="h-8.5 px-3 bg-brand-warm border border-brand-border text-brand-black font-semibold text-xs focus:outline-none focus:border-brand-orange"
            >
              <option value="departure_asc">Earliest Departure</option>
              <option value="fare_asc">Lowest Indicative Fare</option>
              <option value="duration_asc">Shortest Travel Duration</option>
            </select>
          </div>

        </div>

        {/* Bus Results List */}
        {filteredBuses.length > 0 ? (
          <div className="space-y-4">
            {filteredBuses.map((bus) => (
              <BusServiceCard key={bus.id} bus={bus} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-brand-border p-12 text-center space-y-3 shadow-xs">
            <h3 className="font-bold text-xl font-bold uppercase text-brand-black">
              No matching services found
            </h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              No Shivneri departures match the selected time filter. Try resetting filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2 bg-brand-orange text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
