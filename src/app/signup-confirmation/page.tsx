"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Check, Mail, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Create a component that uses search params
function ConfirmationContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResendEmail = async () => {
    if (!email) return;
    
    setIsSending(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) {
        setStatus('error');
        setErrorMessage(error.message);
      } else {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-primary/10 p-3 rounded-full">
          <Mail className="h-10 w-10 text-primary" />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2">Check your email</h1>
      <p className="text-muted-foreground mb-8">
        We've sent a confirmation link to <strong>{email}</strong>. Please check your inbox and click the link to activate your account.
      </p>
      
      <div className="bg-muted/50 rounded-lg p-4 mb-8">
        <h2 className="text-lg font-medium mb-2">What happens next?</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span>Click the confirmation link in your email</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span>Complete your profile information</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span>Start exploring personalized learning recommendations</span>
          </li>
        </ul>
      </div>
      
      {status === 'success' && (
        <div className="p-3 mb-6 bg-green-500/10 text-green-700 dark:text-green-400 text-sm rounded-md">
          Confirmation email resent successfully. Please check your inbox.
        </div>
      )}
      
      {status === 'error' && (
        <div className="p-3 mb-6 bg-destructive/10 text-destructive text-sm rounded-md">
          {errorMessage || 'Failed to resend confirmation email. Please try again.'}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Button 
            onClick={handleResendEmail} 
            variant="outline" 
            className="w-full"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Resend Confirmation Email"
            )}
          </Button>
          
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">
              Back to Login
            </Link>
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {email ? (
            <>
              Didn't receive an email? Check your spam folder or try resending the confirmation email.
            </>
          ) : (
            <>
              Didn't receive an email? Check your spam folder or{" "}
              <Link href="/signup" className="text-primary hover:underline">
                try again
              </Link>.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// Loading fallback component
function ConfirmationLoading() {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-primary/10 p-3 rounded-full">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2">Loading confirmation...</h1>
      <p className="text-muted-foreground mb-8">
        Please wait while we retrieve your information.
      </p>
    </div>
  );
}

export default function SignupConfirmationPage() {
  return (
    <MainLayout>
      <div className="container max-w-lg py-16 md:py-24">
        <Suspense fallback={<ConfirmationLoading />}>
          <ConfirmationContent />
        </Suspense>
      </div>
    </MainLayout>
  );
} 