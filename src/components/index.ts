// Re-export components for easier imports

// Layout components
export { MainLayout } from './layout/MainLayout';
export { Header } from './layout/Header';
export { Footer } from './layout/Footer';

// Course components
export { CourseCard } from './courses/CourseCard';

// Home components - export specific components instead of wildcard
export { default as ArticlesSection } from './home/ArticlesSection';
export { default as StatsSection } from './home/StatsSection';
export { default as FeaturedSection } from './home/FeaturedSection';
export { default as Hero } from './home/Hero';

// UI components - export individual components instead of wildcard
export { Button } from './ui/button';
export { Card, CardContent } from './ui/card';
export { Badge } from './ui/badge';
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from './ui/dialog'; 