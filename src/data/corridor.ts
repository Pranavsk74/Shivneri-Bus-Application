import { RouteStop } from '../types';

// Authentic Mumbai-Pune Expressway & Old Highway Key Corridors & Stoppages
export const CORRIDOR_STOPS: RouteStop[] = [
  {
    id: 'dadar',
    name: 'Dadar (Asiad Terminal)',
    city: 'Mumbai',
    shortCode: 'DDR',
    landmark: 'Near Swami Narayan Mandir / TT Circle',
    isKeyHub: true,
    distanceFromMumbaiKm: 0,
    mapCoord: { x: 8, y: 22 }
  },
  {
    id: 'sion',
    name: 'Sion (Maitri Park / Circle)',
    city: 'Mumbai',
    shortCode: 'SIN',
    landmark: 'Eastern Express Highway Bridge',
    isKeyHub: false,
    distanceFromMumbaiKm: 6,
    mapCoord: { x: 14, y: 27 }
  },
  {
    id: 'chembur',
    name: 'Chembur (Yogi Restaurant / Amar Mahal)',
    city: 'Mumbai',
    shortCode: 'CHM',
    landmark: 'Sion-Panvel Expressway Start',
    isKeyHub: false,
    distanceFromMumbaiKm: 12,
    mapCoord: { x: 20, y: 31 }
  },
  {
    id: 'vashi',
    name: 'Vashi (Highway Plaza)',
    city: 'Navi Mumbai',
    shortCode: 'VSH',
    landmark: 'Vashi Toll Naka / Old Octroi Post',
    isKeyHub: true,
    distanceFromMumbaiKm: 24,
    mapCoord: { x: 27, y: 37 }
  },
  {
    id: 'nerul',
    name: 'Nerul (LP Factory)',
    city: 'Navi Mumbai',
    shortCode: 'NRL',
    landmark: 'London Pilsner Flyover Junction',
    isKeyHub: false,
    distanceFromMumbaiKm: 32,
    mapCoord: { x: 33, y: 43 }
  },
  {
    id: 'belapur',
    name: 'CBD Belapur (Konkan Bhavan)',
    city: 'Navi Mumbai',
    shortCode: 'BLP',
    landmark: 'Opposite State Bank Bhavan',
    isKeyHub: false,
    distanceFromMumbaiKm: 38,
    mapCoord: { x: 38, y: 48 }
  },
  {
    id: 'kharghar',
    name: 'Kharghar (Three Star Hotel)',
    city: 'Navi Mumbai',
    shortCode: 'KHG',
    landmark: 'Hiranandani Bridge Service Road',
    isKeyHub: false,
    distanceFromMumbaiKm: 44,
    mapCoord: { x: 44, y: 53 }
  },
  {
    id: 'kalamboli',
    name: 'Kalamboli / Panvel (McD Circle)',
    city: 'Raigad',
    shortCode: 'PNV',
    landmark: 'Mumbai-Pune Expressway Toll Entry Point',
    isKeyHub: true,
    distanceFromMumbaiKm: 52,
    mapCoord: { x: 50, y: 58 }
  },
  {
    id: 'khalapur',
    name: 'Khalapur Toll Plaza (Food Mall)',
    city: 'Raigad',
    shortCode: 'KHL',
    landmark: 'Expwy KM 32 / Expressway Food Court',
    isKeyHub: false,
    distanceFromMumbaiKm: 76,
    mapCoord: { x: 57, y: 64 }
  },
  {
    id: 'lonavala',
    name: 'Lonavala (Khandala Ghat Exit / Center)',
    city: 'Pune',
    shortCode: 'LNV',
    landmark: 'Bhor Ghat Summit / Expressway Bypass',
    isKeyHub: true,
    distanceFromMumbaiKm: 98,
    mapCoord: { x: 65, y: 69 }
  },
  {
    id: 'talegaon',
    name: 'Talegaon Toll Plaza (Urse)',
    city: 'Pune',
    shortCode: 'TLG',
    landmark: 'Urse Food Plaza & Toll Barrier',
    isKeyHub: false,
    distanceFromMumbaiKm: 124,
    mapCoord: { x: 73, y: 74 }
  },
  {
    id: 'somatane',
    name: 'Somatane Phata',
    city: 'Pune',
    shortCode: 'SMT',
    landmark: 'Dehu Road Junction',
    isKeyHub: false,
    distanceFromMumbaiKm: 135,
    mapCoord: { x: 79, y: 77 }
  },
  {
    id: 'wakad',
    name: 'Wakad (Hinjawadi Flyover Bridge)',
    city: 'Pune',
    shortCode: 'WKD',
    landmark: 'Ginger Hotel / Hinjawadi IT Park Junction',
    isKeyHub: true,
    distanceFromMumbaiKm: 148,
    mapCoord: { x: 86, y: 80 }
  },
  {
    id: 'chandani-chowk',
    name: 'Chandani Chowk (Bavdhan)',
    city: 'Pune',
    shortCode: 'CCK',
    landmark: 'NDA Road / Kothrud Flyover',
    isKeyHub: false,
    distanceFromMumbaiKm: 158,
    mapCoord: { x: 91, y: 84 }
  },
  {
    id: 'swargate',
    name: 'Swargate (Shivneri Stand)',
    city: 'Pune',
    shortCode: 'SWG',
    landmark: 'Shivaji Road / MSRTC Central Hub',
    isKeyHub: true,
    distanceFromMumbaiKm: 168,
    mapCoord: { x: 96, y: 88 }
  }
];

