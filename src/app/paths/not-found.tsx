import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LearningPathNotFound() {
  return (
    <MainLayout>
      <div className="container py-20">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Learning Path Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, we couldn't find the learning path you're looking for. It might have been removed or doesn't exist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button asChild>
              <Link href="/paths">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse All Learning Paths
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 