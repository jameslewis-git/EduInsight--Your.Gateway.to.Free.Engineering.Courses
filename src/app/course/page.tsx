import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { CourseCard } from "@/components/courses/CourseCard";

// Sample courses data
const popularCourses = [
  {
    id: "1",
    title: "Learning How to Learn: Powerful mental tools to help you master tough subjects",
    provider: "Coursera",
    institution: "McMaster University",
    link: "https://www.coursera.org/learn/learning-how-to-learn",
    rating: 4.8,
    reviewCount: 23786,
    category: "Personal Development",
    isFree: true
  },
  {
    id: "2",
    title: "Machine Learning",
    provider: "Coursera",
    institution: "Stanford University",
    link: "https://www.coursera.org/learn/machine-learning",
    rating: 4.9,
    reviewCount: 15890,
    category: "Computer Science",
    isFree: false
  },
  {
    id: "3",
    title: "The Science of Well-Being",
    provider: "Coursera",
    institution: "Yale University",
    link: "https://www.coursera.org/learn/the-science-of-well-being",
    rating: 4.9,
    reviewCount: 12453,
    category: "Psychology",
    isFree: true
  },
  {
    id: "4",
    title: "CS50's Introduction to Computer Science",
    provider: "edX",
    institution: "Harvard University",
    link: "https://www.edx.org/course/cs50s-introduction-to-computer-science",
    rating: 4.9,
    reviewCount: 10321,
    category: "Computer Science",
    isFree: true
  },
  {
    id: "5",
    title: "Deep Learning Specialization",
    provider: "Coursera",
    institution: "DeepLearning.AI",
    link: "https://www.coursera.org/specializations/deep-learning",
    rating: 4.9,
    reviewCount: 18976,
    category: "Computer Science",
    isFree: false
  },
  {
    id: "6",
    title: "Python for Everybody",
    provider: "Coursera",
    institution: "University of Michigan",
    link: "https://www.coursera.org/specializations/python",
    rating: 4.8,
    reviewCount: 19675,
    category: "Programming",
    isFree: true
  },
  {
    id: "7",
    title: "Excel Skills for Business",
    provider: "Coursera",
    institution: "Macquarie University",
    link: "https://www.coursera.org/specializations/excel",
    rating: 4.8,
    reviewCount: 9854,
    category: "Business",
    isFree: false
  },
  {
    id: "8",
    title: "Introduction to Data Science",
    provider: "edX",
    institution: "IBM",
    link: "https://www.edx.org/professional-certificate/ibm-data-science",
    rating: 4.7,
    reviewCount: 7542,
    category: "Data Science",
    isFree: true
  }
];

export default function CoursesPage() {
  return (
    <MainLayout>
      <div className="container py-16">
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Courses
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse our collection of top-rated courses from leading providers around the world.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularCourses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

relatedCourses: [
  {
    id: "2",
    title: "Learning How To Learn for Youth",
    provider: "Coursera",
    institution: "Arizona State University",
    link: "https://www.coursera.org/learn/learning-how-to-learn-youth",
    rating: 4.7,
    reviewCount: 1254,
    category: "Personal Development",
    isFree: true
  },
  {
    id: "3",
    title: "Mindshift: Break Through Obstacles to Learning",
    provider: "Coursera",
    institution: "McMaster University",
    link: "https://www.coursera.org/learn/mindshift",
    rating: 4.8,
    reviewCount: 4567,
    category: "Personal Development",
    isFree: true
  },
  {
    id: "4",
    title: "Learning to Learn: Powerful mental tools to help you master tough subjects",
    provider: "edX",
    institution: "UC San Diego",
    link: "https://www.edx.org/course/learning-to-learn",
    rating: 4.6,
    reviewCount: 2345,
    category: "Personal Development",
    isFree: false
  }
]
