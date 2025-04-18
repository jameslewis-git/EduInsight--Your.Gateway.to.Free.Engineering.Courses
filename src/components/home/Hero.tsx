"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  // Animation variants for floating icons
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const techIcons = [
    { name: "AI", color: "#00A3FF" },
    { name: "DSA", color: "#FF6B00" },
    { name: "Thermodynamics", color: "#00C853" },
    { name: "Cybersecurity", color: "#7B1FA2" },
    { name: "Web Dev", color: "#D32F2F" },
    { name: "Python", color: "#FFC107" }
  ];

  return (
    <div className="relative overflow-hidden bg-background py-16 lg:py-24">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text and Search */}
          <div className="flex flex-col items-start text-left max-w-xl">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Into the Educationverse
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover the best online courses from top universities and institutions worldwide. Start your learning journey today.
            </motion.p>

            <motion.div
              className="w-full max-w-md mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <form
                className="relative"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Search for:", searchQuery);
                }}
              >
                <Input
                  type="search"
                  placeholder="Search desired courses..."
                  className="pr-12 h-12 rounded-full bg-background/90 backdrop-blur border-muted-foreground/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10 rounded-full"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="grid grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-primary">3+</div>
                <div className="text-sm text-muted-foreground">Platorms</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Illustration and Floating Icons */}
          <div className="relative h-[500px]">
            {/* Main Illustration */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src="/images/learning-illustration.svg"
                alt="Learning Illustration"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Floating Tech Icons */}
            {techIcons.map((icon, index) => (
              <motion.div
                key={icon.name}
                className="absolute"
                style={{
                  top: `${(index * 60) + 50}px`,
                  right: `${(index % 2) * 100 + 50}px`,
                  backgroundColor: icon.color,
                  padding: "12px 20px",
                  borderRadius: "12px",
                  color: "white",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  zIndex: 10 - index
                }}
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                transition={{
                  delay: index * 0.2
                }}
              >
                {icon.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="0.03"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
