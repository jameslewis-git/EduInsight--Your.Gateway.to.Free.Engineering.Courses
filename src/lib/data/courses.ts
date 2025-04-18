// Course interface
export interface Course {
  id: string;
  title: string;
  provider: string;
  institution: string;
  image?: string;
  link: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  isFree?: boolean;
  description?: string;
  instructors?: Instructor[];
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  languages?: string[];
  subtitles?: string[];
  syllabus?: Lesson[];
  skills?: string[];
  prerequisites?: string[];
  price?: number;
  discountPrice?: number;
  certificate?: boolean;
  enrollmentCount?: number;
  lastUpdated?: string;
}

// Instructor interface
export interface Instructor {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  image?: string;
}

// Lesson interface
export interface Lesson {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  isPreview?: boolean;
}

// Sample popular courses data
export const popularCourses: Course[] = [
  {
    id: "udemy-pop-1",
    title: "The Complete 2024 Web Development Bootcamp",
    provider: "Udemy",
    institution: "Dr. Angela Yu",
    link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
    image: "https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg",
    rating: 4.7,
    reviewCount: 240563,
    category: "Web Development",
    isFree: true,
    description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps",
    duration: "65 hours",
    level: "All Levels",
    certificate: true,
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    id: "udemy-pop-2",
    title: "100 Days of Code: The Complete Python Pro Bootcamp",
    provider: "Udemy",
    institution: "Dr. Angela Yu",
    link: "https://www.udemy.com/course/100-days-of-code/",
    image: "https://img-c.udemycdn.com/course/480x270/2776760_f176_10.jpg",
    rating: 4.7,
    reviewCount: 185432,
    category: "Programming",
    isFree: true,
    description: "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
    duration: "60 hours",
    level: "All Levels",
    certificate: true,
    skills: ["Python", "Web Development", "Game Development", "Data Science"]
  },
  {
    id: "1",
    title: "Learning How to Learn: Powerful mental tools to help you master tough subjects",
    provider: "Coursera",
    institution: "McMaster University",
    link: "https://www.coursera.org/learn/learning-how-to-learn",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/c4/a57620502a11e8b22639a758e7e52f/Learning-How-to-Learn-thumbnail-13.jpg",
    rating: 4.8,
    reviewCount: 23786,
    category: "Personal Development",
    isFree: true,
    description: "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines.",
    duration: "4 weeks",
    level: "All Levels",
    certificate: true,
    enrollmentCount: 3000000,
    skills: ["Learning Techniques", "Memory", "Focus", "Study Skills"]
  },
  {
    id: "2",
    title: "Machine Learning",
    provider: "Coursera",
    institution: "Stanford University",
    link: "https://www.coursera.org/learn/machine-learning",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/bf/4f7f70145611e7b4b739de9c4658e8/Logo_ML_Sized.png",
    rating: 4.9,
    reviewCount: 15890,
    category: "Computer Science",
    isFree: false,
    description: "This course provides a broad introduction to machine learning, datamining, and statistical pattern recognition.",
    duration: "11 weeks", 
    level: "Intermediate",
    certificate: true,
    price: 79,
    skills: ["Machine Learning", "Algorithms", "Python", "Data Analysis"]
  },
  {
    id: "3",
    title: "The Science of Well-Being",
    provider: "Coursera",
    institution: "Yale University",
    link: "https://www.coursera.org/learn/the-science-of-well-being",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/7e/aff5b0f54c11e7ad7ebd6b426fec6b/Logo_TheScienceofWell-Being.png",
    rating: 4.9,
    reviewCount: 12453,
    category: "Psychology",
    isFree: true,
    description: "In this course you will engage in a series of challenges designed to increase your own happiness and build more productive habits.",
    duration: "10 weeks",
    level: "Beginner",
    certificate: true,
    enrollmentCount: 3500000,
    skills: ["Positive Psychology", "Happiness", "Behavioral Techniques", "Mental Health"]
  },
  {
    id: "4",
    title: "CS50's Introduction to Computer Science",
    provider: "edX",
    institution: "Harvard University",
    link: "https://www.edx.org/course/cs50s-introduction-to-computer-science",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/da1b2400-322b-459b-97b0-0c557f05d017-778b4d3567f6.small.jpg",
    rating: 4.9,
    reviewCount: 10321,
    category: "Computer Science",
    isFree: true,
    description: "This is CS50x, Harvard University's introduction to the intellectual enterprises of computer science and the art of programming.",
    duration: "12 weeks",
    level: "Beginner",
    certificate: true,
    skills: ["Programming", "Computer Science", "Algorithms", "C", "Python", "SQL", "JavaScript"]
  },
  {
    id: "pop-new-1",
    title: "The Data Science Course 2024: Complete Data Science Bootcamp",
    provider: "Udemy",
    institution: "365 Careers",
    link: "https://www.udemy.com/course/the-data-science-course-complete-data-science-bootcamp/",
    image: "https://img-c.udemycdn.com/course/480x270/1754098_e0df_3.jpg",
    rating: 4.6,
    reviewCount: 137890,
    category: "Data Science",
    isFree: true,
    description: "Complete Data Science Training: Mathematics, Statistics, Python, Advanced Statistics, Machine Learning, NLP, Deep Learning",
    duration: "29 hours",
    level: "Beginner",
    certificate: true,
    skills: ["Python", "Data Science", "Machine Learning", "Data Analysis", "Statistics"]
  },
  {
    id: "pop-new-2",
    title: "AWS Certified Solutions Architect - Associate",
    provider: "Udemy",
    institution: "Stephane Maarek",
    link: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
    image: "https://img-c.udemycdn.com/course/480x270/362328_91f3_10.jpg",
    rating: 4.7,
    reviewCount: 192456,
    category: "Cloud Computing",
    isFree: true,
    description: "Pass the AWS Solutions Architect Associate Certification (SAA-C03). Complete Amazon Web Services Cloud training!",
    duration: "27 hours",
    level: "All Levels",
    certificate: true,
    skills: ["AWS", "Cloud Computing", "DevOps", "Cloud Architecture", "Cloud Security"]
  }
];

