"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, Sparkles, Book, Layers, Code, Award, Trending, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchProps {
  className?: string;
  placeholder?: string;
  suggestionsEnabled?: boolean;
  floatingDesign?: boolean;
  animatedPlaceholder?: boolean;
}

export function SearchBar({ 
  className, 
  placeholder = "Search courses, topics, skills...",
  suggestionsEnabled = true,
  floatingDesign = true,
  animatedPlaceholder = true
}: SearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    "Search for Python courses...",
    "Find web development tutorials...",
    "Discover machine learning courses...",
    "Explore data science curricula...",
    "Learn cybersecurity fundamentals..."
  ];

  // Trending searches and categories for suggestions
  const trendingSearches = [
    "Python for beginners", 
    "Web development 2023", 
    "Machine learning basics", 
    "Data science certification", 
    "JavaScript modern frameworks"
  ];

  const categories = [
    { name: "Programming", icon: <Code size={16} /> },
    { name: "Data Science", icon: <Layers size={16} /> },
    { name: "Web Development", icon: <Book size={16} /> },
    { name: "Artificial Intelligence", icon: <Sparkles size={16} /> },
    { name: "Certifications", icon: <Award size={16} /> }
  ];

  const recentSearches = [
    "Python machine learning", 
    "React state management", 
    "SQL database design"
  ];

  useEffect(() => {
    // Cycle through placeholders for animation
    if (animatedPlaceholder && !isFocused && !query) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isFocused, query, animatedPlaceholder, placeholders.length]);

  useEffect(() => {
    // Handle clicking outside to close suggestions
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/courses?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    router.push(`/courses?search=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative group flex-1 max-w-2xl mx-auto", 
        className
      )}
    >
      {/* Animated background for floating design */}
      {floatingDesign && (
        <div className="absolute inset-0 rounded-full bg-slate-200/50 dark:bg-slate-800/50 blur-md -z-10 transition-all duration-300 group-hover:bg-slate-200/70 dark:group-hover:bg-slate-800/70"></div>
      )}

      <form 
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center w-full",
          floatingDesign ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 group-hover:shadow-xl" : 
          "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
        )}
      >
        <motion.div 
          className="absolute left-4 text-slate-400 dark:text-slate-500 transition-colors duration-200"
          animate={{ scale: isFocused ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <SearchIcon size={20} className={isFocused ? "text-indigo-500 dark:text-indigo-400" : ""} />
        </motion.div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (suggestionsEnabled) setShowSuggestions(true);
          }}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full py-3 pl-12 pr-12 bg-transparent rounded-full",
            "text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500",
            "focus:outline-none focus:ring-0",
            "transition-all duration-200"
          )}
          placeholder={animatedPlaceholder && !isFocused ? placeholders[placeholderIndex] : placeholder}
        />
        
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-16 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
          >
            <X size={18} />
          </button>
        )}
        
        <button
          type="submit"
          className={cn(
            "absolute right-3 rounded-full px-4 py-1.5",
            "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600",
            "text-white text-sm font-medium",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
          )}
        >
          Search
        </button>
      </form>

      {/* Search suggestions */}
      {suggestionsEnabled && (
        <AnimatePresence>
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden",
                "bg-white dark:bg-slate-900 rounded-xl",
                "shadow-2xl border border-slate-200 dark:border-slate-700",
                "backdrop-blur-lg"
              )}
            >
              <div className="p-4">
                {/* Trending searches */}
                <div className="mb-4">
                  <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                    <Trending size={14} className="mr-1" />
                    Trending Searches
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingSearches.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(item)}
                        className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full px-3 py-1 text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Categories */}
                <div className="mb-4">
                  <div className="flex items-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                    <Layers size={14} className="mr-1" />
                    Popular Categories
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(category.name)}
                        className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200"
                      >
                        {category.icon}
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                      <div className="flex items-center">
                        <History size={14} className="mr-1" />
                        Recent Searches
                      </div>
                      <button className="text-xs text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(item)}
                          className="flex items-center w-full hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg px-2 py-1.5 text-sm text-slate-700 dark:text-slate-300 transition-colors duration-200"
                        >
                          <History size={14} className="mr-2 text-slate-400 dark:text-slate-500" />
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
} 