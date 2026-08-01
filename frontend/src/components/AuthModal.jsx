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
  const [email, setEmail] = useState('admin@citymind.ai');
  const [password, setPassword] = useState('citymind2026');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('Admin Officer');
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

  const handleSocialLogin = async (providerName) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // Direct mock social login with Supabase provider setup
      const userData = {
        id: `usr_${providerName}_${Date.now()}`,
        email: `officer.${providerName.toLowerCase()}@citymind.ai`,
        name: `${providerName} Authenticated Officer`,
        role: 'City Admin Officer',
        token: `token_${providerName}_${Date.now()}`
      };
      localStorage.setItem('citymind_user', JSON.stringify(userData));
      onLoginSuccess(userData);
      setIsLoading(false);
      onClose();
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(`Failed to authenticate with ${providerName}.`);
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

          {/* Hero Headlines */}
          <div className="relative z-10 space-y-2">
            <h1 className="text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
              AI-Powered <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Smart City Intelligence
              </span>
            </h1>
            <p className="text-xs text-slate-300/90 leading-relaxed max-w-sm">
              Transform urban data into actionable insights. Build smarter, safer and more sustainable cities with real-time autonomous multi-agent analytics.
            </p>
          </div>

          {/* 4 Feature Highlight Cards */}
          <div className="relative z-10 grid grid-cols-2 gap-3 my-6">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-2">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">Real-time Analytics</h4>
              <p className="text-[10px] text-slate-400 leading-normal">Monitor city operations and get instant insights.</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">Predictive Intelligence</h4>
              <p className="text-[10px] text-slate-400 leading-normal">Use AI to predict trends and prevent failure risks.</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-2">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">Anomaly Detection</h4>
              <p className="text-[10px] text-slate-400 leading-normal">Identify risks across grid and water systems.</p>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
              <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-2">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-white mb-0.5">Sustainable Future</h4>
              <p className="text-[10px] text-slate-400 leading-normal">Make data-driven decisions for tomorrow.</p>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="relative z-10 text-[11px] text-slate-400 font-medium">
            © 2026 CityMind AI. All rights reserved.
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDE: AUTHENTICATION FORM CARD */}
        {/* ========================================================================= */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between bg-white">
          
          <div className="max-w-sm mx-auto w-full my-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {view === 'login' ? 'Welcome Back' : view === 'register' ? 'Create Account' : 'Reset Password'}
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {view === 'login'
                  ? 'Sign in to your CityMind AI account'
                  : view === 'register'
                  ? 'Register your official municipal credentials'
                  : 'Enter your email to receive password reset instructions'}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
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
                      placeholder="Enter your full name"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
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
                    placeholder="Enter your email"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
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
                      placeholder="Enter your password"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
                    >
                      <option value="City Admin Officer">City Admin Officer (Full Operations Access)</option>
                      <option value="Municipal Inspector">Municipal Inspector (Operations & AI Analysis)</option>
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

            {/* Social Logins */}
            {view !== 'forgot' && (
              <div className="mt-6">
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-medium">or continue with</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 mt-3">
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white font-medium text-xs text-slate-700 shadow-xs"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                    <span>Google</span>
                  </button>

                  {/* GitHub */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('GitHub')}
                    className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white font-medium text-xs text-slate-700 shadow-xs"
                  >
                    <svg className="w-4 h-4 shrink-0 fill-slate-900" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </button>

                  {/* Microsoft */}
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Microsoft')}
                    className="flex items-center justify-center space-x-1.5 py-2 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white font-medium text-xs text-slate-700 shadow-xs"
                  >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                      <path fill="#f35325" d="M1 1h10v10H1z"/>
                      <path fill="#81bc06" d="M12 1h10v10H12z"/>
                      <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                      <path fill="#ffba08" d="M12 12h10v10H12z"/>
                    </svg>
                    <span>Microsoft</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Toggle Link */}
            <div className="mt-6 text-center text-xs font-medium text-slate-600">
              {view === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setView('register'); setErrorMessage(null); }}
                    className="text-blue-600 hover:text-blue-700 font-bold ml-1 hover:underline"
                  >
                    Create Account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setView('login'); setErrorMessage(null); }}
                    className="text-blue-600 hover:text-blue-700 font-bold ml-1 hover:underline"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>

            {/* Auth status indicator */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isSupabaseConfigured ? 'Supabase Auth Active' : 'Local Auth Ready'}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
