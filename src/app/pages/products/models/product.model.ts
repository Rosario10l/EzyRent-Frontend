export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  rentalPeriod: number; // en días
  images: string[];
  available: boolean;
  ownerId: string;
  ownerName: string;
  category: string;
  createdAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'landlord' | 'client';
  avatar?: string;
}