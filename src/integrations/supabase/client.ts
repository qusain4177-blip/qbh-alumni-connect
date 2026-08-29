import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = "https://rjbjmswdtkoxtjstmmcu.supabase.co"
const SUPABASE_ANON_KEY = "process.env.JWT_3"

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: {
      apikey: SUPABASE_ANON_KEY,
    },
  },
})

export default supabase
