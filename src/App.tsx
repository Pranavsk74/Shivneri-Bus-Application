import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { BusDetails } from './pages/BusDetails';
import { LiveTracking } from './pages/LiveTracking';
import { BookingPage } from './pages/Booking';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { MyJourneys } from './pages/MyJourneys';
import { NotificationsPage } from './pages/Notifications';
import { SrsDocumentation } from './pages/SrsDocumentation';

// Helper to scroll window to top on route transition
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/bus/:id" element={<BusDetails />} />
          <Route path="/track" element={<LiveTracking />} />
          <Route path="/track/:id" element={<LiveTracking />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/booking/confirmation/:bookingId" element={<BookingConfirmation />} />
          <Route path="/journeys" element={<MyJourneys />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/srs" element={<SrsDocumentation />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
