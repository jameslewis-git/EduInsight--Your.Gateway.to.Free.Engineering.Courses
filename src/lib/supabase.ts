import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Check if we're running on the client
const isClient = typeof window !== 'undefined';

// Create the Supabase client with the correct configuration for authentication
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Important: Don't use PKCE flow to avoid cookies being required
    // This fixes issues with third-party cookie blocking in browsers
    flowType: 'implicit',
    storage: isClient ? localStorage : undefined,
    // Enable debug mode in development only
    debug: process.env.NODE_ENV === 'development',
  },
  // Global settings for Supabase client
  global: {
    headers: {
      'X-Client-Info': 'eduinsight-web'
    }
  }
}); 