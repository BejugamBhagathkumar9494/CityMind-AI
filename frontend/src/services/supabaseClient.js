import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  !supabaseUrl.includes('YOUR_SUPABASE') &&
  !supabaseAnonKey.includes('YOUR_SUPABASE')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Universal authentication helper supporting Supabase Cloud & Local API Auth Fallback
 */
export async function authenticateUser({ email, password, name, role = 'City Admin Officer', isRegister = false }) {
  // Option 1: Real Supabase Cloud Auth if configured
  if (isSupabaseConfigured && supabase) {
    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: name || email.split('@')[0], role: role || 'City Admin Officer' }
          }
        });
        if (error) {
          if (error.message && !error.message.includes('fetch') && !error.message.includes('Failed to execute')) {
            throw new Error(error.message);
          }
          console.warn('Supabase signUp error, falling back:', error.message);
        } else if (data?.user) {
          return {
            id: data.user.id || 'usr_spb_' + Date.now(),
            email: data.user.email || email,
            name: data.user.user_metadata?.name || name || email.split('@')[0],
            role: data.user.user_metadata?.role || role || 'City Admin Officer',
            token: data.session?.access_token || 'token_spb_' + Date.now()
          };
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          if (error.status === 400 || (error.message && (error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed')))) {
            throw new Error(error.message);
          }
          console.warn('Supabase signIn error, falling back to local backend/demo:', error.message);
        } else if (data?.user) {
          return {
            id: data.user.id || 'usr_spb_' + Date.now(),
            email: data.user.email || email,
            name: data.user.user_metadata?.name || name || email.split('@')[0],
            role: data.user.user_metadata?.role || role || 'City Admin Officer',
            token: data.session?.access_token || 'token_spb_' + Date.now()
          };
        }
      }
    } catch (spbErr) {
      if (spbErr.message && (spbErr.message.includes('Invalid login credentials') || spbErr.message.includes('Email not confirmed') || spbErr.message.includes('already registered'))) {
        throw spbErr;
      }
      console.warn('Supabase Auth execution failed, activating API / offline fallback:', spbErr);
    }
  }

  // Option 2: Local Backend API Auth (SQLite / JWT REST Fallback)
  const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
  const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').trim().replace(/\/+$/, '');
  const url = API_BASE.endsWith('/api') ? `${API_BASE.slice(0, -4)}${endpoint}` : `${API_BASE}${endpoint}`;

  const payload = { email, password };
  if (isRegister || name) payload.name = name || email.split('@')[0];
  if (isRegister || role) payload.role = role || 'City Admin Officer';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || `Authentication failed with status ${res.status}`);
    }
    const data = await res.json();
    return data.user;
  } catch (err) {
    if (err.message && (err.message.includes('User with this email already exists') || err.message.includes('status 400') || err.message.includes('status 401'))) {
      throw err;
    }
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

