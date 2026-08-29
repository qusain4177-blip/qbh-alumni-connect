import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://rjbjmswdtkoxtjstmmcu.supabase.co"
const SUPABASE_ANON_KEY = "process.env.JWT_4"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
