"use client"

import { HeroSection } from "@/components/ui/hero-section"
import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"

function HeroSectionDemo() {
  const [loaded, setLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const animationRef = useRef<number | null>(null);

  // Learning path features to showcase
  const features = [
    {
      title: "Personalized Learning Path",
      description: "AI-powered course recommendations based on your skills and goals",
      icon: "🚀",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Top-Rated Content",
      description: "Access courses from world-class institutions and instructors",
      icon: "🏆",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Career Advancement",
      description: "Track your progress and build skills that matter for your career",
      icon: "📈",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Interactive Learning",
      description: "Engage with hands-on projects and practical assessments",
      icon: "🔨",
      color: "from-amber-500 to-orange-600"
    }
  ];

  // Initialize Matrix animation
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Matrix characters - using code-related symbols and characters
    const characters = '{}[]()<>/*-+!&|~=;:.,$#@%^*_?JAMES01フキペロワ' + 
                       'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                       '+-*/=(){}<>[]|\\\'";:,./?!@#$%^&*_~`';
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];
    
    // Initialize the canvas and drops
    const initialize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      columns = Math.floor(canvas.width / fontSize);
      
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
      }
    };
    
    // Animation loop
    const animate = () => {
      // Semi-transparent black to create fade effect - adjust for medium fade speed
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Different fade rates for light vs dark mode
      ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.015)' : 'rgba(255, 255, 255, 0.015)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set main color based on mode - darker colors for light mode visibility
      ctx.fillStyle = isDarkMode ? '#5aff5a' : '#006600';
      ctx.font = `bold ${fontSize}px monospace`;
      
      // Loop over drops - update characters at a moderate pace
      for (let i = 0; i < drops.length; i++) {
        // Update more characters per frame for a slightly faster animation
        if (i % 2 === frameCount % 2) {
          // Random character
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          
          // Draw character
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          // Randomly make some characters brighter/darker for emphasis
          if (Math.random() > 0.97) {
            ctx.fillStyle = isDarkMode ? '#ffffff' : '#004400';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            ctx.fillStyle = isDarkMode ? '#5aff5a' : '#006600';
          }
          
          // Reset when drop reaches bottom or randomly
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
            drops[i] = 0;
          }
          
          // Increment drop position - moderate speed
          drops[i] += 0.7;
        }
      }
      
      // Increment frame counter
      frameCount++;
      
      // Continue animation - moderate delay between frames
      setTimeout(() => {
        animationRef.current = requestAnimationFrame(animate);
      }, 20);
    };
    
    // Handle window resize
    const handleResize = () => {
      initialize();
    };
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Initialize frame counter
    let frameCount = 0;
    
    // Start animation
    initialize();
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setLoaded(true);
    if (isInView) {
      controls.start("visible");
    }

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, controls, features.length]);

  return (
    <div className="relative overflow-hidden min-h-[90vh]" ref={containerRef}>
      {/* Matrix code rain animation - higher opacity for light mode */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-50 z-0" 
        aria-hidden="true"
      />

      {/* Dynamic background gradient with increased transparency in light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 to-slate-100/60 dark:from-slate-900/60 dark:to-slate-800/60 z-0"></div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-slate-300 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] dark:bg-grid-slate-700/50 z-1"></div>

      {/* Floating geometric shapes */}
      {loaded && (
        <>
          <motion.div
            className="absolute w-40 h-40 border-2 border-indigo-300/20 dark:border-indigo-500/20 rounded-lg z-0"
            style={{ left: '15%', top: '20%', rotate: 15 }}
            animate={{
              rotate: [15, 0, 15],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-32 h-32 border-2 border-purple-300/10 dark:border-purple-500/10 rounded-full z-0"
            style={{ right: '10%', bottom: '30%' }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-24 h-24 border-2 border-cyan-300/10 dark:border-cyan-500/10 rotate-45 z-0"
            style={{ right: '30%', top: '15%' }}
            animate={{
              rotate: [45, 90, 45],
              x: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Glowing orbs with animation */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-400/15 dark:bg-blue-500/15 rounded-full blur-3xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-purple-400/15 dark:bg-purple-500/15 rounded-full blur-3xl z-0"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {loaded && (
        <div className="container mx-auto px-4 relative z-10 pt-10 md:pt-16">
          {/* Hero content with 3D tech scene */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              {/* Welcome badge */}
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 mb-6 backdrop-blur-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
                Welcome to EduInsight
              </motion.div>
              
              {/* Main heading */}
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="block">Discover the best</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">
                  learning journey
                </span>
              </motion.h1>
              
              {/* Description */}
              <motion.p 
                className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Find the perfect courses from top providers to enhance your skills and accelerate your career. EduInsight aggregates courses from multiple platforms to help you find exactly what you need.
              </motion.p>
              
              {/* CTA buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a 
                  href="/courses" 
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-600/30 transition-all duration-200"
                >
                  Explore Courses
                </a>
                <a 
                  href="/subjects" 
                  className="px-8 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium shadow-sm backdrop-blur-md"
                >
                  Browse Subjects
                </a>
              </motion.div>
              
              {/* Feature cards */}
              <div className="space-y-4 mb-12">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeFeature}
                    className={`bg-gradient-to-r ${features[activeFeature].color} p-0.5 rounded-xl shadow-xl`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-[10px] h-full backdrop-blur-md">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{features[activeFeature].icon}</div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{features[activeFeature].title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{features[activeFeature].description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Feature indicators */}
                <div className="flex justify-center lg:justify-start gap-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        activeFeature === index 
                        ? 'bg-indigo-600 dark:bg-indigo-400 scale-125' 
                        : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                      onClick={() => setActiveFeature(index)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Dynamic Floating Quotes */}
              <div className="relative mt-10 h-[220px]">
                {loaded && (
                  <FloatingQuotesCarousel 
                    quotes={[
                      {
                        text: "The beautiful thing about learning is that nobody can take it away from you.",
                        author: "B.B. King",
                        accent: "#4f46e5" // indigo
                      },
                      {
                        text: "Education is the most powerful weapon which you can use to change the world.",
                        author: "Nelson Mandela",
                        accent: "#0ea5e9" // sky
                      },
                      {
                        text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
                        author: "Mahatma Gandhi",
                        accent: "#f97316" // orange
                      },
                      {
                        text: "The mind is not a vessel to be filled, but a fire to be kindled.",
                        author: "Plutarch",
                        accent: "#ec4899" // pink
                      },
                      {
                        text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
                        author: "Dr. Seuss",
                        accent: "#8b5cf6" // violet
                      }
                    ]}
                  />
                )}
              </div>
            </div>
            
            {/* 3D course visualization */}
            <div className="w-full lg:w-1/2">
              <motion.div 
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {/* Glass effect background */}
                <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg h-full w-full relative">
                  {/* Learning path visualization */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path 
                      d="M50,150 C90,70 120,210 200,100 C280,0 320,180 350,120" 
                      stroke="url(#gradient)" 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      strokeDasharray="1,20"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#9333ea" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Course cards floating */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-lg overflow-hidden shadow-lg w-40 h-32 bg-white/80 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-md"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${20 + (i % 3) * 20}%`,
                        zIndex: 10 - i,
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1,
                        scale: 1,
                        y: [0, -10, 0],
                        rotate: [0, i % 2 === 0 ? 3 : -3, 0],
                        transition: { 
                          y: { repeat: Infinity, duration: 3 + i * 0.5 },
                          rotate: { repeat: Infinity, duration: 6 + i * 0.5 },
                          default: { duration: 0.8, delay: 0.6 + i * 0.2 }
                        }
                      }}
                    >
                      <div className="h-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                      <div className="p-3">
                        <div className="h-2 w-3/4 bg-slate-200 dark:bg-slate-600 rounded mb-2"></div>
                        <div className="h-2 w-full bg-slate-200 dark:bg-slate-600 rounded mb-2"></div>
                        <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-600 rounded mb-4"></div>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                          <div className="h-2 w-12 bg-slate-200 dark:bg-slate-600 rounded"></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Tech icons with animations */}
                  <motion.img 
                    src="/images/robot-ai.svg" 
                    alt="AI" 
                    className="absolute w-20 h-20 bottom-5 right-5"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.05, 1],
                      transition: { 
                        rotate: { repeat: Infinity, duration: 8 },
                        scale: { repeat: Infinity, duration: 4, delay: 0.5 },
                        default: { duration: 1, delay: 1.2 }
                      }
                    }}
                  />
                  
                  <motion.img 
                    src="/images/python-logo-3d.svg" 
                    alt="Python" 
                    className="absolute w-16 h-16 top-8 left-8"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      scale: [1, 1.1, 1],
                      y: [0, -5, 0],
                      transition: { 
                        scale: { repeat: Infinity, duration: 4 },
                        y: { repeat: Infinity, duration: 3, delay: 1 },
                        default: { duration: 1, delay: 1.4 }
                      }
                    }}
                  />
                  
                  <motion.img 
                    src="/images/cybersecurity-shield.svg" 
                    alt="Security" 
                    className="absolute w-14 h-14 bottom-10 left-12"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      y: [0, -5, 0],
                      rotate: [0, 5, 0, -5, 0],
                      transition: { 
                        y: { repeat: Infinity, duration: 3 },
                        rotate: { repeat: Infinity, duration: 6 },
                        default: { duration: 1, delay: 1.6 }
                      }
                    }}
                  />

                  {/* Animated pulse effects behind icons */}
                  <motion.div 
                    className="absolute w-24 h-24 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 bottom-3 right-3 z-0"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <motion.div 
                    className="absolute w-20 h-20 rounded-full bg-blue-500/10 dark:bg-blue-500/20 top-6 left-6 z-0"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  <motion.div 
                    className="absolute w-18 h-18 rounded-full bg-teal-500/10 dark:bg-teal-500/20 bottom-8 left-10 z-0"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                  />
                </div>
              </motion.div>
              
              {/* Feature highlights section */}
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-lg rounded-xl border border-slate-200/50 dark:border-slate-700/50 p-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { 
                        icon: "🔍", 
                        title: "Smart Search", 
                        description: "AI-powered course discovery"
                      },
                      { 
                        icon: "🎯", 
                        title: "Personalized", 
                        description: "Tailored learning paths"
                      },
                      { 
                        icon: "🚀", 
                        title: "Career Boost", 
                        description: "Industry-relevant skills"
                      }
                    ].map((feature, i) => (
                      <motion.div 
                        key={i} 
                        className="flex flex-col items-center text-center p-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1 + (i * 0.2) }}
                      >
                        <div className="text-3xl mb-2">{feature.icon}</div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">{feature.title}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Define Quote type for TypeScript
interface Quote {
  text: string;
  author: string;
  accent: string;
}

// Floating Quotes Carousel Component with TypeScript types
function FloatingQuotesCarousel({ quotes }: { quotes: Quote[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Auto-rotate quotes
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [quotes.length]);
  
  return (
    <div className="relative h-full w-full overflow-visible">
      {quotes.map((quote, index: number) => {
        const isActive = index === currentIndex;
        
        return (
          <AnimatePresence key={index} mode="wait">
            {isActive && (
              <motion.div
                className="absolute inset-0 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Fluid, non-box design */}
                <div className="relative h-full flex items-center justify-center">
                  {/* Background elements */}
                  <motion.div 
                    className="absolute -z-10 w-64 h-64 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: quote.accent }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 15, 0],
                      x: [0, 10, 0],
                      y: [0, -10, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Quote text with dynamic layout */}
                  <div className="relative">
                    {/* Animated quote mark */}
                    <motion.div 
                      className="absolute -top-6 -left-6 text-6xl font-serif opacity-30"
                      style={{ color: quote.accent }}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      "
                    </motion.div>
                    
                    {/* Main quote text */}
                    <motion.p
                      className="text-xl font-medium text-slate-800 dark:text-slate-200 max-w-md relative z-10"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {quote.text.split(' ').map((word, wIndex) => (
                        <motion.span
                          key={wIndex}
                          className="inline-block mx-0.5"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 + (wIndex * 0.02) }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>
                    
                    {/* Author & decorative elements in floating container */}
                    <motion.div
                      className="mt-6 flex items-center relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      {/* Accent shape */}
                      <motion.div 
                        className="absolute -left-4 top-0 h-full w-1 rounded-full"
                        style={{ backgroundColor: quote.accent }}
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ duration: 0.3, delay: 1 }}
                      />
                      
                      {/* Author name with floating chip design */}
                      <motion.div
                        className="py-2 px-4 rounded-full backdrop-blur-md relative overflow-hidden"
                        style={{ 
                          backgroundColor: `${quote.accent}22`,
                          border: `1px solid ${quote.accent}44`
                        }}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1.2 }}
                      >
                        <motion.div 
                          className="absolute inset-0 opacity-10"
                          style={{ backgroundColor: quote.accent }}
                          animate={{ 
                            x: ['-100%', '100%'],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="relative z-10 font-semibold">
                          {quote.author}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Floating decorative elements */}
                  <motion.div 
                    className="absolute -bottom-4 right-4 w-32 h-32 opacity-10 rounded-full border-2"
                    style={{ borderColor: quote.accent }}
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute top-4 right-8 w-4 h-4 rounded-full"
                    style={{ backgroundColor: quote.accent }}
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
      
      {/* Navigation - Animated Progress Dots */}
      <div className="absolute -bottom-10 left-0 w-full flex justify-center gap-2">
        {quotes.map((_, index: number) => (
          <motion.button
            key={index}
            className="relative h-2 rounded-full overflow-hidden backdrop-blur-sm"
            style={{ 
              width: index === currentIndex ? '24px' : '8px',
              backgroundColor: index === currentIndex 
                ? quotes[index].accent 
                : `${quotes[index].accent}44`,
              transition: 'width 0.3s ease'
            }}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentIndex && (
              <motion.div 
                className="absolute inset-0 opacity-60"
                style={{ backgroundColor: quotes[index].accent }}
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export { HeroSectionDemo } 