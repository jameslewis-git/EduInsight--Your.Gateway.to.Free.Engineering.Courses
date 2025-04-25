"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Suspense } from "react";
import { supabase } from "@/lib/supabase";

// Create a separate component that uses the search params
function SearchParamsHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    // Check for OAuth errors in the URL
    const errorParam = searchParams.get('error');
    const errorCode = searchParams.get('error_code');
    
    // If there's an auth error, redirect to login page with the error
    if (errorParam && (errorCode === 'bad_oauth_state' || errorParam === 'invalid_request')) {
      console.log("Detected OAuth error on homepage, redirecting to login:", errorCode);
      
      // Clear any existing auth state
      supabase.auth.signOut().then(() => {
        console.log("Cleared auth state before redirect");
        
        // Clean URL and redirect to login with error
        const redirectUrl = `/login?error=${errorParam}&error_code=${errorCode}`;
        router.push(redirectUrl);
      });
    }
    
    // Clean up URL if it has error parameters but we're not redirecting
    if (errorParam && window.location.search.includes('error=')) {
      // Use history API to clean the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [searchParams, router]);
  
  // This component doesn't render anything
  return null;
}

// Wrap the component that uses useSearchParams in a Suspense boundary
export function HomePageErrorHandler() {
  return (
    <Suspense fallback={null}>
      <SearchParamsHandler />
    </Suspense>
  );
} 