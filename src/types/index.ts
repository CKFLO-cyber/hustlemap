export type UserMode = 'rent' | 'buy';

export interface User {
  id: string;
  mode: UserMode;
  subscription_active: boolean;
  subscription_plan?: 'rent' | 'buy' | 'all';
}

export interface Listing {
  id: string;
  photos: string[];
  price?: number;
  rooms?: number;
  floor?: number;
  size?: number;
  district?: string;
  description?: string;
  owner_phone?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  // Non-sensitive flags that are always available
  type: 'apartment' | 'house' | 'studio';
  furnished: boolean;
  parking: boolean;
  balcony: boolean;
}

export interface Filters {
  price_min?: number;
  price_max?: number;
  rooms?: number;
  district?: string;
  floor?: number;
  size_min?: number;
  size_max?: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'month';
  features: string[];
}
