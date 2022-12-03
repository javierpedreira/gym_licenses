import {createClient, SupabaseClient} from '@supabase/supabase-js'

class SupabaseConnector {
  private static instance: SupabaseConnector

  supabase: SupabaseClient

  constructor(url: string, key: string) {
    this.supabase = createClient(url, key)
  }

  client() {
    return this.supabase
  }
}

export const SupaBaseConnector = new SupabaseConnector(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)
