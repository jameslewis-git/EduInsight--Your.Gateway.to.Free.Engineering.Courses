"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, Users, BookOpen, Award, Brain, Sparkles, Zap, ArrowRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LearningPathProps {
  id: string;
  title: string;
  description: string;
  courses: number;
  hours: number;
  level: string;
  icon: React.ElementType;
  color: string;
}

function LearningPath({ path, isActive, onClick }: { 
  path: LearningPathProps; 
  isActive: boolean; 
  onClick: () => void;
}) {
  const IconComponent = path.icon;
  
  return (
    <motion.div
      className={`cursor-pointer rounded-lg p-4 transition-all ${
        isActive ? 'bg-primary/10 border border-primary/30' : 'bg-muted/50 hover:bg-muted'
      }`}
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-md`} style={{ backgroundColor: path.color + '20', color: path.color }}>
          <IconComponent className="w-5 h-5" />
        </div>
        <h3 className="font-semibold">{path.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{path.description}</p>
      <div className="flex items-center gap-3 text-xs">
        <Badge variant="outline" className={`${isActive ? 'bg-primary/20' : 'bg-muted/70'}`}>{path.courses} courses</Badge>
        <Badge variant="outline" className={`${isActive ? 'bg-primary/20' : 'bg-muted/70'}`}>{path.hours} hours</Badge>
        <Badge variant="outline" className={`${isActive ? 'bg-primary/20' : 'bg-muted/70'}`}>{path.level}</Badge>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const [activePath, setActivePath] = useState("data-science");

  const learningPaths: LearningPathProps[] = [
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

  const selectedPath = learningPaths.find(path => path.id === activePath)!;
  const SelectedIcon = selectedPath.icon;

  const features = [
    {
      icon: CircleCheck,
      title: "Structured Learning Paths",
      description: "Follow carefully designed curricula curated by industry experts"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with peers and mentors in our thriving learning community"
    },
    {
      icon: BookOpen,
      title: "Personalized Experience",
      description: "Get recommendations based on your interests and learning style"
    },
    {
      icon: Award,
      title: "Track Your Progress",
      description: "Earn certificates and badges as you advance through courses"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4">Accelerate Your Learning</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Follow Learning Paths to Master Any Skill
            </h2>
            <p className="text-muted-foreground">
              Our structured learning paths guide you from beginner to expert with carefully curated courses from top providers.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 space-y-4">
            {learningPaths.map((path, index) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <LearningPath 
                  path={path} 
                  isActive={activePath === path.id}
                  onClick={() => setActivePath(path.id)}
                />
              </motion.div>
            ))}
          </div>
          
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-card border rounded-xl overflow-hidden shadow-sm h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              key={selectedPath.id}
            >
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-md" style={{ backgroundColor: selectedPath.color + '20', color: selectedPath.color }}>
                    <SelectedIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{selectedPath.title} Path</h3>
                    <p className="text-muted-foreground">{selectedPath.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div style={{ color: selectedPath.color }}>
                        <feature.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="font-semibold mb-1">Start your {selectedPath.title} journey today</h4>
                      <p className="text-sm text-muted-foreground">Create a free account to track your progress</p>
                    </div>
                    <div className="flex gap-3">
                      <Button asChild variant="outline">
                        <Link href={`/paths/${selectedPath.id}`}>
                          Explore path
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link href="/signup">
                          Get started <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold" style={{ color: selectedPath.color }}>{selectedPath.courses}</div>
                    <div className="text-xs text-muted-foreground">Courses</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold" style={{ color: selectedPath.color }}>{selectedPath.hours}</div>
                    <div className="text-xs text-muted-foreground">Hours</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold" style={{ color: selectedPath.color }}>12</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="text-2xl font-bold" style={{ color: selectedPath.color }}>4.8</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <motion.p
            className="text-sm text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Join over 23,400 learners who signed up in the past week
          </motion.p>
        </div>
      </div>
    </section>
  );
}
