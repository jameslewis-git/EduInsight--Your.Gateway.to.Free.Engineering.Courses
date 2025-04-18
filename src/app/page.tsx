import { MainLayout } from "@/components/layout/MainLayout";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseCard } from "@/components/courses/CourseCard";
import { popularCourses, topRatedCourses } from "@/lib/data/courses";
import { HeroSectionDemo } from "@/components/ui/demos/hero-section-demo";

export default function HomePage() {
  // Get only the first 8 courses for each section
  const homePagePopularCourses = popularCourses.slice(0, 8);
  const homePageTopRatedCourses = topRatedCourses.slice(0, 8);
  
  return (
    <MainLayout>
      <HeroSectionDemo />
      <FeaturedSection />

      <div className="container">
        <CourseGrid
          title="Most Popular Courses"
          description="Join millions of learners from around the world taking courses on EduInsight"
          viewAllLink="/courses?type=popular"
          viewAllText="View all popular courses"
          columns={4}
        >
          {homePagePopularCourses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </CourseGrid>

        <CourseGrid
          title="Top-Rated Courses"
          description="Courses with the highest ratings from our users"
          viewAllLink="/courses?type=top-rated"
          viewAllText="View all top-rated courses"
          columns={4}
        >
          {homePageTopRatedCourses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </CourseGrid>
      </div>

      <StatsSection />
      <ArticlesSection />
    </MainLayout>
  );
}
