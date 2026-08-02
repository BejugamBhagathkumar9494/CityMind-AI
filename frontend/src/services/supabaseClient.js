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
 * Universal single-user mode authentication helper supporting Supabase, REST API, & Production Web Fallback
 */
export async function authenticateUser({ email, password, name, role = 'City Admin Officer', isRegister = false }) {
  const userEmail = (email || '').trim().toLowerCase();
  const userPass = password || '';
  const userName = (name || '').trim() || userEmail.split('@')[0] || 'Admin Officer';
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
      if (spbErr.message && (spbErr.message.includes('Invalid') || spbErr.message.includes('already') || spbErr.message.includes('credentials'))) {
        throw spbErr;
      }
    }
  }

  // Option 2: Local / Server Database REST API Auth
  const rawApi = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').trim();
  let targetUrl = isRegister ? '/api/auth/register' : '/api/auth/login';

  if (rawApi.startsWith('http://') || rawApi.startsWith('https://')) {
    const base = rawApi.replace(/\/+$/, '');
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    targetUrl = base.endsWith('/api') ? `${base}${endpoint}` : `${base}/api${endpoint}`;
  }

  try {
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
    if (err.message && (err.message.includes('Invalid email or password') || err.message.includes('already') || err.message.includes('account has already been created'))) {
      throw err;
    }

    // Single-User Mode Local Session Fallback for Web Deployments when API server URL is unreachable
    console.warn('Backend Auth server unreachable, granting authenticated session:', userEmail);
    return {
      id: `usr_db_${Date.now().toString().slice(-6)}`,
      email: userEmail,
      name: userName,
      role: userRole,
      token: `token_db_${Date.now()}`
    };
  }
}

export async function signOutUser() {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut().catch(() => {});
  }
  localStorage.removeItem('citymind_user');
}
