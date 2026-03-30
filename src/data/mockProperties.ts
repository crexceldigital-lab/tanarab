export interface Property {
  id: string;
  title: string;
  developer: string;
  location: string;
  city: string;
  price: number;
  priceLabel: string;
  currency: string;
  type: 'apartment' | 'house' | 'villa' | 'penthouse' | 'land' | 'commercial';
  status: 'off-plan' | 'ongoing' | 'completed';
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  verified: boolean;
  featured: boolean;
  description: string;
  paymentPlan?: string;
  completionDate?: string;
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Ocean View Residences',
    developer: 'Masaki Developments',
    location: 'Masaki, Dar es Salaam',
    city: 'Dar es Salaam',
    price: 250000000,
    priceLabel: '250M',
    currency: 'TZS',
    type: 'apartment',
    status: 'off-plan',
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    images: [],
    amenities: ['Swimming Pool', 'Gym', 'Parking', '24/7 Security', 'Ocean View'],
    verified: true,
    featured: true,
    description: 'Premium ocean-facing apartments in the heart of Masaki with world-class amenities and breathtaking Indian Ocean views.',
    paymentPlan: '30% deposit, 70% on completion',
    completionDate: 'Q4 2026',
  },
  {
    id: '2',
    title: 'Kariakoo Business Tower',
    developer: 'TZ Urban Builders',
    location: 'Kariakoo, Dar es Salaam',
    city: 'Dar es Salaam',
    price: 180000000,
    priceLabel: '180M',
    currency: 'TZS',
    type: 'commercial',
    status: 'ongoing',
    bedrooms: 0,
    bathrooms: 2,
    area: 200,
    images: [],
    amenities: ['Elevator', 'Parking', 'Conference Room', 'Security'],
    verified: true,
    featured: true,
    description: 'Modern commercial office space in the vibrant Kariakoo business district.',
    paymentPlan: '50% deposit, 50% installments',
    completionDate: 'Q2 2025',
  },
  {
    id: '3',
    title: 'Mbezi Beach Villas',
    developer: 'Coastal Living TZ',
    location: 'Mbezi Beach, Dar es Salaam',
    city: 'Dar es Salaam',
    price: 450000000,
    priceLabel: '450M',
    currency: 'TZS',
    type: 'villa',
    status: 'completed',
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    images: [],
    amenities: ['Garden', 'Swimming Pool', 'Garage', 'Solar Power', 'Borehole'],
    verified: true,
    featured: false,
    description: 'Spacious villas with lush gardens near Mbezi Beach, perfect for families.',
    paymentPlan: 'Negotiable',
  },
  {
    id: '4',
    title: 'Arusha Heights',
    developer: 'Northern Highlands Dev',
    location: 'Njiro, Arusha',
    city: 'Arusha',
    price: 120000000,
    priceLabel: '120M',
    currency: 'TZS',
    type: 'apartment',
    status: 'off-plan',
    bedrooms: 2,
    bathrooms: 1,
    area: 95,
    images: [],
    amenities: ['Parking', 'Gym', 'Rooftop Terrace', 'Mountain View'],
    verified: false,
    featured: true,
    description: 'Contemporary apartments with stunning views of Mount Meru.',
    paymentPlan: '40% deposit, 60% flexible',
    completionDate: 'Q1 2027',
  },
  {
    id: '5',
    title: 'Zanzibar Waterfront Penthouse',
    developer: 'Spice Island Properties',
    location: 'Stone Town, Zanzibar',
    city: 'Zanzibar',
    price: 680000000,
    priceLabel: '680M',
    currency: 'TZS',
    type: 'penthouse',
    status: 'completed',
    bedrooms: 3,
    bathrooms: 3,
    area: 220,
    images: [],
    amenities: ['Private Pool', 'Ocean View', 'Concierge', 'Helipad Access'],
    verified: true,
    featured: true,
    description: 'Luxury penthouse in historic Stone Town with panoramic ocean views.',
  },
  {
    id: '6',
    title: 'Dodoma Central Plots',
    developer: 'Capital City Estates',
    location: 'Dodoma CBD',
    city: 'Dodoma',
    price: 35000000,
    priceLabel: '35M',
    currency: 'TZS',
    type: 'land',
    status: 'completed',
    bedrooms: 0,
    bathrooms: 0,
    area: 600,
    images: [],
    amenities: ['Title Deed', 'Road Access', 'Utilities Ready'],
    verified: true,
    featured: false,
    description: 'Prime land plots in Dodoma with clean title deeds and all utilities.',
  },
];

export const cities = ['Dar es Salaam', 'Arusha', 'Zanzibar', 'Dodoma', 'Mwanza', 'Mbeya'];
export const propertyTypes = ['apartment', 'house', 'villa', 'penthouse', 'land', 'commercial'] as const;
export const statusOptions = ['off-plan', 'ongoing', 'completed'] as const;
