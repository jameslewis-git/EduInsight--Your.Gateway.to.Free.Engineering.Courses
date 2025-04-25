import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Use PKCE flow for enhanced security
    flowType: 'pkce',
    // Enable debug for troubleshooting
    debug: process.env.NODE_ENV !== 'production',
    // The latest version of supabase-js doesn't use the cookies property directly
    // Instead, configure storage to use localStorage for better compatibility
    storage: typeof window !== 'undefined' ? localStorage : undefined
  }
}); 