import { MainLayout } from "@/components/layout/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Zap, Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LearningPathsPage() {
  const learningPaths = [
    {
      id: "data-science",
      title: "Data Science",
      description: "Master Python, SQL, machine learning, and visualization tools to launch a career in data science.",
      courses: 9,
      hours: 64,
      level: "Intermediate",
      icon: Brain,
      color: "#6366f1"
    },
    {
      id: "web-dev",
      title: "Web Development",
      description: "Learn HTML, CSS, JavaScript, React, and Node.js to build responsive, dynamic web applications.",
      courses: 12,
      hours: 85,
      level: "Beginner-Advanced",
      icon: Zap,
      color: "#22c55e"
    },
    {
      id: "ai",
      title: "AI & Machine Learning",
      description: "Explore neural networks, deep learning, and AI ethics to build intelligent systems.",
      courses: 8,
      hours: 72,
      level: "Advanced",
      icon: Sparkles,
      color: "#ec4899"
    },
    {
      id: "business",
      title: "Business & Management",
      description: "Develop leadership, financial, and strategic thinking skills for business success.",
      courses: 10,
      hours: 56,
      level: "All Levels",
      icon: GraduationCap,
      color: "#f59e0b"
    }
  ];

  return (
    <MainLayout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learning Paths
          </h1>
          <p className="text-xl text-muted-foreground">
            Follow structured learning paths to master new skills with carefully curated courses from top providers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {learningPaths.map((path) => {
            const IconComponent = path.icon;
            return (
              <Card key={path.id} className="overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-md" style={{ backgroundColor: path.color + '20', color: path.color }}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{path.title}</h3>
                      <p className="text-sm text-muted-foreground">{path.level} • {path.courses} courses • {path.hours} hours</p>
                    </div>
                  </div>
                  <p className="mb-6">{path.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Top Rated</Badge>
                      <Badge variant="outline">In Demand</Badge>
                    </div>
                    <Link 
                      href={`/paths/${path.id}`} 
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Explore path <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
} 
 