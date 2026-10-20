import React, { createContext, useContext, useState, useEffect } from 'react';
import { BusService, Direction, Booking, NotificationItem } from '../types';
import { INITIAL_BUSES } from '../data/mockBuses';
import { INITIAL_NOTIFICATIONS } from '../data/mockNotifications';
import { INITIAL_JOURNEYS } from '../data/mockJourneys';
import { CORRIDOR_STOPS } from '../data/corridor';

interface AppContextType {
  buses: BusService[];
  direction: Direction;
  setDirection: (dir: Direction) => void;
  swapDirection: () => void;
  searchParams: {
    from: string;
    to: string;
    date: string;
  };
  setSearchParams: (params: { from: string; to: string; date: string }) => void;
  selectedBusId: string | null;
  setSelectedBusId: (id: string | null) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
  isSimulating: boolean;
  toggleSimulation: () => void;
  resetSimulation: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const BOOKINGS_STORAGE_KEY = 'shivneri_smart_bus_bookings';
const NOTIFICATIONS_STORAGE_KEY = 'shivneri_smart_bus_notifications';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buses, setBuses] = useState<BusService[]>(INITIAL_BUSES);
  const [direction, setDirection] = useState<Direction>('mumbai-to-pune');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [selectedBusId, setSelectedBusId] = useState<string | null>('shv-101');

  // Today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const [searchParams, setSearchParams] = useState({
    from: 'Dadar (Asiad Terminal)',
    to: 'Swargate (Shivneri Stand)',
    date: todayStr
  });

  // Bookings state initialized from localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading bookings from localStorage', e);
    }
    return INITIAL_JOURNEYS;
  });

  // Notifications state initialized from localStorage
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading notifications from localStorage', e);
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Save bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Error saving bookings to localStorage', e);
    }
  }, [bookings]);

  // Save notifications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
    } catch (e) {
      console.error('Error saving notifications to localStorage', e);
    }
  }, [notifications]);

  // Swap direction convenience helper
  const swapDirection = () => {
    const newDir: Direction = direction === 'mumbai-to-pune' ? 'pune-to-mumbai' : 'mumbai-to-pune';
    setDirection(newDir);
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  // Add booking
  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  // Cancel booking
  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.bookingId === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );
  };

  // Mark single notification read
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Mark all notifications read
  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  const toggleSimulation = () => setIsSimulating(prev => !prev);
  const resetSimulation = () => setBuses(INITIAL_BUSES);

  // Real-time simulated telemetry engine: advances active buses smoothly along the expressway
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setBuses(prevBuses => {
        return prevBuses.map(bus => {
          // If scheduled or arrived, minimal change
          if (bus.progressPercent >= 98) {
            return {
              ...bus,
              currentStatus: 'Arrived',
              speedKmH: 0,
              currentLocationName: `${bus.destination} Arrival Bay`,
              nextStopName: 'Journey Completed',
              lastUpdated: 'Just now'
            };
          }

          // Advance progress slightly (0.4% to 0.9% per tick)
          const increment = bus.speedKmH > 60 ? 0.6 : (bus.speedKmH > 35 ? 0.4 : 0.2);
          const newProgress = Math.min(99, bus.progressPercent + increment);

          // Calculate current stop and next stop based on progress
          const stops = bus.direction === 'mumbai-to-pune' 
            ? CORRIDOR_STOPS 
            : [...CORRIDOR_STOPS].reverse();

          const stopCount = stops.length;
          const currentIdx = Math.min(
            stopCount - 1,
            Math.floor((newProgress / 100) * stopCount)
          );
          const nextIdx = Math.min(stopCount - 1, currentIdx + 1);

          // Simulated dynamic speed based on location
          let speed = 72;
          let ghatInfo = bus.ghatCondition;
          if (newProgress >= 40 && newProgress <= 65) {
            // Bhor Ghat section
            speed = Math.floor(38 + Math.sin(Date.now() / 2000) * 8);
            ghatInfo = 'Ghat descent telemetry active: 45 km/h electronic governor';
          } else if (newProgress < 20 || newProgress > 85) {
            // City approaches
            speed = Math.floor(45 + Math.sin(Date.now() / 3000) * 12);
          } else {
            // High speed expressway section
            speed = Math.floor(75 + Math.sin(Date.now() / 1500) * 6);
          }

          return {
            ...bus,
            progressPercent: Number(newProgress.toFixed(1)),
            currentStopIndex: currentIdx,
            currentLocationName: `KM ${Math.round((newProgress / 100) * 168)} • Near ${stops[currentIdx].name}`,
            nextStopName: stops[nextIdx]?.name || stops[currentIdx].name,
            speedKmH: speed,
            ghatCondition: ghatInfo,
            lastUpdated: 'Just now'
          };
        });
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <AppContext.Provider
      value={{
        buses,
        direction,
        setDirection,
        swapDirection,
        searchParams,
        setSearchParams,
        selectedBusId,
        setSelectedBusId,
        bookings,
        addBooking,
        cancelBooking,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        isSimulating,
        toggleSimulation,
        resetSimulation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
