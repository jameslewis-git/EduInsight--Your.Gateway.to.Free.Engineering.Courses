import { MainLayout } from "@/components/layout/MainLayout";
import { Cpu, ArrowRight, ExternalLink, BookOpen, Users, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function QuantumEducationPage() {
  return (
    <MainLayout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold">Quantum Education</h1>
          </div>

          <div className="space-y-8">
            {/* Featured Courses */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Featured Courses</h2>
              <div className="grid gap-6">
                {[
                  {
                    title: "Introduction to Quantum Computing",
                    instructor: "Dr. Sarah Chen",
                    duration: "12 weeks",
                    level: "Beginner",
                    enrolled: "2.5k students",
                    link: "#"
                  },
                  {
                    title: "Quantum Algorithms and Applications",
                    instructor: "Prof. James Wilson",
                    duration: "10 weeks",
                    level: "Intermediate",
                    enrolled: "1.8k students",
                    link: "#"
                  },
                  {
                    title: "Advanced Quantum Programming",
                    instructor: "Dr. Michael Kumar",
                    duration: "8 weeks",
                    level: "Advanced",
                    enrolled: "950 students",
                    link: "#"
                  }
                ].map((course, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                          <div className="text-gray-600">{course.instructor}</div>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          {course.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {course.enrolled}
                        </div>
                      </div>
                      <a 
                        href={course.link}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        View course
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Learning Resources */}
            <section>
              <h2 className="text-2xl font-semibold mb-6">Learning Resources</h2>
              <div className="grid gap-6">
                {[
                  {
                    title: "Quantum Programming Guide",
                    type: "Documentation",
                    description: "Comprehensive guide to quantum programming concepts and practices",
                    link: "#"
                  },
                  {
                    title: "Quantum Simulator",
                    type: "Tool",
                    description: "Interactive quantum circuit simulator for hands-on learning",
                    link: "#"
                  },
                  {
                    title: "Code Examples Repository",
                    type: "Examples",
                    description: "Collection of quantum algorithms and implementation examples",
                    link: "#"
                  }
                ].map((resource, index) => (
                  <a 
                    key={index}
                    href={resource.link}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <Code className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-medium mb-1">{resource.title}</div>
                        <div className="text-sm text-gray-600">{resource.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-gray-50">
                        {resource.type}
                      </Badge>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                    </div>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
 