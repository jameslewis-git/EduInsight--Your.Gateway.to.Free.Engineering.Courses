import { MainLayout } from "@/components/layout/MainLayout";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProvidersPage() {
  return (
    <MainLayout>
      <div className="container py-16">
        <Link href="/" className="text-primary hover:underline flex items-center gap-2 mb-8">
          <ArrowLeft size={16} />
          Back to home
        </Link>
        
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Free Course Providers
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore free courses from the world's leading educational providers, universities, and organizations.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Explore by Subject</h2>
          <p className="text-muted-foreground mb-6">
            Browse free courses by subject area to find the perfect course for your learning goals.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/subjects/cs" 
              className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Computer Science
            </Link>
            <Link 
              href="/subjects/programming" 
              className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Programming
            </Link>
            <Link 
              href="/subjects/data-science" 
              className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Data Science
            </Link>
            <Link 
              href="/subjects/business" 
              className="px-4 py-2 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
            >
              Business
            </Link>
            <Link 
              href="/subjects" 
              className="px-4 py-2 text-primary text-sm hover:underline"
            >
              View all subjects →
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// This function is required for static site generation with output: export
export function generateStaticParams() {
  return [{}]; // No dynamic parameters in this route
} 