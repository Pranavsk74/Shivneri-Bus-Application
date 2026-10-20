import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { CoachSeatMap } from '../components/booking/CoachSeatMap';
import { useApp } from '../context/AppContext';
import { generateBusSeats } from '../data/mockBuses';
import { CORRIDOR_STOPS } from '../data/corridor';
import { Booking, Passenger } from '../types';
import { ArrowLeft, ArrowRight, MapPin, User } from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { buses, addBooking, searchParams } = useApp();

  const bus = buses.find(b => b.id === id) || buses[0];
  const seatsData = useMemo(() => generateBusSeats(bus.id, bus.baseFare), [bus.id, bus.baseFare]);

  // Selected Seat Numbers
  const [selectedSeatNumbers, setSelectedSeatNumbers] = useState<string[]>(['14']);

  // Boarding & Drop points
  const corridorStops = bus.direction === 'mumbai-to-pune' 
    ? CORRIDOR_STOPS 
    : [...CORRIDOR_STOPS].reverse();

  const [boardingStop, setBoardingStop] = useState<string>(bus.origin);
  const [dropStop, setDropStop] = useState<string>(bus.destination);

  // Passenger Details
  const [passengers, setPassengers] = useState<Passenger[]>([
    { fullName: 'Pramod K. Kulkarni', age: 34, gender: 'male', seatNumber: '14' }
  ]);
  const [contactMobile, setContactMobile] = useState('9820123456');
  const [contactEmail, setContactEmail] = useState('pramod.kulkarni@example.com');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle seat selection
  const handleToggleSeat = (seatNumber: string) => {
    if (selectedSeatNumbers.includes(seatNumber)) {
      if (selectedSeatNumbers.length === 1) return;
      const updated = selectedSeatNumbers.filter(s => s !== seatNumber);
      setSelectedSeatNumbers(updated);
      setPassengers(passengers.filter(p => p.seatNumber !== seatNumber));
    } else {
      if (selectedSeatNumbers.length >= 4) {
        alert('Maximum 4 seats can be selected per demo booking.');
        return;
      }
      const updated = [...selectedSeatNumbers, seatNumber];
      setSelectedSeatNumbers(updated);
      setPassengers([
        ...passengers,
        { fullName: '', age: 30, gender: 'male', seatNumber }
      ]);
    }
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  // Pricing calculations
  const seatCount = selectedSeatNumbers.length;
  const baseTotal = seatCount * bus.baseFare;
  const gstTax = Math.round(baseTotal * 0.05);
  const reservationFee = 20 * seatCount;
  const totalAmount = baseTotal + gstTax + reservationFee;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const prefix = bus.direction === 'mumbai-to-pune' ? 'MUMPUN' : 'PUNMUM';
    const bookingRef = `SHV-2026-${prefix}-${randomCode}`;
    const bookingId = `bkg-${Date.now()}`;

    const validPassengers = passengers.map((p, idx) => ({
      ...p,
      fullName: p.fullName.trim() || `Passenger ${idx + 1} (${p.seatNumber})`
    }));

    const newBooking: Booking = {
      bookingId,
      bookingReference: bookingRef,
      serviceId: bus.id,
      serviceName: bus.serviceName,
      busNumber: bus.busNumber,
      direction: bus.direction,
      travelDate: searchParams.date || new Date().toISOString().split('T')[0],
      departureTime: bus.departureTime,
      arrivalTime: bus.scheduledArrivalTime,
      boardingStop,
      dropStop,
      passengers: validPassengers,
      seats: selectedSeatNumbers,
      baseFare: baseTotal,
      taxAndGst: gstTax + reservationFee,
      totalAmount,
      status: 'CONFIRMED',
      bookedAt: new Date().toISOString(),
      qrCodeData: `${bookingRef}|${bus.busNumber}|${selectedSeatNumbers.join(',')}|CONFIRMED`
    };

    setTimeout(() => {
      addBooking(newBooking);
      setIsSubmitting(false);
      navigate(`/booking/confirmation/${bookingId}`);
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8F6]">
      <Navbar />

      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-brand-border py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <Link
            to="/search"
            className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-brand-black hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Select Another Departure</span>
          </Link>
          <span className="text-brand-muted font-mono">
            Service: <strong>{bus.serviceCode}</strong>
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-brand-black text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-brand-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-brand-orange block">
              Passenger Reservation
            </span>
            <h1 className="font-bold text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mt-0.5">
              {bus.serviceName}
            </h1>
            <p className="text-xs text-white/70 mt-1">
              {bus.direction === 'mumbai-to-pune' ? 'Mumbai ➔ Pune' : 'Pune ➔ Mumbai'} • Departure: {bus.departureTime}
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 px-4 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-white/60 block">Indicative Rate</span>
            <span className="font-bold text-2xl font-bold text-white">₹{bus.baseFare}</span>
            <span className="text-xs text-white/70"> / seat</span>
          </div>
        </div>
      </div>

      {/* Booking Form Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">
        <form onSubmit={handleConfirmBooking}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Cols: Seat Selection & Passenger Form */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Coach Seat Map */}
              <CoachSeatMap
                seats={seatsData}
                selectedSeatNumbers={selectedSeatNumbers}
                onToggleSeat={handleToggleSeat}
              />

              {/* Boarding and Drop Points */}
              <div className="bg-white border border-brand-border p-6 shadow-xs space-y-4">
                <div className="pb-3 border-b border-brand-border flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-black">
                    Boarding & Dropping Points
                  </span>
                  <span className="text-xs text-brand-muted">Select exact stops</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Boarding Stop</span>
                    </label>
                    <select
                      value={boardingStop}
                      onChange={(e) => setBoardingStop(e.target.value)}
                      className="w-full p-2.5 bg-brand-warm border border-brand-border text-xs font-medium text-brand-black focus:outline-none focus:border-brand-orange"
                    >
                      {corridorStops.slice(0, 6).map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                      <span>Drop Stop</span>
                    </label>
                    <select
                      value={dropStop}
                      onChange={(e) => setDropStop(e.target.value)}
                      className="w-full p-2.5 bg-brand-warm border border-brand-border text-xs font-medium text-brand-black focus:outline-none focus:border-brand-orange"
                    >
                      {corridorStops.slice(6).map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Passenger Details Form */}
              <div className="bg-white border border-brand-border p-6 shadow-xs space-y-5">
                <div className="pb-3 border-b border-brand-border flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-black">
                    Passenger Details ({passengers.length} Seat{passengers.length > 1 ? 's' : ''})
                  </span>
                  <span className="text-xs text-brand-muted">Demonstration entry</span>
                </div>

                <div className="space-y-4">
                  {passengers.map((passenger, idx) => (
                    <div key={passenger.seatNumber} className="p-4 border border-brand-border bg-brand-warm/30 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="flex items-center gap-1.5 text-brand-black">
                          <User className="w-4 h-4 text-brand-orange" />
                          <span>Passenger {idx + 1} (Seat #{passenger.seatNumber})</span>
                        </span>
                        <span className="text-brand-orange uppercase text-[10px] bg-white px-2 py-0.5 border border-brand-border">
                          Seat {passenger.seatNumber}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh S. Deshmukh"
                            value={passenger.fullName}
                            onChange={(e) => handlePassengerChange(idx, 'fullName', e.target.value)}
                            className="w-full p-2 bg-white border border-brand-border text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">
                            Age
                          </label>
                          <input
                            type="number"
                            min="3"
                            max="99"
                            required
                            value={passenger.age}
                            onChange={(e) => handlePassengerChange(idx, 'age', parseInt(e.target.value, 10))}
                            className="w-full p-2 bg-white border border-brand-border text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                          />
                        </div>

                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">
                            Gender
                          </label>
                          <select
                            value={passenger.gender}
                            onChange={(e) => handlePassengerChange(idx, 'gender', e.target.value as any)}
                            className="w-full p-2 bg-white border border-brand-border text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Coordinates */}
                <div className="pt-3 border-t border-brand-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">
                      Contact Mobile
                    </label>
                    <input
                      type="tel"
                      required
                      value={contactMobile}
                      onChange={(e) => setContactMobile(e.target.value)}
                      className="w-full p-2 bg-white border border-brand-border text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-muted mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-2 bg-white border border-brand-border text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

              </div>

            </div>

            {/* Right 5 Cols: Summary & Confirm */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              
              <div className="bg-white border-2 border-brand-black p-6 shadow-sm space-y-5">
                
                <div className="pb-3 border-b border-brand-border flex items-center justify-between">
                  <span className="font-bold text-xl font-bold uppercase tracking-tight text-brand-black">
                    Booking Summary
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-brand-muted">
                    Demonstration
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Service:</span>
                    <strong className="text-brand-black font-mono">{bus.busNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Coach Type:</span>
                    <strong className="text-brand-black">{bus.busType}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Departure:</span>
                    <strong className="text-brand-black">{bus.departureTime}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Est. Arrival:</span>
                    <strong className="text-brand-black">{bus.scheduledArrivalTime}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Seats:</span>
                    <strong className="text-brand-orange font-bold font-mono">
                      {selectedSeatNumbers.join(', ')}
                    </strong>
                  </div>
                </div>

                <div className="thin-rule" />

                {/* Fare Breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Base Fare ({seatCount} × ₹{bus.baseFare}):</span>
                    <span className="font-mono font-semibold text-brand-black">₹{baseTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">GST (5%):</span>
                    <span className="font-mono font-semibold text-brand-black">₹{gstTax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-muted">Reservation Fee:</span>
                    <span className="font-mono font-semibold text-brand-black">₹{reservationFee}</span>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-brand-black flex items-baseline justify-between">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-brand-muted block">
                      Total Fare
                    </span>
                    <span className="text-[10px] text-brand-muted">Indicative sample total</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-3xl font-bold text-brand-black">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>

                {/* Confirm Demo Booking Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-base font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Issuing Demo Pass...</span>
                  ) : (
                    <>
                      <span>Confirm Demo Booking</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-brand-muted text-center">
                  This demo does not require payment. The booking will be saved in My Journeys.
                </p>

              </div>

            </div>

          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};
