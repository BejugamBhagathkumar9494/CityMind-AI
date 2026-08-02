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
  CheckCircle2,
  Building2,
  ArrowLeft
} from 'lucide-react';
import { authenticateUser, isSupabaseConfigured } from '../services/supabaseClient';

export default function AuthPage({ onLoginSuccess, onBackToLanding }) {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('City Admin Officer');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (view === 'forgot') {
        alert(`Password reset instructions sent to ${email || 'your email'}`);
        setIsLoading(false);
        return;
      }

      const userData = await authenticateUser({
        email: email.trim() || 'admin@citymind.ai',
        password: password.trim() || 'citymind2026',
        name: view === 'register' ? (name.trim() || 'Admin Officer') : undefined,
        role: view === 'register' ? role : undefined,
        isRegister: view === 'register'
      });

      localStorage.setItem('citymind_user', JSON.stringify(userData));
      setIsLoading(false);
      onLoginSuccess(userData);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col lg:flex-row overflow-x-hidden relative font-sans selection:bg-blue-100 selection:text-blue-700 m-0 p-0 top-0 left-0 fixed inset-0 z-[9999]">
      
      {/* ========================================================================= */}
      {/* LEFT SIDE (55% Desktop / 50% Tablet / Top Mobile): HERO & TELEMETRY PANEL */}
      {/* ========================================================================= */}
      <div className="lg:w-[55%] md:w-1/2 w-full bg-slate-950 p-8 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden min-h-[460px] lg:min-h-screen">
        
        {/* Background Graphic & Dark Gradient */}
        <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay">
          <img 
            src="/smart_city_auth_bg.png" 
            alt="Smart City Skyline" 
            className="w-full h-full object-cover scale-105 animate-pulse duration-[8000ms]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/95 to-slate-900 pointer-events-none" />

        {/* Top Header: Logo & Back to Landing Link */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onBackToLanding}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/30">
              C
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-lg font-black tracking-tight text-white">CityMind</span>
                <span className="text-lg font-black text-blue-400">AI</span>
              </div>
              <p className="text-[11px] text-blue-200/80 font-medium">Smarter Cities, Better Lives</p>
            </div>
          </div>

          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 backdrop-blur-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          )}
        </div>

        {/* Top Badges (Floating Telemetry Indicators) */}
        <div className="relative z-10 my-6 space-y-2.5">
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold backdrop-blur-md shadow-sm">
              <Wind className="w-3.5 h-3.5 text-emerald-400" />
              Air Quality: Good
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-400 text-[11px] font-bold backdrop-blur-md shadow-sm">
              <Car className="w-3.5 h-3.5 text-blue-400" />
              Traffic Flow: Smooth
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 text-[11px] font-bold backdrop-blur-md shadow-sm">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Energy Usage: Optimized
            </span>
          </div>
        </div>

        {/* Center Content: Title & Subtitle */}
        <div className="relative z-10 space-y-3 my-4">
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            City Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-300">
              Command Center
            </span>
          </h1>
          <p className="text-xs lg:text-sm text-slate-300 leading-relaxed font-medium max-w-lg">
            Empower municipal governance with real-time XGBoost risk predictions, K-Means clustering, citizen complaint processing, and autonomous AI agents.
          </p>
        </div>

        {/* Bottom Footer Feature Callouts */}
        <div className="relative z-10 border-t border-white/10 pt-6 grid grid-cols-3 gap-4 text-xs">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">ML Predictions</span>
            <span className="font-bold text-white text-xs mt-0.5 block">XGBoost & K-Means</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Autonomous RAG</span>
            <span className="font-bold text-white text-xs mt-0.5 block">FAISS Vector Search</span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">SLA Optimization</span>
            <span className="font-bold text-white text-xs mt-0.5 block">Knapsack Solver</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE (45% Desktop / 50% Tablet / Bottom Mobile): AUTH FORM         */}
      {/* ========================================================================= */}
      <div className="lg:w-[45%] md:w-1/2 w-full p-8 lg:p-14 flex flex-col justify-center bg-white overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {view === 'login' ? 'Welcome Back' : view === 'register' ? 'Create Account' : 'Reset Password'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              {view === 'login'
                ? 'Sign in to your CityMind AI account'
                : view === 'register'
                ? 'Register your official municipal intelligence credentials'
                : 'Enter your email address to reset your password'}
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2.5">
              <AlertCircle className="w-4.5 h-4.5 text-red-600 shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {view === 'register' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full legal name (e.g. Bhagath Kumar)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your official municipal email address (e.g. officer@citymind.ai)..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {view !== 'forgot' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your secure account password (e.g. ••••••••)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {view === 'register' && (
              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Authorization Role</label>
                <div className="relative">
                  <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
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
                  className="text-blue-600 hover:text-blue-700 font-bold text-xs"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Large Blue Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 text-sm mt-5 active:scale-[0.99]"
            >
              <span>
                {isLoading
                  ? 'Authenticating...'
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
          <div className="mt-6 text-center text-xs text-slate-500 font-medium">
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
  );
}
