import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const env = typeof import.meta !== "undefined" ? import.meta.env : undefined;
const nodeEnv = typeof process !== "undefined" ? process.env : undefined;

const supabaseUrl =
  env?.VITE_SUPABASE_URL || nodeEnv?.VITE_SUPABASE_URL || "https://ngexxgbkjyxgotvjuczi.supabase.co";
const supabaseAnonKey =
  env?.VITE_SUPABASE_ANON_KEY ||
  nodeEnv?.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_oxGhxy9p2857FbYB1H5RHg_53VkCNx_";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export function getSupabaseClient() {
  return supabase;
}
