import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const EditorialSection: React.FC = () => {
  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* EDITORIAL SPREAD 1: Asymmetrical composition with solid orange rectangular block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs uppercase font-semibold tracking-wider text-brand-orange block">
              Corridor Heritage
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-black leading-tight">
              The Artery of Maharashtra.
            </h2>

            <p className="text-sm text-brand-muted leading-relaxed">
              Since the opening of the Mumbai–Pune Expressway, the twin cities have shared a daily rhythm 
              of business, study and family life. Shivneri represents the benchmark for comfortable, 
              direct highway transit between Dadar, Panvel, Wakad and Swargate.
            </p>

            <p className="text-sm text-brand-muted leading-relaxed">
              Designed for predictability, our passenger platform helps you compare departures, 
              view your bus position along the Bhor Ghat section, and reach your destination with peace of mind.
            </p>

            <div className="pt-2">
              <Link
                to="/search"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-orange hover:text-brand-black transition-colors"
              >
                <span>View Daily Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-7 relative">
            
            <div className="relative z-10 w-full aspect-16/10 overflow-hidden border border-brand-border">
              <img
                src="/images/p6_img0_6.jpeg"
                alt="Expressway Transit"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/hero-poster.jpg';
                }}
              />
            </div>

            {/* Solid Orange Rectangular Accent Block (Rimerio Page 6 signature) */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-brand-orange text-white p-6 sm:p-7 max-w-xs shadow-md">
              <span className="text-xs uppercase font-semibold tracking-wider text-white/80 block">
                Expressway Distance
              </span>
              <div className="text-3xl font-bold tracking-tight mt-1">
                168 KM
              </div>
              <p className="text-xs text-white/90 mt-1 leading-normal font-medium">
                Non-stop intercity transit via Khandala and Bhor Ghat.
              </p>
            </div>

            {/* Background Thin Geometry Frame */}
            <div className="absolute -top-5 -right-5 w-full h-full border border-brand-border pointer-events-none -z-0" />
          </div>

        </div>

        {/* THIN RULE */}
        <div className="thin-rule" />

        {/* EDITORIAL SPREAD 2: Editorial Route Waypoints Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs uppercase font-semibold tracking-wider text-brand-orange block">
              Route Structure
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-black leading-tight">
              Key Corridor Boarding Hubs
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Shivneri services connect major transport terminals directly to the expressway, 
              minimizing urban congestion delay.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border border-brand-border bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-brand-warm border-b border-brand-border text-brand-black font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Stop / Station</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4 text-right">Distance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  <tr className="hover:bg-brand-warm/40">
                    <td className="py-3 px-4 font-semibold text-brand-black">Dadar (Asiad Terminal)</td>
                    <td className="py-3 px-4 text-brand-muted">Mumbai</td>
                    <td className="py-3 px-4 text-brand-muted">Central Mumbai Hub</td>
                    <td className="py-3 px-4 text-right font-medium">0 km</td>
                  </tr>
                  <tr className="hover:bg-brand-warm/40">
                    <td className="py-3 px-4 font-semibold text-brand-black">Vashi Highway Plaza</td>
                    <td className="py-3 px-4 text-brand-muted">Navi Mumbai</td>
                    <td className="py-3 px-4 text-brand-muted">Sion-Panvel Toll Point</td>
                    <td className="py-3 px-4 text-right font-medium">24 km</td>
                  </tr>
                  <tr className="hover:bg-brand-warm/40">
                    <td className="py-3 px-4 font-semibold text-brand-black">Kalamboli / Panvel</td>
                    <td className="py-3 px-4 text-brand-muted">Raigad</td>
                    <td className="py-3 px-4 text-brand-muted">Expressway Entry Point</td>
                    <td className="py-3 px-4 text-right font-medium">52 km</td>
                  </tr>
                  <tr className="hover:bg-brand-warm/40">
                    <td className="py-3 px-4 font-semibold text-brand-black">Lonavala / Khandala</td>
                    <td className="py-3 px-4 text-brand-muted">Pune Dist.</td>
                    <td className="py-3 px-4 text-brand-muted">Bhor Ghat Summit</td>
                    <td className="py-3 px-4 text-right font-medium">98 km</td>
                  </tr>
                  <tr className="hover:bg-brand-warm/40">
                    <td className="py-3 px-4 font-semibold text-brand-black">Wakad (Hinjawadi Bridge)</td>
                    <td className="py-3 px-4 text-brand-muted">Pune</td>
                    <td className="py-3 px-4 text-brand-muted">IT Park Junction</td>
                    <td className="py-3 px-4 text-right font-medium">148 km</td>
                  </tr>
                  <tr className="hover:bg-brand-warm/40">
                    <td className="py-3 px-4 font-semibold text-brand-black">Swargate (Shivneri Stand)</td>
                    <td className="py-3 px-4 text-brand-muted">Pune</td>
                    <td className="py-3 px-4 text-brand-muted">Central Pune Terminal</td>
                    <td className="py-3 px-4 text-right font-medium">168 km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
