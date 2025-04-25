// This file has both server and client components
// The main HomePage is a server component
import { MainLayout } from "@/components/layout/MainLayout";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { popularCourses, topRatedCourses } from "@/lib/data/courses";
import { HeroSectionDemo } from "@/components/ui/demos/hero-section-demo";
import { HomePageErrorHandler } from "@/components/auth/HomePageErrorHandler";

export default function HomePage() {
  // Only show the first 8 courses on the home page
  const topPopularCourses = popularCourses.slice(0, 8);
  const topRatedCoursesShort = topRatedCourses.slice(0, 8);
  
  return (
    <>
      {/* Client component for error handling */}
      <HomePageErrorHandler />
      
      <MainLayout>
        <HeroSectionDemo />

        <div className="container py-12 md:py-24 lg:py-32">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Most Popular Courses</h2>
              <p className="text-muted-foreground mt-2">
                Join millions of learners from around the world taking courses on EduInsight
              </p>
            </div>
            <a href="/courses?sort=popular" className="text-primary hover:underline underline-offset-4">
              View all popular courses &rarr;
            </a>
          </div>
          <CourseGrid courses={topPopularCourses} columns={4} />
        </div>

        <div className="bg-muted">
          <div className="container py-12 md:py-24 lg:py-32">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Top-Rated Courses</h2>
                <p className="text-muted-foreground mt-2">
                  Courses with the highest ratings from our users
                </p>
              </div>
              <a href="/courses?sort=rating" className="text-primary hover:underline underline-offset-4">
                View all top-rated courses &rarr;
              </a>
            </div>
            <CourseGrid courses={topRatedCoursesShort} columns={4} />
          </div>
        </div>

        <FeaturedSection />
        <StatsSection />
        <ArticlesSection />
      </MainLayout>
    </>
  );
}
