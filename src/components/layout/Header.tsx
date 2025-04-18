"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col gap-6 mt-6">
                <Link href="/" className="font-semibold text-2xl">EduInsight</Link>
                <nav className="flex flex-col gap-2">
                  <Link href="/subjects" className="hover:underline">Subjects</Link>
                  <Link href="/providers" className="hover:underline">Providers</Link>
                  <Link href="/universities" className="hover:underline">Universities</Link>
                  <Link href="/rankings" className="hover:underline">Rankings</Link>
                  <Link href="/report" className="hover:underline">The Report</Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="hidden md:flex items-center gap-1">
            <div className="font-bold text-xl md:text-2xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                EduInsight
              </motion.span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
              <Link href="/subjects" className="text-sm font-medium hover:text-primary transition-colors">
                Subjects
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
              <Link href="/providers" className="text-sm font-medium hover:text-primary transition-colors">
                Providers
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 500 }}>
              <Link href="/report" className="text-sm font-medium hover:text-primary transition-colors">
                The Report
              </Link>
            </motion.div>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                className="absolute inset-0 h-16 bg-background flex items-center px-4 md:px-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex w-full items-center gap-2">
                  <Input
                    type="search"
                    placeholder="Search 250,000 courses..."
                    className="flex-1"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-1"
                  aria-label="Search"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hidden md:flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
