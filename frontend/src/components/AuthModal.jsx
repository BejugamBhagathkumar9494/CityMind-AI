import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { authenticateUser, isSupabaseConfigured } from '../services/supabaseClient';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('admin@citymind.ai');
  const [password, setPassword] = useState('citymind2026');
  const [name, setName] = useState('Admin Officer');
  const [role, setRole] = useState('City Admin Officer');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (view === 'forgot') {
        alert(`Password reset instructions sent to ${email}`);
        setIsLoading(false);
        onClose();
        return;
      }

      const userData = await authenticateUser({
        email,
        password,
        name: view === 'register' ? name : undefined,
        role: view === 'register' ? role : undefined,
        isRegister: view === 'register'
      });

      localStorage.setItem('citymind_user', JSON.stringify(userData));
      onLoginSuccess(userData);
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-modal w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            C
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">CityMind AI Auth Portal</h2>
            <p className="text-[11px] text-slate-500">Smart City Authentication & Role Access</p>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex border-b border-slate-200 mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setView('login'); setErrorMessage(null); }}
            className={`pb-2 px-3 transition-colors ${view === 'login' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setView('register'); setErrorMessage(null); }}
            className={`pb-2 px-3 transition-colors ${view === 'register' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Register Officer
          </button>
          <button
            type="button"
            onClick={() => { setView('forgot'); setErrorMessage(null); }}
            className={`pb-2 px-3 transition-colors ${view === 'forgot' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Reset Password
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {view === 'register' && (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Officer Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bhagath Kumar"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Official Municipal Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@citymind.ai"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {view !== 'forgot' && (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Security Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {view === 'register' && (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Authorization Role</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="City Admin Officer">City Admin Officer (Full Access)</option>
                  <option value="Municipal Inspector">Municipal Inspector (Operations & AI)</option>
                  <option value="Citizen Resident">Citizen Resident (Public Access)</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 text-xs mt-2"
          >
            <span>
              {isLoading
                ? 'Authenticating...'
                : view === 'login'
                ? 'Authenticate & Enter'
                : view === 'register'
                ? 'Create Account & Authorize'
                : 'Send Reset Link'}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>{isSupabaseConfigured ? 'Supabase Auth Cloud Active' : 'SQLite Master Auth & Local JWT Active'}</span>
        </div>
      </div>
    </div>
  );
}
