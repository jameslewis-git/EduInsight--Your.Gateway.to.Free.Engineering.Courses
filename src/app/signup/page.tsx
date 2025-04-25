import { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";
import { MainLayout } from "@/components/layout/MainLayout";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign Up | EduInsight",
  description: "Create an EduInsight account to personalize your learning experience and save your favorite courses.",
};

// Add a config for static generation with dynamic params
export const dynamic = 'force-dynamic';

function SignupFormFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading signup form...</span>
    </div>
  );
}

export default function SignupPage() {
  return (
    <MainLayout>
      <div className="container max-w-lg py-16 md:py-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-muted-foreground">Sign up to start your personalized learning journey</p>
        </div>
        <Suspense fallback={<SignupFormFallback />}>
          <SignupForm />
        </Suspense>
      </div>
    </MainLayout>
  );
} 