import { Booking } from '../types';

export const INITIAL_JOURNEYS: Booking[] = [
  {
    bookingId: 'demo-bkg-1',
    bookingReference: 'SHV-2026-MUMPUN-9428',
    serviceId: 'shv-101',
    serviceName: 'Shivneri Scania Multi-Axle AC',
    busNumber: 'MH-12-RN-4821',
    direction: 'mumbai-to-pune',
    travelDate: '2026-10-19',
    departureTime: '06:00 AM',
    arrivalTime: '09:45 AM',
    boardingStop: 'Dadar (Asiad Terminal)',
    dropStop: 'Wakad (Hinjawadi Flyover Bridge)',
    passengers: [
      {
        fullName: 'Rahul S. Deshpande',
        age: 32,
        gender: 'male',
        seatNumber: '14'
      },
      {
        fullName: 'Pooja R. Deshpande',
        age: 29,
        gender: 'female',
        seatNumber: '15'
      }
    ],
    seats: ['14', '15'],
    baseFare: 1040,
    taxAndGst: 52,
    totalAmount: 1092,
    status: 'CONFIRMED',
    bookedAt: '2026-10-18T14:30:00.000Z',
    qrCodeData: 'SHV-2026-MUMPUN-9428|MH12RN4821|DDR-WKD|14,15|CONFIRMED'
  },
  {
    bookingId: 'demo-bkg-2',
    bookingReference: 'SHV-2026-PUNMUM-3185',
    serviceId: 'shv-205',
    serviceName: 'E-Shivneri Smart Electric AC',
    busNumber: 'MH-01-AK-1290',
    direction: 'pune-to-mumbai',
    travelDate: '2026-10-12',
    departureTime: '09:00 AM',
    arrivalTime: '12:40 PM',
    boardingStop: 'Swargate (Shivneri Stand)',
    dropStop: 'Dadar (Asiad Terminal)',
    passengers: [
      {
        fullName: 'Rahul S. Deshpande',
        age: 32,
        gender: 'male',
        seatNumber: '7'
      }
    ],
    seats: ['7'],
    baseFare: 540,
    taxAndGst: 27,
    totalAmount: 567,
    status: 'CONFIRMED',
    bookedAt: '2026-10-11T18:20:00.000Z',
    qrCodeData: 'SHV-2026-PUNMUM-3185|MH01AK1290|SWG-DDR|7|COMPLETED'
  }
];
