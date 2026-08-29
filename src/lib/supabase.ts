import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://rjbjmswdtkoxtjstmmcu.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "process.env.JWT_2";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export function getSupabaseClient() {
  return supabase;
}
