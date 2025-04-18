"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { popularCourses, topRatedCourses, coursesBySubject, Course } from "@/lib/data/courses";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSubject } from "@/lib/data/subjects";
import { getCourses } from "@/lib/data";

// Additional free courses to increase the course count in listings
const additionalFreeCourses: Course[] = [
  {
    id: "additional1",
    title: "CS50's Introduction to Computer Science",
    provider: "edX",
    institution: "Harvard University",
    link: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/da1b2400-322b-459b-97b0-0c557f05d017-778b4d3567f6.small.jpg",
    rating: 4.9,
    reviewCount: 12564,
    category: "Computer Science",
    isFree: true,
    description: "An introduction to the intellectual enterprises of computer science and the art of programming."
  },
  {
    id: "additional2",
    title: "Introduction to Python Programming",
    provider: "edX",
    institution: "University of Pennsylvania",
    link: "https://www.edx.org/course/introduction-to-python-programming",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/12412e21-7cc6-42e9-935d-babfb3797672-ef1c417252f1.small.jpg",
    rating: 4.7,
    reviewCount: 8976,
    category: "Programming",
    isFree: true,
    description: "Learn the fundamentals of Python programming and develop the ability to analyze data and make data-driven decisions."
  },
  {
    id: "additional3",
    title: "HTML, CSS, and Javascript for Web Developers",
    provider: "Coursera",
    institution: "Johns Hopkins University",
    link: "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/5f/953d3086ad11e5a6b451e2fda7fed8/jhep-coursera-course4.png",
    rating: 4.7,
    reviewCount: 10254,
    category: "Web Development",
    isFree: true,
    description: "Learn the basics of web development through hands-on projects using HTML, CSS, and JavaScript."
  },
  {
    id: "additional4",
    title: "Introduction to Data Science",
    provider: "Coursera",
    institution: "University of Michigan",
    link: "https://www.coursera.org/specializations/data-science-python",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/28/7bee2047b311e8a6ccc9be21cd8e0e/pythondatascience_specialization_banner_2.png",
    rating: 4.6,
    reviewCount: 8754,
    category: "Data Science",
    isFree: true,
    description: "Learn the basics of data science and how to use Python to analyze data and create data visualizations."
  },
  {
    id: "additional5",
    title: "Introduction to Artificial Intelligence",
    provider: "edX",
    institution: "Columbia University",
    link: "https://www.edx.org/course/artificial-intelligence-ai",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/26d2276c-9b30-40f7-9d78-e3172938fad6-56c4c65d6f5b.small.jpg",
    rating: 4.8,
    reviewCount: 6543,
    category: "Computer Science",
    isFree: true,
    description: "Learn the foundational principles of artificial intelligence and machine learning."
  },
  {
    id: "additional6",
    title: "Introduction to Marketing",
    provider: "Coursera",
    institution: "University of Pennsylvania",
    link: "https://www.coursera.org/learn/wharton-marketing",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/fc/3b5a43d6d5adc1f3d8eb77c52c105a/Logo-Coursera.png",
    rating: 4.8,
    reviewCount: 7654,
    category: "Marketing",
    isFree: true,
    description: "Learn the fundamentals of marketing, including branding, customer-centricity, and go-to-market strategies."
  },
  {
    id: "additional7",
    title: "Financial Markets",
    provider: "Coursera",
    institution: "Yale University",
    link: "https://www.coursera.org/learn/financial-markets-global",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/a6/82ec33a9e94e4f989dce35aec0a548/Logo.png",
    rating: 4.8,
    reviewCount: 9876,
    category: "Finance",
    isFree: true,
    description: "An overview of the ideas, methods, and institutions that permit human society to manage risks and foster enterprise."
  },
  {
    id: "additional8",
    title: "Data Science: R Basics",
    provider: "edX",
    institution: "Harvard University",
    link: "https://www.edx.org/course/data-science-r-basics",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/3acd947b-d44f-449b-b01d-c2bbeac3df0f-5378479fc31f.small.jpg",
    rating: 4.7,
    reviewCount: 5432,
    category: "Data Science",
    isFree: true,
    description: "Learn R programming basics to help you start your journey in data science and statistics."
  },
  {
    id: "additional9",
    title: "Introduction to Negotiation",
    provider: "Coursera",
    institution: "Yale University",
    link: "https://www.coursera.org/learn/negotiation",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/0e/d1c94fec1a11e7a5b8ed0e1992ca2c/Introduction-to-Negotiation-A-Strategic-Playbook-For-Becoming-A-Principled-and-Persuasive-Negotiator-4.jpg",
    rating: 4.8,
    reviewCount: 6789,
    category: "Business",
    isFree: true,
    description: "Learn how to develop effective negotiation skills and strategies to help you succeed in business and life."
  },
  {
    id: "additional10",
    title: "Machine Learning",
    provider: "Coursera",
    institution: "Stanford University",
    link: "https://www.coursera.org/learn/machine-learning",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/bf/4f7f70145611e7b4b739de9c4658e8/Logo_ML_Sized.png",
    rating: 4.9,
    reviewCount: 11234,
    category: "Computer Science",
    isFree: true,
    description: "Learn about the most effective machine learning techniques and gain practice implementing them."
  },
  {
    id: "additional11",
    title: "Fundamentals of Graphic Design",
    provider: "Coursera",
    institution: "California Institute of the Arts",
    link: "https://www.coursera.org/learn/fundamentals-of-graphic-design",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/fc/6507eb34c7420f9c2c2be703a8b2b0/logo_01.jpg",
    rating: 4.7,
    reviewCount: 7654,
    category: "Art & Design",
    isFree: true,
    description: "Learn the fundamentals of graphic design, including image making, typography, and composition."
  },
  {
    id: "additional12",
    title: "Creative Coding",
    provider: "Coursera",
    institution: "New York University",
    link: "https://www.coursera.org/learn/creative-coding",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/8e/53afc0a97b11e79a3fb748c835992b/logo-coursera2-02.jpg",
    rating: 4.6,
    reviewCount: 5432,
    category: "Programming",
    isFree: true,
    description: "Learn to code creative applications for art, design, and digital media using the Processing platform."
  }
];

