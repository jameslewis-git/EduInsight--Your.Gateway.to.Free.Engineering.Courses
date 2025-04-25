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
            
            // Clear cookies related to auth by setting expiry in the past
            document.cookie.split(';').forEach(c => {
              const cookie = c.trim();
              const eqPos = cookie.indexOf('=');
              const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
              if (name.includes('auth') || name.includes('supabase')) {
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
              }
            });
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
        
        const code = searchParams.get('code');
        
        // If code is missing but we're within retry attempts, try again
        if (!code) {
          if (retryCount < maxRetries) {
            console.log(`No code parameter found, retrying (${retryCount + 1}/${maxRetries})...`);
            setStatus(`Waiting for authentication data... (Attempt ${retryCount + 1}/${maxRetries})`);
            
            // Wait and retry with increasing delay
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, 1000 * (retryCount + 1)); // Increase delay with each retry
            return;
          } else {
            console.error("No code parameter found in URL after retries");
            
            // Before giving up, check if we're already authenticated
            const { data: userData } = await supabase.auth.getUser();
            
            if (userData.user) {
              console.log("User is already authenticated, redirecting to dashboard...");
              setStatus("Already authenticated! Redirecting...");
              setTimeout(() => {
                router.push('/dashboard');
              }, 1000);
              return;
            }
            
            setError("Authentication code missing. Please try again or clear your browser cache.");
            // Also redirect back to login after displaying error
            setTimeout(() => {
              router.push('/login?error=code_missing');
            }, 3000);
            return;
          }
        }
        
        console.log("Auth code found, exchanging for session...");
        setStatus("Exchanging authentication code for session...");
        
        // Exchange the code for a session
        try {
          const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (sessionError) {
            // Handle specific error for missing code verifier
            if (sessionError.message.includes('code verifier should be non-empty') && retryCount < maxRetries) {
              console.log(`Code verifier issue detected, retrying (${retryCount + 1}/${maxRetries})...`);
              setStatus(`Authentication in progress... (Attempt ${retryCount + 1}/${maxRetries})`);
              
              // Add a short delay before retrying with increasing duration
              setTimeout(() => {
                setRetryCount(prev => prev + 1);
              }, 1000 * (retryCount + 1)); // Increase delay with each retry
              return;
            }
            
            console.error("Error exchanging code for session:", sessionError);
            setError(sessionError.message);
            
            // Also redirect back to login after displaying error
            setTimeout(() => {
              router.push(`/login?error=exchange_failed&message=${encodeURIComponent(sessionError.message)}`);
            }, 3000);
            return;
          }
        } catch (exchangeError) {
          console.error("Exception during code exchange:", exchangeError);
          
          // For certain errors, we want to check if the user is already logged in
          // This can happen if the code was already used
          const { data: userCheck } = await supabase.auth.getUser();
          if (userCheck.user) {
            console.log("User appears to be authenticated despite exchange error");
            setStatus("Authentication verified. Redirecting...");
            setTimeout(() => {
              router.push('/dashboard');
            }, 1000);
            return;
          }
          
          setError("Failed to complete authentication. Please try logging in again.");
          // Also redirect back to login after displaying error
          setTimeout(() => {
            router.push('/login?error=exchange_exception');
          }, 3000);
          return;
        }
        
        console.log("Session established successfully, checking auth state...");
        setStatus("Verifying authentication...");
        
        // Verify the session was created successfully by getting the user
        const { data } = await supabase.auth.getUser();
        
        if (!data.user) {
          console.error("Session created but no user found");
          setError("Authentication completed but user data couldn't be retrieved.");
          
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
  }, [router, searchParams, retryCount, maxRetries]); // Added maxRetries to dependencies

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