import { supabase } from './supabase';

export type AuthError = {
  message: string;
};

// Sign up with email and password
export async function signUp(email: string, password: string, name: string) {
  try {
    console.log('Starting signup process for:', email);
    
    // Clear any existing sessions first
    await supabase.auth.signOut();
    
    // First, attempt to create the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Store user metadata
        data: {
          full_name: name
        },
        // We're not using email confirmation for the demo
        emailRedirectTo: undefined,
      }
    });

    if (error) {
      console.error('Signup error:', error);
      return { user: null, error: { message: error.message } };
    }
    
    console.log('Signup response:', data);
    
    // Check if the user was actually created
    if (!data.user) {
      return { 
        user: null, 
        error: { message: 'Failed to create user account. Please try again.' } 
      };
    }
    
    // On successful signup, immediately try to sign in
    console.log('User created successfully, attempting to sign in');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('Auto sign-in error after signup:', signInError);
      // Even though sign-in failed, the account was created successfully
      return { 
        user: data.user, 
        error: { message: 'Account created but sign-in failed. Please try logging in manually.' } 
      };
    }

    // Success case - user created and signed in
    console.log('User signed in successfully after signup');
    return { user: signInData.user, error: null };
    
  } catch (error) {
    console.error('Unexpected error during signup:', error);
    return {
      user: null,
      error: { message: 'An unexpected error occurred during sign up. Please try again.' },
    };
  }
}

// Sign in with email and password
export async function signIn(email: string, password: string) {
  try {
    // Clear any existing sessions first to prevent conflicts
    await supabase.auth.signOut();
    
    console.log('Starting signin process for:', email);
    
    // Try to clear localStorage to prevent stale tokens
    try {
      const authKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('supabase.auth.')
      );
      
      if (authKeys.length > 0) {
        console.log('Clearing stale auth tokens');
        authKeys.forEach(key => localStorage.removeItem(key));
      }
    } catch (e) {
      console.log('Unable to access localStorage:', e);
    }
    
    // Attempt signin
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Signin error:', error);
      return { user: null, error: { message: error.message } };
    }

    if (!data.user) {
      console.error('No user returned despite successful signin');
      return { user: null, error: { message: 'Authentication failed. Please try again.' } };
    }
    
    console.log('Authentication successful');
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Unexpected error during signin:', error);
    return {
      user: null,
      error: { message: 'An unexpected error occurred during sign in. Please try again.' },
    };
  }
}

// Sign in with Google
export async function signInWithGoogle() {
  try {
    // First, clear any existing auth state to ensure a fresh start
    await supabase.auth.signOut();
    
    // Important: Use the exact auth callback URL that's registered in Supabase
    // This must match your Supabase redirect URL setting exactly
    const callbackUrl = 'https://eduinsight-project.netlify.app/auth/callback';
    
    console.log('Starting Google sign-in flow...');
    console.log('Using redirect URL:', callbackUrl);
    
    // Clear browser storage to prevent stale tokens
    try {
      // Clear all auth-related items from localStorage
      const storageKeys = Object.keys(localStorage);
      const authKeys = storageKeys.filter(key => 
        key.startsWith('supabase.auth.') || key.includes('oauth')
      );
      
      console.log(`Clearing ${authKeys.length} auth-related items from storage`);
      authKeys.forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.log('Unable to fully clear storage, continuing anyway:', e);
    }
    
    // Proceed with OAuth flow using implicit flow
    console.log('Initiating OAuth flow with Google...');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl,
        skipBrowserRedirect: false,
        queryParams: {
          prompt: 'select_account', // Always show Google account selector
        }
      },
    });

    if (error) {
      console.error('Error initiating Google sign-in:', error);
      return { user: null, error: { message: error.message } };
    }

    console.log('OAuth sign-in initiated successfully, now redirecting to provider...');
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