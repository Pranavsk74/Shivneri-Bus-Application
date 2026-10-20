import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, Printer, ArrowRight, User } from 'lucide-react';

export const BookingConfirmation: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { bookings } = useApp();

  const booking = bookings.find(b => b.bookingId === bookingId) || bookings[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      <Navbar />

      {/* Confirmation Top Message */}
      <div className="bg-brand-black text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <div className="w-12 h-12 bg-brand-orange text-white mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange block">
            Reservation Confirmed
          </span>

          <h1 className="font-bold text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
            DEMO BOARDING PASS
          </h1>

          <p className="text-xs text-white/70">
            Booking reference <strong className="font-mono text-white underline">{booking.bookingReference}</strong> has been issued and stored in My Journeys.
          </p>
        </div>
      </div>

      {/* Main Ticket Layout */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-6">
        
        {/* Printable Ticket Card */}
        <div className="bg-white border-2 border-brand-black shadow-xs overflow-hidden print:shadow-none print:border-black">
          
          {/* Ticket Header with updated Logo */}
          <div className="bg-brand-orange text-white p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white p-1 shrink-0">
                <img
                  src="/logo-tight.jpg"
                  alt="Shivneri"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight uppercase block leading-none">
                  MSRTC
                </span>
                <span className="text-[10px] uppercase tracking-wider text-white/80 font-medium">
                  SHIVNERI · MUMBAI ↔ PUNE
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-white/80 block">PNR Reference</span>
              <span className="font-mono text-base sm:text-lg font-bold text-white tracking-wider">
                {booking.bookingReference}
              </span>
            </div>
          </div>

          {/* Ticket Body Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Schedule & Details */}
            <div className="md:col-span-8 space-y-5">
              
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-brand-border">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                    Boarding Stop
                  </span>
                  <div className="font-bold text-lg font-bold text-brand-black mt-0.5">
                    {booking.boardingStop}
                  </div>
                  <span className="text-xs text-brand-muted flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-brand-orange" />
                    <span>Departure: <strong>{booking.departureTime}</strong></span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                    Drop Stop
                  </span>
                  <div className="font-bold text-lg font-bold text-brand-black mt-0.5">
                    {booking.dropStop}
                  </div>
                  <span className="text-xs text-brand-muted flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-brand-orange" />
                    <span>Est. Arrival: <strong>{booking.arrivalTime}</strong></span>
                  </span>
                </div>
              </div>

              {/* Service & Seats Info */}
              <div className="grid grid-cols-3 gap-3 pb-4 border-b border-brand-border text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                    Bus Number
                  </span>
                  <span className="font-mono font-bold text-brand-black text-sm">
                    {booking.busNumber}
                  </span>
                  <span className="text-[11px] text-brand-muted block truncate">
                    {booking.serviceName}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                    Reserved Seats
                  </span>
                  <span className="font-bold text-xl font-bold text-brand-orange">
                    {booking.seats.join(', ')}
                  </span>
                  <span className="text-[10px] text-brand-muted block">
                    {booking.seats.length} Seat{booking.seats.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                    Travel Date
                  </span>
                  <span className="font-semibold text-brand-black text-sm">
                    {booking.travelDate}
                  </span>
                </div>
              </div>

              {/* Passenger List */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">
                  Passengers
                </span>
                <div className="space-y-1">
                  {booking.passengers.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs p-2 bg-brand-warm border border-brand-border">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-brand-orange" />
                        <span className="font-semibold text-brand-black">{p.fullName}</span>
                        <span className="text-brand-muted">({p.gender}, Age {p.age})</span>
                      </div>
                      <span className="font-mono font-bold text-brand-orange">
                        Seat #{p.seatNumber}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: QR Code & Validation */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-5 bg-brand-warm border border-brand-border space-y-3 text-center">
              
              <div className="w-32 h-32 bg-white p-2 border border-brand-border flex flex-col items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-brand-black">
                  <rect x="0" y="0" width="30" height="30" fill="currentColor" />
                  <rect x="5" y="5" width="20" height="20" fill="white" />
                  <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                  <rect x="70" y="0" width="30" height="30" fill="currentColor" />
                  <rect x="75" y="5" width="20" height="20" fill="white" />
                  <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                  <rect x="0" y="70" width="30" height="30" fill="currentColor" />
                  <rect x="5" y="75" width="20" height="20" fill="white" />
                  <rect x="10" y="80" width="10" height="10" fill="currentColor" />

                  <rect x="36" y="8" width="6" height="6" fill="currentColor" />
                  <rect x="46" y="8" width="8" height="6" fill="currentColor" />
                  <rect x="36" y="20" width="12" height="6" fill="currentColor" />
                  <rect x="15" y="40" width="8" height="8" fill="currentColor" />
                  <rect x="28" y="40" width="6" height="12" fill="currentColor" />
                  <rect x="40" y="38" width="14" height="14" fill="currentColor" />
                  <rect x="60" y="42" width="10" height="8" fill="currentColor" />
                  <rect x="76" y="38" width="12" height="10" fill="currentColor" />
                  <rect x="38" y="60" width="8" height="16" fill="currentColor" />
                  <rect x="52" y="62" width="14" height="10" fill="currentColor" />
                  <rect x="72" y="58" width="16" height="8" fill="currentColor" />
                  <rect x="44" y="80" width="18" height="8" fill="currentColor" />
                  <rect x="68" y="74" width="10" height="16" fill="currentColor" />
                  <rect x="84" y="80" width="10" height="10" fill="currentColor" />
                </svg>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted block">
                  Scan to Validate
                </span>
                <span className="font-mono text-xs font-bold text-brand-black">
                  ₹{booking.totalAmount} (DEMO)
                </span>
              </div>
            </div>

          </div>

          {/* Ticket Footer */}
          <div className="bg-brand-warm border-t border-brand-border p-3.5 px-6 flex flex-wrap items-center justify-between text-xs text-brand-muted gap-2">
            <span>Show this pass along with valid photo ID at departure platform.</span>
            <span className="font-medium text-brand-black">Issued on {new Date(booking.bookedAt).toLocaleDateString()}</span>
          </div>

        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 print:hidden">
          
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 border border-brand-border bg-white hover:border-brand-black text-brand-black text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-brand-orange" />
            <span>Print Pass</span>
          </button>

          <div className="flex items-center gap-3">
            <Link
              to={`/track/${booking.serviceId}`}
              className="px-5 py-2.5 border border-brand-border bg-white hover:border-brand-black text-brand-black text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Track Bus on Map
            </Link>

            <Link
              to="/journeys"
              className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>View in My Journeys</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};
