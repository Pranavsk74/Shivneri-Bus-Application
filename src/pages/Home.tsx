import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { RouteSearchForm } from '../components/booking/RouteSearchForm';
import { CorridorMap } from '../components/tracking/CorridorMap';
import { BusServiceCard } from '../components/buses/BusServiceCard';
import { EditorialSection } from '../components/home/EditorialSection';
import { useApp } from '../context/AppContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { buses, direction } = useApp();
  const searchSectionRef = useRef<HTMLDivElement>(null);

  // Initialize scroll reveals
  useScrollReveal();

  const upcomingServices = buses
    .filter(b => b.direction === direction)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-black w-full overflow-x-hidden">
      
      {/* 
        NAVIGATION BAR: Sits at the top of the page; does NOT cover the video
      */}
      <Navbar />

      {/* 
        HERO SECTION: Sits cleanly below the bar, full-width edge-to-edge video
      */}
      <section className="relative w-full h-[85vh] min-h-[540px] max-h-[800px] bg-black overflow-hidden flex flex-col justify-end">
        
        {/* Full-bleed, Edge-to-Edge Opaque Video Element */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.03] z-0"
        >
          <source src="/hero-bus-video.mp4" type="video/mp4" />
        </video>

        {/* Restrained dark gradient at bottom for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 pointer-events-none" />

        {/* Hero Content: Positioned below with minimal aesthetic */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-14 sm:pb-16 lg:pb-20">
          <div className="max-w-4xl space-y-1">
            <span className="text-sm sm:text-base font-bold tracking-[0.2em] uppercase text-brand-orange block">
              MSRTC
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-semibold tracking-tight text-white leading-tight">
              Moving Maharashtra since 1948
            </h1>
          </div>
        </div>

      </section>

      {/* 
        BOOKING SECTION: CLEAN, INTENTIONAL FULL-WIDTH SECTION
        Placed inside normal page flow with zero awkward negative margin
      */}
      <section 
        ref={searchSectionRef} 
        className="w-full bg-[#F7F6F2] py-14 lg:py-16 border-b border-brand-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RouteSearchForm />
        </div>
      </section>

      {/* SAMPLE UPCOMING SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-6">
        
        <div className="flex flex-wrap items-end justify-between gap-4 pb-3 border-b border-brand-border">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-orange block">
              MSRTC Shivneri Timetable
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-black mt-1">
              Upcoming {direction === 'mumbai-to-pune' ? 'Mumbai to Pune' : 'Pune to Mumbai'} Departures
            </h2>
          </div>

          <Link
            to="/search"
            className="text-sm font-semibold text-brand-orange hover:text-brand-orange-hover flex items-center gap-1.5"
          >
            <span>View All Departures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {upcomingServices.map(bus => (
            <BusServiceCard key={bus.id} bus={bus} />
          ))}
        </div>

      </section>

      {/* "ON THE ROAD." LIVE MAP PREVIEW */}
      <section className="bg-brand-warm py-16 border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-orange block">
                Mumbai ↔ Pune Corridor
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-black mt-1">
                On the road.
              </h2>
              <p className="text-sm text-brand-muted max-w-lg mt-1">
                Simulated corridor movements between Dadar, Vashi, Bhor Ghat, Wakad and Swargate.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-brand-muted">
                Simulated locations
              </span>
              <Link
                to="/track"
                className="px-5 py-2.5 bg-brand-black hover:bg-brand-orange text-white text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Open Full Tracking
              </Link>
            </div>
          </div>

          {/* Map Preview */}
          <div className="border border-brand-border shadow-xs">
            <CorridorMap heightClass="h-[500px]" />
          </div>

        </div>
      </section>

      {/* EDITORIAL HERITAGE SECTION */}
      <div>
        <EditorialSection />
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};
