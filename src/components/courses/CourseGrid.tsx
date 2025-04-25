"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CourseCard } from "./CourseCard";
import { Course } from "@/lib/types";

interface CourseGridProps {
  children?: ReactNode;
  courses?: Course[];
  title?: string;
  description?: string;
  viewAllLink?: string;
  viewAllText?: string;
  columns?: 2 | 3 | 4; // Allow 2, 3, or 4 columns
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } }
};

export function CourseGrid({
  children,
  courses,
  title,
  description,
  viewAllLink,
  viewAllText = "View all",
  columns = 4
}: CourseGridProps) {
  
  // Determine grid column classes based on the columns prop
  const gridColsClass = 
    columns === 2 ? "grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2" :
    columns === 3 ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3" :
                   "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  
  return (
    <div className="py-8 md:py-12">
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <motion.h2
              className="text-2xl md:text-3xl font-bold"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h2>
          )}

          {description && (
            <motion.p
              className="text-muted-foreground mt-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}

          {viewAllLink && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href={viewAllLink} className="text-primary hover:underline">
                {viewAllText} →
              </a>
            </motion.div>
          )}
        </div>
      )}

      <motion.div
        className={`grid ${gridColsClass} gap-6`}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {courses ? (
          // Render courses using the courses prop
          courses.map((course) => (
            <motion.div key={course.id} variants={item}>
              <CourseCard 
                id={course.id}
                title={course.title}
                provider={course.provider}
                institution={course.institution || ''}
                link={course.link}
                image={course.image || ''}
                rating={course.rating || 0}
                reviewCount={course.reviewCount || 0}
                category={course.category || ''}
                isFree={course.isFree}
              />
            </motion.div>
          ))
        ) : Array.isArray(children) ? (
          // Render using children prop if no courses provided
          children.map((child, index) => {
            // Try to extract a key from the child if it's a valid React element
            const childKey =
              child &&
              typeof child === 'object' &&
              'key' in child &&
              child.key ?
                child.key :
                `grid-item-${index}`;

            return (
              <motion.div key={childKey} variants={item}>
                {child}
              </motion.div>
            );
          })
        ) : (
          <motion.div variants={item}>{children}</motion.div>
        )}
      </motion.div>
    </div>
  );
}
