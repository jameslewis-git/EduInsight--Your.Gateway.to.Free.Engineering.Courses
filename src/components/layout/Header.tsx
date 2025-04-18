"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HeaderSearch } from "./HeaderSearch";

export function Header() {
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

        <div className="flex items-center gap-3">
          {/* Modern Search Component */}
          <HeaderSearch />
          
          <ThemeToggle />

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
