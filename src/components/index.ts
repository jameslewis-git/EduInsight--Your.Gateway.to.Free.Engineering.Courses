// Re-export components for easier imports

// Layout components
export { MainLayout } from './layout/MainLayout';
export { Header } from './layout/Header';
export { Footer } from './layout/Footer';

// Course components
export { CourseCard } from './courses/CourseCard';

// Home components - named exports (not default)
export { ArticlesSection } from './home/ArticlesSection';
export { StatsSection } from './home/StatsSection';
export { FeaturedSection } from './home/FeaturedSection';
export { Hero } from './home/Hero';

// UI components - named exports
export { Button } from './ui/button';
export { Card, CardContent } from './ui/card';
export { Badge } from './ui/badge';
export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogFooter } from './ui/dialog'; 