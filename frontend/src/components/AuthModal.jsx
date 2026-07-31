import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('admin@citymind.ai');
  const [password, setPassword] = useState('citymind2026');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Local / Supabase auth fallback
    onLoginSuccess({
      email,
      name: email.split('@')[0],
      role: 'City Admin Officer'
    });
    onClose();
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
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base">
            C
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">CityMind AI Portal</h2>
            <p className="text-[11px] text-slate-500">Smart City Authentication & Security</p>
          </div>
        </div>

        {/* View Switcher Pills */}
        <div className="flex border-b border-slate-200 mb-5 text-xs font-semibold">
          <button
            onClick={() => setView('login')}
            className={`pb-2 px-3 transition-colors ${view === 'login' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setView('register')}
            className={`pb-2 px-3 transition-colors ${view === 'register' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}
          >
            Register Officer
          </button>
          <button
            onClick={() => setView('forgot')}
            className={`pb-2 px-3 transition-colors ${view === 'forgot' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500'}`}
          >
            Reset Password
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Official Municipal Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 text-xs"
          >
            <span>{view === 'login' ? 'Authenticate & Enter' : view === 'register' ? 'Register Account' : 'Send Reset Link'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center">
          Demo Mode Fallback Active • Supabase Integration Ready
        </div>
      </div>
    </div>
  );
}
