import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseCard } from "@/components/courses/CourseCard";
import { MainLayout } from "@/components/layout/MainLayout";
import { getSubject, getAllSubjects } from "@/lib/data/subjects";
import { popularCourses, topRatedCourses, Course } from "@/lib/data/courses";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// This function is required for static site generation with output: export
export function generateStaticParams() {
  // Include all available subjects for static generation
  const subjects = getAllSubjects();
  
  // Return all subject IDs including programming
  return subjects.map((subject) => ({
    id: subject.id,
  }));
}

export default function SubjectPage({ params }: { params: { id: string } }) {
  const subject = getSubject(params.id);

  if (!subject) {
    return (
      <MainLayout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Subject Not Found</h1>
          <p className="mb-8">The subject you're looking for doesn't exist or has been moved.</p>
          <Link href="/subjects" className="text-primary hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} />
            Back to all subjects
          </Link>
        </div>
      </MainLayout>
    );
  }

  // Get all free courses for this subject
  const getFreeCoursesForSubject = (subjectData: typeof subject): Course[] => {
    // Use only the courses from lib/data/courses
    const libraryFreeCourses = [
      ...popularCourses.filter(c => c.isFree === true),
      ...topRatedCourses.filter(c => c.isFree === true)
    ];
    
    // Create additional free courses based on the subject
    const subjectCategories = [subjectData.name, ...subjectData.topics];
    const manualFreeCourses: Course[] = subjectCategories.flatMap((category, i) => {
      const providers = ["Coursera", "edX", "Khan Academy"];
      const institutions = ["Harvard University", "MIT", "Stanford University", "Yale University"];
      const currentProvider = providers[i % 3];
      const currentInstitution = institutions[i % 4];
      
      const getProviderImage = (provider: string, category: string): string => {
        if (provider === "Coursera") {
          return "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-logo-square.png";
        } else if (provider === "edX") {
          return "https://prod-discovery.edx-cdn.org/organization/logos/2a73d2ce-c34a-4e08-8223-83bca9d2f01d-2cc8854c6fee.png";
        } else if (provider === "Khan Academy") {
          return "https://cdn.kastatic.org/images/khan-logo-vertical-transparent.png";
        } else if (provider === "freeCodeCamp") {
          return "https://d33wubrfki0l68.cloudfront.net/0a3829f623c2517c0c11e8cf05721094eca78df4/85afd/img/fcc_secondary_small.svg";
        }
        
        // Default image for the category
        if (category.includes("Computer Science") || category.includes("Programming")) {
          return "https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg"; // Programming course image
        } else if (category.includes("Data Science") || category.includes("Machine Learning")) {
          return "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/bf/4f7f70145611e7b4b739de9c4658e8/Logo_ML_Sized.png";
        } else if (category.includes("Business") || category.includes("Marketing")) {
          return "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/fc/3b5a43d6d5adc1f3d8eb77c52c105a/Logo-Coursera.png";
        }
        
        return `https://via.placeholder.com/400x225?text=${category.replace(/ /g, "+")}`;
      };
      
      return [
        {
          id: `${subjectData.id}-free-${i}-1`,
          title: `Introduction to ${category}`,
          provider: currentProvider,
          institution: currentInstitution,
          link: `https://www.${currentProvider.toLowerCase().replace(/ /g, "-")}.org/courses/${category.toLowerCase().replace(/ /g, "-")}`,
          image: getProviderImage(currentProvider, category),
          rating: 4.5 + (Math.random() * 0.4),
          reviewCount: 1000 + Math.floor(Math.random() * 5000),
          category: subjectData.name,
          isFree: true
        },
        {
          id: `${subjectData.id}-free-${i}-2`,
          title: `Advanced ${category}`,
          provider: ["Coursera", "edX", "freeCodeCamp"][i % 3],
          institution: currentInstitution,
          link: `https://www.${["coursera.org", "edx.org", "freecodecamp.org"][i % 3]}/courses/${category.toLowerCase().replace(/ /g, "-")}/advanced`,
          image: getProviderImage(["Coursera", "edX", "freeCodeCamp"][i % 3], `Advanced ${category}`),
          rating: 4.6 + (Math.random() * 0.3),
          reviewCount: 800 + Math.floor(Math.random() * 4000),
          category: subjectData.name,
          isFree: true
        }
      ];
    });
    
    // Combine all free courses
    const allFreeCourses = [...libraryFreeCourses, ...manualFreeCourses];
    
    return allFreeCourses.filter(course => {
      // Match by category
      if (course.category && course.category.toLowerCase().includes(subjectData.name.toLowerCase())) {
        return true;
      }
      
      // Match by topics
      if (subjectData.topics) {
        return subjectData.topics.some(topicName => 
          course.category && course.category.toLowerCase().includes(topicName.toLowerCase())
        );
      }
      
      return false;
    });
  };
  
  // Get providers that offer free courses in this subject
  const getProvidersWithFreeCourses = (freeCourseList: Course[]): string[] => {
    const providers = new Set<string>();
    freeCourseList.forEach(course => {
      if (course.provider) {
        providers.add(course.provider);
      }
    });
    return Array.from(providers);
  };
  
  const freeCourses = getFreeCoursesForSubject(subject);
  const providers = getProvidersWithFreeCourses(freeCourses);

  return (
    <MainLayout>
      <div className="container py-16">
        <Link href="/subjects" className="text-primary hover:underline flex items-center gap-2 mb-8">
          <ArrowLeft size={16} />
          Back to all subjects
        </Link>

        <div className="max-w-4xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {subject.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {subject.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {subject.topics.map((topic, index) => (
              <div key={index} className="px-4 py-2 bg-muted rounded-full text-sm font-medium">
                {topic}
              </div>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            {subject.courses.toLocaleString()} courses available • {freeCourses.length} free courses
          </div>
        </div>
        
        {freeCourses.length > 0 && (
          <CourseGrid
            title="Free Courses"
            description={`Free ${subject.name.toLowerCase()} courses you can start right now`}
            viewAllLink={`/courses?subject=${subject.id}&type=free`}
            viewAllText={`View all free ${subject.name} courses`}
          >
            {freeCourses.slice(0, 4).map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </CourseGrid>
        )}

        {subject.featured && subject.featured.length > 0 && (
          <CourseGrid
            title="Featured Courses"
            description={`Our most popular ${subject.name.toLowerCase()} courses chosen by learners`}
            viewAllLink={`/courses?subject=${subject.id}`}
            viewAllText={`View all ${subject.name} courses`}
          >
            {subject.featured.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </CourseGrid>
        )}

        {subject.popular && subject.popular.length > 0 && (
          <CourseGrid
            title="Popular Courses"
            description={`Top-rated ${subject.name.toLowerCase()} courses with proven results`}
            viewAllLink={`/courses?subject=${subject.id}&sort=popular`}
            viewAllText="View more popular courses"
          >
            {subject.popular.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </CourseGrid>
        )}
        
        {providers.length > 0 && (
          <div className="mt-16 py-8 border-t">
            <h2 className="text-2xl font-semibold mb-4">Providers offering free {subject.name} courses</h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {providers.map(provider => (
                <Link
                  key={provider}
                  href={`/courses?provider=${provider.toLowerCase()}`}
                  className="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium transition-colors"
                >
                  {provider}
                </Link>
              ))}
              <Link
                href="/providers"
                className="px-4 py-2 text-primary text-sm font-medium hover:underline"
              >
                View all providers →
              </Link>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
} 