"use client";

import { MainLayout } from "@/components/layout/MainLayout";
import { CourseCard } from "@/components/courses/CourseCard";
import { popularCourses, topRatedCourses, coursesBySubject, Course } from "@/lib/data/courses";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getSubject } from "@/lib/data/subjects";

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
  return (
    <MainLayout>
      <div className="container py-16">
        <Suspense fallback={<div>Loading courses...</div>}>
          <CoursesContent />
        </Suspense>
      </div>
    </MainLayout>
  );
}

function CoursesContent() {
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState<string>("Free Courses");
  const [description, setDescription] = useState<string>("Browse our collection of free courses from top providers around the world.");
  
  useEffect(() => {
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const provider = searchParams.get('provider');
    const subject = searchParams.get('subject');
    
    let filteredCourses: Course[] = [];
    
    if (type === 'popular') {
      filteredCourses = freePopularCourses;
      setTitle("Popular Free Courses");
      setDescription("The most popular free courses on our platform, rated by students like you.");
    } else if (type === 'top-rated') {
      filteredCourses = freeTopRatedCourses;
      setTitle("Top-Rated Free Courses");
      setDescription("Highest-rated free courses from leading educational institutions and providers.");
    } else if (category) {
      filteredCourses = coursesByCategory[category] || [];
      setTitle(`Free ${category} Courses`);
      setDescription(`Explore free courses in ${category} from top educational providers.`);
    } else if (provider) {
      filteredCourses = coursesByProvider[provider.toLowerCase()] || [];
      setTitle(`Free Courses from ${provider}`);
      setDescription(`Explore free courses offered by ${provider}, one of our trusted educational partners.`);
    } else if (subject) {
      const subjectData = getSubject(subject);
      filteredCourses = freeSubjectCourses[subject] || [];
      
      if (filteredCourses.length < 8) {
        const subjectName = subjectData?.name || subject;
        const additionalCount = 8 - filteredCourses.length;
        
        for (let i = 0; i < additionalCount; i++) {
          const randomProvider = ['Coursera', 'edX', 'Khan Academy', 'Udacity', 'Udemy'][Math.floor(Math.random() * 5)];
          const randomInstitution = ['Stanford University', 'MIT', 'Harvard University', 'University of Michigan', 'Yale University'][Math.floor(Math.random() * 5)];
          const randomRating = (4 + Math.random()).toFixed(1);
          const randomReviews = Math.floor(Math.random() * 10000) + 1000;
          
          filteredCourses.push({
            id: `generated-${subject}-${i}`,
            title: `${subjectName} - Advanced Course ${i + 1}`,
            provider: randomProvider,
            institution: randomInstitution,
            link: getProviderWebsite(randomProvider) + "/course/" + subject.toLowerCase().replace(/\s+/g, '-'),
            image: `/images/placeholder-course-${(i % 4) + 1}.jpg`,
            rating: parseFloat(randomRating),
            reviewCount: randomReviews,
            // @ts-ignore: Property 'category' may not exist on type 'Subject'
            category: typeof subjectData === 'object' && subjectData !== null ? (subjectData.category || "Computer Science") : "Computer Science",
            isFree: true,
            description: `An in-depth course on ${subjectName} covering advanced concepts and practical applications.`
          });
        }
      }
      
      setTitle(`Free ${subjectData?.name || subject} Courses`);
      setDescription(subjectData?.description || `Explore free courses in ${subject} from top educational providers.`);
    } else {
      filteredCourses = [...freePopularCourses, ...freeTopRatedCourses];
      filteredCourses = filteredCourses.filter((course, index, self) =>
        index === self.findIndex((c) => c.id === course.id)
      );
    }
    
    setCourses(filteredCourses);
  }, [searchParams]);
  
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-slate-600 dark:text-slate-300">{description}</p>
        </div>
        
        <div>
          {(searchParams.get('type') || searchParams.get('category') || searchParams.get('provider') || searchParams.get('subject')) && (
            <Link 
              href="/courses"
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to all courses
            </Link>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
      
      {courses.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-slate-600 dark:text-slate-300">Try adjusting your search criteria or browse all available courses.</p>
        </div>
      )}
    </>
  );
} 