// Sample top rated courses data
export const topRatedCourses: Course[] = [
  {
    id: "udemy-top-1",
    title: "The Complete JavaScript Course 2024: From Zero to Expert!",
    provider: "Udemy",
    institution: "Jonas Schmedtmann",
    link: "https://www.udemy.com/course/the-complete-javascript-course/",
    image: "https://img-c.udemycdn.com/course/480x270/851712_fc61_6.jpg",
    rating: 4.8,
    reviewCount: 175432,
    category: "Programming",
    isFree: true,
    description: "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
    duration: "69 hours",
    level: "All Levels",
    certificate: true,
    skills: ["JavaScript", "ES6", "OOP", "Async JavaScript", "Modern JS Development"]
  },
  {
    id: "udemy-top-2",
    title: "React - The Complete Guide 2024 (incl. React Router & Redux)",
    provider: "Udemy",
    institution: "Maximilian Schwarzmüller",
    link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
    image: "https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg",
    rating: 4.7,
    reviewCount: 185643,
    category: "Web Development",
    isFree: true,
    description: "Dive in and learn React.js from scratch! Learn React, Hooks, Redux, React Router, Next.js, Best Practices and way more!",
    duration: "49 hours",
    level: "All Levels",
    certificate: true,
    skills: ["React.js", "Redux", "React Router", "Next.js", "Modern React Development"]
  },
  {
    id: "5",
    title: "Deep Learning Specialization",
    provider: "Coursera",
    institution: "DeepLearning.AI",
    link: "https://www.coursera.org/specializations/deep-learning",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/8e18e0a9cb11e8937ddb896bab7464/Banner-vert.png",
    rating: 4.9,
    reviewCount: 18976,
    category: "Computer Science",
    isFree: false,
    description: "The Deep Learning Specialization is a foundational program that will help you understand the capabilities, challenges, and consequences of deep learning.",
    duration: "3 months",
    level: "Intermediate",
    price: 49,
    skills: ["Deep Learning", "Neural Networks", "TensorFlow", "Python"]
  },
  {
    id: "6",
    title: "Python for Everybody",
    provider: "Coursera",
    institution: "University of Michigan",
    link: "https://www.coursera.org/specializations/python",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/10/94e64625eb4b23b96a0d29b219f5fc/pythonlearn_thumbnail_1x1.png",
    rating: 4.8,
    reviewCount: 19675,
    category: "Programming",
    isFree: true,
    description: "This specialization builds on the success of the Python for Everybody course and will introduce fundamental programming concepts including data structures, networked application program interfaces, and databases.",
    duration: "8 months",
    level: "Beginner",
    certificate: true,
    skills: ["Python", "SQL", "JSON", "Database", "Web Scraping"]
  },
  {
    id: "7",
    title: "Excel Skills for Business",
    provider: "Coursera",
    institution: "Macquarie University",
    link: "https://www.coursera.org/specializations/excel",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/61/8be9efc79845c1a2e3f6ff47fcf8e9/ESB_specialisation_image_1.png",
    rating: 4.8,
    reviewCount: 9854,
    category: "Business",
    isFree: false,
    description: "This specialization is designed to help you become an advanced Microsoft Excel user. If you're planning to pursue a career that works with data or visualizations, this specialization is for you.",
    duration: "6 months",
    level: "All Levels",
    price: 49,
    skills: ["Microsoft Excel", "Data Analysis", "Business", "Spreadsheets"]
  },
  {
    id: "8",
    title: "Introduction to Data Science",
    provider: "edX",
    institution: "IBM",
    link: "https://www.edx.org/professional-certificate/ibm-data-science",
    image: "https://prod-discovery.edx-cdn.org/media/programs/card_images/c9161013-a891-42e6-b6e7-5a31dfde4f2e-8ac00172fb47.jpg",
    rating: 4.7,
    reviewCount: 7542,
    category: "Data Science",
    isFree: true,
    description: "The program consists of 9 courses that will provide you with the latest job-ready tools and skills, including open source tools and libraries, Python, databases, SQL, data visualization, data analysis, statistical analysis, predictive modeling, and machine learning algorithms.",
    duration: "12 months",
    level: "Beginner",
    certificate: true,
    skills: ["Data Science", "Python", "SQL", "Machine Learning", "Data Visualization"]
  },
  {
    id: "top-new-1",
    title: "Web Design for Beginners: Real World Coding in HTML & CSS",
    provider: "Udemy",
    institution: "Brad Schiff",
    link: "https://www.udemy.com/course/web-design-for-beginners-real-world-coding-in-html-css/",
    image: "https://img-b.udemycdn.com/course/480x270/1602378_9cfa_4.jpg",
    rating: 4.7,
    reviewCount: 59840,
    category: "Web Design",
    isFree: true,
    description: "Launch a career as a web designer by learning HTML5, CSS3, responsive design, Sass, and more with real-world projects!",
    duration: "22 hours",
    level: "Beginner",
    certificate: true,
    skills: ["HTML", "CSS", "Responsive Design", "Web Design", "Sass"]
  },
  {
    id: "top-new-2",
    title: "iOS & Swift - The Complete iOS App Development Bootcamp",
    provider: "Udemy",
    institution: "Dr. Angela Yu",
    link: "https://www.udemy.com/course/ios-13-app-development-bootcamp/",
    image: "https://img-c.udemycdn.com/course/480x270/1778502_f4b9_12.jpg",
    rating: 4.8,
    reviewCount: 78940,
    category: "Mobile Development",
    isFree: true,
    description: "From beginner to iOS app developer with just one course. Learn to code and build real iOS apps with Swift and SwiftUI!",
    duration: "55 hours",
    level: "All Levels",
    certificate: true,
    skills: ["iOS", "Swift", "SwiftUI", "Mobile Development", "App Development"]
  }
];

