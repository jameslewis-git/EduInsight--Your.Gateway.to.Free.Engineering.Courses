"use client";

import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Clock, Calendar, Users, Building, ExternalLink, BookmarkPlus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/courses/CourseCard";
import { ResponsiveImage } from "@/components/ui/responsive-image";

// A function to fetch mock course data
function getCourseData(slug: string) {
  return {
    id: "1",
    slug,
    title: "Learning How to Learn: Powerful mental tools to help you master tough subjects",
    provider: "Coursera",
    institution: "McMaster University",
    instructors: ["Barbara Oakley", "Terrence Sejnowski"],
    rating: 4.8,
    reviewCount: 23786,
    category: "Personal Development",
    subcategory: "Learning Techniques",
    level: "Beginner",
    duration: "4 weeks",
    effort: "3-5 hours/week",
    language: "English",
    certificate: true,
    certificateCost: "Free",
    price: "Free",
    description: "This course gives you easy access to the invaluable learning techniques used by experts in art, music, literature, math, science, sports, and many other disciplines. We'll learn about how the brain uses two very different learning modes and how it encapsulates information. We'll also cover illusions of learning, memory techniques, dealing with procrastination, and best practices shown by research to be most effective in helping you master tough subjects.",
    skills: ["Learning Techniques", "Study Skills", "Memory Enhancement", "Procrastination Management", "Test Preparation"],
    syllabus: [
      {
        title: "Week 1: What is Learning?",
        topics: ["Introduction to the Course", "Focused versus Diffuse Thinking", "Procrastination and Memory", "Practice Quiz: Learning"]
      },
      {
        title: "Week 2: Chunking",
        topics: ["Chunking", "Illusions of Competence", "Practice Quiz: Chunking"]
      },
      {
        title: "Week 3: Procrastination and Memory",
        topics: ["Procrastination", "Memory", "The Importance of Sleep in Learning", "Practice Quiz: Procrastination"]
      },
      {
        title: "Week 4: Renaissance Learning and Unlocking Your Potential",
        topics: ["Renaissance Learning", "How to Become a Better Learner", "Final Examination"]
      }
    ],
    imageUrl: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera-course-photos/c4/a57620502a11e8b22639a758e7e52f/Learning-How-to-Learn-thumbnail-13.jpg",
    url: "https://www.coursera.org/learn/learning-how-to-learn",
    relatedCourses: [
      {
        id: "2",
        title: "Learning How To Learn for Youth",
        provider: "Coursera",
        institution: "Arizona State University",
        link: "/course/learning-how-to-learn-youth",
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
        link: "/course/mindshift",
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
        link: "/course/edx-learning-to-learn",
        rating: 4.6,
        reviewCount: 2345,
        category: "Personal Development",
        isFree: false
      }
    ]
  };
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourseData(params.slug);
  const [activeTab, setActiveTab] = useState("overview");

  // Generate a unique key for each star in the rating display
  const stars = Array.from({ length: 5 }, (_, i) => ({
    id: `star-${i}`,
    filled: i < Math.floor(course.rating)
  }));

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <nav className="flex items-center text-sm mb-4 text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/subjects" className="hover:text-foreground transition-colors">Subjects</Link>
              <span className="mx-2">/</span>
              <Link href={`/subject/${course.category.toLowerCase().replace(" ", "-")}`} className="hover:text-foreground transition-colors">{course.category}</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{course.title.substring(0, 20)}...</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-xl overflow-hidden mb-6">
                <ResponsiveImage
                  src={course.imageUrl}
                  alt={course.title}
                  aspectRatio="video"
                  className="w-full"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-2">
                    <Link href={`/provider/${course.provider.toLowerCase()}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      {course.provider}
                    </Link>
                    <span className="mx-2">•</span>
                    <Link href={`/institution/${course.institution.toLowerCase().replace(" ", "-")}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      {course.institution}
                    </Link>
                  </div>

                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>

                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex text-amber-500">
                      {stars.map((star) => (
                        <Star
                          key={star.id}
                          className={`h-5 w-5 ${star.filled ? "fill-current" : "stroke-current fill-none"}`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">{course.rating.toFixed(1)}</span>
                    <span className="text-sm text-muted-foreground">({course.reviewCount.toLocaleString()} ratings)</span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {course.duration}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {course.effort}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {course.level}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Building className="h-3 w-3" /> {course.language}
                    </Badge>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger
                      value="overview"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="syllabus"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                    >
                      Syllabus
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3"
                    >
                      Reviews
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-3">About this course</h2>
                        <p className="text-muted-foreground">{course.description}</p>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold mb-3">Skills you'll gain</h2>
                        <div className="flex flex-wrap gap-2">
                          {course.skills.map((skill) => (
                            <Badge key={`skill-${skill}`} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h2 className="text-xl font-semibold mb-3">Instructors</h2>
                        <div className="space-y-3">
                          {course.instructors.map((instructor) => (
                            <div key={`instructor-${instructor}`} className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                {instructor.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-medium">{instructor}</h3>
                                <p className="text-sm text-muted-foreground">{course.institution}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="syllabus" className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">Course Syllabus</h2>
                    <div className="space-y-6">
                      {course.syllabus.map((week) => (
                        <div key={`week-${week.title}`} className="border rounded-lg p-4">
                          <h3 className="font-semibold text-lg mb-2">{week.title}</h3>
                          <ul className="space-y-2">
                            {week.topics.map((topic) => (
                              <li key={`topic-${topic}`} className="flex gap-2">
                                <span className="text-primary">•</span>
                                <span className="text-muted-foreground">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="pt-6">
                    <div className="text-center py-12">
                      <h2 className="text-xl font-semibold mb-2">Reviews coming soon</h2>
                      <p className="text-muted-foreground">We're working on gathering reviews for this course.</p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="border-t pt-8">
                  <h2 className="text-xl font-semibold mb-6">Similar Courses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {course.relatedCourses.map((relatedCourse) => (
                      <CourseCard key={relatedCourse.id} {...relatedCourse} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="md:w-80 lg:w-96">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border rounded-xl p-6 bg-card text-card-foreground shadow-sm"
              >
                <div className="space-y-6">
                  <div>
                    <div className="text-2xl font-bold">{course.price}</div>
                    {course.certificate && (
                      <div className="text-sm text-muted-foreground">
                        Certificate Available {course.certificateCost !== "Free" && `(${course.certificateCost})`}
                      </div>
                    )}
                  </div>

                  <Button className="w-full" asChild>
                    <a href={course.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      Go to course <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                      <BookmarkPlus className="h-4 w-4" /> Save
                    </Button>
                    <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                      <Share2 className="h-4 w-4" /> Share
                    </Button>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>EduInsight is learner-supported. When you buy through links on our site, we may earn an affiliate commission.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
