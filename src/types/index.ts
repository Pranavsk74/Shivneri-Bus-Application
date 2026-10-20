export type Direction = 'mumbai-to-pune' | 'pune-to-mumbai';

export interface RouteStop {
  id: string;
  name: string;
  city: 'Mumbai' | 'Navi Mumbai' | 'Raigad' | 'Pune';
  shortCode: string;
  landmark: string;
  isKeyHub: boolean;
  distanceFromMumbaiKm: number;
  // Normalized 0-100 coordinates for the custom vector corridor map
  mapCoord: { x: number; y: number };
}

export type BusStatusType = 'On Time' | 'Minor Delay' | 'Heavy Ghat Traffic' | 'Departing Soon' | 'Arrived';

export interface BusService {
  id: string;
  busNumber: string;
  serviceCode: string;
  serviceName: string;
  busType: 'Scania Multi-Axle 2x2 AC' | 'Volvo B11R Air-Suspension' | 'E-Shivneri Smart Electric AC';
  direction: Direction;
  departureTime: string;
  scheduledArrivalTime: string;
  duration: string;
  baseFare: number;
  amenities: string[];
  totalSeats: number;
  availableSeats: number;
  currentStatus: BusStatusType;
  delayMinutes: number;
  aiPredictedArrival: string;
  aiConfidenceScore: number;
  currentStopIndex: number;
  currentLocationName: string;
  nextStopName: string;
  progressPercent: number; // 0 to 100 along the route
  speedKmH: number;
  driverName: string;
  ghatCondition: string;
  lastUpdated: string;
  origin: string;
  destination: string;
}

export interface StopSchedule {
  stopId: string;
  stopName: string;
  scheduledTime: string;
  aiPredictedTime: string;
  status: 'passed' | 'current' | 'upcoming';
  delayText: string;
}

export interface Seat {
  id: string;
  seatNumber: string;
  row: number;
  col: number; // 1: Window L, 2: Aisle L, 3: Aisle R, 4: Window R
  status: 'available' | 'occupied' | 'female_reserved' | 'selected';
  price: number;
}

export interface Passenger {
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatNumber: string;
}

export interface Booking {
  bookingId: string;
  bookingReference: string;
  serviceId: string;
  serviceName: string;
  busNumber: string;
  direction: Direction;
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
  boardingStop: string;
  dropStop: string;
  passengers: Passenger[];
  seats: string[];
  baseFare: number;
  taxAndGst: number;
  totalAmount: number;
  status: 'CONFIRMED' | 'CANCELLED';
  bookedAt: string;
  qrCodeData: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'delay' | 'eta_update' | 'arrival' | 'highway_alert';
  timestamp: string;
  isRead: boolean;
  busId?: string;
  severity: 'normal' | 'warning' | 'alert';
}
