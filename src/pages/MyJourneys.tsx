import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { useApp } from '../context/AppContext';
import { Bus, MapPin, Trash2, ArrowRight } from 'lucide-react';

export const MyJourneys: React.FC = () => {
  const { bookings, cancelBooking } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

  const todayStr = new Date().toISOString().split('T')[0];

  const upcomingBookings = bookings.filter(b => b.status === 'CONFIRMED' && b.travelDate >= todayStr);
  const pastBookings = bookings.filter(b => b.status === 'CANCELLED' || b.travelDate < todayStr);

  const currentList = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-brand-black text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto space-y-2">
          <span className="text-[11px] uppercase font-bold tracking-widest text-brand-orange block">
            MSRTC Passenger Portal
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-none">
            MY JOURNEYS & TICKETS
          </h1>

          <p className="text-xs text-white/70 max-w-lg">
            Review your confirmed demo reservations and access boarding passes for the Mumbai ↔ Pune corridor.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-6">
        
        {/* Tab Buttons */}
        <div className="flex items-center gap-3 border-b border-brand-border pb-3">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`font-bold text-base font-bold uppercase tracking-wider px-5 py-2 transition-colors flex items-center gap-2 ${
              activeTab === 'upcoming'
                ? 'bg-brand-orange text-white'
                : 'bg-white text-brand-black border border-brand-border hover:border-brand-black'
            }`}
          >
            <span>Upcoming Journeys</span>
            <span className={`text-xs px-1.5 py-0.2 font-sans font-bold ${
              activeTab === 'upcoming' ? 'bg-white text-brand-orange' : 'bg-brand-warm text-brand-muted'
            }`}>
              {upcomingBookings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`font-bold text-base font-bold uppercase tracking-wider px-5 py-2 transition-colors flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-brand-orange text-white'
                : 'bg-white text-brand-black border border-brand-border hover:border-brand-black'
            }`}
          >
            <span>Past / Completed</span>
            <span className={`text-xs px-1.5 py-0.2 font-sans font-bold ${
              activeTab === 'completed' ? 'bg-white text-brand-orange' : 'bg-brand-warm text-brand-muted'
            }`}>
              {pastBookings.length}
            </span>
          </button>
        </div>

        {/* Bookings List */}
        {currentList.length > 0 ? (
          <div className="space-y-4">
            {currentList.map((booking) => {
              const isCancelled = booking.status === 'CANCELLED';

              return (
                <div
                  key={booking.bookingId}
                  className={`bg-white border transition-colors p-6 shadow-xs ${
                    isCancelled ? 'border-brand-border opacity-65' : 'border-brand-border hover:border-brand-black'
                  }`}
                >
                  
                  {/* Top Meta Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-brand-border text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-brand-black uppercase">
                        PNR: {booking.bookingReference}
                      </span>
                      <span className="text-brand-border">|</span>
                      <span className="text-brand-muted">
                        Booked on {new Date(booking.bookedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isCancelled
                        ? 'bg-rose-50 text-rose-800 border border-rose-300'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Main Route & Schedule Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-5 items-center">
                    
                    {/* Route Corridor */}
                    <div className="md:col-span-5 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Bus className="w-4 h-4 text-brand-orange" />
                        <h3 className="font-bold text-lg font-bold uppercase text-brand-black">
                          {booking.serviceName}
                        </h3>
                      </div>
                      <div className="text-xs font-mono text-brand-muted">
                        Bus: {booking.busNumber}
                      </div>

                      <div className="pt-1 text-xs space-y-1">
                        <div className="flex items-center gap-1.5 text-brand-black">
                          <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                          <span>Boarding: <strong>{booking.boardingStop}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 text-brand-muted">
                          <MapPin className="w-3.5 h-3.5 text-brand-muted" />
                          <span>Drop: <strong>{booking.dropStop}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Timing & Seats */}
                    <div className="md:col-span-4 border-l-0 md:border-l border-brand-border md:pl-6 space-y-1.5 text-xs">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-muted block">Travel Date</span>
                        <strong className="text-brand-black">{booking.travelDate}</strong>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-brand-muted block">Departure</span>
                          <strong className="text-brand-black">{booking.departureTime}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-brand-muted block">Arrival</span>
                          <strong className="text-brand-black">{booking.arrivalTime}</strong>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-muted block">Reserved Seats</span>
                        <span className="font-mono font-bold text-brand-orange">
                          {booking.seats.join(', ')} ({booking.passengers.length} passenger{booking.passengers.length > 1 ? 's' : ''})
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-3 border-l-0 md:border-l border-brand-border md:pl-6 flex flex-col items-start md:items-end justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">
                          Sample Fare
                        </span>
                        <div className="font-bold text-3xl font-bold text-brand-black">
                          ₹{booking.totalAmount}
                        </div>
                        <span className="text-[11px] text-brand-muted">
                          Confirmed demonstration
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Actions Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-brand-border text-xs">
                    <span className="text-brand-muted">
                      2x2 luxury air-conditioned coach reservation
                    </span>

                    <div className="flex items-center gap-2.5">
                      {!isCancelled && (
                        <>
                          <button
                            onClick={() => {
                              if (confirm(`Cancel booking ${booking.bookingReference}?`)) {
                                cancelBooking(booking.bookingId);
                              }
                            }}
                            className="px-3 py-1.5 border border-brand-border hover:border-rose-300 text-rose-700 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancel</span>
                          </button>

                          <Link
                            to={`/track/${booking.serviceId}`}
                            className="px-3.5 py-1.5 border border-brand-border hover:border-brand-black text-brand-black text-xs font-bold uppercase tracking-wider transition-colors"
                          >
                            Track on Map
                          </Link>
                        </>
                      )}

                      <Link
                        to={`/booking/confirmation/${booking.bookingId}`}
                        className="px-4 py-1.5 bg-brand-black hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        View Pass
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-brand-border p-14 text-center space-y-4 shadow-xs">
            <h3 className="font-bold text-2xl font-bold uppercase text-brand-black">
              No {activeTab} journeys found
            </h3>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              You don’t have any {activeTab} Shivneri bus bookings saved in this demo session.
            </p>
            <div className="pt-1">
              <Link
                to="/search"
                className="px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>Find Departures</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};
