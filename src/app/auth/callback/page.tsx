"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

// Create a separate component that uses the search params
function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Initializing authentication...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setStatus("Processing authentication callback...");
        console.log("Auth callback initiated. Current URL:", window.location.href);
        
        const code = searchParams.get('code');
        
        if (!code) {
          console.error("No code parameter found in URL");
          setError("Authentication code missing. Please try again.");
          return;
        }
        
        console.log("Auth code found, exchanging for session...");
        setStatus("Exchanging authentication code for session...");
        
        // Exchange the code for a session
        const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
        
        if (sessionError) {
          console.error("Error exchanging code for session:", sessionError);
          setError(sessionError.message);
          return;
        }
        
        console.log("Session established successfully, checking auth state...");
        setStatus("Verifying authentication...");
        
        // Verify the session was created successfully by getting the user
        const { data } = await supabase.auth.getUser();
        
        if (!data.user) {
          console.error("Session created but no user found");
          setError("Authentication completed but user data couldn't be retrieved.");
          return;
        }
        
        console.log("Authentication successful, redirecting to dashboard...");
        setStatus("Authentication successful! Redirecting...");
        
        // Use a short timeout to ensure the user sees the success message
        setTimeout(() => {
          // Redirect to dashboard after successful authentication
          router.push('/dashboard');
        }, 1000);
      } catch (err) {
        console.error('Error handling auth callback:', err);
        setError('An unexpected error occurred during authentication.');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="text-center">
      {error ? (
        <div className="p-6 max-w-md mx-auto">
          <div className="mb-4 text-destructive">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">Authentication Error</h2>
          <p className="mb-4 text-muted-foreground">{error}</p>
          <button 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            onClick={() => router.push('/login')}
          >
            Back to Login
          </button>
        </div>
      ) : (
        <>
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg mb-2">{status}</p>
          <p className="text-sm text-muted-foreground">This will only take a moment...</p>
        </>
      )}
    </div>
  );
}

// Fallback component to show while suspense is loading
function CallbackFallback() {
  return (
    <div className="text-center">
      <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
      <p className="text-lg">Preparing authentication...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <MainLayout>
      <div className="container flex items-center justify-center min-h-[60vh]">
        <Suspense fallback={<CallbackFallback />}>
          <CallbackHandler />
        </Suspense>
      </div>
    </MainLayout>
  );
} 