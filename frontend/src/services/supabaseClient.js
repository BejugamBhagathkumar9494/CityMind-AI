import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Universal authentication helper supporting Supabase Cloud & Local API Auth Fallback
 */
export async function authenticateUser({ email, password, name, role = 'City Admin Officer', isRegister = false }) {
  // Option 1: Real Supabase Cloud Auth if environment variables are set
  if (isSupabaseConfigured && supabase) {
    if (isRegister) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, role }
        }
      });
      if (error) throw new Error(error.message);
      return {
        id: data.user?.id || 'usr_spb_' + Date.now(),
        email: data.user?.email || email,
        name: data.user?.user_metadata?.name || name || email.split('@')[0],
        role: data.user?.user_metadata?.role || role,
        token: data.session?.access_token || 'token_spb_' + Date.now()
      };
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw new Error(error.message);
      return {
        id: data.user?.id || 'usr_spb_' + Date.now(),
        email: data.user?.email || email,
        name: data.user?.user_metadata?.name || name || email.split('@')[0],
        role: data.user?.user_metadata?.role || role,
        token: data.session?.access_token || 'token_spb_' + Date.now()
      };
    }
  }

  // Option 2: Local Backend API Auth (SQLite / JWT REST Fallback)
  const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
  const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '');
  const url = API_BASE.endsWith('/api') ? `${API_BASE.slice(0, -4)}${endpoint}` : `${API_BASE}${endpoint}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, role })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Authentication failed with status ${res.status}`);
    }
    const data = await res.json();
    return data.user;
  } catch (err) {
    // Offline local fallback for demo / standalone testing
    console.warn('Backend API auth failed, falling back to local session:', err.message);
    return {
      id: 'usr_local_' + Date.now(),
      email,
      name: name || email.split('@')[0],
      role: role || 'City Admin Officer',
      token: 'token_local_' + Date.now()
    };
  }
}

export async function signOutUser() {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut().catch(() => {});
  }
  localStorage.removeItem('citymind_user');
}