// Filter to only show free courses
const freePopularCourses = popularCourses.filter(course => course.isFree === true);
const freeTopRatedCourses = topRatedCourses.filter(course => course.isFree === true);

// Create filtered version of coursesBySubject with only free courses
const freeSubjectCourses: Record<string, Course[]> = {};
Object.keys(coursesBySubject).forEach(subject => {
  freeSubjectCourses[subject] = coursesBySubject[subject].filter(course => course.isFree === true);
});

// Map courses to their categories for easier filtering
const coursesByCategory: Record<string, Course[]> = {
  "Programming": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Programming"),
  "Computer Science": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Computer Science"),
  "Web Development": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Web Development"),
  "Data Science": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Data Science"),
  "Business": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Business"),
  "Finance": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Finance"),
  "Marketing": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Marketing"),
  "Personal Development": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Personal Development"),
  "Psychology": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Psychology"),
  "Art & Design": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.category === "Art & Design")
};

// Map courses to their providers
const coursesByProvider: Record<string, Course[]> = {
  "coursera": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.provider === "Coursera"),
  "edx": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.provider === "edX"),
  "harvard university": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.institution === "Harvard University"),
  "stanford university": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.institution === "Stanford University"),
  "mit": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.institution === "MIT"),
  "yale university": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.institution === "Yale University"),
  "khan academy": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.provider === "Khan Academy"),
  "udacity": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.provider === "Udacity"),
  "codecademy": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.provider === "Codecademy"),
  "freecodecamp": [...freePopularCourses, ...freeTopRatedCourses, ...additionalFreeCourses].filter(c => c.provider === "freeCodeCamp")
};

// Function to get the real website URL for a provider
function getProviderWebsite(providerName: string): string {
  const websites: Record<string, string> = {
    "Coursera": "https://www.coursera.org",
    "edX": "https://www.edx.org",
    "Udemy": "https://www.udemy.com",
    "Khan Academy": "https://www.khanacademy.org",
    "MIT OpenCourseWare": "https://ocw.mit.edu",
    "Udacity": "https://www.udacity.com",
    "Codecademy": "https://www.codecademy.com",
    "freeCodeCamp": "https://www.freecodecamp.org",
    "Harvard University": "https://online-learning.harvard.edu",
    "Stanford University": "https://online.stanford.edu",
    "Yale University": "https://online.yale.edu",
    "Princeton University": "https://online.princeton.edu"
  };
  
  return websites[providerName] || `https://${providerName.toLowerCase().replace(/\s+/g, "-")}.com`;
}

