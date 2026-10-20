import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { RouteTimeline } from '../components/routes/RouteTimeline';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  UserCheck, 
  Wifi, 
  Zap 
} from 'lucide-react';

export const BusDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { buses, setSelectedBusId } = useApp();

  const bus = buses.find(b => b.id === id) || buses[0];

  const handleTrackLive = () => {
    setSelectedBusId(bus.id);
    navigate(`/track/${bus.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-border py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <Link
            to="/search"
            className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-brand-black hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Timetable</span>
          </Link>
          <span className="text-brand-muted font-mono">
            Service: <strong>{bus.serviceCode}</strong>
          </span>
        </div>
      </div>

      {/* Service Header */}
      <div className="bg-brand-black text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-0.5 bg-brand-orange text-white text-xs font-mono font-bold uppercase">
                  {bus.busNumber}
                </span>
                <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                  {bus.busType}
                </span>
              </div>

              <h1 className="font-bold text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
                {bus.serviceName}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-xs text-white/80 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{bus.origin} ➔ {bus.destination}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Duration: {bus.duration}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="lg:col-span-4 bg-white/5 border border-white/15 p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase font-bold text-white/70">Indicative Fare</span>
                <div>
                  <span className="font-bold text-3xl font-bold text-white">₹{bus.baseFare}</span>
                  <span className="text-xs text-white/60"> / seat</span>
                </div>
              </div>

              <div className="text-xs text-white/80 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>Available Seats:</span>
                <strong className="text-white">{bus.availableSeats} of {bus.totalSeats}</strong>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleTrackLive}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/25 transition-colors"
                >
                  Track on Map
                </button>
                <Link
                  to={`/booking/${bus.id}`}
                  className="px-4 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Book Seat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8 flex-1">
        
        {/* Telemetry Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-brand-border p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
              Current Location
            </span>
            <div className="font-bold text-base font-bold text-brand-black mt-1 truncate" title={bus.currentLocationName}>
              {bus.currentLocationName}
            </div>
            <span className="text-xs text-brand-orange font-semibold block mt-0.5">
              Next Stop: {bus.nextStopName.split(' (')[0]}
            </span>
          </div>

          <div className="bg-white border border-brand-border p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
              Cruising Speed
            </span>
            <div className="font-bold text-2xl font-bold text-brand-black mt-1 flex items-baseline gap-1">
              <span>{bus.speedKmH}</span>
              <span className="text-xs font-mono text-brand-muted">km/h</span>
            </div>
            <span className="text-xs text-brand-muted block mt-0.5">
              Speed limited in Ghat zone
            </span>
          </div>

          <div className="bg-white border border-brand-border p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
              Assigned Driver
            </span>
            <div className="font-bold text-base font-bold text-brand-black mt-1 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-brand-orange" />
              <span>{bus.driverName}</span>
            </div>
            <span className="text-xs text-brand-muted block mt-0.5">
              Verified commercial highway driver
            </span>
          </div>

          <div className="bg-white border border-brand-border p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
              Predicted Arrival
            </span>
            <div className="font-bold text-2xl font-bold text-brand-black mt-1">
              {bus.aiPredictedArrival.split(' (')[0]}
            </div>
            <span className={`text-xs font-semibold block mt-0.5 ${bus.delayMinutes > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
              {bus.delayMinutes > 0 ? `+${bus.delayMinutes}m delay anticipated` : 'On schedule'}
            </span>
          </div>

        </div>

        {/* Route Timeline */}
        <RouteTimeline bus={bus} />

        {/* Coach Amenities */}
        <div className="bg-white border border-brand-border p-6 lg:p-8">
          <div className="pb-3 border-b border-brand-border mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange block">
              Coach Specifications
            </span>
            <h3 className="font-bold text-xl font-bold uppercase tracking-tight text-brand-black mt-0.5">
              Standard Amenities on this Service
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {bus.amenities.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 p-3 bg-brand-warm border border-brand-border">
                <span className="text-brand-orange font-bold text-sm">✓</span>
                <span className="font-medium text-brand-black">{item}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5 p-3 bg-brand-warm border border-brand-border">
              <Wifi className="w-4 h-4 text-brand-orange" />
              <span className="font-medium text-brand-black">Wi-Fi Internet Access</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-brand-warm border border-brand-border">
              <Zap className="w-4 h-4 text-brand-orange" />
              <span className="font-medium text-brand-black">USB Mobile Charging Ports</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-brand-warm border border-brand-border">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span className="font-medium text-brand-black">Air Bellow Suspension</span>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
