"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, BookOpen, ArrowRight, ChevronRight, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

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
  fullContent?: string;
}

function ArticleCard({ id, title, excerpt, image, category, date, slug, readTime, author, featured, fullContent }: ArticleCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(y, [-100, 100], [3, -3]);
  const rotateY = useTransform(x, [-100, 100], [-3, 3]);
  
  // Glowing border effect values
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // Handle mouse move for 3D effect and glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Center coordinates (0,0) in the middle of the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Set motion values for rotation effect
    x.set(mouseX - centerX);
    y.set(mouseY - centerY);
    
    // Set glow position for the gradient border
    setGlowPosition({ x: mouseX / rect.width, y: mouseY / rect.height });
  };
  
  return (
    <motion.div
      className={`${featured ? "md:col-span-2" : ""} h-full`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        ref={cardRef}
        style={{ 
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
          setIsHovering(false);
        }}
        className="relative w-full h-full perspective-1000"
      >
        {/* Animated border - different gradients for light/dark mode */}
        <div 
          className="absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            background: isHovering 
              ? `radial-gradient(circle at ${glowPosition.x * 100}% ${glowPosition.y * 100}%, rgba(37, 99, 235, 0.3) 0%, rgba(147, 51, 234, 0.2) 25%, rgba(0, 0, 0, 0) 70%)` 
              : 'none',
            opacity: isHovering ? 1 : 0,
            zIndex: 0
          }}
        />
        
        <Link href={`/report`} className="block h-full">
          <Card className="overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors bg-white shadow-md dark:bg-slate-900/90 backdrop-blur-sm relative border border-slate-200 dark:border-slate-800">
            {/* Animated shine effect */}
            {isHovering && (
              <div 
                className="absolute inset-0 opacity-20 dark:opacity-30 z-0 overflow-hidden"
                style={{
                  background: `linear-gradient(105deg, 
                    transparent 20%, 
                    rgba(255, 255, 255, 0.4) 25%, 
                    transparent 60%)`,
                  backgroundSize: "200% 100%",
                  animation: "shine 1.5s ease-in-out infinite"
                }}
              />
            )}
            
            <div className={`relative overflow-hidden ${featured ? "md:w-full h-72" : "h-48"}`}>
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-all duration-700 ease-in-out"
                style={{ 
                  objectFit: "cover",
                  transform: isHovering ? "scale(1.05)" : "scale(1)",
                  filter: isHovering ? "brightness(1.1)" : "brightness(1)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              
              {/* Category badge with shimmer effect */}
              <div className="absolute top-4 left-4 z-20">
                <div className="relative group">
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white shadow-lg shadow-blue-900/20 group-hover:shadow-blue-600/40 transition-shadow duration-300">
                    <Sparkles className="w-3 h-3 mr-1 opacity-80" />
                    {category}
                  </Badge>
                </div>
              </div>
              
              {/* Featured badge */}
              {featured && (
                <div className="absolute top-4 right-4 z-20">
                  <Badge variant="outline" className="bg-primary/80 backdrop-blur-sm text-white border-white/20">
                    Featured
                  </Badge>
                </div>
              )}
              
              {/* Article metadata on image bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white drop-shadow-md mb-2">
                  {title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-white/80">
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
              </div>
            </div>
            
            <CardContent className="flex-1 flex flex-col p-4 text-slate-800 dark:text-slate-200">
              <p className="text-sm mb-4 text-slate-600 dark:text-slate-300">
                {excerpt}
              </p>
              
              <div className="mt-auto pt-2 border-t border-slate-200 dark:border-slate-800">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between hover:bg-slate-100 dark:hover:bg-slate-800 -ml-2 h-9 rounded-lg text-slate-700 dark:text-slate-300">
                      <span className="text-sm font-medium">Read full article</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl h-[80vh] overflow-auto bg-white dark:bg-slate-900 dark:text-slate-200">
                    <DialogHeader>
                      <div className="flex justify-between items-center">
                        <Badge>{category}</Badge>
                        <DialogClose asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </DialogClose>
                      </div>
                      <DialogTitle className="text-2xl text-slate-900 dark:text-white">{title}</DialogTitle>
                      <DialogDescription className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {date}
                        </span>
                        {readTime && <span className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" /> {readTime}
                        </span>}
                        {author && <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> {author}
                        </span>}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="relative w-full h-[200px] my-4">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: fullContent || `<p>${excerpt}</p>
                      <p>This article provides an in-depth analysis of the latest trends and developments in ${category.toLowerCase()}. As educational technologies continue to evolve, it's crucial for learners to stay informed about the best resources and approaches available.</p>
                      <p>For more information and related articles, please visit our full report section.</p>` }} />
                    </div>
                    <div className="mt-6 flex justify-end">
                      <Link href="/report">
                        <Button>
                          View all articles
                        </Button>
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function ArticlesSection() {
  const [category, setCategory] = useState<string | null>(null);
  
  // Updated articles data with fullContent and dates for 2025
  const articles = [
    {
      id: "1",
      title: "Harvard CS50: Is It Still Worth Taking in 2025?",
      excerpt: "An in-depth review of Harvard's popular CS50 course and whether it's still relevant for aspiring programmers today.",
      fullContent: `
        <h2>Harvard CS50: Is It Still Worth Taking in 2025?</h2>
        
        <p>Harvard's CS50 has long been considered one of the gold standards in introductory computer science education. Created by Professor David Malan, this course has evolved significantly since its inception, continually updating its curriculum to reflect modern programming paradigms and technologies.</p>
        
        <p>In 2025, CS50 remains remarkably relevant for several key reasons:</p>
        
        <h3>Modernized Curriculum</h3>
        <p>The course now covers Python, JavaScript, SQL, and web development alongside traditional C programming, providing a comprehensive foundation that aligns with industry demands.</p>
        
        <h3>Problem-Solving Emphasis</h3>
        <p>Rather than focusing solely on syntax, CS50 teaches computational thinking and problem-solving approaches that transcend specific languages or technologies.</p>
        
        <h3>Production Quality</h3>
        <p>The lecture production, interactive elements, and community support create an engaging learning environment that few other courses can match.</p>
        
        <h3>Accessibility</h3>
        <p>Available for free through platforms like edX, CS50 offers Harvard-quality education to anyone with internet access.</p>
        
        <p>For beginners looking to enter programming or experienced developers wanting to fill gaps in their foundational knowledge, CS50 remains one of the most comprehensive and well-structured resources available. Its rigorous approach challenges learners while providing the necessary scaffolding to build confidence and competence.</p>
      `,
      image: "/images/articles/harvard-cs50.svg",
      category: "Computer Science",
      date: "February 15, 2025",
      slug: "harvard-cs50-review",
      readTime: "8 min read",
      author: "Alex Johnson",
      featured: true
    },
    {
      id: "2",
      title: "Top Animation Courses for Aspiring Digital Artists",
      excerpt: "Discover the best online courses and programs for learning 2D and 3D animation techniques from industry professionals.",
      fullContent: `
        <h2>Top Animation Courses for Aspiring Digital Artists in 2025</h2>
        
        <p>The digital animation industry continues to grow exponentially, with opportunities spanning film, gaming, advertising, and educational content. For aspiring animators, selecting the right learning path is crucial for developing industry-relevant skills.</p>
        
        <h3>Best Comprehensive Programs</h3>
        <p>Animation Mentor and CGMA (Computer Graphics Master Academy) offer structured curriculums taught by industry veterans from Pixar, Dreamworks, and other leading studios. These programs, while more expensive, provide personalized feedback and portfolio development essential for industry entry.</p>
        
        <h3>Specialized Technique Courses</h3>
        <p>Platforms like Schoolism and Proko excel in teaching specific animation skills such as character movement, facial expressions, and stylized animation. These targeted courses help animators develop distinctive styles and specialized expertise.</p>
        
        <h3>Software-Specific Training</h3>
        <p>For those focusing on tools, Pluralsight's Maya courses and Motion Design School's After Effects programs deliver exceptional technical training in industry-standard software.</p>
        
        <h3>Free and Affordable Options</h3>
        <p>Resources such as Blender Guru, Blender Animation Toolkit, and YouTube channels like Toniko Pantoja provide high-quality instruction at minimal or no cost, making animation education more accessible.</p>
        
        <p>Regardless of which learning path you choose, the key to success in animation lies in consistent practice, developing a strong portfolio, and engaging with the animation community through platforms like Discord servers and local meetups.</p>
      `,
      image: "/images/articles/animation-courses.svg",
      category: "Design",
      date: "January 28, 2025",
      slug: "top-animation-courses",
      readTime: "6 min read",
      author: "Maya Richards"
    },
    {
      id: "3",
      title: "Quantum Computing: What Programmers Need to Know",
      excerpt: "An accessible introduction to quantum computing concepts for software developers interested in this emerging field.",
      fullContent: `
        <h2>Quantum Computing: What Programmers Need to Know in 2025</h2>
        
        <p>Quantum computing represents a paradigm shift in computational capability, promising to solve specific problems exponentially faster than classical computers. While still evolving, modern developers can benefit from understanding its core principles.</p>
        
        <h3>Key Concepts</h3>
        <p>Unlike classical bits that are either 0 or 1, quantum bits (qubits) can exist in a superposition of both states simultaneously. Quantum entanglement allows qubits to be correlated in ways impossible for classical bits, enabling powerful computational advantages for specific problems.</p>
        
        <h3>Programming Models</h3>
        <p>Quantum development typically uses hybrid approaches combining classical and quantum processing. Frameworks like Qiskit (IBM), Cirq (Google), and Q# (Microsoft) provide abstractions that allow developers to create quantum algorithms without deep physics knowledge.</p>
        
        <h3>Practical Applications</h3>
        <p>Current quantum advantages exist primarily in cryptography, optimization problems, chemical simulation, and certain machine learning tasks. Problems with exponential complexity on classical computers often become tractable on quantum systems.</p>
        
        <h3>Getting Started</h3>
        <p>Developers interested in quantum computing should start with linear algebra fundamentals before exploring quantum circuits and algorithms through interactive platforms like IBM Quantum Experience, which offers free access to real quantum hardware.</p>
        
        <p>Though quantum computers won't replace classical systems for most tasks, they represent an important complementary technology. Forward-thinking developers who understand quantum principles will be well-positioned as the technology matures into commercial applications.</p>
      `,
      image: "/images/articles/quantum-computing.svg",
      category: "Quantum Computing",
      date: "March 5, 2025",
      slug: "quantum-computing-primer",
      readTime: "10 min read",
      author: "Dr. Samantha Chen"
    },
    {
      id: "4",
      title: "AI-Powered Learning: The Future of Education Technology",
      excerpt: "How artificial intelligence is transforming educational experiences through personalization and automated assessment.",
      fullContent: `
        <h2>AI-Powered Learning: The Future of Education Technology in 2025</h2>
        
        <p>Artificial intelligence is revolutionizing education by creating adaptive learning experiences that respond to individual student needs in real-time, fundamentally changing how knowledge is acquired and assessed.</p>
        
        <h3>Personalized Learning Paths</h3>
        <p>AI systems can analyze learning patterns to create customized curricula that adapt difficulty levels, content presentation, and pacing based on individual student performance. Platforms like Khan Academy and Duolingo already implement these adaptive learning techniques effectively.</p>
        
        <h3>Intelligent Tutoring Systems</h3>
        <p>Virtual AI tutors can now provide immediate feedback, answer questions, and guide students through difficult concepts without human intervention. Carnegie Learning's MATHiaU and other cognitive tutors demonstrate how AI can simulate one-on-one instruction at scale.</p>
        
        <h3>Automated Assessment</h3>
        <p>Beyond multiple-choice grading, AI can now evaluate essays, code submissions, and even creative projects through natural language processing and machine learning algorithms, providing detailed feedback that rivals human assessment.</p>
        
        <h3>Educational Content Creation</h3>
        <p>AI tools are generating customized educational materials, practice problems, and even entire curricula tailored to specific learning objectives and student populations, reducing the burden on educators.</p>
        
        <p>The most effective educational technology combines AI capabilities with human expertise, creating a balanced approach where algorithms handle personalization and assessment while human educators provide motivation, emotional support, and critical thinking guidance that AI cannot yet replicate.</p>
      `,
      image: "/images/articles/ai-learning.svg",
      category: "AI",
      date: "April 20, 2025",
      slug: "ai-powered-learning",
      readTime: "7 min read",
      author: "Thomas Garcia"
    },
    {
      id: "5",
      title: "Are Programming Bootcamps Still Worth It in 2025?",
      excerpt: "An analysis of the current job market for bootcamp graduates and whether these intensive programs deliver on their promises.",
      fullContent: `
        <h2>Are Programming Bootcamps Still Worth It in 2025?</h2>
        
        <p>As coding bootcamps have proliferated over the past decade, their value proposition has evolved with the changing tech landscape and job market dynamics.</p>
        
        <h3>Current Placement Rates</h3>
        <p>While bootcamps once boasted near-perfect job placement, the market has become more competitive. Top-tier bootcamps still maintain 80-85% placement rates within six months, but these statistics often come with important caveats regarding job types and salary ranges.</p>
        
        <h3>Industry Recognition</h3>
        <p>Many employers now recognize bootcamp graduates as viable candidates, particularly for frontend and full-stack roles. Companies like Google, Microsoft, and IBM have formalized pathways for hiring non-traditional candidates, though bootcamp graduates may still face challenges with resume screening algorithms.</p>
        
        <h3>Curriculum Evolution</h3>
        <p>Leading bootcamps have substantially improved their programs, incorporating computer science fundamentals, specialized tracks in high-demand areas like data science and cybersecurity, and soft skills training to address previous criticisms.</p>
        
        <h3>Cost-Benefit Analysis</h3>
        <p>With bootcamp costs ranging from $10,000 to $20,000, the ROI remains favorable compared to traditional degrees, especially with the emergence of income share agreements that align payment with successful outcomes.</p>
        
        <p>For career changers with strong foundational skills in problem-solving and self-learning, selective bootcamps can still provide a viable path into tech careers. However, success increasingly depends on choosing programs with strong industry connections, proven outcomes, and extensive post-graduation support.</p>
      `,
      image: "/images/articles/programming-bootcamp.svg",
      category: "Programming",
      date: "March 10, 2025",
      slug: "programming-bootcamps-analysis",
      readTime: "9 min read",
      author: "Jessica Kim"
    }
  ];

  const categories = ["All", "Computer Science", "Design", "Programming", "Quantum Computing", "AI"];
  const filteredArticles = category ? articles.filter(article => article.category === category) : articles;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Get the latest news and analysis
            </motion.h2>
            <motion.p
              className="mt-2 text-slate-600 dark:text-slate-300"
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
            <Link href="/report" className="text-blue-600 hover:underline mt-4 md:mt-0 inline-block dark:text-blue-400">
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
            <Link 
              key={cat}
              href={cat === "All" ? "/report" : `/report?category=${encodeURIComponent(cat)}`}
            >
              <Button
                variant={cat === "All" ? (category === null ? "default" : "outline") : category === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat === "All" ? null : cat)}
                className={`whitespace-nowrap ${
                  cat === "All" && category === null 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : category === cat 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-white/80 border-slate-300 text-slate-700 hover:bg-slate-100 dark:bg-transparent dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </Button>
            </Link>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
            <Button variant="outline" size="lg" className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white">
              View all articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
