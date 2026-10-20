import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import { 
  FileText, 
  ChevronRight, 
  Printer, 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  BookOpen,
  ArrowUp
} from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  number: string;
  subsections?: { id: string; title: string; number: string }[];
}

const TOC_ITEMS: TocItem[] = [
  {
    id: 'sec-1',
    number: '1.0',
    title: 'Introduction',
    subsections: [
      { id: 'sec-1-1', number: '1.1', title: 'Purpose' },
      { id: 'sec-1-2', number: '1.2', title: 'Scope' },
      { id: 'sec-1-3', number: '1.3', title: 'Definitions, Acronyms & Abbreviations' },
      { id: 'sec-1-4', number: '1.4', title: 'References' },
      { id: 'sec-1-5', number: '1.5', title: 'Document Overview' },
    ]
  },
  {
    id: 'sec-2',
    number: '2.0',
    title: 'Overall Description',
    subsections: [
      { id: 'sec-2-1', number: '2.1', title: 'Product Perspective' },
      { id: 'sec-2-2', number: '2.2', title: 'Product Functions' },
      { id: 'sec-2-3', number: '2.3', title: 'User Classes and Characteristics' },
      { id: 'sec-2-4', number: '2.4', title: 'Operating Environment' },
      { id: 'sec-2-5', number: '2.5', title: 'Design and Implementation Constraints' },
      { id: 'sec-2-6', number: '2.6', title: 'Assumptions and Dependencies' },
    ]
  },
  {
    id: 'sec-3',
    number: '3.0',
    title: 'System Features & Functional Requirements',
    subsections: [
      { id: 'sec-3-1', number: '3.1', title: 'Passenger Identification (Guest Checkout)' },
      { id: 'sec-3-2', number: '3.2', title: 'Bus Service Search & Filtering' },
      { id: 'sec-3-3', number: '3.3', title: 'Corridor Route Selection (Mumbai ↔ Pune)' },
      { id: 'sec-3-4', number: '3.4', title: 'Timetable Schedules & Fare Information' },
      { id: 'sec-3-5', number: '3.5', title: 'Service Selection & Bus Information' },
      { id: 'sec-3-6', number: '3.6', title: 'Passenger Details & Interactive Seat Selection' },
      { id: 'sec-3-7', number: '3.7', title: 'Booking Review & Fare Breakdown' },
      { id: 'sec-3-8', number: '3.8', title: 'Booking Confirmation & Digital Boarding Pass' },
      { id: 'sec-3-9', number: '3.9', title: 'Demonstration Journey History' },
      { id: 'sec-3-10', number: '3.10', title: 'Simulated Bus Location Corridor Map' },
      { id: 'sec-3-11', number: '3.11', title: 'Predicted Arrival Time & Delay Simulation' },
    ]
  },
  {
    id: 'sec-4',
    number: '4.0',
    title: 'External Interface Requirements',
    subsections: [
      { id: 'sec-4-1', number: '4.1', title: 'User Interfaces (UI)' },
      { id: 'sec-4-2', number: '4.2', title: 'Hardware Interfaces' },
      { id: 'sec-4-3', number: '4.3', title: 'Software Interfaces' },
      { id: 'sec-4-4', number: '4.4', title: 'Communication Interfaces' },
    ]
  },
  {
    id: 'sec-5',
    number: '5.0',
    title: 'Non-Functional Requirements',
    subsections: [
      { id: 'sec-5-1', number: '5.1', title: 'Usability & Ergonomics' },
      { id: 'sec-5-2', number: '5.2', title: 'Performance & Responsiveness' },
      { id: 'sec-5-3', number: '5.3', title: 'Reliability & Fault Handling' },
      { id: 'sec-5-4', number: '5.4', title: 'Security and Privacy' },
      { id: 'sec-5-5', number: '5.5', title: 'Accessibility (A11y)' },
      { id: 'sec-5-6', number: '5.6', title: 'Maintainability & Code Quality' },
    ]
  },
  {
    id: 'sec-6',
    number: '6.0',
    title: 'Data and System Constraints',
    subsections: [
      { id: 'sec-6-1', number: '6.1', title: 'Sample Booking Data Models' },
      { id: 'sec-6-2', number: '6.2', title: 'Simulated Bus Locations & Checkpoints' },
      { id: 'sec-6-3', number: '6.3', title: 'Demonstration ETA Predictions' },
      { id: 'sec-6-4', number: '6.4', title: 'Limitations of the Frontend Prototype' },
      { id: 'sec-6-5', number: '6.5', title: 'Future Backend & ML Dependencies' },
    ]
  },
  {
    id: 'sec-7',
    number: '7.0',
    title: 'Structured Use Cases',
    subsections: [
      { id: 'sec-7-1', number: '7.1', title: 'UC-01: Bus Service Search' },
      { id: 'sec-7-2', number: '7.2', title: 'UC-02: Route & Date Selection' },
      { id: 'sec-7-3', number: '7.3', title: 'UC-03: Demonstration Booking & Seat Selection' },
      { id: 'sec-7-4', number: '7.4', title: 'UC-04: Live Corridor Bus Tracking' },
      { id: 'sec-7-5', number: '7.5', title: 'UC-05: ETA & Delay Inspection' },
      { id: 'sec-7-6', number: '7.6', title: 'UC-06: Journey History Access' },
    ]
  },
  {
    id: 'sec-8',
    number: '8.0',
    title: 'Acceptance Criteria',
  },
  {
    id: 'sec-9',
    number: '9.0',
    title: 'Future Enhancements',
  },
  {
    id: 'sec-10',
    number: '10.0',
    title: 'Glossary',
  },
];

