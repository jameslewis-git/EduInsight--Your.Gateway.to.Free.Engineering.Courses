import { Course } from "./courses";

// Subject interface
export interface Subject {
  id: string;
  name: string;
  description: string;
  courses: number;
  topics: string[];
  featured?: Course[];
  popular?: Course[];
}

// Sample subject data
export const subjects: Subject[] = [
  {
    id: "cs",
    name: "Computer Science",
    description: "Explore the fundamentals of computer science, programming languages, algorithms, data structures, and cutting-edge topics like artificial intelligence and machine learning.",
    courses: 32450,
    topics: ["Programming", "Web Development", "AI & Machine Learning", "Cybersecurity", "Data Structures"]
  },
  {
    id: "business",
    name: "Business",
    description: "Develop essential business skills in marketing, finance, entrepreneurship, management, and strategy to advance your career or start your own venture in today's competitive marketplace.",
    courses: 28750,
    topics: ["Marketing", "Finance", "Entrepreneurship", "Management", "Accounting"]
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Learn how to collect, analyze, and interpret complex data using statistical methods, programming, and visualization techniques to extract valuable insights and inform decision-making.",
    courses: 15320,
    topics: ["Data Analysis", "Machine Learning", "Data Visualization", "Statistics", "Big Data"]
  },
  {
    id: "humanities",
    name: "Humanities",
    description: "Study human culture, history, and creativity through literature, philosophy, history, languages, and the arts to gain a deeper understanding of our world and human experience.",
    courses: 12890,
    topics: ["Philosophy", "History", "Literature", "Languages", "Religion"]
  },
  {
    id: "personal-dev",
    name: "Personal Development",
    description: "Build essential life skills like leadership, productivity, communication, and well-being to achieve your personal and professional goals and lead a more fulfilled life.",
    courses: 12450,
    topics: ["Leadership", "Productivity", "Communication", "Career Development", "Creativity"]
  },
  {
    id: "art-design",
    name: "Art & Design",
    description: "Unlock your creativity with courses in graphic design, drawing, UX/UI, animation, and photography to develop technical skills and artistic vision for creative careers.",
    courses: 11780,
    topics: ["Graphic Design", "UX/UI", "Drawing", "Animation", "Photography"]
  },
  {
    id: "programming",
    name: "Programming",
    description: "Learn to code with courses in Python, JavaScript, Java, and other programming languages to build websites, apps, games, and other digital experiences.",
    courses: 10950,
    topics: ["Python", "JavaScript", "Java", "C++", "Web Development"]
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Study mechanical, electrical, civil, chemical, and software engineering principles and practices to design and build solutions to real-world problems.",
    courses: 9870,
    topics: ["Mechanical", "Electrical", "Civil", "Chemical", "Software"]
  },
  {
    id: "health",
    name: "Health & Medicine",
    description: "Explore medical science, nutrition, fitness, mental health, and healthcare topics to better understand human health and wellness in personal and professional contexts.",
    courses: 8760,
    topics: ["Nutrition", "Fitness", "Medical Ethics", "Public Health", "Psychology"]
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Master mathematical concepts like calculus, statistics, linear algebra, and probability to develop analytical thinking skills useful in virtually every field.",
    courses: 7650,
    topics: ["Calculus", "Statistics", "Linear Algebra", "Discrete Math", "Probability"]
  },
  {
    id: "science",
    name: "Science",
    description: "Discover the natural world through physics, biology, chemistry, astronomy, and environmental science to understand how everything works and solve complex problems.",
    courses: 6540,
    topics: ["Physics", "Biology", "Chemistry", "Astronomy", "Environmental Science"]
  },
  {
    id: "social-sciences",
    name: "Social Sciences",
    description: "Study human behavior and society through economics, psychology, sociology, political science, and anthropology to better understand complex social dynamics.",
    courses: 5980,
    topics: ["Economics", "Psychology", "Sociology", "Political Science", "Anthropology"]
  }
];

