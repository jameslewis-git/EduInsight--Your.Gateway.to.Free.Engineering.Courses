import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { MainLayout } from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Login | EduInsight",
  description: "Login to your EduInsight account to access your learning dashboard and saved courses.",
};

export default function LoginPage() {
  return (
    <MainLayout>
      <div className="container max-w-lg py-16 md:py-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue your learning journey</p>
        </div>
        <LoginForm />
      </div>
    </MainLayout>
  );
} 