// Helper to calculate stop-by-stop schedule for a specific service departure
export function generateStopSchedules(
  direction: 'mumbai-to-pune' | 'pune-to-mumbai',
  departureTimeString: string,
  progressPercent: number,
  delayMinutes: number
) {
  // Parse departure time
  const [timePart, modifier] = departureTimeString.split(' ');
  const [hoursStr, minutesStr] = timePart.split(':');
  let baseHour = parseInt(hoursStr, 10);
  const baseMinutes = parseInt(minutesStr, 10);
  if (modifier === 'PM' && baseHour < 12) baseHour += 12;
  if (modifier === 'AM' && baseHour === 12) baseHour = 0;

  const baseTotalMinutes = baseHour * 60 + baseMinutes;

  const stopsList = direction === 'mumbai-to-pune' ? [...CORRIDOR_STOPS] : [...CORRIDOR_STOPS].reverse();
  const totalKm = 168;

  return stopsList.map((stop, idx) => {
    const km = direction === 'mumbai-to-pune' 
      ? stop.distanceFromMumbaiKm 
      : (totalKm - stop.distanceFromMumbaiKm);

    // Approximate travel duration in minutes based on expressway average speeds (approx 55-65 km/h with ghat)
    const travelMinutes = Math.round((km / totalKm) * 225); // 3h 45m total
    const schedMins = (baseTotalMinutes + travelMinutes) % 1440;
    const aiMins = (schedMins + delayMinutes) % 1440;

    const formatTime = (mins: number) => {
      const h = Math.floor(mins / 60) % 24;
      const m = mins % 60;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 === 0 ? 12 : h % 12;
      return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
    };

    const stopProgressPercent = (idx / (stopsList.length - 1)) * 100;
    let status: 'passed' | 'current' | 'upcoming' = 'upcoming';
    if (progressPercent >= stopProgressPercent + 4) {
      status = 'passed';
    } else if (Math.abs(progressPercent - stopProgressPercent) < 7) {
      status = 'current';
    }

    return {
      stopId: stop.id,
      stopName: stop.name,
      scheduledTime: formatTime(schedMins),
      aiPredictedTime: formatTime(aiMins),
      status,
      delayText: delayMinutes > 0 ? `+${delayMinutes}m AI ETA` : 'On Time'
    };
  });
}
