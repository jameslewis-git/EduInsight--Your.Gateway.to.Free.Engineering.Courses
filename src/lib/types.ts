export interface Course {
  id: string;
  title: string;
  provider: string;
  institution?: string;
  link: string;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  isFree?: boolean;
  price?: number;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
}

export type SortOption = 'popular' | 'rating' | 'newest' | 'relevant' | 'price-low' | 'price-high';

export type FilterOption = {
  provider?: string[];
  category?: string[];
  level?: string[];
  price?: 'free' | 'paid' | 'all';
};

export interface User {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: 'user' | 'admin';
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'achievement';
  message: string;
  timestamp: Date | string;
  read: boolean;
} 