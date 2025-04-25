import { supabase } from './supabase';

export type AuthError = {
  message: string;
};

// Sign up with email and password
export async function signUp(email: string, password: string, name: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Store user metadata
        data: {
          full_name: name
        },
        // Disable email confirmation
        emailRedirectTo: undefined,
      }
    });

    if (error) {
      return { user: null, error: { message: error.message } };
    }

    // If the user was created successfully, immediately sign them in
    if (data.user) {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        return { user: null, error: { message: signInError.message } };
      }

      return { user: signInData.user, error: null };
    }

    return { user: data.user, error: null };
  } catch (error) {
    return {
      user: null,
      error: { message: 'An unexpected error occurred during sign up.' },
    };
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: { message: error.message } };
    }

    return { user: data.user, error: null };
  } catch (error) {
    return {
      user: null,
      error: { message: 'An unexpected error occurred during sign in.' },
    };
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    // Get the current origin (will be Netlify URL in production or localhost in development)
    const origin = window.location.origin;
    const callbackUrl = `${origin}/auth/callback`;
    
    console.log('Starting Google sign-in flow...');
    console.log('Using redirect URL:', callbackUrl);
    
    // Clear browser URL if it contains OAuth error parameters
    if (window.location.search.includes('error=')) {
      console.log('Detected OAuth error in URL, cleaning up...');
      
      // Use history API to remove error parameters from URL without a refresh
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
      
      // Clear any incomplete sessions that might cause state mismatch
      await supabase.auth.signOut();
      console.log('Cleared any existing sessions to avoid state conflicts');
    }
    
    // Check if already logged in
    const { data: userData } = await supabase.auth.getUser();
    if (userData.user) {
      console.log('User is already logged in, redirecting to dashboard...');
      return { user: userData.user, error: null };
    }
    
    // Proceed with OAuth flow
    console.log('Initiating OAuth flow with Google...');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl,
        skipBrowserRedirect: false, // Force the standard redirect flow
        queryParams: {
          // Keep state parameter simple to avoid encoding issues
          prompt: 'select_account', // Always show Google account selector
        }
      },
    });

    if (error) {
      console.error('Error initiating Google sign-in:', error);
      return { user: null, error: { message: error.message } };
    }

    console.log('OAuth sign-in initiated successfully, now redirecting to provider...');
    
    // The OAuth flow will redirect the user, so we won't have a user object here
    return { error: null };
  } catch (error) {
    console.error('Unexpected error during Google sign-in:', error);
    return {
      user: null,
      error: { message: 'An unexpected error occurred during Google sign in.' },
    };
  }
}

// Sign out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    return { error: error ? { message: error.message } : null };
  } catch (error) {
    return {
      error: { message: 'An unexpected error occurred during sign out.' },
    };
  }
}

// Get the current user
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      return { user: null, error: { message: error.message } };
    }
    
    return { user: data.user, error: null };
  } catch (error) {
    return {
      user: null,
      error: { message: 'An unexpected error occurred while fetching the user.' },
    };
  }
} 