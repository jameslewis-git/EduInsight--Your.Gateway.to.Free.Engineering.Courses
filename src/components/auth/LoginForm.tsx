"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

import { LoginFormValues, loginSchema } from "@/lib/validations/auth";
import { signIn, signInWithGoogle } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Separate the URL parameter handling to a client component
function ErrorHandler() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for URL error parameters first
    const errorParam = searchParams.get('error');
    const errorCode = searchParams.get('error_code');
    const errorDescription = searchParams.get('error_description');
    const errorMessage = searchParams.get('message');
    
    // Handle specific error codes
    if (errorCode === 'bad_oauth_state') {
      setErrorMessage('Your authentication session has expired or was invalid. Please try signing in again.');
      
      // Clear any existing sessions to prevent cascading auth errors
      supabase.auth.signOut().then(() => {
        console.log('Cleared existing sessions due to bad OAuth state');
      });
    } else if (errorParam === 'session_expired') {
      setErrorMessage('Your authentication session expired. Please sign in again.');
    } else if (errorParam === 'code_missing') {
      setErrorMessage('Authentication code was missing. This may be caused by browser security settings or extensions. Please try again with a different browser.');
    } else if (errorParam === 'exchange_failed') {
      setErrorMessage(errorMessage || 'Failed to authenticate. Please ensure cookies are enabled and try again.');
    } else if (errorParam === 'exchange_exception') {
      setErrorMessage('An unexpected error occurred during authentication. Please try again.');
    } else if (errorParam === 'no_user_found') {
      setErrorMessage('Authentication was processed but user data not found. Please try signing in again.');
    } else if (errorParam === 'callback_error') {
      setErrorMessage('Authentication callback failed. Please try again later.');
    } else if (errorParam === 'verification_failed') {
      setErrorMessage('Could not verify your authentication. Please try signing in again or using a different browser.');
    } else if (errorParam) {
      // Handle any other error in the URL
      setErrorMessage(errorDescription || errorMessage || `Authentication error: ${errorParam}`);
    }
    
    // Clean up the URL if it contains error parameters
    if (window.location.search.includes('error=')) {
      // Use history API to remove error parameters from URL without a refresh
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.search = ''; // Remove all search parameters
        window.history.replaceState({}, document.title, url.toString());
        console.log('Cleaned URL of error parameters');
      }
    }
  }, [searchParams]);
  
  return errorMessage ? (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Authentication Error</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  ) : null;
}

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    const { user, error } = await signIn(data.email, data.password);

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    if (user) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      const { error } = await signInWithGoogle();

      if (error) {
        setError(error.message);
        setIsGoogleLoading(false);
      }
      // The redirect will be handled by the OAuth flow
    } catch (e) {
      console.error('Error during Google sign-in:', e);
      setError('Failed to start Google sign-in. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border shadow-sm">
        <CardContent className="pt-6">
          <ErrorHandler />
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.20455C17.64 8.56637 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8196H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z" fill="#4285F4" />
                <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853" />
                <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957273C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957273 13.0418L3.96409 10.71Z" fill="#FBBC05" />
                <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335" />
              </svg>
            )}
            Login with Google
          </Button>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 pt-4">
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 