import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Bhor Ghat Heavy Congestion Buffer',
    message: 'AI ETA algorithm updated: Service MH-01-CV-3310 (Mumbai → Pune) +14m buffer applied due to slow-moving container trucks near Khandala exit.',
    type: 'delay',
    timestamp: '3 mins ago',
    isRead: false,
    busId: 'shv-105',
    severity: 'alert'
  },
  {
    id: 'notif-2',
    title: 'Approaching Wakad Hinjawadi Bridge',
    message: 'Bus MH-12-RN-4821 is currently crossing Somatane Phata at 78 km/h. Next scheduled passenger drop at Wakad in ~11 mins.',
    type: 'arrival',
    timestamp: '14 mins ago',
    isRead: false,
    busId: 'shv-101',
    severity: 'normal'
  },
  {
    id: 'notif-3',
    title: 'Expressway Weather Advisory: Light Mist',
    message: 'Sensors at KM 42–48 report 85% humidity and intermittent fog. Smart Speed Limiter telemetry verified at safe 50 km/h in descent zone.',
    type: 'highway_alert',
    timestamp: '28 mins ago',
    isRead: false,
    severity: 'warning'
  },
  {
    id: 'notif-4',
    title: 'Boarding Ready: Dadar Asiad Terminal',
    message: 'E-Shivneri MH-14-BT-9104 is docked at Platform 2. Pre-departure AC cabin climate pre-cooled to 22°C.',
    type: 'arrival',
    timestamp: '45 mins ago',
    isRead: true,
    busId: 'shv-103',
    severity: 'normal'
  },
  {
    id: 'notif-5',
    title: 'AI Smart Route Optimization Active',
    message: 'Dynamic fastag toll prediction selected Lane 4 at Khalapur Plaza, saving approximately 4.2 minutes of queue wait.',
    type: 'eta_update',
    timestamp: '1 hour ago',
    isRead: true,
    severity: 'normal'
  }
];
