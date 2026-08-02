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
  const userEmail = (email || '').trim().toLowerCase();
  const userPass = password || '';
  const userName = (name || '').trim();
  const userRole = role || 'City Admin Officer';

  if (!userEmail || !userPass) {
    throw new Error('Please enter both email address and password.');
  }

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
        if (error?.message) {
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
        if (error?.message) {
          throw new Error(error.message);
        }
      }
    } catch (spbErr) {
      if (spbErr.message) throw spbErr;
    }
  }

  // Option 2: Local Backend Database API Auth (SQLite / FastAPI REST)
  try {
    const rawApi = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    let apiBase = sanitizeUrl(rawApi);
    if (apiBase && !apiBase.endsWith('/api') && !apiBase.includes('/api/')) {
      apiBase = `${apiBase}/api`;
    }
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    const targetUrl = apiBase ? `${apiBase}${endpoint}` : `http://localhost:8000/api${endpoint}`;

    const payload = { email: userEmail, password: userPass };
    if (isRegister) {
      payload.name = userName;
      payload.role = userRole;
    }

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
      throw new Error(errData.detail || 'Invalid email or password.');
    }
  } catch (err) {
    if (err.message) throw err;
    throw new Error('Unable to connect to database authentication server.');
  }
}

export async function signOutUser() {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut().catch(() => {});
  }
  localStorage.removeItem('citymind_user');
}

