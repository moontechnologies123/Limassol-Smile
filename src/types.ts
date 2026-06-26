export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'general' | 'cosmetic' | 'specialist';
  priceRange: string;
  duration: string;
  benefits: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  treatment: string;
  text: string;
  language: 'EN' | 'GR' | 'RU';
}