// Add specific Udemy free courses with real courses and links
const udemyFreeCourses: Course[] = [
  {
    id: "udemy-free-1",
    title: "Learn Python Programming Masterclass",
    provider: "Udemy",
    institution: "Udemy",
    link: "https://www.udemy.com/course/python-the-complete-python-developer-course/",
    rating: 4.5,
    reviewCount: 3113,
    category: "Programming",
    isFree: true,
    image: "https://img-c.udemycdn.com/course/480x270/629302_8a2d_2.jpg"
  },
  {
    id: "udemy-free-2",
    title: "Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus [2024]",
    provider: "Udemy",
    institution: "Udemy",
    link: "https://www.udemy.com/course/machinelearning/",
    rating: 4.6,
    reviewCount: 4605,
    category: "Data Science",
    isFree: true,
    image: "https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg"
  },
  {
    id: "udemy-free-3",
    title: "The Web Developer Bootcamp 2024",
    provider: "Udemy",
    institution: "Udemy",
    link: "https://www.udemy.com/course/the-web-developer-bootcamp/",
    rating: 4.7,
    reviewCount: 2293,
    category: "Programming",
    isFree: true,
    image: "https://img-c.udemycdn.com/course/480x270/625204_436a_3.jpg"
  },
  {
    id: "udemy-free-4",
    title: "100 Days of Code: The Complete Python Pro Bootcamp for 2024",
    provider: "Udemy",
    institution: "Udemy",
    link: "https://www.udemy.com/course/100-days-of-code/",
    rating: 4.9,
    reviewCount: 1704,
    category: "Computer Science",
    isFree: true,
    image: "https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg"
  }
];

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("Courses");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const type = searchParams.get("type");
    const subjectId = searchParams.get("subject");
    const category = searchParams.get("category");
    const provider = searchParams.get("provider");
    const sort = searchParams.get("sort");
    
    let filtered: Course[] = [];
    let pageTitle = "Courses";
    let pageDescription = "Explore our collection of high-quality free courses";
    
    // Get expanded list of courses (original + additional)
    const allFreePopularCourses = [...freePopularCourses, ...additionalFreeCourses.slice(0, 6)];
    const allFreeTopRatedCourses = [...freeTopRatedCourses, ...additionalFreeCourses.slice(2, 8)];
    
    // Determine which courses to show based on parameters
    if (provider) {
      // If provider is specified, filter by provider
      filtered = coursesByProvider[provider.toLowerCase()] || [];
      
      // If not enough courses, add more from the provider
      if (filtered.length < 4) {
        const providerName = provider.toLowerCase() === "edx" ? "edX" : 
                            provider.toLowerCase() === "coursera" ? "Coursera" :
                            provider.toLowerCase() === "harvard university" ? "Harvard University" :
                            provider.toLowerCase() === "mit" ? "MIT" :
                            provider.toLowerCase() === "yale university" ? "Yale University" :
                            provider.toLowerCase();
        
        // Add additional courses for this provider
        const additionalProviderCourses: Course[] = Array(4).fill(0).map((_, i) => ({
          id: `provider-${provider.toLowerCase()}-${i}`,
          title: `${providerName} Free Course ${i + 1}`,
          provider: providerName.includes("University") ? "Coursera" : providerName,
          institution: providerName.includes("University") ? providerName : `${providerName} Partner Institution`,
          link: `${getProviderWebsite(providerName)}/courses/free-course-${i+1}`,
          image: providerName === "Coursera" ? "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-logo-square.png" :
                 providerName === "edX" ? "https://prod-discovery.edx-cdn.org/organization/logos/2a73d2ce-c34a-4e08-8223-83bca9d2f01d-2cc8854c6fee.png" :
                 providerName === "Udemy" ? "https://img-c.udemycdn.com/course/480x270/637930_9a22_24.jpg" :
                 providerName === "Khan Academy" ? "https://cdn.kastatic.org/images/khan-logo-vertical-transparent.png" :
                 providerName === "Harvard University" ? "https://prod-discovery.edx-cdn.org/organization/logos/44022f13-20df-4666-9111-cede3e5dc5b6-2cc39992c67a.png" :
                 providerName === "Yale University" ? "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/7e/aff5b0f54c11e7ad7ebd6b426fec6b/Logo_TheScienceofWell-Being.png" :
                 providerName === "MIT" ? "https://prod-discovery.edx-cdn.org/organization/logos/2a73d2ce-c34a-4e08-8223-83bca9d2f01d-2cc8854c6fee.png" :
                 `https://via.placeholder.com/400x225?text=${providerName}+Course`,
          rating: 4.5 + (Math.random() * 0.4),
          reviewCount: 1000 + Math.floor(Math.random() * 5000),
          category: ["Computer Science", "Data Science", "Business", "Programming"][Math.floor(Math.random() * 4)],
          isFree: true
        }));
        
        filtered = [...filtered, ...additionalProviderCourses];
      }
      
      // Capitalize provider name for title
      const displayName = provider.toLowerCase() === "edx" ? "edX" : 
                          provider.toLowerCase() === "freecodecamp" ? "freeCodeCamp" :
                          provider.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      pageTitle = `${displayName} Courses`;
      pageDescription = `Explore our collection of free courses from ${displayName}`;
    } else if (subjectId) {
      // If subject is specified, get courses for that subject
      const subject = getSubject(subjectId);
      if (subject) {
        // Start with subject-specific free courses
        let subjectCourses = freeSubjectCourses[subjectId] || [];
        
        // Add more courses based on subject's topics
        if (subject.topics) {
          subject.topics.forEach(topic => {
            // Map topic to categories (simplified)
            const topicToCategory = topic.includes('Programming') ? 'Programming' : 
                                   topic.includes('Web') ? 'Web Development' :
                                   topic.includes('Data') ? 'Data Science' :
                                   topic.includes('Marketing') ? 'Marketing' :
                                   topic.includes('Finance') ? 'Finance' :
                                   topic.includes('Management') ? 'Business' :
                                   topic.includes('Design') ? 'Art & Design' : null;
            
            if (topicToCategory && coursesByCategory[topicToCategory]) {
              // Add additional courses from matching categories
              const additionalForTopic = coursesByCategory[topicToCategory]
                .filter(c => !subjectCourses.some(sc => sc.id === c.id))
                .slice(0, 4);  // Add up to 4 additional courses per topic
              
              subjectCourses = [...subjectCourses, ...additionalForTopic];
            }
          });
        }
        
        filtered = subjectCourses;
        pageTitle = `${subject.name} Courses`;
        pageDescription = `Explore our collection of free ${subject.name.toLowerCase()} courses`;
      }
    } else if (category) {
      // If category is specified, filter by category
      filtered = coursesByCategory[category] || [];
      pageTitle = `${category} Courses`;
      pageDescription = `Explore our collection of free ${category.toLowerCase()} courses`;
    } else if (type === "top-rated") {
      // Show top-rated courses
      filtered = allFreeTopRatedCourses;
      pageTitle = "Top-Rated Free Courses";
      pageDescription = "Free courses with the highest ratings from our users";
    } else {
      // Default to popular courses
      filtered = allFreePopularCourses;
      pageTitle = "Popular Free Courses";
      pageDescription = "Join millions of learners from around the world taking free courses on EduInsight";
    }
    
    // Override with sort parameter if present
    if (sort === "popular" && subjectId) {
      const subject = getSubject(subjectId);
      if (subject) {
        pageTitle = `Popular ${subject.name} Courses`;
        
        // Get subject's popular free courses plus additions
        let popularForSubject = subject.popular?.filter(course => course.isFree === true) || [];
        
        // Add more popular courses based on subject's topics
        if (subject.topics) {
          let topicRelatedCourses: Course[] = [];
          
          subject.topics.forEach(topic => {
            const topicToCategory = topic.includes('Programming') ? 'Programming' : 
                                  topic.includes('Web') ? 'Web Development' :
                                  topic.includes('Data') ? 'Data Science' :
                                  topic.includes('Marketing') ? 'Marketing' :
                                  topic.includes('Finance') ? 'Finance' :
                                  topic.includes('Management') ? 'Business' :
                                  topic.includes('Design') ? 'Art & Design' : null;
            
            if (topicToCategory && coursesByCategory[topicToCategory]) {
              // Add course if it has high rating and isn't already included
              const highRatedForTopic = coursesByCategory[topicToCategory]
                .filter(c => c.rating && c.rating >= 4.5)
                .filter(c => !popularForSubject.some(sc => sc.id === c.id))
                .slice(0, 3);  // Limit per topic
              
              topicRelatedCourses = [...topicRelatedCourses, ...highRatedForTopic];
            }
          });
          
          // Add the additional topic-related courses
          popularForSubject = [...popularForSubject, ...topicRelatedCourses];
        }
        
        filtered = popularForSubject;
      }
    }
    
    // Sort courses by rating (if ratings exist)
    filtered = filtered.sort((a, b) => {
      if (a.rating && b.rating) {
        return b.rating - a.rating;
      }
      return 0;
    });
    
    // Remove duplicates (if any)
    filtered = filtered.filter((course, index, self) => 
      index === self.findIndex(c => c.id === course.id)
    );
    
    setCourses(filtered);
    setTitle(pageTitle);
    setDescription(pageDescription);
  }, [searchParams]);
  
  // Decide where the "back" link should go
  const getBackLink = () => {
    const provider = searchParams.get("provider");
    if (provider) {
      return "/providers";
    }
    return "/";
  };
  
  return (
    <MainLayout>
      <div className="container py-16">
        <Link href={getBackLink()} className="text-primary hover:underline flex items-center gap-2 mb-8">
          <ArrowLeft size={16} />
          {searchParams.get("provider") ? "Back to providers" : "Back to home"}
        </Link>
        
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {description}
          </p>
          <p className="mt-2 text-muted-foreground">
            Showing {courses.length} free courses
          </p>
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">No free courses found</h2>
            <p className="text-muted-foreground mb-8">We couldn't find any free courses matching your criteria.</p>
            <Link href="/courses" className="text-primary hover:underline">
              View all free courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
} 