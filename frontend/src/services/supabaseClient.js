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
export async function authenticateUser({ email = '', password = '', name = '', role = 'City Admin Officer', isRegister = false } = {}) {
  const userEmail = String(email || '').trim().toLowerCase();
  const userPass = String(password || '').trim();
  const userName = String(name || '').trim() || (userEmail.split('@')[0] ? userEmail.split('@')[0].toUpperCase() : 'Admin Officer');
  const userRole = String(role || 'City Admin Officer');

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

  // Single-user mode user record
  const fallbackUser = {
    id: `usr_single_${Date.now().toString().slice(-6)}`,
    email: userEmail,
    name: userName,
    role: userRole,
    token: `token_single_${Date.now()}`
  };

  // Option 2: Local / Server Database REST API Auth
  try {
    const rawApi = String(import.meta.env.VITE_API_URL || '').trim();
    if (rawApi && (rawApi.startsWith('http://') || rawApi.startsWith('https://'))) {
      const base = rawApi.replace(/\/+$/, '');
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const targetUrl = base.endsWith('/api') ? `${base}${endpoint}` : `${base}/api${endpoint}`;

      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          password: userPass,
          name: userName,
          role: userRole
        })
      }).catch(() => null);

      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.user) return data.user;
      } else if (res) {
        const errData = await res.json().catch(() => ({}));
        if (errData && errData.detail) {
          throw new Error(String(errData.detail));
        }
      }
    }
  } catch (err) {
    if (err.message && (err.message.includes('Invalid') || err.message.includes('already') || err.message.includes('account has already been created'))) {
      throw err;
    }
  }

  // Return single user mode session
  return fallbackUser;
}

export async function signOutUser() {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut().catch(() => {});
  }
  localStorage.removeItem('citymind_user');
}
