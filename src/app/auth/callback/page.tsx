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
  const [retryCount, setRetryCount] = useState(0);
  const [maxRetries] = useState(5); // Allow more retries for potential network delays

  useEffect(() => {
    const handleCallback = async () => {
      try {
        setStatus("Processing authentication callback...");
        console.log("Auth callback initiated. Current URL:", window.location.href);
        console.log("Search params:", Object.fromEntries([...searchParams.entries()]));
        
        // Check for OAuth state errors in the URL
        const errorParam = searchParams.get('error');
        const errorCode = searchParams.get('error_code');
        const errorDescription = searchParams.get('error_description');
        
        // Special handling for state errors - redirect to login
        if (errorCode === 'bad_oauth_state') {
          console.error("OAuth state validation failed:", errorDescription);
          setStatus("Authentication session expired. Redirecting to login...");
          
          // Clear any existing session data
          await supabase.auth.signOut();
          
          // Clear browser storage more thoroughly
          try {
            localStorage.clear(); // Clear all localStorage
            sessionStorage.clear(); // Clear all sessionStorage
          } catch (e) {
            console.error("Error clearing storage:", e);
          }
          
          // Redirect back to login after a brief delay
          setTimeout(() => {
            router.push('/login?error=session_expired');
          }, 1500);
          return;
        }
        
        // Handle other explicit errors from the provider
        if (errorParam) {
          console.error("Auth error from provider:", errorParam, errorDescription);
          setError(`Error from authentication provider: ${errorDescription || errorParam}`);
          
          // Also redirect back to login after displaying error
          setTimeout(() => {
            router.push(`/login?error=${errorParam}`);
          }, 3000);
          return;
        }
        
        // For implicit flow, Supabase should automatically handle the session
        // So we just need to check if auth worked and get the user
        console.log("Checking if authentication was successful...");
        setStatus("Verifying authentication...");
        
        // Give Supabase a moment to process the auth callback
        // This helps avoid race conditions
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verify the session was created successfully by getting the user
        const { data, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("Error getting user:", userError);
          setError("Could not verify authentication. Please try again.");
          
          setTimeout(() => {
            router.push('/login?error=verification_failed');
          }, 3000);
          return;
        }
        
        if (!data.user) {
          console.error("No user found after auth callback");
          setError("Authentication failed. Please try signing in again.");
          
          // Also redirect back to login after displaying error
          setTimeout(() => {
            router.push('/login?error=no_user_found');
          }, 3000);
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
        
        // Also redirect back to login after displaying error
        setTimeout(() => {
          router.push('/login?error=callback_error');
        }, 3000);
      }
    };

    handleCallback();
  }, [router, searchParams, retryCount, maxRetries]);

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