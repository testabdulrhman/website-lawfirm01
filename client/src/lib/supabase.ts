import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://erkkzrnownrpglbyiybe.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_GhjIoRMpzrJb0OsoOAHPUg_pw_-kaRe';

let _supabase: SupabaseClient | null = null;

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      if (typeof window === 'undefined') {
        // During SSR, return a no-op proxy to avoid WebSocket initialization
        return typeof prop === 'string' && ['from', 'storage', 'auth', 'functions'].includes(prop)
          ? () => ({ select: () => ({ data: [], error: null }), data: [], error: null })
          : undefined;
      }
      _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return (_supabase as any)[prop];
  }
});
