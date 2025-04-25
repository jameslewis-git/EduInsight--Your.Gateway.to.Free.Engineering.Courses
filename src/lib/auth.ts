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
    
    console.log('Using redirect URL:', callbackUrl);
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl,
      },
    });

    if (error) {
      return { user: null, error: { message: error.message } };
    }

    // The OAuth flow will redirect the user, so we won't have a user object here
    return { error: null };
  } catch (error) {
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