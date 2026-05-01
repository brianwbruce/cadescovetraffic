import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from './env';

let serverClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (serverClient) return serverClient;
  serverClient = createClient(env.supabaseUrl(), env.supabaseServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return serverClient;
}

export function getSupabaseAnon(): SupabaseClient {
  return createClient(env.supabaseUrl(), env.supabaseAnonKey(), {
    auth: { persistSession: false },
  });
}
