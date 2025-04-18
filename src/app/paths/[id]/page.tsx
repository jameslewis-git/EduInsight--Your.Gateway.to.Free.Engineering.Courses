import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Sparkles, GraduationCap, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data for learning paths
const learningPaths = [
  {
    id: "data-science",
    title: "Data Science",
    description: "Master Python, SQL, machine learning, and visualization tools to launch a career in data science.",
    courses: 9,
    hours: 64,
    level: "Intermediate",
    icon: Brain,
    color: "#6366f1",
    skills: [
      "Python Programming", "SQL & Database Management", "Data Visualization", 
      "Machine Learning", "Statistical Analysis", "Big Data Technologies"
    ],
    modules: [
      {
        title: "Foundations of Data Science",
        description: "Learn the basics of Python, SQL, and data manipulation.",
        courses: 3,
        hours: 18
      },
      {
        title: "Data Visualization & Exploration",
        description: "Master data visualization techniques with Python libraries.",
        courses: 2,
        hours: 14
      },
      {
        title: "Machine Learning Fundamentals",
        description: "Introduction to supervised and unsupervised learning algorithms.",
        courses: 2,
        hours: 16
      },
      {
        title: "Advanced Machine Learning",
        description: "Deep learning, neural networks, and advanced ML applications.",
        courses: 2,
        hours: 16
      }
    ]
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript, React, and Node.js to build responsive, dynamic web applications.",
    courses: 12,
    hours: 85,
    level: "Beginner-Advanced",
    icon: Zap,
    color: "#22c55e",
    skills: [
      "HTML/CSS", "JavaScript", "React", "Node.js", "Responsive Design", 
      "API Integration", "Web Performance", "Modern Frontend Development"
    ],
    modules: [
      {
        title: "Web Fundamentals",
        description: "HTML, CSS, and basic JavaScript for web development.",
        courses: 3,
        hours: 20
      },
      {
        title: "JavaScript & DOM Manipulation",
        description: "Advanced JavaScript and DOM interaction for dynamic websites.",
        courses: 3,
        hours: 22
      },
      {
        title: "React & Modern Frontend",
        description: "Building interactive UIs with React and modern JavaScript.",
        courses: 3,
        hours: 24
      },
      {
        title: "Backend Development with Node.js",
        description: "Creating backends, RESTful APIs, and full-stack applications.",
        courses: 3,
        hours: 19
      }
    ]
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Explore neural networks, deep learning, and AI ethics to build intelligent systems.",
    courses: 8,
    hours: 72,
    level: "Advanced",
    icon: Sparkles,
    color: "#ec4899",
    skills: [
      "Python for AI", "Neural Networks", "Deep Learning", "Computer Vision", 
      "Natural Language Processing", "Reinforcement Learning", "AI Ethics"
    ],
    modules: [
      {
        title: "AI Foundations",
        description: "Introduction to AI concepts, algorithms, and Python libraries.",
        courses: 2,
        hours: 16
      },
      {
        title: "Neural Networks & Deep Learning",
        description: "Building and training neural networks for various tasks.",
        courses: 2,
        hours: 20
      },
      {
        title: "Computer Vision & NLP",
        description: "Working with image data and natural language processing.",
        courses: 2,
        hours: 18
      },
      {
        title: "Advanced AI Applications",
        description: "Reinforcement learning, GANs, and cutting-edge AI techniques.",
        courses: 2,
        hours: 18
      }
    ]
  },
  {
    id: "business",
    title: "Business & Management",
    description: "Develop leadership, financial, and strategic thinking skills for business success.",
    courses: 10,
    hours: 56,
    level: "All Levels",
    icon: GraduationCap,
    color: "#f59e0b",
    skills: [
      "Leadership", "Strategic Management", "Financial Analysis", "Marketing", 
      "Project Management", "Business Communication", "Entrepreneurship"
    ],
    modules: [
      {
        title: "Business Fundamentals",
        description: "Introduction to key business concepts and frameworks.",
        courses: 3,
        hours: 15
      },
      {
        title: "Leadership & Management",
        description: "Developing leadership skills and effective management techniques.",
        courses: 2,
        hours: 12
      },
      {
        title: "Financial Management",
        description: "Understanding financial statements, budgeting, and financial planning.",
        courses: 3,
        hours: 16
      },
      {
        title: "Strategy & Innovation",
        description: "Strategic thinking, business innovation, and entrepreneurship.",
        courses: 2,
        hours: 13
      }
    ]
  }
];

// Add this function to generate all possible paths at build time
export function generateStaticParams() {
  return learningPaths.map(path => ({
    id: path.id
  }));
}

function getModuleStatus(moduleIndex: number) {
  if (moduleIndex === 0) return "CURRENT";
  if (moduleIndex === 1) return "UPCOMING";
  return "LOCKED";
}

export default function LearningPathPage({ params }: { params: { id: string } }) {
  const path = learningPaths.find(p => p.id === params.id);
  
  if (!path) {
    notFound();
  }
  
  // Using the appropriate icon component based on path
  const IconComponent = path.icon;
  
  return (
    <MainLayout>
      <div className="container py-16">
        <Link href="/paths" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Learning Paths
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-md" style={{ backgroundColor: path.color + '20', color: path.color }}>
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{path.title} Path</h1>
                <p className="text-muted-foreground">{path.level} • {path.courses} courses • {path.hours} hours</p>
              </div>
            </div>
            
            <p className="text-lg mb-8">{path.description}</p>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Skills You'll Gain</h2>
              <div className="flex flex-wrap gap-2">
                {path.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="py-1.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Learning Modules</h2>
              <div className="space-y-4">
                {path.modules.map((module, index) => {
                  const status = getModuleStatus(index);
                  return (
                    <Card 
                      key={index} 
                      className={`border ${status === "CURRENT" ? "border-2" : ""}`}
                      style={status === "CURRENT" ? { borderColor: path.color } : {}}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-medium">{module.title}</h3>
                              {status === "CURRENT" && (
                                <Badge variant="outline" style={{ backgroundColor: path.color + '20', color: path.color }}>
                                  Current
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {module.courses} courses • {module.hours} hours
                            </p>
                            <p className="mt-2">{module.description}</p>
                          </div>
                          
                          <div>
                            {status === "CURRENT" && (
                              <Button size="sm">
                                Continue <ArrowRight className="ml-2 w-4 h-4" />
                              </Button>
                            )}
                            {status === "UPCOMING" && (
                              <Button size="sm" variant="outline">
                                Start Module
                              </Button>
                            )}
                            {status === "LOCKED" && (
                              <Button size="sm" variant="outline" disabled>
                                Locked
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Path Overview</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">0%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: '0%', backgroundColor: path.color }}></div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Courses</span>
                    <span>{path.courses}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Time</span>
                    <span>{path.hours} hours</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Level</span>
                    <span>{path.level}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Modules</span>
                    <span>{path.modules.length}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <h3 className="font-medium">Why this path?</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Structured curriculum from beginner to advanced</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Curated courses from top providers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Progress tracking and completion certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                      <span>Projects to build your portfolio</span>
                    </li>
                  </ul>
                </div>
                
                <Button className="w-full">Enroll in Path</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
 