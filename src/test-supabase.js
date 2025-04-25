// Test script for Supabase connectivity
const { createClient } = require('@supabase/supabase-js');

// Use the same configuration from your application
const supabaseUrl = "https://qwruuxyyttigthsznkax.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cnV1eHl5dHRpZ3Roc3pua2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMDIzNTYsImV4cCI6MjA2MDU3ODM1Nn0.AqFiqq7e0qo4PGhNLSaM1s3ifWs8UYnYmBeh-0EICPU";

// Create the Supabase client with the simplified configuration
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
  }
});

// Simple function to test connectivity
async function testSupabaseConnection() {
  console.log("Testing Supabase connection...");
  
  try {
    // Test basic functionality - get current auth config
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error("Error connecting to Supabase:", error);
      return;
    }
    
    console.log("Successfully connected to Supabase");
    console.log("Current session:", data);
    
    // Try to list auth settings (no permissions needed)
    console.log("\nChecking auth configuration...");
    const authSettings = await supabase.auth.getUser();
    console.log("Auth result:", authSettings);
    
  } catch (error) {
    console.error("Exception during Supabase test:", error);
  }
}

// Run the test
testSupabaseConnection(); 