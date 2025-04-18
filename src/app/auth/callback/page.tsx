"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        
        if (code) {
          // Exchange the code for a session
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            setError(error.message);
            return;
          }
        }
        
        // Redirect to dashboard after successful authentication
        router.push('/dashboard');
      } catch (err) {
        console.error('Error handling auth callback:', err);
        setError('An unexpected error occurred during authentication.');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <MainLayout>
      <div className="container flex items-center justify-center min-h-[60vh]">
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
              <p className="text-lg">Completing your sign in...</p>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
} 