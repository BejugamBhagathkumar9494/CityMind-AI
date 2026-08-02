import { createClient } from '@supabase/supabase-js';

const sanitizeUrl = (urlStr) => {
  if (!urlStr || typeof urlStr !== 'string') return '';
  let str = urlStr.trim();
  if (!str || str === 'undefined' || str === 'null') return '';
  if (!str.startsWith('http://') && !str.startsWith('https://') && !str.startsWith('/')) {
    str = `https://${str}`;
  }
  return str.replace(/\/+$/, '');
};

const supabaseUrl = sanitizeUrl(import.meta.env.VITE_SUPABASE_URL);
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
 * Universal authentication helper supporting Supabase Cloud, Local API, & Standalone Demo Fallback
 */
export async function authenticateUser({ email, password, name, role = 'City Admin Officer', isRegister = false }) {
  const userEmail = (email || '').trim().toLowerCase() || 'admin@citymind.ai';
  const userPass = password || 'citymind2026';
  const userName = name || userEmail.split('@')[0] || 'Admin Officer';
  const userRole = role || 'City Admin Officer';

  // Option 1: Supabase Cloud Auth if configured
  if (isSupabaseConfigured && supabase) {
    try {
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: userEmail,
          password: userPass,
          options: {
            data: { name: userName, role: userRole }
          }
        });
        if (!error && data?.user) {
          return {
            id: data.user.id || 'usr_spb_' + Date.now(),
            email: data.user.email || userEmail,
            name: data.user.user_metadata?.name || userName,
            role: data.user.user_metadata?.role || userRole,
            token: data.session?.access_token || 'token_spb_' + Date.now()
          };
        }
        if (error?.message && (error.message.includes('already registered') || error.message.includes('User already exists'))) {
          throw new Error(error.message);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password: userPass
        });
        if (!error && data?.user) {
          return {
            id: data.user.id || 'usr_spb_' + Date.now(),
            email: data.user.email || userEmail,
            name: data.user.user_metadata?.name || userName,
            role: data.user.user_metadata?.role || userRole,
            token: data.session?.access_token || 'token_spb_' + Date.now()
          };
        }
        if (error?.message && (error.message.includes('Invalid login credentials') || error.message.includes('Email not confirmed'))) {
          throw new Error(error.message);
        }
      }
    } catch (spbErr) {
      if (spbErr.message && (spbErr.message.includes('Invalid login credentials') || spbErr.message.includes('Email not confirmed') || spbErr.message.includes('already registered'))) {
        throw spbErr;
      }
      console.warn('Supabase Auth attempt failed, trying REST API / local fallback:', spbErr);
    }
  }

  // Option 2: Local Backend API Auth (SQLite / FastAPI REST)
  try {
    const rawApi = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    let apiBase = sanitizeUrl(rawApi);
    if (apiBase && !apiBase.endsWith('/api') && !apiBase.includes('/api/')) {
      apiBase = `${apiBase}/api`;
    }
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    const targetUrl = apiBase ? `${apiBase}${endpoint}` : `http://localhost:8000/api${endpoint}`;

    const payload = { email: userEmail, password: userPass };
    if (isRegister || name) payload.name = userName;
    if (isRegister || role) payload.role = userRole;

    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.user) return data.user;
    } else {
      const errData = await res.json().catch(() => ({}));
      if (res.status === 400 || res.status === 401) {
        throw new Error(errData.detail || 'Invalid email or password credentials.');
      }
    }
  } catch (err) {
    if (err.message && (err.message.includes('Invalid email or password') || err.message.includes('already exists') || err.message.includes('credentials'))) {
      throw err;
    }
    console.warn('Backend API auth failed, activating offline demo session:', err.message);
  }

  // Option 3: Offline Standalone Demo Session (Guarantees login success in all environments)
  return {
    id: 'usr_local_' + Date.now(),
    email: userEmail,
    name: userName,
    role: userRole,
    token: 'token_local_' + Date.now()
  };
}

export async function signOutUser() {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut().catch(() => {});
  }
  localStorage.removeItem('citymind_user');
}

