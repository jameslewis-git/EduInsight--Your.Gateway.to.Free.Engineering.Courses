import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { MainLayout } from "@/components/layout/MainLayout";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Login | EduInsight",
  description: "Login to your EduInsight account to access your learning dashboard and saved courses.",
};

// Add a config for static generation with dynamic params
export const dynamic = 'force-dynamic';

function LoginFormFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading login form...</span>
    </div>
  );
}

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="container max-w-lg py-16 md:py-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue your learning journey</p>
        </div>
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </MainLayout>
  );
} 