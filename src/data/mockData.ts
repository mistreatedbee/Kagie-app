export interface Accommodation {
  id: string;
  name: string;
  city: string;
  institution: string;
  distance: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  roomTypes: ('single' | 'shared' | 'studio')[];
  description: string;
  location: {lat: number;lng: number;};
  address: string;
  unavailableDates?: string[];
  minNights?: number;
  host?: { name: string; avatar?: string; verified?: boolean; responseTime?: string };
  reviewsList?: { id: string; author: string; rating: number; date: string; text: string }[];
}

export const accommodations: Accommodation[] = [
{
  id: '1',
  name: 'Campus View Residence',
  city: 'Mbombela',
  institution: 'University of Mpumalanga',
  distance: '1.2 km from campus',
  price: 2800,
  rating: 4.8,
  reviews: 124,
  images: [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1e525044c7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'],

  amenities: ['wifi', 'security', 'parking', 'furnished'],
  roomTypes: ['single', 'shared'],
  description:
  'Modern student living just steps away from the University of Mpumalanga. Features fully furnished rooms, secure 24/7 access, on-site parking, and a quiet environment perfect for studying.',
  location: { lat: -25.4658, lng: 30.9854 },
  address: 'Near University of Mpumalanga, Mbombela',
  unavailableDates: ['2026-05-10','2026-05-11','2026-05-20'],
  minNights: 28,
  host: { name: 'Lerato', avatar: '', verified: true, responseTime: 'within 2 hours' },
  reviewsList: [
    { id: 'r1', author: 'Sipho', rating: 5, date: '2025-11-03', text: 'Great place, close to campus.' },
    { id: 'r2', author: 'Aisha', rating: 4, date: '2025-09-21', text: 'Comfortable and quiet.' }
  ]
},
{
  id: '2',
  name: 'Green Valley Student Lodge',
  city: 'Nelspruit',
  institution: 'University of Mpumalanga',
  distance: '2.5 km from campus',
  price: 2200,
  rating: 4.5,
  reviews: 89,
  images: [
  'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80'],

  amenities: ['wifi', 'security', 'laundry'],
  roomTypes: ['shared', 'single'],
  description:
  'Affordable student lodge in central Nelspruit with a friendly, social atmosphere. Includes high-speed WiFi, on-site laundry facilities, and round-the-clock security.',
  location: { lat: -25.4753, lng: 30.9694 },
  address: 'Nelspruit Central, Mpumalanga',
  unavailableDates: ['2026-05-02','2026-05-03'],
  minNights: 14,
  host: { name: 'Thandi', avatar: '', verified: false, responseTime: 'within 24 hours' }
},
{
  id: '3',
  name: 'Urban Nest Apartments',
  city: 'Mbombela',
  institution: 'University of Mpumalanga',
  distance: '3.1 km from campus',
  price: 3500,
  rating: 4.7,
  reviews: 156,
  images: [
  'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'],

  amenities: ['wifi', 'furnished', 'parking'],
  roomTypes: ['studio', 'single'],
  description:
  'Modern self-contained studios in Mbombela for students who value privacy and independence. Each unit comes fully furnished with its own kitchenette and dedicated parking bay.',
  location: { lat: -25.4858, lng: 30.9954 },
  address: 'Mbombela, Mpumalanga',
  unavailableDates: [],
  minNights: 30,
  host: { name: 'Mark', avatar: '', verified: true, responseTime: 'within 1 hour' }
},
{
  id: '4',
  name: 'Scholar Stay Rooms',
  city: 'Nelspruit',
  institution: 'TVET College',
  distance: '900 m from campus',
  price: 1900,
  rating: 4.3,
  reviews: 210,
  images: [
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'],

  amenities: ['wifi', 'security', 'kitchen'],
  roomTypes: ['shared'],
  description:
  'Budget-friendly shared rooms within walking distance of TVET College. Comes with a shared kitchen, secure entry, and reliable WiFi — ideal for students on a tight budget.',
  location: { lat: -25.4553, lng: 30.9594 },
  address: 'Near TVET College, Nelspruit',
  unavailableDates: ['2026-05-15'],
  minNights: 7,
  host: { name: 'Nomsa', avatar: '', verified: false, responseTime: 'within 12 hours' }
}];