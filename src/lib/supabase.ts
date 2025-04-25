import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Check if we're running on the client
const isClient = typeof window !== 'undefined';

// Create a storage provider that falls back gracefully
const getStorageProvider = () => {
  if (!isClient) return undefined;
  
  // Use a try-catch to handle potential localStorage access errors
  try {
    // Test localStorage access
    localStorage.setItem('supabase.test', 'test');
    localStorage.removeItem('supabase.test');
    return localStorage;
  } catch (e) {
    console.warn('localStorage not available, falling back to memory storage');
    // Fall back to in-memory storage
    return undefined;
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Use PKCE flow for enhanced security
    flowType: 'pkce',
    // Don't log auth details in production
    debug: process.env.NODE_ENV === 'development',
    storage: getStorageProvider(),
  },
  // Global settings for Supabase client
  global: {
    headers: {
      'X-Client-Info': 'eduinsight-web'
    }
  }
}); 