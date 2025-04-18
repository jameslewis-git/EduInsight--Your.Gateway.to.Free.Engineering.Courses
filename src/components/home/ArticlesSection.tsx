"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
  readTime?: string;
  author?: string;
  featured?: boolean;
}

function ArticleCard({ id, title, excerpt, image, category, date, slug, readTime, author, featured }: ArticleCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400 }}
      className={featured ? "md:col-span-2" : ""}
    >
      <Link href={`/report/${slug}`} className="block h-full">
        <Card className={`overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors ${featured ? "md:flex-row" : ""}`}>
          <div className={`relative overflow-hidden ${featured ? "md:w-1/2 md:h-auto" : "aspect-[16/9]"}`}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
            />
            <Badge className="absolute top-2 left-2 z-10">
              {category}
            </Badge>
            {featured && (
              <Badge variant="outline" className="absolute top-2 right-2 bg-primary text-white z-10">
                Featured
              </Badge>
            )}
          </div>
          <CardContent className={`flex-1 flex flex-col p-4 ${featured ? "md:p-6" : ""}`}>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{date}</span>
              </div>
              {readTime && (
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{readTime}</span>
                </div>
              )}
              {author && (
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{author}</span>
                </div>
              )}
            </div>
            <h3 className={`font-semibold ${featured ? "text-xl mb-3" : "text-lg mb-2"} line-clamp-2`}>
              {title}
            </h3>
            <p className={`text-sm text-muted-foreground ${featured ? "line-clamp-4 mb-4" : "line-clamp-3"}`}>
              {excerpt}
            </p>
            {featured && (
              <div className="mt-auto flex items-center gap-2 text-primary font-medium text-sm">
                <span>Read full article</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export function ArticlesSection() {
  const [category, setCategory] = useState<string | null>(null);
  
  // Sample articles data
  const articles = [
    {
      id: "1",
      title: "Harvard CS50: How to Pick the Best Course with Free Certificates",
      excerpt: "Computer Science 50 (CS50) is Harvard University's introductory course for majors and non-majors alike, a one-semester introduction to the intellectual enterprises of computer science and the art of programming.",
      image: "https://ext.same-assets.com/1133216312/1095553885.png",
      category: "Computer Science",
      date: "April 15, 2025",
      slug: "harvard-cs50-guide",
      readTime: "8 min read",
      author: "David Malan",
      featured: true
    },
    {
      id: "2",
      title: "9 Best Animation Courses for 2025: Art in Motion",
      excerpt: "Learn the fundamentals of animation and bring your creative visions to life with these top-rated online animation courses from experts in the field.",
      image: "https://ext.same-assets.com/2499221467/847298833.png",
      category: "Design",
      date: "April 10, 2025",
      slug: "best-animation-courses-2025",
      readTime: "6 min read",
      author: "Emma Roberts"
    },
    {
      id: "3",
      title: "Most Objective C Courses for 2025: Expert Track of Money",
      excerpt: "Dive into the world of iOS development with these expert-led Objective-C courses that will enhance your coding skills and career prospects.",
      image: "https://ext.same-assets.com/2499221467/2755497025.png",
      category: "Programming",
      date: "March 28, 2025",
      slug: "best-objective-c-courses-2025",
      readTime: "7 min read",
      author: "Alex Chen"
    },
    {
      id: "4",
      title: "Quantum Computing Education: Preparing for the Future",
      excerpt: "As quantum technologies become more mainstream, educational institutions are racing to develop curricula that prepare students for the quantum revolution.",
      image: "https://ext.same-assets.com/1133216312/3955553285.png",
      category: "Quantum Computing",
      date: "May 5, 2025",
      slug: "quantum-computing-education",
      readTime: "9 min read",
      author: "Dr. Quantum"
    },
    {
      id: "5",
      title: "AI-Powered Learning: The New Frontier in Education",
      excerpt: "Artificial intelligence is transforming how we learn, with personalized experiences that adapt to individual needs and learning styles.",
      image: "https://ext.same-assets.com/2499221467/947294833.png",
      category: "AI",
      date: "May 12, 2025",
      slug: "ai-powered-learning",
      readTime: "5 min read",
      author: "Sarah Lee"
    }
  ];

  const categories = ["All", ...new Set(articles.map(article => article.category))];
  const filteredArticles = category ? articles.filter(article => article.category === category) : articles;
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get the latest news and analysis
            </motion.h2>
            <motion.p
              className="mt-2 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Stay updated with the latest trends in online education
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/report" className="text-primary hover:underline mt-4 md:mt-0 inline-block">
              Browse The Report →
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-thin"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === "All" ? (category === null ? "default" : "outline") : category === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat === "All" ? null : cat)}
              className="whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={article.featured ? "lg:col-span-2" : ""}
            >
              <ArticleCard {...article} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/report">
            <Button variant="outline" size="lg" className="gap-2">
              View all articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