// Sample course by subjects
export const coursesBySubject: Record<string, Course[]> = {
  "cs": [
    {
      id: "cs1",
      title: "CS50's Introduction to Computer Science",
      provider: "edX",
      institution: "Harvard University",
      link: "https://www.edx.org/course/cs50s-introduction-to-computer-science",
      image: "https://prod-discovery.edx-cdn.org/media/course/image/da1b2400-322b-459b-97b0-0c557f05d017-778b4d3567f6.small.jpg",
      rating: 4.9,
      reviewCount: 10321,
      category: "Computer Science",
      isFree: true
    },
    {
      id: "cs2",
      title: "Machine Learning",
      provider: "Coursera",
      institution: "Stanford University",
      link: "https://www.coursera.org/learn/machine-learning",
      image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/bf/4f7f70145611e7b4b739de9c4658e8/Logo_ML_Sized.png",
      rating: 4.9,
      reviewCount: 15890,
      category: "Computer Science",
      isFree: false
    }
  ],
  "data-science": [
    {
      id: "ds1",
      title: "Data Science Specialization",
      provider: "Coursera",
      institution: "Johns Hopkins University",
      link: "https://www.coursera.org/specializations/jhu-data-science",
      image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/51/51d7604bec11e8bd0c1b52408a8219/Data-Science-Specialization-Logo-Large.jpg",
      rating: 4.6,
      reviewCount: 8765,
      category: "Data Science",
      isFree: false
    },
    {
      id: "ds2",
      title: "Introduction to Data Science",
      provider: "edX",
      institution: "IBM",
      link: "https://www.edx.org/professional-certificate/ibm-data-science",
      image: "https://prod-discovery.edx-cdn.org/media/programs/card_images/c9161013-a891-42e6-b6e7-5a31dfde4f2e-8ac00172fb47.jpg",
      rating: 4.7,
      reviewCount: 7542,
      category: "Data Science",
      isFree: true
    }
  ],
  "business": [
    {
      id: "bus1",
      title: "Financial Markets",
      provider: "Coursera",
      institution: "Yale University",
      link: "https://www.coursera.org/learn/financial-markets-global",
      image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/a6/82ec33a9e94e4f989dce35aec0a548/Logo.png",
      rating: 4.8,
      reviewCount: 7652,
      category: "Finance",
      isFree: true
    },
    {
      id: "bus2",
      title: "Business Foundations",
      provider: "Coursera",
      institution: "University of Pennsylvania",
      link: "https://www.coursera.org/specializations/wharton-business-foundations",
      image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/3c/0e3ae0a0e511e8b31fddf70b416e47/Wharton-Footer-Logo.png",
      rating: 4.7,
      reviewCount: 6543,
      category: "Business",
      isFree: false
    }
  ]
}; 