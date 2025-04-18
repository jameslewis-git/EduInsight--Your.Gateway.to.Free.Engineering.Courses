import { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";
import { MainLayout } from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Sign Up | EduInsight",
  description: "Create an EduInsight account to personalize your learning experience and save your favorite courses.",
};

export default function SignupPage() {
  return (
    <MainLayout>
      <div className="container max-w-lg py-16 md:py-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-muted-foreground">Sign up to start your personalized learning journey</p>
        </div>
        <SignupForm />
      </div>
    </MainLayout>
  );
} 