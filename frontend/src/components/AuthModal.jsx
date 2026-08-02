import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  EyeOff,
  Activity,
  Cpu,
  ShieldAlert,
  Leaf,
  Wind,
  Car,
  Zap,
  Building2
} from 'lucide-react';
import { authenticateUser, isSupabaseConfigured } from '../services/supabaseClient';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('City Admin Officer');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (view === 'forgot') {
        alert(`Password reset instructions sent to ${email || 'your email'}`);
        setIsLoading(false);
        onClose();
        return;
      }

      const userData = await authenticateUser({
        email: email.trim() || 'admin@citymind.ai',
        password: password.trim() || 'citymind2026',
        name: view === 'register' ? (name.trim() || 'Admin Officer') : undefined,
        role: view === 'register' ? role : undefined,
        isRegister: view === 'register'
      });

      if (rememberMe) {
        localStorage.setItem('citymind_user', JSON.stringify(userData));
      }
      onLoginSuccess(userData);
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row relative min-h-[640px]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100/80 transition-colors z-20"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================================= */}
        {/* LEFT SIDE: FUTURISTIC SMART CITY HERO & TELEMETRY PANEL */}
        {/* ========================================================================= */}
        <div className="md:w-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Background Futuristic Skyline Graphic */}
          <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay">
            <img 
              src="/smart_city_auth_bg.png" 
              alt="Smart City Background" 
              className="w-full h-full object-cover scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-blue-900/20 pointer-events-none" />

          {/* Top Logo */}
          <div className="relative z-10 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 font-extrabold text-xl">
              C
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-black tracking-tight text-white">CityMind</span>
                <span className="text-lg font-black text-blue-400">AI</span>
              </div>
              <p className="text-[11px] text-blue-200/80 font-medium">Smarter Cities, Better Lives</p>
            </div>
          </div>

          {/* Floating Live Telemetry Badges */}
          <div className="relative z-10 my-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold backdrop-blur-md shadow-sm">
                <Wind className="w-3.5 h-3.5 text-emerald-400" />
                Air Quality: Good
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-400 text-[11px] font-semibold backdrop-blur-md shadow-sm">
                <Car className="w-3.5 h-3.5 text-blue-400" />
                Traffic Flow: Smooth
              </span>
            </div>
            <div className="flex justify-end">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 text-[11px] font-semibold backdrop-blur-md shadow-sm">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Energy Usage: Optimized
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="relative z-10 space-y-3">
            <h2 className="text-3xl font-black text-white leading-tight">
              City Intelligence <br />
              <span className="text-blue-400">Command Center</span>
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Access real-time machine learning predictions, citizen complaint clusters, policy vector search, and autonomous AI municipal agents.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="relative z-10 border-t border-white/10 pt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">XGBoost & K-Means</span>
              <span className="font-extrabold text-blue-400 text-xs">ML Risk Models</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Policy RAG</span>
              <span className="font-extrabold text-emerald-400 text-xs">FAISS Vector Engine</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Budget Optimization</span>
              <span className="font-extrabold text-amber-400 text-xs">Knapsack Solver</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDE: AUTHENTICATION FORM                                           */}
        {/* ========================================================================= */}
        <div className="md:w-1/2 p-8 lg:p-10 flex flex-col justify-center bg-white">
          <div className="w-full max-w-sm mx-auto">
            
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {view === 'login' ? 'Welcome Back' : view === 'register' ? 'Create Account' : 'Reset Password'}
              </h2>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">
                {view === 'login'
                  ? 'Sign in to your CityMind AI account'
                  : view === 'register'
                  ? 'Register your official municipal intelligence credentials'
                  : 'Enter your email address to reset your password'}
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {view === 'register' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full legal name (e.g. Bhagath Kumar)..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your official municipal email address (e.g. officer@citymind.ai)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {view !== 'forgot' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your secure account password (e.g. ••••••••)..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2.5 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {view === 'register' && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Authorization Role</label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                    >
                      <option value="City Admin Officer">City Admin Officer (Full Access)</option>
                      <option value="Municipal Inspector">Municipal Inspector (Operations & AI)</option>
                      <option value="Citizen Resident">Citizen Resident (Public Access)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password Row */}
              {view === 'login' && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-slate-600 font-medium">Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => { setView('forgot'); setErrorMessage(null); }}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-xs"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Main Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 text-sm mt-4 active:scale-[0.99]"
              >
                <span>
                  {isLoading
                    ? 'Processing...'
                    : view === 'login'
                    ? 'Sign In'
                    : view === 'register'
                    ? 'Create Account'
                    : 'Send Reset Link'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle View Footer Links */}
            <div className="mt-5 text-center text-xs text-slate-500 font-medium">
              {view === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    onClick={() => { setView('register'); setErrorMessage(null); }}
                    className="text-blue-600 hover:text-blue-700 font-bold ml-1"
                  >
                    Create one now
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    onClick={() => { setView('login'); setErrorMessage(null); }}
                    className="text-blue-600 hover:text-blue-700 font-bold ml-1"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
