import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Handle build-time vs run-time credential checks
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.error('Supabase credentials missing! Database features will not work. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your GitHub Secrets.');
  }
}

// Fallback to a dummy URL only during build to prevent crash, 
// but use empty string if we are in the browser so it fails explicitly.
const finalUrl = supabaseUrl || (typeof window === 'undefined' ? 'https://placeholder-for-build.supabase.co' : '');
const finalKey = supabaseAnonKey || (typeof window === 'undefined' ? 'placeholder-key' : '');

export const supabase = createClient(finalUrl, finalKey);
