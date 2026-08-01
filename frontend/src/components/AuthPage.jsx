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
  const [email, setEmail] = useState('admin@citymind.ai');
  const [password, setPassword] = useState('citymind2026');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('Admin Officer');
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
        alert(`Password reset instructions sent to ${email}`);
        setIsLoading(false);
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
      setIsLoading(false);
      onLoginSuccess(userData);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleSocialLogin = async (providerName) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const userData = {
        id: `usr_${providerName}_${Date.now()}`,
        email: `officer.${providerName.toLowerCase()}@citymind.ai`,
        name: `${providerName} Authenticated Officer`,
        role: 'City Admin Officer',
        token: `token_${providerName}_${Date.now()}`
      };
      localStorage.setItem('citymind_user', JSON.stringify(userData));
      setIsLoading(false);
      onLoginSuccess(userData);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(`Failed to authenticate with ${providerName}.`);
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
            AI-Powered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-200">
              Smart City Intelligence
            </span>
          </h1>
          <p className="text-sm lg:text-base text-slate-300 font-medium leading-relaxed max-w-lg">
            Transform urban data into actionable insights with real-time AI analytics, failure risk prediction, and multi-agent coordination.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-3 my-6">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs font-bold text-slate-200">Real-time Analytics</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-xs font-bold text-slate-200">Predictive Intelligence</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs font-bold text-slate-200">Infrastructure Monitoring</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs font-bold text-slate-200">Sustainability Insights</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="relative z-10 text-xs text-slate-400 font-medium">
          © 2026 CityMind AI. All rights reserved.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE (45% Desktop / 50% Tablet / Bottom Mobile): AUTH CARD PANEL */}
      {/* ========================================================================= */}
      <div className="lg:w-[45%] md:w-1/2 w-full bg-white flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative min-h-screen">
        
        <div className="w-full max-w-[520px] bg-white border border-slate-100/80 rounded-[24px] shadow-2xl p-8 sm:p-10 my-auto">
          
          {/* Header */}
          <div className="text-center mb-7">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
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
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
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

          {/* Social Logins */}
          {view !== 'forgot' && (
            <div className="mt-6">
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">or continue with</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 mt-3">
                {/* Google */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center space-x-2 py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white font-semibold text-xs text-slate-700 shadow-xs"
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
                  className="flex items-center justify-center space-x-2 py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white font-semibold text-xs text-slate-700 shadow-xs"
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
                  className="flex items-center justify-center space-x-2 py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors bg-white font-semibold text-xs text-slate-700 shadow-xs"
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

          {/* Toggle Link */}
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

          {/* Active Status */}
          <div className="mt-5 pt-3.5 border-t border-slate-100 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-500">
              {isSupabaseConfigured ? 'Supabase Active' : 'Local Auth Engine Active'}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
