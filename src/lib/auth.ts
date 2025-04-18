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
        // Redirect to the client-side page instead of the route
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (error) {
      return { user: null, error: { message: error.message } };
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