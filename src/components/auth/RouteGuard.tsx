"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";

interface RouteGuardProps {
  children: ReactNode;
  fallbackUrl?: string;
}

export function RouteGuard({ children, fallbackUrl = "/login" }: RouteGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If auth state is loaded and user is not authenticated, redirect to login
    if (!isLoading && !user) {
      router.push(fallbackUrl);
    }
  }, [user, isLoading, router, fallbackUrl]);

  // Show loading spinner while checking auth state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Verifying your account...</p>
        </div>
      </div>
    );
  }

  // Hide content if user is not authenticated
  if (!user) {
    return null;
  }

  // Render children if user is authenticated
  return <>{children}</>;
} 