// Subject data with courses
export const subjectsWithCourses: Record<string, Subject> = {
  "cs": {
    id: "cs",
    name: "Computer Science",
    description: "Explore the fundamentals of computer science, programming languages, algorithms, data structures, and cutting-edge topics like artificial intelligence and machine learning.",
    courses: 32450,
    topics: ["Programming", "Web Development", "AI & Machine Learning", "Cybersecurity", "Data Structures"],
    featured: [
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
      },
      {
        id: "cs3",
        title: "Deep Learning Specialization",
        provider: "Coursera",
        institution: "DeepLearning.AI",
        link: "https://www.coursera.org/specializations/deep-learning",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/eb/8e18e0a9cb11e8937ddb896bab7464/Banner-vert.png",
        rating: 4.9,
        reviewCount: 18976,
        category: "Computer Science",
        isFree: false
      },
      {
        id: "cs4",
        title: "Python for Everybody",
        provider: "Coursera",
        institution: "University of Michigan",
        link: "https://www.coursera.org/specializations/python",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/10/94e64625eb4b23b96a0d29b219f5fc/pythonlearn_thumbnail_1x1.png",
        rating: 4.8,
        reviewCount: 19675,
        category: "Programming",
        isFree: true
      }
    ],
    popular: [
      {
        id: "cs5",
        title: "Web Development Bootcamp",
        provider: "Udemy",
        institution: "Colt Steele",
        link: "https://www.udemy.com/course/the-web-developer-bootcamp/",
        image: "https://img-c.udemycdn.com/course/480x270/625204_436a_3.jpg",
        rating: 4.7,
        reviewCount: 12450,
        category: "Web Development",
        isFree: false
      },
      {
        id: "cs6",
        title: "Data Structures and Algorithms",
        provider: "Coursera",
        institution: "University of California San Diego",
        link: "https://www.coursera.org/specializations/data-structures-algorithms",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/2a/34a150d9ad11e5bd22cb7d7d7686df/logo3.png",
        rating: 4.6,
        reviewCount: 8732,
        category: "Computer Science",
        isFree: false
      },
      {
        id: "cs7",
        title: "Full Stack Open",
        provider: "University of Helsinki",
        institution: "University of Helsinki",
        link: "https://fullstackopen.com/",
        image: "https://fullstackopen.com/static/5214bbc712a5232704a9b575d9abf6ec/5a190/logo.png",
        rating: 4.8,
        reviewCount: 5420,
        category: "Web Development",
        isFree: true
      },
      {
        id: "cs8",
        title: "React - The Complete Guide",
        provider: "Udemy",
        institution: "Academind",
        link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
        image: "https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg",
        rating: 4.7,
        reviewCount: 7654,
        category: "Web Development",
        isFree: false
      }
    ]
  },
  "data-science": {
    id: "data-science",
    name: "Data Science",
    description: "Learn how to collect, analyze, and interpret complex data using statistical methods, programming, and visualization techniques to extract valuable insights and inform decision-making.",
    courses: 15320,
    topics: ["Data Analysis", "Machine Learning", "Data Visualization", "Statistics", "Big Data"],
    featured: [
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
        title: "IBM Data Science Professional Certificate",
        provider: "Coursera",
        institution: "IBM",
        link: "https://www.coursera.org/professional-certificates/ibm-data-science",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/06/3d602be9cf11e8994e0901542fe89a/Professional-Certificate---Data-Science---600x600---Blu-Text.png",
        rating: 4.7,
        reviewCount: 7542,
        category: "Data Science",
        isFree: true
      },
      {
        id: "ds3",
        title: "Python for Data Science and Machine Learning",
        provider: "Udemy",
        institution: "Jose Portilla",
        link: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
        image: "https://img-c.udemycdn.com/course/480x270/903744_8eb2.jpg",
        rating: 4.6,
        reviewCount: 9876,
        category: "Data Science",
        isFree: false
      },
      {
        id: "ds4",
        title: "DataCamp Data Scientist with Python",
        provider: "DataCamp",
        institution: "DataCamp",
        link: "https://www.datacamp.com/tracks/data-scientist-with-python",
        image: "https://www.datacamp.com/static/assets/images/platform/ds-track-social-og.jpg",
        rating: 4.5,
        reviewCount: 6543,
        category: "Data Science",
        isFree: false
      }
    ],
    popular: [
      {
        id: "ds5",
        title: "Machine Learning A-Z™: Hands-On Python & R",
        provider: "Udemy",
        institution: "Kirill Eremenko",
        link: "https://www.udemy.com/course/machinelearning/",
        image: "https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg",
        rating: 4.5,
        reviewCount: 10432,
        category: "Data Science",
        isFree: false
      },
      {
        id: "ds6",
        title: "SQL for Data Science",
        provider: "Coursera",
        institution: "University of California, Davis",
        link: "https://www.coursera.org/learn/sql-for-data-science",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/c3/ea40f01bfe11e88bede3c96b6be5da/square-logo.png",
        rating: 4.6,
        reviewCount: 7654,
        category: "Data Science",
        isFree: true
      },
      {
        id: "ds7",
        title: "Tableau 2022 A-Z: Hands-On Tableau Training",
        provider: "Udemy",
        institution: "Kirill Eremenko",
        link: "https://www.udemy.com/course/tableau10/",
        image: "https://img-c.udemycdn.com/course/480x270/937678_abd2_3.jpg",
        rating: 4.6,
        reviewCount: 6789,
        category: "Data Science",
        isFree: false
      },
      {
        id: "ds8",
        title: "Applied Data Science with Python",
        provider: "Coursera",
        institution: "University of Michigan",
        link: "https://www.coursera.org/specializations/data-science-python",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/28/7bee2047b311e8a6ccc9be21cd8e0e/pythondatascience_specialization_banner_2.png",
        rating: 4.5,
        reviewCount: 5432,
        category: "Data Science",
        isFree: false
      }
    ]
  },
  "business": {
    id: "business",
    name: "Business",
    description: "Develop essential business skills in marketing, finance, entrepreneurship, management, and strategy to advance your career or start your own venture in today's competitive marketplace.",
    courses: 28750,
    topics: ["Marketing", "Finance", "Entrepreneurship", "Management", "Accounting"],
    featured: [
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
      },
      {
        id: "bus3",
        title: "Excel Skills for Business",
        provider: "Coursera",
        institution: "Macquarie University",
        link: "https://www.coursera.org/specializations/excel",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/61/8be9efc79845c1a2e3f6ff47fcf8e9/ESB_specialisation_image_1.png",
        rating: 4.8,
        reviewCount: 9854,
        category: "Business",
        isFree: false
      },
      {
        id: "bus4",
        title: "Digital Marketing",
        provider: "Coursera",
        institution: "University of Illinois",
        link: "https://www.coursera.org/specializations/digital-marketing",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/20/34a150d9ad11e5bd22cb7d7d7686df/logo3.png",
        rating: 4.6,
        reviewCount: 5432,
        category: "Marketing",
        isFree: false
      }
    ],
    popular: [
      {
        id: "bus5",
        title: "The Complete Financial Analyst Course",
        provider: "Udemy",
        institution: "365 Careers",
        link: "https://www.udemy.com/course/the-complete-financial-analyst-course/",
        image: "https://img-c.udemycdn.com/course/480x270/648826_f0c1_4.jpg",
        rating: 4.6,
        reviewCount: 7890,
        category: "Finance",
        isFree: false
      },
      {
        id: "bus6",
        title: "Introduction to Marketing",
        provider: "Coursera",
        institution: "University of Pennsylvania",
        link: "https://www.coursera.org/learn/wharton-marketing",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/fc/3b5a43d6d5adc1f3d8eb77c52c105a/Logo-Coursera.png",
        rating: 4.7,
        reviewCount: 4321,
        category: "Marketing",
        isFree: false
      },
      {
        id: "bus7",
        title: "Entrepreneurship 1: Developing the Opportunity",
        provider: "Coursera",
        institution: "University of Pennsylvania",
        link: "https://www.coursera.org/learn/wharton-entrepreneurship-opportunity",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/03/1b95d0111211e5aafd51150c39be4d/entrepreneurship_1.jpg",
        rating: 4.7,
        reviewCount: 3210,
        category: "Entrepreneurship",
        isFree: false
      },
      {
        id: "bus8",
        title: "Leading People and Teams",
        provider: "Coursera",
        institution: "University of Michigan",
        link: "https://www.coursera.org/specializations/leading-teams",
        image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d15cw65ipctsrr.cloudfront.net/af/b5b9d0b9b311e5bae5fffe125f288c/Leading-People-and-Teams-Specialized-2-.jpg",
        rating: 4.8,
        reviewCount: 4567,
        category: "Management",
        isFree: false
      }
    ]
  },
  "programming": {
    id: "programming",
    name: "Programming",
    description: "Learn to code with courses in Python, JavaScript, Java, and other programming languages to build websites, apps, games, and other digital experiences.",
    courses: 10950,
    topics: ["Python", "JavaScript", "Java", "C++", "Web Development"],
    featured: [
      {
        id: "prog1",
        title: "Complete Python Bootcamp: From Zero to Hero in Python",
        provider: "Udemy",
        institution: "Udemy",
        link: "https://www.udemy.com/course/complete-python-bootcamp/",
        image: "https://img-c.udemycdn.com/course/480x270/567828_67d0.jpg",
        rating: 4.7,
        reviewCount: 1390,
        category: "Programming",
        isFree: true
      },
      {
        id: "prog2",
        title: "The Web Developer Bootcamp 2024",
        provider: "Udemy",
        institution: "Udemy",
        link: "https://www.udemy.com/course/the-web-developer-bootcamp/",
        image: "https://img-c.udemycdn.com/course/480x270/625204_436a_3.jpg",
        rating: 4.7,
        reviewCount: 2293,
        category: "Programming",
        isFree: true
      },
      {
        id: "prog3",
        title: "JavaScript: Understanding the Weird Parts",
        provider: "Udemy",
        institution: "Udemy",
        link: "https://www.udemy.com/course/understand-javascript/",
        image: "https://img-c.udemycdn.com/course/480x270/364426_2991_6.jpg",
        rating: 4.8,
        reviewCount: 3456,
        category: "Programming",
        isFree: true
      },
      {
        id: "prog4",
        title: "Modern JavaScript From The Beginning",
        provider: "Udemy",
        institution: "Udemy",
        link: "https://www.udemy.com/course/modern-javascript-from-the-beginning/",
        image: "https://img-c.udemycdn.com/course/480x270/1463348_52a4_2.jpg",
        rating: 4.7,
        reviewCount: 2876,
        category: "Programming",
        isFree: true
      }
    ],
    popular: [
      {
        id: "prog5",
        title: "Learn Python Programming Masterclass",
        provider: "Udemy",
        institution: "Udemy",
        link: "https://www.udemy.com/course/python-the-complete-python-developer-course/",
        image: "https://img-c.udemycdn.com/course/480x270/629302_8a2d_2.jpg",
        rating: 4.5,
        reviewCount: 3113,
        category: "Programming",
        isFree: true
      },
      {
        id: "prog6",
        title: "The Complete JavaScript Course 2024",
        provider: "Udemy",
        institution: "Udemy",
        link: "https://www.udemy.com/course/the-complete-javascript-course/",
        image: "https://img-c.udemycdn.com/course/480x270/851712_fc61_6.jpg",
        rating: 4.6,
        reviewCount: 4532,
        category: "Programming",
        isFree: true
      },
      {
        id: "prog7",
        title: "Java Programming Masterclass",
        provider: "Udemy",
        institution: "Udemy",
        link: "https://www.udemy.com/course/java-the-complete-java-developer-course/",
        image: "https://img-c.udemycdn.com/course/480x270/533682_c10c_4.jpg",
        rating: 4.6,
        reviewCount: 3987,
        category: "Programming",
        isFree: true
      },
      {
        id: "prog8",
        title: "React - The Complete Guide 2024",
        provider: "Udemy",
        institution: "Udemy",
        link: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
        image: "https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg",
        rating: 4.7,
        reviewCount: 5234,
        category: "Programming",
        isFree: true
      }
    ]
  }
};

// Helper function to get subject by ID
export function getSubject(id: string): Subject | null {
  return subjectsWithCourses[id] || subjects.find(subject => subject.id === id) || null;
}

// Helper function to get all subjects
export function getAllSubjects(): Subject[] {
  return subjects;
}

// Helper function to get featured courses by subject ID
export function getFeaturedCoursesBySubject(subjectId: string): Course[] {
  return subjectsWithCourses[subjectId]?.featured || [];
}

// Helper function to get popular courses by subject ID
export function getPopularCoursesBySubject(subjectId: string): Course[] {
  return subjectsWithCourses[subjectId]?.popular || [];
} 