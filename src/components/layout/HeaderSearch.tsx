"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, History, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeaderSearch() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  // Popular searches to show as suggestions
  const trendingSearches = [
    "Machine Learning", 
    "Python", 
    "Data Science", 
    "Web Development", 
    "JavaScript"
  ];
  
  // Recent searches (could be stored in localStorage in a real implementation)
  const recentSearches = [
    "React Hooks", 
    "AWS Certification", 
    "DevOps"
  ];

  useEffect(() => {
    // Close search on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
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
      setIsExpanded(false);
      setShowSuggestions(false);
      // Here you could also save to recent searches
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/courses?search=${encodeURIComponent(suggestion)}`);
    setIsExpanded(false);
    setShowSuggestions(false);
  };

  return (
    <div className="relative z-10" ref={searchContainerRef}>
      <AnimatePresence>
        {isExpanded ? (
          <motion.form
            initial={{ width: "40px", opacity: 0.5 }}
            animate={{ width: "280px", opacity: 1 }}
            exit={{ width: "40px", opacity: 0.5 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="relative"
            onSubmit={handleSubmit}
          >
            <div className="relative flex items-center w-full">
              <motion.button
                type="submit"
                className={cn(
                  "absolute left-3 text-muted-foreground transition-colors",
                  query && "text-primary"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-4 w-4" />
              </motion.button>
              
              <input
                ref={inputRef}
                type="text"
                className={cn(
                  "w-full h-9 pl-9 pr-8 rounded-full",
                  "bg-muted/50 border border-border/50",
                  "text-sm placeholder:text-muted-foreground/70",
                  "focus:outline-none focus:ring-1 focus:ring-primary/30",
                  "transition-all duration-200"
                )}
                placeholder="Search courses, subjects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                autoFocus
              />
              
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setShowSuggestions(false);
                }}
                className={cn(
                  "absolute right-3 text-muted-foreground transition-colors",
                  "hover:text-foreground"
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search suggestions dropdown */}
            {showSuggestions && (
              <div
                className={cn(
                  "absolute top-full left-0 right-0 mt-1",
                  "bg-background rounded-md shadow-md",
                  "border border-border",
                  "overflow-hidden",
                  "animate-in fade-in-50 zoom-in-95",
                  "origin-top"
                )}
              >
                {/* Trending searches */}
                <div className="p-3 border-b border-border">
                  <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground mb-2">
                    <Zap className="h-3 w-3" />
                    <span>Trending</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {trendingSearches.map((term, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick(term)}
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          "bg-muted/50 hover:bg-muted",
                          "text-foreground",
                          "transition-colors duration-200"
                        )}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent searches */}
                {recentSearches.length > 0 && (
                  <div className="p-3">
                    <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <History className="h-3 w-3" />
                        <span>Recent Searches</span>
                      </div>
                      <button
                        type="button"
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="space-y-1">
                      {recentSearches.map((term, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(term)}
                          className={cn(
                            "flex items-center w-full text-left px-2 py-1.5 rounded",
                            "text-sm text-foreground",
                            "hover:bg-muted",
                            "transition-colors duration-200"
                          )}
                        >
                          <History className="h-3 w-3 mr-2 text-muted-foreground" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.form>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              setIsExpanded(true);
              setTimeout(() => inputRef.current?.focus(), 100);
            }}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center",
              "bg-muted/50 hover:bg-muted",
              "text-muted-foreground hover:text-foreground",
              "transition-colors duration-200"
            )}
          >
            <Search className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
} 