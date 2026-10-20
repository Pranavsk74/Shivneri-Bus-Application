import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<'terms' | 'privacy' | null>(null);

  return (
    <footer className="bg-white border-t border-brand-border mt-auto w-full">
      {/* Top Brand Accent Rule */}
      <div className="w-full h-[2px] bg-brand-orange" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* MSRTC Brand & Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="h-14 w-auto bg-white border border-brand-border p-1.5 shrink-0 shadow-xs">
                <img
                  src="/logo-tight.jpg"
                  alt="MSRTC Logo"
                  className="h-full w-auto max-w-[130px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-2xl font-bold tracking-tight uppercase leading-none text-brand-black">
                  MSRTC
                </span>
                <span className="text-[11px] uppercase tracking-wider text-brand-muted font-medium mt-1">
                  SHIVNERI · MUMBAI ↔ PUNE
                </span>
              </div>
            </div>

            <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
              Maharashtra State Road Transport Corporation intercity passenger demonstration. 
              Search daily schedules, view seat availability, and track simulated bus positions on the expressway.
            </p>
          </div>

          {/* Passenger Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black border-b border-brand-border pb-2">
              Passenger Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/search" className="text-brand-muted hover:text-brand-orange transition-colors">
                  Book Tickets
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-brand-muted hover:text-brand-orange transition-colors">
                  Track Bus on Map
                </Link>
              </li>
              <li>
                <Link to="/journeys" className="text-brand-muted hover:text-brand-orange transition-colors">
                  My Journeys
                </Link>
              </li>
              <li>
                <Link to="/srs" className="text-brand-muted hover:text-brand-orange transition-colors">
                  Project Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Corridor & Legal */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-black border-b border-brand-border pb-2">
              Demonstration Notice
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              This website is an interactive prototype for evaluation purposes. Schedules, seat availability, 
              fares, and bus positions are simulated and do not represent real-time MSRTC reservations.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs pt-1">
              <button
                onClick={() => setModalContent('terms')}
                className="text-brand-black font-semibold hover:text-brand-orange transition-colors underline"
              >
                Terms of Service
              </button>
              <span className="text-brand-border">•</span>
              <button
                onClick={() => setModalContent('privacy')}
                className="text-brand-black font-semibold hover:text-brand-orange transition-colors underline"
              >
                Privacy Policy
              </button>
              <span className="text-brand-border">•</span>
              <Link
                to="/srs"
                className="text-brand-orange font-semibold hover:underline transition-colors"
              >
                Project Documentation
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Required Author Credit */}
        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
          <div className="flex items-center gap-3">
            <span>© 2026 MSRTC Shivneri Demonstration.</span>
            <span className="text-brand-border">•</span>
            <Link to="/srs" className="hover:text-brand-orange transition-colors">
              Project Documentation
            </Link>
          </div>
          
          {/* EXACT TEAM CREDIT AS REQUESTED */}
          <div className="text-brand-muted hover:text-brand-black transition-colors text-[11px] tracking-wide">
            TM Pranav S Shaurya S
          </div>
        </div>
      </div>

      {/* Simple Prototype Modal for Terms & Privacy */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 border border-brand-border shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-base font-bold uppercase text-brand-black">
                {modalContent === 'terms' ? 'Terms of Service (Prototype)' : 'Privacy Policy (Prototype)'}
              </h3>
              <button
                onClick={() => setModalContent(null)}
                className="text-xs font-bold text-brand-muted hover:text-brand-black p-1"
              >
                ✕ Close
              </button>
            </div>

            <div className="text-xs text-brand-muted space-y-2 leading-relaxed max-h-60 overflow-y-auto">
              {modalContent === 'terms' ? (
                <>
                  <p>
                    <strong>1. Demo Prototype Notice:</strong> This website is an architectural and design demonstration. 
                    No commercial transactions or actual bus reservations are performed.
                  </p>
                  <p>
                    <strong>2. Data Accuracy:</strong> Timetables, bus identifiers, stops and route simulations are 
                    provided for demonstration purposes only.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. No Data Harvesting:</strong> This frontend application does not transmit or store personal data 
                    on external servers.
                  </p>
                  <p>
                    <strong>2. Local Storage:</strong> Demo bookings created during the session are saved locally in your 
                    browser via localStorage and can be cleared at any time.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 border-t border-brand-border flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-2 bg-brand-black text-white text-xs font-semibold uppercase tracking-wider"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
