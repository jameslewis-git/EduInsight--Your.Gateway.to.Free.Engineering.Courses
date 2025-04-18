"use client";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t bg-background" role="contentinfo" aria-label="Site footer">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Essential Navigation Links */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-foreground">Browse Courses</h3>
            <nav className="flex flex-col gap-2" aria-label="Course navigation">
              <Link href="/subjects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse by Subject
              </Link>
              <Link href="/providers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse by Provider
              </Link>
              <Link href="/universities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse by University
              </Link>
            </nav>
          </div>

          {/* Rankings Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-foreground">Rankings</h3>
            <nav className="flex flex-col gap-2" aria-label="Rankings navigation">
              <Link href="/rankings/best-of-all-time" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Best of All Time
              </Link>
              <Link href="/rankings/most-popular-all-time" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Most Popular
              </Link>
              <Link href="/collection/top-free-courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Top Free Courses
              </Link>
            </nav>
          </div>

          {/* About Section */}
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-foreground">About</h3>
            <nav className="flex flex-col gap-2" aria-label="About navigation">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Social and Description */}
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="font-semibold text-foreground">About EduInsight</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Find and compare the best online courses from top providers and universities worldwide.
              </p>
            </div>

            <div className="flex gap-4">
              <Link 
                href="https://facebook.com/eduinsight" 
                aria-label="Follow us on Facebook"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={20} />
              </Link>
              <Link 
                href="https://twitter.com/eduinsight" 
                aria-label="Follow us on Twitter"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={20} />
              </Link>
              <Link 
                href="https://linkedin.com/company/eduinsight" 
                aria-label="Follow us on LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link 
                href="https://youtube.com/eduinsight" 
                aria-label="Subscribe to our YouTube channel"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="mt-10 border-t pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} EduInsight. All rights reserved.</p>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