export const SrsDocumentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('sec-1');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const item = TOC_ITEMS[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90; // Navbar offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#171717] font-sans antialiased selection:bg-brand-orange selection:text-white">
      {/* Top Navbar */}
      <div className="no-print">
        <Navbar />
      </div>

      {/* Breadcrumb & Navigation Action Bar */}
      <div className="no-print w-full bg-white border-b border-[#D5D2CD] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Breadcrumb path */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-brand-muted">
            <Link to="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#D5D2CD]" />
            <span className="text-brand-muted">Project Documentation</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D5D2CD]" />
            <span className="text-[#171717] font-semibold">SRS</span>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F7F6F2] hover:bg-[#EAE8E2] text-[#171717] border border-[#D5D2CD] font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </Link>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold transition-colors shadow-xs"
              title="Print document or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Document Header Card */}
        <header className="bg-white border border-[#D5D2CD] p-6 sm:p-10 mb-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D5D2CD] pb-6 mb-6">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-orange block mb-1">
                MAHARASHTRA STATE ROAD TRANSPORT CORPORATION
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#171717]">
                Software Requirements Specification
              </h1>
              <p className="text-sm sm:text-base text-brand-muted mt-2 font-normal">
                MSRTC Shivneri Passenger Booking and ETA Prediction System
              </p>
            </div>

            <div className="bg-[#F7F6F2] border border-[#D5D2CD] p-4 text-xs space-y-1.5 min-w-[220px]">
              <div className="flex justify-between">
                <span className="text-brand-muted">Corridor:</span>
                <span className="font-semibold text-[#171717]">Mumbai ↔ Pune</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Document Version:</span>
                <span className="font-semibold text-[#171717]">1.0 (Prototype)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Status:</span>
                <span className="font-semibold text-emerald-700">Baseline Evaluation</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Standard:</span>
                <span className="font-semibold text-[#171717]">IEEE Std 830-1998</span>
              </div>
            </div>
          </div>

          {/* Prototype disclaimer banner */}
          <div className="bg-[#F7F6F2] border-l-4 border-brand-orange p-4 text-xs leading-relaxed text-[#171717] flex items-start gap-3">
            <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
            <div>
              <strong>Demonstration Prototype Notice:</strong> This specification documents the functional requirements, 
              architectural boundaries, and data interfaces for the current frontend passenger prototype. 
              The application simulates bus schedules, seat allocation, GPS coordinates, and arrival predictions 
              along the Mumbai-Pune Expressway without live production backend or vehicle hardware integration.
            </div>
          </div>
        </header>

        {/* Mobile TOC Accordion Button */}
        <div className="no-print lg:hidden mb-6">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full bg-white border border-[#D5D2CD] p-4 flex items-center justify-between text-left shadow-xs"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                Table of Contents (Jump to Section)
              </span>
            </div>
            {mobileMenuOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {mobileMenuOpen && (
            <div className="bg-white border-x border-b border-[#D5D2CD] p-4 space-y-1 max-h-80 overflow-y-auto text-xs shadow-md">
              {TOC_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left py-2 px-2.5 transition-colors flex items-center gap-2 ${
                    activeSection === item.id 
                      ? 'bg-brand-orange text-white font-semibold' 
                      : 'text-[#171717] hover:bg-[#F7F6F2]'
                  }`}
                >
                  <span className="font-mono">{item.number}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sticky Table of Contents (Desktop Only) */}
          <aside className="no-print hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-28 space-y-4">
            <div className="bg-white border border-[#D5D2CD] p-5 shadow-xs">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[#D5D2CD]">
                <BookOpen className="w-4 h-4 text-brand-orange" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Table of Contents
                </h2>
              </div>

              <nav className="space-y-1 text-xs max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {TOC_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <div key={item.id} className="space-y-0.5">
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left py-1.5 px-2.5 transition-colors flex items-center justify-between group ${
                          isActive
                            ? 'bg-brand-orange text-white font-semibold shadow-xs'
                            : 'text-[#171717] hover:bg-[#F7F6F2] hover:text-brand-orange'
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className={`font-mono text-[11px] ${isActive ? 'text-white' : 'text-brand-muted'}`}>
                            {item.number}
                          </span>
                          <span className="truncate">{item.title}</span>
                        </span>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                      </button>

                      {/* Subsections if active */}
                      {isActive && item.subsections && (
                        <div className="pl-4 py-1 space-y-1 border-l-2 border-brand-orange/30 ml-2">
                          {item.subsections.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => scrollToSection(sub.id)}
                              className="w-full text-left py-1 px-2 text-[11px] text-brand-muted hover:text-brand-orange transition-colors truncate block"
                            >
                              <span className="font-mono text-brand-muted mr-1.5">{sub.number}</span>
                              {sub.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="mt-4 pt-4 border-t border-[#D5D2CD]">
                <button
                  onClick={scrollToTop}
                  className="w-full py-2 bg-[#F7F6F2] hover:bg-[#EAE8E2] text-[#171717] text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#D5D2CD] transition-colors"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>

            {/* Quick Metadata Box */}
            <div className="bg-white border border-[#D5D2CD] p-4 text-[11px] text-brand-muted space-y-2">
              <div className="font-bold uppercase tracking-wider text-[#171717]">Project Details</div>
              <div><strong>Application:</strong> Shivneri Smart AI-Bus</div>
              <div><strong>Corridor:</strong> Mumbai ↔ Pune Expressway</div>
              <div><strong>Credit:</strong> TM Pranav S Shaurya S</div>
            </div>
          </aside>

          {/* Right Column: Complete Document Body */}
          <article className="lg:col-span-8 xl:col-span-9 bg-white border border-[#D5D2CD] p-6 sm:p-12 shadow-xs space-y-16 leading-relaxed">
            
            {/* ==========================================
                1.0 INTRODUCTION
            ========================================== */}
            <section id="sec-1" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 1.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  1.0 Introduction
                </h2>
              </div>

              {/* 1.1 Purpose */}
              <div id="sec-1-1" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">1.1 Purpose</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  The purpose of this Software Requirements Specification (SRS) is to formally specify the functional 
                  and non-functional requirements for the passenger-facing prototype of the <strong>Smart AI-Bus</strong> 
                  platform, developed for Maharashtra State Road Transport Corporation (MSRTC) Shivneri intercity 
                  air-conditioned coach services along the Mumbai ↔ Pune expressway corridor. This document serves 
                  as an authoritative academic and engineering reference for the prototype implementation and subsequent 
                  production iterations.
                </p>
              </div>

              {/* 1.2 Scope */}
              <div id="sec-1-2" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">1.2 Scope</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  The system encompasses a dedicated web application providing passenger search, route direction 
                  toggling between Mumbai and Pune, timetable schedule browsing, 2×2 Volvo bus seat selection, 
                  demonstration guest booking with digital boarding pass generation, local journey history, 
                  and a simulated real-time bus tracking map with estimated time of arrival (ETA) predictions.
                </p>
                <div className="bg-[#F7F6F2] border border-[#D5D2CD] p-3 text-xs text-[#555555]">
                  <strong>Out of Scope for Current Prototype:</strong> Real-time production payment gateway transactions, 
                  commercial bank settlement, central MSRTC ticketing database synchronization, physical vehicle 
                  telematics (AIS-140 GPS receiver hardware), driver dispatch consoles, and administrative fleet maintenance.
                </div>
              </div>

              {/* 1.3 Definitions, Acronyms & Abbreviations */}
              <div id="sec-1-3" className="space-y-3 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">1.3 Definitions, Acronyms, and Abbreviations</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-[#D5D2CD]">
                    <thead className="bg-[#F7F6F2] border-b border-[#D5D2CD] text-[#171717]">
                      <tr>
                        <th className="p-2.5 font-bold w-1/4">Term / Acronym</th>
                        <th className="p-2.5 font-bold">Definition</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D5D2CD] text-[#444444]">
                      <tr>
                        <td className="p-2.5 font-mono font-semibold text-[#171717]">SRS</td>
                        <td className="p-2.5">Software Requirements Specification.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-semibold text-[#171717]">MSRTC</td>
                        <td className="p-2.5">Maharashtra State Road Transport Corporation, the state-run public transport provider founded in 1948.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-semibold text-[#171717]">Shivneri</td>
                        <td className="p-2.5">The premium brand of air-conditioned Volvo/Scania intercity luxury coaches operated by MSRTC.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-semibold text-[#171717]">ETA</td>
                        <td className="p-2.5">Estimated Time of Arrival, calculated dynamically based on scheduled transit time and simulated traffic delays.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-semibold text-[#171717]">PNR</td>
                        <td className="p-2.5">Passenger Name Record, a unique alphanumeric identifier assigned to a confirmed ticket reservation.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-semibold text-[#171717]">UI</td>
                        <td className="p-2.5">User Interface, the visual front-end presented to the passenger in a web browser.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-semibold text-[#171717]">Frontend Prototype</td>
                        <td className="p-2.5">A client-side interactive implementation demonstrating end-to-end user workflows with simulated data.</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-mono font-semibold text-[#171717]">Simulated Data</td>
                        <td className="p-2.5">Mock datasets representing real-world timetables, stops, fares, and GPS coordinates without live hardware feeds.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 1.4 References */}
              <div id="sec-1-4" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">1.4 References</h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-[#444444] space-y-1">
                  <li>IEEE Std 830-1998, <em>IEEE Recommended Practice for Software Requirements Specifications</em>.</li>
                  <li>MSRTC Shivneri Official Schedule and Fare Tariff Structure (Mumbai–Pune Expressway Services).</li>
                  <li>Maharashtra State Road Development Corporation (MSRDC) Expressway Toll and Corridor Specifications.</li>
                </ul>
              </div>

              {/* 1.5 Document Overview */}
              <div id="sec-1-5" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">1.5 Document Overview</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  The remainder of this document is organized into nine further sections describing product perspective, 
                  functional requirements, interface specifications, non-functional attributes, system constraints, structured use cases, 
                  acceptance criteria, future enhancements, and an exhaustive project glossary.
                </p>
              </div>
            </section>

            {/* ==========================================
                2.0 OVERALL DESCRIPTION
            ========================================== */}
            <section id="sec-2" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 2.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  2.0 Overall Description
                </h2>
              </div>

              {/* 2.1 Product Perspective */}
              <div id="sec-2-1" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">2.1 Product Perspective</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  The Smart AI-Bus Shivneri platform is an independent, client-side web application engineered to demonstrate 
                  a state-of-the-art digital passenger experience for intercity public transportation in Maharashtra. 
                  It models the high-frequency Mumbai ↔ Pune corridor, where buses depart at 15-to-30-minute intervals 
                  between major city hubs (Dadar, Borivali, Swargate, Pune Station). The prototype presents modern search, 
                  seat visualization, simulated telemetry, and ticket issuance.
                </p>
              </div>

              {/* 2.2 Product Functions */}
              <div id="sec-2-2" className="space-y-3 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">2.2 Product Functions</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#333333]">
                  <li className="bg-[#F7F6F2] p-3 border border-[#D5D2CD]">
                    <strong className="block text-[#171717] mb-1">Direction & Route Search:</strong>
                    Bi-directional corridor selector (Mumbai → Pune, Pune → Mumbai) with origin/destination stop filtering.
                  </li>
                  <li className="bg-[#F7F6F2] p-3 border border-[#D5D2CD]">
                    <strong className="block text-[#171717] mb-1">Schedule & Fare Display:</strong>
                    Real-time visual schedule cards showing departure, arrival, duration, seat availability, and fare.
                  </li>
                  <li className="bg-[#F7F6F2] p-3 border border-[#D5D2CD]">
                    <strong className="block text-[#171717] mb-1">Interactive Seat Layout:</strong>
                    Authentic 2×2 Volvo B11R layout with window/aisle badges, booked indicators, and passenger detail capture.
                  </li>
                  <li className="bg-[#F7F6F2] p-3 border border-[#D5D2CD]">
                    <strong className="block text-[#171717] mb-1">Simulated Ticket Issuance:</strong>
                    Generation of unique PNR codes, digital boarding passes, and printable ticket summaries saved to localStorage.
                  </li>
                  <li className="bg-[#F7F6F2] p-3 border border-[#D5D2CD]">
                    <strong className="block text-[#171717] mb-1">Live Corridor Tracking:</strong>
                    Visual checkpoint progression along the expressway (Khalapur Toll, Khandala Ghat, Lonavala, Talegaon, Wakad).
                  </li>
                  <li className="bg-[#F7F6F2] p-3 border border-[#D5D2CD]">
                    <strong className="block text-[#171717] mb-1">ETA Delay Modeling:</strong>
                    Simulated congestion indicators reflecting mountain ghat weather conditions and toll plaza wait times.
                  </li>
                </ul>
              </div>

              {/* 2.3 User Classes and Characteristics */}
              <div id="sec-2-3" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">2.3 User Classes and Characteristics</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  The primary user classes include:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-[#444444] space-y-1 pl-2">
                  <li><strong>Intercity Commuters:</strong> Frequent travelers traveling between Mumbai and Pune seeking rapid timetable checks and quick seat reservation.</li>
                  <li><strong>Occasional / Tourist Passengers:</strong> Travelers requiring clear corridor details, boarding point locations, and live tracking to manage their itinerary.</li>
                  <li><strong>Technical & Academic Evaluators:</strong> Reviewers evaluating system architecture, UX hierarchy, responsive performance, and documentation compliance.</li>
                </ul>
              </div>

              {/* 2.4 Operating Environment */}
              <div id="sec-2-4" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">2.4 Operating Environment</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  The client application operates on modern standards-compliant web browsers supporting ECMAScript 2020+ 
                  and CSS3, including Google Chrome (v90+), Mozilla Firefox (v88+), Apple Safari (v14+), and Microsoft Edge (v90+) 
                  across desktop, tablet, and mobile form factors.
                </p>
              </div>

              {/* 2.5 Design & Implementation Constraints */}
              <div id="sec-2-5" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">2.5 Design and Implementation Constraints</h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-[#444444] space-y-1 pl-2">
                  <li><strong>Single-Page Architecture:</strong> Built using React 18, TypeScript, and Vite for optimal client bundle size.</li>
                  <li><strong>Typography & Color System:</strong> Strict adherence to neutral Helvetica typography and the MSRTC transport palette (#F15B2A, #171717, #F7F6F2).</li>
                  <li><strong>Zero External Backend Dependency:</strong> All state mutations and ticket storage must execute within browser memory and localStorage.</li>
                  <li><strong>Simulated Telemetry:</strong> Bus coordinate streams and delay models are deterministic mock datasets.</li>
                </ul>
              </div>

              {/* 2.6 Assumptions and Dependencies */}
              <div id="sec-2-6" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">2.6 Assumptions and Dependencies</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  It is assumed that the client device has JavaScript enabled and possesses sufficient display resolution 
                  (minimum 320px width). The application assumes access to the browser's localStorage API with at least 5MB 
                  available storage quota for local ticket retention.
                </p>
              </div>
            </section>

            {/* ==========================================
                3.0 SYSTEM FEATURES & FUNCTIONAL REQUIREMENTS
            ========================================== */}
            <section id="sec-3" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 3.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  3.0 System Features and Functional Requirements
                </h2>
              </div>

              {/* Requirement Cards */}
              <div className="space-y-5">
                
                {/* 3.1 Identification */}
                <div id="sec-3-1" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-01</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.1 Passenger Identification (Guest Checkout)</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The system shall support frictionless guest identification during booking. Mandatory passenger account registration 
                    or third-party OAuth sign-in is not required. Passenger full name, age, gender, and contact phone number shall be 
                    collected directly on the seat confirmation form.
                  </p>
                </div>

                {/* 3.2 Bus Service Search */}
                <div id="sec-3-2" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-02</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.2 Search for Bus Services</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The system shall provide interactive search controls enabling passengers to filter services by boarding terminal 
                    (e.g., Dadar Asiad, Borivali, Swargate), destination terminal, and travel date. Default parameters shall automatically 
                    reflect today's operating date and the primary corridor terminals.
                  </p>
                </div>

                {/* 3.3 Route Selection */}
                <div id="sec-3-3" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-03</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.3 Select Route Direction (Mumbai → Pune / Pune → Mumbai)</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The system shall feature two prominent route selector buttons at the top of the search interface: 
                    "MUMBAI → PUNE" and "PUNE → MUMBAI". Selecting either route shall dynamically switch the active schedule 
                    filter and swap default origin/destination terminals. Active route shall be highlighted in MSRTC orange (#F15B2A).
                  </p>
                </div>

                {/* 3.4 Schedules & Fares */}
                <div id="sec-3-4" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-04</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.4 View Sample Schedules and Fares</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The search results interface shall render available daily departures with: departure time, estimated arrival time, 
                    total transit duration (~3h 30m), coach type (Volvo Multi-Axle 2×2 AC), available seat count, live operational 
                    status badge, and standard fare (₹540 inclusive of expressway toll charges).
                  </p>
                </div>

                {/* 3.5 Select Bus Service */}
                <div id="sec-3-5" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-05</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.5 Select a Bus Service</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    Passengers shall be able to click on any listed service to inspect intermediate expressway stop sequences 
                    (Vashi, Kharghar, Khalapur, Lonavala, Wakad, Shivajinagar) and transition directly into the seat booking workflow.
                  </p>
                </div>

                {/* 3.6 Interactive Seat Selection */}
                <div id="sec-3-6" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-06</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.6 Passenger Details and Demonstration Seat Selection</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The booking view shall render a 2×2 coach seat map displaying driver cabin position, entry door, window seats, 
                    aisle seats, available seats, and occupied seats. Passengers can click available seats to select them. 
                    Input fields shall capture passenger full name, age, gender (Male/Female/Other), and contact phone number.
                  </p>
                </div>

                {/* 3.7 Review Booking */}
                <div id="sec-3-7" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-07</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.7 Review Booking Information</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    Before confirmation, the system shall display an itemized fare breakdown comprising base fare, passenger service 
                    tax (GST @ 5%), and expressway toll surcharge. Selected seat numbers, boarding terminal, and departure time shall be 
                    explicitly summarized.
                  </p>
                </div>

                {/* 3.8 Display Confirmation */}
                <div id="sec-3-8" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-08</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.8 Display Booking Confirmation & Digital Boarding Pass</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    Upon clicking "Confirm Demonstration Booking", the system shall generate a synthetic 10-character PNR 
                    (e.g., "SHV-884210"), mark selected seats as reserved, and present a digital boarding pass with bus number, 
                    reporting time, barcode/QR placeholder, and quick action links to track the bus or view journey history.
                  </p>
                </div>

                {/* 3.9 Journey History */}
                <div id="sec-3-9" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-09</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.9 View Previous Demonstration Journeys</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The "My Journeys" page (`/journeys`) shall retrieve all locally saved bookings from browser localStorage, 
                    categorizing them into active and past journeys. Users shall have controls to view ticket details, track the assigned 
                    bus, or clear demonstration booking records.
                  </p>
                </div>

                {/* 3.10 Bus Location Map */}
                <div id="sec-3-10" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-10</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.10 View a Simulated Bus Location Map</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The live tracking interface (`/track` and `/track/:id`) shall display a stylized corridor map illustrating 
                    the 150 km Mumbai-Pune Expressway with checkpoints (Dadar, Vashi, Khalapur Toll, Khandala Ghat, Lonavala, 
                    Talegaon, Wakad, Swargate). Active bus position, current speed, and distance completed shall be updated smoothly.
                  </p>
                </div>

                {/* 3.11 Predicted Arrival Time */}
                <div id="sec-3-11" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] scroll-mt-28">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">REQ-FR-11</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800">Implemented</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717]">3.11 View Predicted Arrival Time and Estimated Delay</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The tracking interface shall calculate and display the predicted arrival time alongside the original scheduled time. 
                    Estimated delays (e.g., "+12 mins delay at Khandala Ghat due to heavy traffic") shall be highlighted with informative 
                    transport badges.
                  </p>
                </div>

              </div>
            </section>

            {/* ==========================================
                4.0 EXTERNAL INTERFACE REQUIREMENTS
            ========================================== */}
            <section id="sec-4" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 4.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  4.0 External Interface Requirements
                </h2>
              </div>

              {/* 4.1 User Interface */}
              <div id="sec-4-1" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">4.1 User Interface</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  The UI is structured around a minimalist editorial transport aesthetic:
                </p>
                <ul className="list-disc list-inside text-xs sm:text-sm text-[#444444] space-y-1 pl-2">
                  <li><strong>Color Palette:</strong> MSRTC Orange (#F15B2A), Charcoal (#171717), White (#FFFFFF), Warm Off-White (#F7F6F2), and Muted Gray (#D5D2CD).</li>
                  <li><strong>Typography:</strong> Helvetica Neue, Helvetica, or system Arial. Prohibits decorative fonts, oversized headers, or unreadable weights.</li>
                  <li><strong>Navigation:</strong> Sticky charcoal header (#171717) with MSRTC logo, brand title, Book Tickets CTA, and mobile drawer menu.</li>
                  <li><strong>Responsive Breakpoints:</strong> Seamless layout scaling across 375px (mobile), 768px (tablet), and 1280px+ (desktop).</li>
                </ul>
              </div>

              {/* 4.2 Hardware Interfaces */}
              <div id="sec-4-2" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">4.2 Hardware Interfaces</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  The frontend prototype does not interact directly with server-side hardware or vehicle-mounted GPS hardware. 
                  It communicates strictly through the standard display and input hardware of client personal computers, tablets, 
                  and mobile smartphones.
                </p>
              </div>

              {/* 4.3 Software Interfaces */}
              <div id="sec-4-3" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">4.3 Software Interfaces</h3>
                <ul className="list-disc list-inside text-xs sm:text-sm text-[#444444] space-y-1 pl-2">
                  <li><strong>Web Storage API:</strong> Uses `window.localStorage` for storing mock booking records with keys prefixed by `shivneri_demo_`.</li>
                  <li><strong>History API:</strong> Managed via `react-router-dom` for declarative client-side route transitions without full page reloads.</li>
                  <li><strong>Canvas API:</strong> Utilized for rendering visual boarding pass validation effects (`canvas-confetti`).</li>
                </ul>
              </div>

              {/* 4.4 Communication Interfaces */}
              <div id="sec-4-4" className="space-y-2 scroll-mt-28">
                <h3 className="text-base font-bold text-[#171717]">4.4 Communication Interfaces</h3>
                <p className="text-xs sm:text-sm text-[#333333]">
                  The application is delivered statically over secure HTTPS protocol. Since the prototype operates autonomously 
                  in the browser, no external REST API, WebSocket, or gRPC communication endpoints are active in the current release.
                </p>
              </div>
            </section>

            {/* ==========================================
                5.0 NON-FUNCTIONAL REQUIREMENTS
            ========================================== */}
            <section id="sec-5" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 5.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  5.0 Non-Functional Requirements
                </h2>
              </div>

              <div className="space-y-4">
                
                <div id="sec-5-1" className="border-l-2 border-brand-orange pl-3.5 scroll-mt-28">
                  <h4 className="text-sm font-bold text-[#171717]">5.1 Usability & Ergonomics</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The interface shall provide clear visual affordances for all interactive controls. Form elements shall feature 
                    intuitive labels, high-contrast borders, and clear validation feedback. The booking process shall not exceed 
                    three linear steps (Search → Seat Selection & Details → Confirmation).
                  </p>
                </div>

                <div id="sec-5-2" className="border-l-2 border-brand-orange pl-3.5 scroll-mt-28">
                  <h4 className="text-sm font-bold text-[#171717]">5.2 Performance & Responsiveness</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    Client bundle assets shall be optimized using Vite production minification and tree shaking. Route changes shall 
                    render immediately without network roundtrips. Transitions and modal reveals shall execute smoothly at standard 
                    display refresh rates.
                  </p>
                </div>

                <div id="sec-5-3" className="border-l-2 border-brand-orange pl-3.5 scroll-mt-28">
                  <h4 className="text-sm font-bold text-[#171717]">5.3 Reliability & Fault Handling</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The application shall gracefully handle missing or invalid route parameters (e.g., navigating to `/track/invalid-id`) 
                    by defaulting to the primary corridor service. Client state shall survive unexpected page refreshes via localStorage.
                  </p>
                </div>

                <div id="sec-5-4" className="border-l-2 border-brand-orange pl-3.5 scroll-mt-28">
                  <h4 className="text-sm font-bold text-[#171717]">5.4 Security and Privacy</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    Because this is an evaluation prototype, no passenger personally identifiable information (PII) is transmitted 
                    over the internet or stored on external servers. All entered passenger data resides exclusively in the user's 
                    isolated browser sandbox and can be cleared instantly.
                  </p>
                </div>

                <div id="sec-5-5" className="border-l-2 border-brand-orange pl-3.5 scroll-mt-28">
                  <h4 className="text-sm font-bold text-[#171717]">5.5 Accessibility (A11y)</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    The application shall implement semantic HTML5 elements (&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;section&gt;, &lt;aside&gt;, &lt;footer&gt;), 
                    keyboard-navigable focus rings, proper heading hierarchies (H1 through H4), and sufficient text contrast against light backgrounds.
                  </p>
                </div>

                <div id="sec-5-6" className="border-l-2 border-brand-orange pl-3.5 scroll-mt-28">
                  <h4 className="text-sm font-bold text-[#171717]">5.6 Maintainability & Code Quality</h4>
                  <p className="text-xs text-[#444444] mt-1">
                    Codebase shall adhere to TypeScript strict typing, modular component segregation, descriptive prop interfaces, 
                    and clean separation between UI components, mock data generators, and routing declarations.
                  </p>
                </div>

              </div>
            </section>

            {/* ==========================================
                6.0 DATA AND SYSTEM CONSTRAINTS
            ========================================== */}
            <section id="sec-6" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 6.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  6.0 Data and System Constraints
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#333333]">
                <p id="sec-6-1" className="scroll-mt-28">
                  <strong>6.1 Sample Booking Data:</strong> The prototype utilizes a hardcoded timetable dataset reflecting 
                  realistic MSRTC Shivneri departures scheduled between 05:30 AM and 11:30 PM. Each service contains bus registration 
                  number, departure/arrival timestamps, coach model (Volvo 9600 / B11R), and real-time seat availability maps.
                </p>

                <p id="sec-6-2" className="scroll-mt-28">
                  <strong>6.2 Simulated Bus Locations:</strong> Real-time coordinates along the Mumbai-Pune Expressway are simulated 
                  using predefined route waypoints (Dadar Asiad → Chembur Maitri Park → Vashi Plaza → Kharghar → Khalapur Toll Plaza → 
                  Khandala Ghat → Lonavala Center → Talegaon Toll → Wakad Bridge → Shivajinagar → Swargate).
                </p>

                <p id="sec-6-3" className="scroll-mt-28">
                  <strong>6.3 Demonstration ETA Predictions:</strong> Arrival predictions are computed using a base duration of 
                  3 hours 30 minutes, augmented by simulated traffic delay coefficients applied to the Khandala Ghat incline and 
                  Khalapur toll plaza sectors.
                </p>

                <p id="sec-6-4" className="scroll-mt-28">
                  <strong>6.4 Limitations of the Frontend Prototype:</strong>
                </p>
                <ul className="list-disc list-inside text-xs text-[#555555] space-y-1 pl-3">
                  <li>No synchronization with the central MSRTC computerized reservation network.</li>
                  <li>No real financial transactions; credit/debit card details are not requested or processed.</li>
                  <li>Bookings exist locally; clearing browser cookies/site data removes demo reservations.</li>
                  <li>GPS positions are simulated and do not reflect physical onboard vehicle sensors.</li>
                </ul>

                <p id="sec-6-5" className="scroll-mt-28">
                  <strong>6.5 Future Backend & Machine Learning Dependencies:</strong> Production deployment will require integration with 
                  MSRTC's enterprise reservation API, real-time AIS-140 GPS telematics streams, and an AI/ML regression model 
                  trained on historical expressway traffic, weather, and toll congestion data.
                </p>
              </div>
            </section>

            {/* ==========================================
                7.0 STRUCTURED USE CASES
            ========================================== */}
            <section id="sec-7" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 7.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  7.0 Structured Use Cases
                </h2>
              </div>

              <div className="space-y-6">
                
                {/* UC-01 */}
                <div id="sec-7-1" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] space-y-2 scroll-mt-28">
                  <div className="flex items-center justify-between border-b border-[#D5D2CD] pb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">USE CASE ID: UC-01</span>
                    <span className="text-xs font-bold text-[#171717]">Searching for a Bus Service</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    <div className="font-semibold text-brand-muted">Actor:</div>
                    <div className="sm:col-span-3 text-[#171717]">Passenger / Site Visitor</div>
                    <div className="font-semibold text-brand-muted">Preconditions:</div>
                    <div className="sm:col-span-3 text-[#171717]">User has navigated to the homepage or search view.</div>
                    <div className="font-semibold text-brand-muted">Main Flow:</div>
                    <div className="sm:col-span-3 text-[#333333]">
                      1. User selects travel date and corridor direction (Mumbai → Pune or Pune → Mumbai).<br />
                      2. User chooses boarding terminal and drop-off terminal.<br />
                      3. User clicks "Search Buses".<br />
                      4. System displays matching Shivneri departures matching the corridor criteria.
                    </div>
                    <div className="font-semibold text-brand-muted">Expected Outcome:</div>
                    <div className="sm:col-span-3 text-emerald-800 font-medium">Timetable list rendered with departure times, fares, and available seat counts.</div>
                  </div>
                </div>

                {/* UC-02 */}
                <div id="sec-7-2" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] space-y-2 scroll-mt-28">
                  <div className="flex items-center justify-between border-b border-[#D5D2CD] pb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">USE CASE ID: UC-02</span>
                    <span className="text-xs font-bold text-[#171717]">Selecting Route Direction & Travel Date</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    <div className="font-semibold text-brand-muted">Actor:</div>
                    <div className="sm:col-span-3 text-[#171717]">Passenger</div>
                    <div className="font-semibold text-brand-muted">Preconditions:</div>
                    <div className="sm:col-span-3 text-[#171717]">Search form visible.</div>
                    <div className="font-semibold text-brand-muted">Main Flow:</div>
                    <div className="sm:col-span-3 text-[#333333]">
                      1. User clicks the route selector button (e.g., switches from Mumbai → Pune to Pune → Mumbai).<br />
                      2. System automatically swaps origin and destination stops.<br />
                      3. User modifies the travel date if desired.
                    </div>
                    <div className="font-semibold text-brand-muted">Expected Outcome:</div>
                    <div className="sm:col-span-3 text-emerald-800 font-medium">Form controls instantly update to reflect the opposite corridor direction.</div>
                  </div>
                </div>

                {/* UC-03 */}
                <div id="sec-7-3" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] space-y-2 scroll-mt-28">
                  <div className="flex items-center justify-between border-b border-[#D5D2CD] pb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">USE CASE ID: UC-03</span>
                    <span className="text-xs font-bold text-[#171717]">Completing a Demonstration Booking</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    <div className="font-semibold text-brand-muted">Actor:</div>
                    <div className="sm:col-span-3 text-[#171717]">Passenger</div>
                    <div className="font-semibold text-brand-muted">Preconditions:</div>
                    <div className="sm:col-span-3 text-[#171717]">User has selected a specific bus service.</div>
                    <div className="font-semibold text-brand-muted">Main Flow:</div>
                    <div className="sm:col-span-3 text-[#333333]">
                      1. User inspects 2×2 Volvo seat map and clicks one or more available seats.<br />
                      2. User inputs passenger name, age, gender, and phone number.<br />
                      3. User reviews itemized fare summary (base fare + GST + toll surcharge).<br />
                      4. User clicks "Confirm Demonstration Booking".
                    </div>
                    <div className="font-semibold text-brand-muted">Expected Outcome:</div>
                    <div className="sm:col-span-3 text-emerald-800 font-medium">Booking confirmation generated with unique PNR and digital boarding pass stored locally.</div>
                    <div className="font-semibold text-brand-muted">Alternative Flow:</div>
                    <div className="sm:col-span-3 text-[#555555]">If required fields are empty, validation errors highlight missing inputs.</div>
                  </div>
                </div>

                {/* UC-04 */}
                <div id="sec-7-4" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] space-y-2 scroll-mt-28">
                  <div className="flex items-center justify-between border-b border-[#D5D2CD] pb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">USE CASE ID: UC-04</span>
                    <span className="text-xs font-bold text-[#171717]">Tracking a Selected Bus on the Corridor Map</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    <div className="font-semibold text-brand-muted">Actor:</div>
                    <div className="sm:col-span-3 text-[#171717]">Passenger</div>
                    <div className="font-semibold text-brand-muted">Preconditions:</div>
                    <div className="sm:col-span-3 text-[#171717]">User navigates to `/track` or clicks "Track Bus" from a ticket.</div>
                    <div className="font-semibold text-brand-muted">Main Flow:</div>
                    <div className="sm:col-span-3 text-[#333333]">
                      1. System renders corridor map showing expressway checkpoints.<br />
                      2. Active bus marker reflects simulated progress along the route.<br />
                      3. Checkpoints change color from upcoming to completed as the bus advances.
                    </div>
                    <div className="font-semibold text-brand-muted">Expected Outcome:</div>
                    <div className="sm:col-span-3 text-emerald-800 font-medium">Clear visual representation of current transit status and next scheduled stop.</div>
                  </div>
                </div>

                {/* UC-05 */}
                <div id="sec-7-5" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] space-y-2 scroll-mt-28">
                  <div className="flex items-center justify-between border-b border-[#D5D2CD] pb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">USE CASE ID: UC-05</span>
                    <span className="text-xs font-bold text-[#171717]">Viewing Predicted Arrival Time & Estimated Delay</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    <div className="font-semibold text-brand-muted">Actor:</div>
                    <div className="sm:col-span-3 text-[#171717]">Passenger</div>
                    <div className="font-semibold text-brand-muted">Preconditions:</div>
                    <div className="sm:col-span-3 text-[#171717]">Tracking page active.</div>
                    <div className="font-semibold text-brand-muted">Main Flow:</div>
                    <div className="sm:col-span-3 text-[#333333]">
                      1. System compares scheduled arrival timestamp with simulated traffic conditions.<br />
                      2. If delay exists, an orange warning badge details the delay source (e.g., Ghat traffic).<br />
                      3. Dynamic ETA updates to show revised expected arrival time.
                    </div>
                    <div className="font-semibold text-brand-muted">Expected Outcome:</div>
                    <div className="sm:col-span-3 text-emerald-800 font-medium">Passenger views transparent, dynamic ETA accounting for simulated route conditions.</div>
                  </div>
                </div>

                {/* UC-06 */}
                <div id="sec-7-6" className="border border-[#D5D2CD] p-4 bg-[#FDFDFD] space-y-2 scroll-mt-28">
                  <div className="flex items-center justify-between border-b border-[#D5D2CD] pb-2">
                    <span className="text-xs font-mono font-bold text-brand-orange">USE CASE ID: UC-06</span>
                    <span className="text-xs font-bold text-[#171717]">Accessing Previous Demonstration Journeys</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                    <div className="font-semibold text-brand-muted">Actor:</div>
                    <div className="sm:col-span-3 text-[#171717]">Passenger</div>
                    <div className="font-semibold text-brand-muted">Preconditions:</div>
                    <div className="sm:col-span-3 text-[#171717]">At least one demonstration booking completed previously on the same browser.</div>
                    <div className="font-semibold text-brand-muted">Main Flow:</div>
                    <div className="sm:col-span-3 text-[#333333]">
                      1. User clicks "My Journeys" in the header navigation.<br />
                      2. System reads stored reservations from `localStorage`.<br />
                      3. User views past boarding passes with PNR, seats, and simulated status.
                    </div>
                    <div className="font-semibold text-brand-muted">Expected Outcome:</div>
                    <div className="sm:col-span-3 text-emerald-800 font-medium">Complete personal journey history rendered cleanly with active/completed classifications.</div>
                  </div>
                </div>

              </div>
            </section>

            {/* ==========================================
                8.0 ACCEPTANCE CRITERIA
            ========================================== */}
            <section id="sec-8" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 8.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  8.0 Acceptance Criteria
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-[#D5D2CD]">
                  <thead className="bg-[#F7F6F2] border-b border-[#D5D2CD] text-[#171717]">
                    <tr>
                      <th className="p-2.5 font-bold w-16">ID</th>
                      <th className="p-2.5 font-bold w-1/4">Feature Area</th>
                      <th className="p-2.5 font-bold">Acceptance Criterion</th>
                      <th className="p-2.5 font-bold w-20 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D5D2CD] text-[#444444]">
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-01</td>
                      <td className="p-2.5 font-semibold text-[#171717]">Corridor Route Switcher</td>
                      <td className="p-2.5">Clicking "PUNE → MUMBAI" swaps origin/destination and filters departures to reverse direction.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-02</td>
                      <td className="p-2.5 font-semibold text-[#171717]">Full-Bleed Hero Video</td>
                      <td className="p-2.5">Hero bus video spans 100% viewport width without horizontal overflow or black sidebars.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-03</td>
                      <td className="p-2.5 font-semibold text-[#171717]">Sticky Charcoal Navbar</td>
                      <td className="p-2.5">Navbar sits above hero video without covering it; stays sticky on scroll with MSRTC branding.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-04</td>
                      <td className="p-2.5 font-semibold text-[#171717]">Interactive Seat Map</td>
                      <td className="p-2.5">Volvo 2×2 layout displays available, selected, and occupied seats. Clicking an available seat toggles its selected state.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-05</td>
                      <td className="p-2.5 font-semibold text-[#171717]">Fare Calculation</td>
                      <td className="p-2.5">Base fare, 5% GST, and expressway toll surcharge are computed dynamically based on the number of selected seats.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-06</td>
                      <td className="p-2.5 font-semibold text-[#171717]">PNR & Boarding Pass</td>
                      <td className="p-2.5">Successful booking produces a valid 10-character PNR and stores the complete journey record in localStorage.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-07</td>
                      <td className="p-2.5 font-semibold text-[#171717]">Corridor Live Map</td>
                      <td className="p-2.5">Expressway checkpoints render in sequential order; active bus checkpoint advances according to simulated travel.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-08</td>
                      <td className="p-2.5 font-semibold text-[#171717]">My Journeys Persistence</td>
                      <td className="p-2.5">Navigating to `/journeys` displays all previously confirmed bookings with ability to view details.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-09</td>
                      <td className="p-2.5 font-semibold text-[#171717]">SRS Documentation Page</td>
                      <td className="p-2.5">Page `/srs` accessible via footer link; contains structured sections, sticky TOC, and print stylesheet.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-mono font-bold text-[#171717]">AC-10</td>
                      <td className="p-2.5 font-semibold text-[#171717]">Team Author Credit</td>
                      <td className="p-2.5">Footer displays the exact credit text "TM Pranav S Shaurya S" without extraneous prefixes or alterations.</td>
                      <td className="p-2.5 text-center text-emerald-700 font-bold">PASS</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* ==========================================
                9.0 FUTURE ENHANCEMENTS
            ========================================== */}
            <section id="sec-9" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 9.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  9.0 Future Enhancements
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#333333]">
                <div className="p-4 bg-[#F7F6F2] border border-[#D5D2CD] space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-brand-orange block text-[11px]">Enhancement 01</span>
                  <h4 className="font-bold text-[#171717] text-sm">Central Reservation System (CRS) API</h4>
                  <p className="text-[#555555]">
                    Integration with the official MSRTC enterprise ticketing backend for real-time inventory locking, 
                    concession eligibility (senior citizens, students), and government transport subsidy verification.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F6F2] border border-[#D5D2CD] space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-brand-orange block text-[11px]">Enhancement 02</span>
                  <h4 className="font-bold text-[#171717] text-sm">AIS-140 GPS Vehicle Telematics</h4>
                  <p className="text-[#555555]">
                    Replacement of simulated coordinates with live high-frequency telemetry ingested from Government of India 
                    mandated AIS-140 onboard vehicle tracking units (VTUs) fitted on all Shivneri coaches.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F6F2] border border-[#D5D2CD] space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-brand-orange block text-[11px]">Enhancement 03</span>
                  <h4 className="font-bold text-[#171717] text-sm">Machine Learning ETA Regression Engine</h4>
                  <p className="text-[#555555]">
                    Deployment of an AI/ML regression model trained on historical Mumbai–Pune travel logs, real-time weather feeds 
                    (monsoon landslide risks at Bhor Ghat), and FASTag electronic toll collection plaza wait times.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F6F2] border border-[#D5D2CD] space-y-1.5">
                  <span className="font-bold uppercase tracking-wider text-brand-orange block text-[11px]">Enhancement 04</span>
                  <h4 className="font-bold text-[#171717] text-sm">Multi-Modal Passenger Notifications</h4>
                  <p className="text-[#555555]">
                    Automated delivery of digital boarding passes, gate changes, and live departure delay alerts via 
                    WhatsApp Business API, SMS gateway, and native push notifications.
                  </p>
                </div>
              </div>
            </section>

            {/* ==========================================
                10.0 GLOSSARY
            ========================================== */}
            <section id="sec-10" className="space-y-6 scroll-mt-28">
              <div className="border-b-2 border-[#171717] pb-2">
                <span className="text-xs font-mono font-bold text-brand-orange">SECTION 10.0</span>
                <h2 className="text-2xl font-bold tracking-tight text-[#171717] mt-0.5">
                  10.0 Glossary
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#333333]">
                <div className="p-3 border border-[#D5D2CD]">
                  <strong className="block text-[#171717] font-mono text-sm mb-0.5">SRS</strong>
                  <span className="text-[#555555]">
                    Software Requirements Specification; formal document establishing complete functional and operational scope.
                  </span>
                </div>

                <div className="p-3 border border-[#D5D2CD]">
                  <strong className="block text-[#171717] font-mono text-sm mb-0.5">MSRTC</strong>
                  <span className="text-[#555555]">
                    Maharashtra State Road Transport Corporation; India's largest state transport undertaking, founded in 1948.
                  </span>
                </div>

                <div className="p-3 border border-[#D5D2CD]">
                  <strong className="block text-[#171717] font-mono text-sm mb-0.5">Shivneri</strong>
                  <span className="text-[#555555]">
                    MSRTC's premier fleet of air-conditioned luxury Volvo coaches connecting major economic hubs across Maharashtra.
                  </span>
                </div>

                <div className="p-3 border border-[#D5D2CD]">
                  <strong className="block text-[#171717] font-mono text-sm mb-0.5">ETA</strong>
                  <span className="text-[#555555]">
                    Estimated Time of Arrival; predicted arrival timestamp dynamically adjusted for corridor traffic factors.
                  </span>
                </div>

                <div className="p-3 border border-[#D5D2CD]">
                  <strong className="block text-[#171717] font-mono text-sm mb-0.5">UI</strong>
                  <span className="text-[#555555]">
                    User Interface; visual elements, input controls, and aesthetic hierarchy presented to end users.
                  </span>
                </div>

                <div className="p-3 border border-[#D5D2CD]">
                  <strong className="block text-[#171717] font-mono text-sm mb-0.5">Frontend Prototype</strong>
                  <span className="text-[#555555]">
                    Client-side evaluation system demonstrating UX workflows without reliance on production backend servers.
                  </span>
                </div>

                <div className="p-3 border border-[#D5D2CD]">
                  <strong className="block text-[#171717] font-mono text-sm mb-0.5">Simulated Data</strong>
                  <span className="text-[#555555]">
                    Synthetic but structurally accurate schedules, telemetry waypoints, and seat maps used for demonstration.
                  </span>
                </div>

                <div className="p-3 border border-[#D5D2CD]">
                  <strong className="block text-[#171717] font-mono text-sm mb-0.5">Ghat Section</strong>
                  <span className="text-[#555555]">
                    The mountainous Khandala/Bhor Ghat incline on the expressway prone to seasonal delays and heavy vehicle crawl.
                  </span>
                </div>
              </div>
            </section>

            {/* Document Signature & Authorship Footer */}
            <div className="border-t-2 border-[#171717] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
              <div>
                <span className="font-semibold text-[#171717]">Document Reference:</span> SRS-MSRTC-SHIVNERI-2026-V1
              </div>
              <div className="font-mono text-[#171717] font-bold">
                TM Pranav S Shaurya S
              </div>
            </div>

          </article>
        </div>

      </main>

      {/* Footer */}
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
};
