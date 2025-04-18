import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { getAllSubjects } from "@/lib/data/subjects";
import { Badge } from "@/components/ui/badge";
import { popularCourses, topRatedCourses, Course } from "@/lib/data/courses";
import {
  Code2,
  BookOpen,
  Database,
  Briefcase,
  Palette,
  Binary,
  Settings,
  Heart,
  Calculator,
  FlaskConical,
  Users,
  Lightbulb,
  GraduationCap,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  cs: Code2,
  business: Briefcase,
  "data-science": Database,
  humanities: BookOpen,
  "personal-dev": Lightbulb,
  "art-design": Palette,
  programming: Binary,
  engineering: Settings,
  health: Heart,
  mathematics: Calculator,
  science: FlaskConical,
  "social-sciences": Users
};

export default function SubjectsPage() {
  const subjects = getAllSubjects();

  // Count free courses per subject
  const freeCoursesCount: Record<string, number> = {};
  
  // Use only the courses from lib/data/courses
  const allFreeCourses = [
    ...popularCourses.filter(c => c.isFree === true),
    ...topRatedCourses.filter(c => c.isFree === true),
  ];
  
  // Add some manually created free courses per relevant category
  const categories = ["Computer Science", "Data Science", "Programming", "Business", "Web Development"];
  const manualFreeCourses: Course[] = categories.flatMap((category, i) => [
    {
      id: `manual-free-${i}-1`,
      title: `Introduction to ${category}`,
      provider: ["Coursera", "edX", "Khan Academy"][i % 3],
      institution: ["Harvard University", "MIT", "Stanford University", "Yale University"][i % 4],
      link: [
        "https://www.edx.org/course/cs50s-introduction-to-computer-science", // Computer Science
        "https://www.coursera.org/specializations/data-science-python", // Data Science
        "https://www.coursera.org/specializations/python", // Programming
        "https://www.coursera.org/specializations/wharton-business-foundations", // Business
        "https://www.coursera.org/learn/html-css-javascript-for-web-developers" // Web Development
      ][categories.indexOf(category)],
      image: [
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/cb/3c4d80a7e511e8a2b561c9a2d409cf/Logo_GPD.jpg", // Computer Science
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/51/51d7604bec11e8bd0c1b52408a8219/Data-Science-Specialization-Logo-Large.jpg", // Data Science
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/c5/2417b065fd11e89f43e9f8183a0a0e/Python-image-4-by-3.png", // Programming
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/08/86f2d0b59b11e8afb773e5e1360e38/Introduction-to-Business-new-4-3.jpg", // Business
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/83/e258e0532611e5a5423db599df3a25/JS-logo-01.jpg" // Web Development
      ][categories.indexOf(category)],
      rating: 4.5 + (Math.random() * 0.4),
      reviewCount: 1000 + Math.floor(Math.random() * 5000),
      category,
      isFree: true
    },
    {
      id: `manual-free-${i}-2`,
      title: `Advanced ${category}`,
      provider: ["Coursera", "edX", "Khan Academy"][i % 3],
      institution: ["Harvard University", "MIT", "Stanford University", "Yale University"][i % 4],
      link: [
        "https://www.coursera.org/learn/machine-learning", // Computer Science
        "https://www.edx.org/professional-certificate/ibm-data-science", // Data Science
        "https://www.udemy.com/course/100-days-of-code/", // Programming
        "https://www.coursera.org/learn/financial-markets-global", // Business
        "https://www.udemy.com/course/the-web-developer-bootcamp/" // Web Development
      ][categories.indexOf(category)],
      image: [
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/84/b66b7045ff11e880d0d5f875f1dfb4/Machine-Learning-for-Analytics.png", // Computer Science
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/41/d93b60b7a011e9b0990f5f5430e208/IBM-Applied-AI-Professional-Certificate---4-course-banner-01.jpg", // Data Science
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/f3/6aac20ab5011e8a5e2db66f8fa385d/Course-Logo_Small.png", // Programming
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/de/6e741032be11e8b2b533c5cd3add75/moneyskills.jpg", // Business
        "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/a7/8a9e50fc8611e880d2dbe3ba259987/HTML_CSS_JavaScript.png" // Web Development
      ][categories.indexOf(category)],
      rating: 4.6 + (Math.random() * 0.3),
      reviewCount: 800 + Math.floor(Math.random() * 4000),
      category,
      isFree: true
    }
  ]);
  
  // Combine all free courses
  const combinedFreeCourses = [...allFreeCourses, ...manualFreeCourses];
  
  // Categorize free courses by subject
  subjects.forEach(subject => {
    freeCoursesCount[subject.id] = combinedFreeCourses.filter(course => {
      // Match by category
      if (course.category && course.category.toLowerCase().includes(subject.name.toLowerCase())) {
        return true;
      }
      
      // Match by topics
      if (subject.topics) {
        return subject.topics.some(topic => 
          course.category && course.category.toLowerCase().includes(topic.toLowerCase())
        );
      }
      
      return false;
    }).length;
  });

  const getSubjectIcon = (subjectId: string) => {
    const Icon = iconMap[subjectId] || GraduationCap;
    return <Icon className="w-8 h-8" />;
  };

  return (
    <MainLayout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Subjects
          </h1>

          <p className="text-xl text-muted-foreground">
            Explore 100+ online courses in over 30 subjects. From Computer Science, Business, and Personal Development to Arts, STEM, and more. Find your perfect course.
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden bg-muted/50 p-6 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-semibold">Topics</h2>
            <div className="flex gap-2 flex-wrap">
              <div className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">All Subjects</div>
              <Link href="/providers" className="px-4 py-2 hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium transition-colors">
                By Provider
              </Link>
            </div>
          </div>

          <div className="relative bg-background rounded-lg p-4">
            <input
              type="search"
              placeholder="Looking for a particular subject?"
              className="w-full px-4 py-3 rounded-md bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              You can use the quick search box at the top of any page to see subjects, courses, and more.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="transform transition-transform duration-200 hover:-translate-y-1">
              <Link href={`/subjects/${subject.id}`} className="block h-full">
              <Card className="h-full hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="text-primary">
                          <div className="transform transition-transform duration-200 hover:rotate-6">
                            {getSubjectIcon(subject.id)}
                          </div>
                        </div>
                        <div>
                    <h3 className="text-xl font-semibold">{subject.name}</h3>
                          <span className="text-sm text-muted-foreground">courses</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {freeCoursesCount[subject.id] > 0 && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                            {freeCoursesCount[subject.id]} free courses
                          </Badge>
                        )}
                      </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Popular Topics</h4>
                    <div className="flex flex-wrap gap-2">
                      {subject.topics.map((topic, index) => (
                          <div
                            key={`${subject.id}-${index}`}
                            className="px-3 py-1 bg-muted rounded-full text-xs transform transition-transform duration-200 hover:scale-105"
                          >
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Looking for free courses?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Many of our partner providers offer completely free courses. Check out our providers page to see all platforms offering free educational content.
          </p>
          <Link 
            href="/providers"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Free Course Providers
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
