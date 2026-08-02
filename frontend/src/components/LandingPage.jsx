import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Bot, 
  Coins, 
  Users, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Activity,
  Play,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Building2,
  Calendar,
  Award,
  Zap,
  PieChart as PieIcon,
  BarChart3,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Database,
  BrainCircuit,
  FileCheck,
  Check
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

export default function LandingPage({ onExplore, onOpenAuth }) {
  const [selectedMonth, setSelectedMonth] = useState('July 2026');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1);
  const [showReasoningModal, setShowReasoningModal] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Budget Donut Chart Data
  const budgetDonutData = [
    { name: 'Roads & Infrastructure', value: 32, amount: '₹3.20 Cr', color: '#2563EB' },
    { name: 'Water Supply', value: 24, amount: '₹2.40 Cr', color: '#0284C7' },
    { name: 'Energy & Power', value: 21, amount: '₹2.10 Cr', color: '#F59E0B' },
    { name: 'Public Transport', value: 13, amount: '₹1.30 Cr', color: '#10B981' },
    { name: 'Others', value: 10, amount: '₹1.00 Cr', color: '#8B5CF6' }
  ];

  // Risk Trend Bar Chart Data
  const riskTrendData = [
    { level: 'Critical', count: 18, color: '#EF4444' },
    { level: 'High', count: 42, color: '#F97316' },
    { level: 'Medium', count: 54, color: '#F59E0B' },
    { level: 'Low', count: 38, color: '#10B981' }
  ];

  // Complaint Trend Data
  const complaintTrendData = [
    { month: 'Mar', total: 3400, resolved: 3100 },
    { month: 'Apr', total: 3800, resolved: 3450 },
    { month: 'May', total: 4200, resolved: 3800 },
    { month: 'Jun', total: 3900, resolved: 3600 },
    { month: 'Jul', total: 3200, resolved: 3050 }
  ];

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setActiveAgentIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < 6) {
        setActiveAgentIndex(step);
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setActiveAgentIndex(-1);
      }
    }, 700);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAFBFF] text-[#0F172A] min-h-screen font-sans antialiased selection:bg-blue-100 selection:text-blue-700">
      
      {/* ================================================== */}
      {/* 1. CINEMATIC FLOATING GLASSMORPHISM NAVBAR         */}
      {/* ================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-500 flex items-center justify-center text-white font-black text-xl shadow-lg ring-1 ring-white/20">
              C
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-extrabold text-white text-xl tracking-tight">CityMind</span>
              <span className="font-extrabold text-blue-400 text-xl tracking-tight">AI</span>
              <span className="bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-400/30 ml-1.5">
                ENTERPRISE
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-300">
            <button onClick={() => scrollToSection('dashboard-hero')} className="hover:text-blue-400 transition-colors">Product</button>
            <button onClick={() => scrollToSection('agents-section')} className="hover:text-blue-400 transition-colors">AI Agents</button>
            <button onClick={() => scrollToSection('fragmented-section')} className="hover:text-blue-400 transition-colors">Solutions</button>
            <button onClick={() => scrollToSection('decision-section')} className="hover:text-blue-400 transition-colors">Decision Intelligence</button>
            <button onClick={() => scrollToSection('why-section')} className="hover:text-blue-400 transition-colors">Why CityMind</button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenAuth}
              className="text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 transition-colors"
            >
              Login
            </button>
            <button
              onClick={onExplore}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all flex items-center gap-1.5 ring-1 ring-white/20"
            >
              <span>Request Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ================================================== */}
      {/* 2. HIGH-VISIBILITY HERO SECTION WITH VIDEO BG       */}
      {/* ================================================== */}
      <section id="dashboard-hero" className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-slate-950 pt-28 pb-16 px-4 sm:px-6">
        
        {/* Full-Screen Crisp Direct Background Video (No Static Image Poster) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-slate-950">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            className="w-full h-full object-cover scale-105 transition-transform duration-[30s] ease-out select-none transform-gpu filter brightness-110 contrast-105"
            onCanPlay={(e) => e.target.play()}
          >
            <source src="/hero_bg_video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Light 20% to 35% Transparent Gradient Overlay (Keeps Video Bright & Vibrant) */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none" 
          style={{
            background: 'linear-gradient(to bottom, rgba(10,15,30,0.20), rgba(10,15,30,0.35))'
          }} 
        />

        {/* Hero Content Inside Semi-Transparent Glass Container */}
        <div className="relative z-20 text-center max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0A0F1E]/25 backdrop-blur-[10px] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-blue-200 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-blue-300 animate-pulse" />
            <span>The Intelligence Layer for Future Smart Cities</span>
          </div>

          {/* Headline with Crisp Text Shadows */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Smarter Decisions.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-200 to-indigo-200">
              Stronger Cities.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-100 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            CityMind AI connects infrastructure, citizen data, budgets and policies — then uses machine learning and collaborating AI agents to determine what your city should fix next.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.5)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.7)] transition-all flex items-center justify-center gap-2.5 group ring-1 ring-white/30"
            >
              <span>Explore City Intelligence</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('agents-section')}
              className="w-full sm:w-auto bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center gap-2.5"
            >
              <Play className="w-4 h-4 text-blue-300 fill-blue-300" />
              <span>See How It Works</span>
            </button>
          </div>
        </div>

        {/* ================================================== */}
        {/* FULL-WIDTH CITY INTELLIGENCE DASHBOARD             */}
        {/* ================================================== */}
        <div className="relative z-20 mt-14 w-full max-w-[94%] mx-auto">
          <div className="bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left font-sans relative overflow-hidden ring-1 ring-slate-950/10">
            
            {/* Top Bar of Dashboard */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    City Intelligence at a Glance
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Real-time municipal decision intelligence command center</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Month Dropdown */}
                <div className="relative">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="July 2026">July 2026</option>
                    <option value="June 2026">June 2026</option>
                    <option value="May 2026">May 2026</option>
                  </select>
                </div>

                {/* Run City Analysis Button */}
                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                  <span>{isAnalyzing ? 'Running Agent Analysis...' : 'Run City Analysis'}</span>
                </button>
              </div>
            </div>

            {/* DASHBOARD ROW 1 — FIVE KPI CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {/* Card 1 */}
              <div className="bg-[#FAFBFF] border border-slate-200/70 rounded-2xl p-4 hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Complaints</span>
                  <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="text-2xl font-black text-slate-900">12,842</p>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3" /> ↑ 18.7%
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Across 28 municipal wards</p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#FAFBFF] border border-slate-200/70 rounded-2xl p-4 hover:border-red-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Infra at Risk</span>
                  <div className="p-1.5 rounded-lg bg-red-50 text-red-600">
                    <ShieldAlert className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="text-2xl font-black text-slate-900">152</p>
                  <span className="text-xs font-bold text-red-600 flex items-center gap-0.5 bg-red-50 px-1.5 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3" /> ↑ 12.4%
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1">18 Assets in critical phase</p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#FAFBFF] border border-slate-200/70 rounded-2xl p-4 hover:border-blue-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Budget Available</span>
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                    <Coins className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="text-2xl font-black text-slate-900">₹10.00 Cr</p>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    63% Total
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1">63% of total city budget</p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#FAFBFF] border border-slate-200/70 rounded-2xl p-4 hover:border-emerald-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Citizens Impacted</span>
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="text-2xl font-black text-slate-900">2.43 Lakh</p>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <TrendingUp className="w-3 h-3" /> ↑ 21.3%
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Direct public benefit reach</p>
              </div>

              {/* Card 5 */}
              <div className="bg-[#FAFBFF] border border-slate-200/70 rounded-2xl p-4 hover:border-indigo-300 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg. Resolution</span>
                  <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="text-2xl font-black text-slate-900">2.4 days</p>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded">
                    <TrendingDown className="w-3 h-3" /> ↓ 0.6 days
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Faster work order completion</p>
              </div>
            </div>

            {/* DASHBOARD ROW 2 — TOP RECOMMENDATION & BUDGET DONUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
              {/* Left 7 Columns: Top AI Recommendation */}
              <div className="lg:col-span-7 bg-[#FAFBFF] border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                        #1
                      </span>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Top AI Recommendation</h3>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        Critical Risk
                      </span>
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        High Impact
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-slate-900">Repair Road — MG Road Stretch</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    XGBoost models detected 87% structural failure probability on MG Road flyover. 482 citizen complaints logged blocking central emergency hospital corridor.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 font-semibold block">Citizens Impacted</span>
                      <strong className="text-sm font-black text-slate-900">25,000</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 font-semibold block">Estimated Cost</span>
                      <strong className="text-sm font-black text-blue-600">₹1.25 Cr</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200/80">
                      <span className="text-[10px] text-slate-400 font-semibold block">Risk Score</span>
                      <strong className="text-sm font-black text-red-600">87%</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Confidence: <strong className="text-emerald-600">94%</strong></span>
                  <button
                    onClick={() => setShowReasoningModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
                  >
                    <span>View AI Reasoning</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right 5 Columns: Budget Allocation Donut Chart */}
              <div className="lg:col-span-5 bg-[#FAFBFF] border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-300 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200/60 pb-3">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Budget Allocation</h3>
                    <span className="text-xs font-extrabold text-blue-600">₹10.00 Cr Total Budget</span>
                  </div>

                  <div className="h-44 relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={budgetDonutData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {budgetDonutData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(val, name, item) => [`${val}% (${item.payload.amount})`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-sm font-black text-slate-900">₹10.00 Cr</span>
                      <span className="text-[9px] text-slate-400 font-semibold">Total Allocated</span>
                    </div>
                  </div>
                </div>

                {/* Legend List */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-700 pt-2 border-t border-slate-200/60">
                  {budgetDonutData.map(b => (
                    <div key={b.name} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                      <span className="truncate text-slate-600">{b.name} — <strong className="text-slate-900">{b.value}%</strong></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* DASHBOARD ROW 3 — THREE ANALYTICS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Infrastructure Risk Breakdown */}
              <div className="bg-[#FAFBFF] border border-slate-200/80 rounded-2xl p-4 hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900">1. Infrastructure Risk</h4>
                  <span className="text-[10px] text-slate-400 font-semibold">152 Total</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-red-600 font-bold">
                    <span>Critical (&ge;85%)</span>
                    <span>18 Assets</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-[15%]" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-1">
                    <span>High Risk</span><span className="font-bold text-slate-900">42</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>Medium Risk</span><span className="font-bold text-slate-900">54</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>Low Operational</span><span className="font-bold text-slate-900">38</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Complaint Intelligence */}
              <div className="bg-[#FAFBFF] border border-slate-200/80 rounded-2xl p-4 hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900">2. Complaint Intelligence</h4>
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">91% Resolved</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600"><span>Total Volume</span><strong className="text-slate-900">12,842</strong></div>
                  <div className="flex justify-between text-slate-600"><span>Resolved Tickets</span><strong className="text-emerald-600">11,690</strong></div>
                  <div className="flex justify-between text-slate-600"><span>Active Open</span><strong className="text-amber-600">1,152</strong></div>
                  <div className="mt-2 text-[10px] text-slate-400 font-mono">Monthly trend: -12.4% volume spike</div>
                </div>
              </div>

              {/* Card 3: Citizen Impact */}
              <div className="bg-[#FAFBFF] border border-slate-200/80 rounded-2xl p-4 hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900">3. Citizen Impact</h4>
                  <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">ROI High</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600"><span>Citizens Affected</span><strong className="text-slate-900">2,43,000</strong></div>
                  <div className="flex justify-between text-slate-600"><span>Critical Facilities</span><strong className="text-blue-600">12 Hospitals/Schools</strong></div>
                  <div className="flex justify-between text-slate-600"><span>Est. Benefit Post Intervention</span><strong className="text-emerald-600">+74.5% Risk Reduction</strong></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 2 — THE CITY IS FRAGMENTED                */}
      {/* ================================================== */}
      <section id="fragmented-section" className="py-24 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
            The City Is Fragmented.
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto mt-3 font-medium">
            Critical information lives across disconnected systems. CityMind brings it together.
          </p>

          {/* 6 Elegant Fragmented Cards Grid */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              { title: "Citizen Complaints", desc: "12,842 Tickets", icon: Database },
              { title: "Roads & Infrastructure", desc: "GIS Assets", icon: ShieldAlert },
              { title: "Water Systems", desc: "Pipeline Networks", icon: Layers },
              { title: "Energy & Utilities", desc: "Grid Substations", icon: Zap },
              { title: "Public Transport", desc: "BRT & Metro Lines", icon: Building2 },
              { title: "Budget & Finance", desc: "Fiscal Allocations", icon: Coins }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAFBFF] border border-slate-200/80 rounded-2xl p-5 text-center hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Connection Lines into CITYMIND AI Central Node */}
          <div className="mt-10 flex flex-col items-center">
            <div className="w-0.5 h-10 bg-gradient-to-b from-slate-300 to-blue-600" />
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white rounded-3xl p-6 shadow-xl max-w-lg w-full text-center border border-blue-400/30">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-200">Unified Core</span>
              <h3 className="text-2xl font-black tracking-tight mt-1">CITYMIND AI</h3>
              <p className="text-xs font-semibold text-blue-100 mt-1">"One Platform. Intelligent Decisions."</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 3 — AI AGENTS                             */}
      {/* ================================================== */}
      <section id="agents-section" className="py-24 max-w-7xl mx-auto px-6 text-center">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Agentic Architecture
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
          AI Agents Working Together.
        </h2>
        <p className="text-base text-slate-600 max-w-2xl mx-auto mt-3 font-medium">
          Specialized agents analyze city data, reason over evidence, and collaborate to recommend the best action.
        </p>

        {/* 6 Connected Agent Cards Flow */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-4">
          {[
            {
              num: 1,
              name: "Complaint Agent",
              title: "Complaint Intelligence Agent",
              desc: "Understands citizen issues and detects recurring problem clusters.",
              icon: Database
            },
            {
              num: 2,
              name: "Risk Agent",
              title: "Infrastructure Risk Agent",
              desc: "Predicts infrastructure failure risk using ML models.",
              icon: ShieldAlert
            },
            {
              num: 3,
              name: "Budget Agent",
              title: "Budget Optimization Agent",
              desc: "Finds the best allocation of limited city resources.",
              icon: Coins
            },
            {
              num: 4,
              name: "Impact Agent",
              title: "Citizen Impact Agent",
              desc: "Calculates population and critical-service impact.",
              icon: Users
            },
            {
              num: 5,
              name: "Planning Agent",
              title: "Planning Agent",
              desc: "Creates optimal repair plans and schedules.",
              icon: Calendar
            },
            {
              num: 6,
              name: "Decision Agent",
              title: "Decision Agent",
              desc: "Combines all evidence and produces the final recommendation.",
              icon: Award
            }
          ].map((ag, idx) => {
            const Icon = ag.icon;
            const isActive = activeAgentIndex === idx;

            return (
              <div
                key={ag.num}
                className={`bg-white border rounded-2xl p-5 text-left flex flex-col justify-between transition-all ${
                  isActive
                    ? 'border-blue-600 ring-2 ring-blue-500/30 shadow-lg scale-105 bg-blue-50/30'
                    : 'border-slate-200/80 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center">
                      #{ag.num}
                    </span>
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xs font-black text-slate-900 leading-snug">{ag.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-medium">{ag.desc}</p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-blue-600">
                  <span>Step 0{ag.num}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Flow Arrow Pipeline */}
        <div className="mt-8 hidden md:flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
          <span>Complaint Agent</span>
          <ArrowRight className="w-4 h-4 text-blue-600" />
          <span>Risk Agent</span>
          <ArrowRight className="w-4 h-4 text-blue-600" />
          <span>Budget Agent</span>
          <ArrowRight className="w-4 h-4 text-blue-600" />
          <span>Impact Agent</span>
          <ArrowRight className="w-4 h-4 text-blue-600" />
          <span>Planning Agent</span>
          <ArrowRight className="w-4 h-4 text-blue-600" />
          <span className="text-blue-600 font-extrabold">Decision Agent</span>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 4 — THE AI DECISION                       */}
      {/* ================================================== */}
      <section id="decision-section" className="py-24 bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Decision Intelligence Output
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
              From Fragmented Data to One Clear Decision.
            </h2>
          </div>

          {/* Data Flow Pipeline Diagram */}
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-3 text-center text-xs font-bold">
            <div className="p-3 bg-[#FAFBFF] rounded-xl border border-slate-200 text-slate-700">INPUT: City Data</div>
            <div className="p-3 bg-[#FAFBFF] rounded-xl border border-slate-200 text-slate-700">ML Models</div>
            <div className="p-3 bg-[#FAFBFF] rounded-xl border border-slate-200 text-slate-700">AI Agents</div>
            <div className="p-3 bg-[#FAFBFF] rounded-xl border border-slate-200 text-slate-700">RAG / Policies</div>
            <div className="p-3 bg-blue-600 text-white rounded-xl col-span-2 md:col-span-1 shadow-sm">Decision Intelligence</div>
          </div>

          {/* Final Decision Showcase Card */}
          <div className="mt-10 max-w-4xl mx-auto bg-gradient-to-br from-[#FAFBFF] to-blue-50/50 border border-blue-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-blue-100 pb-4 mb-5">
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-blue-600" />
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">FINAL AI RECOMMENDATION</span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Repair MG Road Stretch First</h3>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200">
                94% Confidence
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Failure Risk</span>
                <p className="text-2xl font-black text-red-600 mt-0.5">87%</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Citizens Impacted</span>
                <p className="text-2xl font-black text-slate-900 mt-0.5">25,000</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Estimated Cost</span>
                <p className="text-2xl font-black text-blue-600 mt-0.5">₹1.25 Cr</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200/80">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Model Confidence</span>
                <p className="text-2xl font-black text-emerald-600 mt-0.5">94%</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed mb-6">
              <strong className="text-slate-900 font-extrabold block mb-1">AI Reasoning Summary:</strong>
              "High predicted infrastructure risk (87% structural degradation) combined with 482 repeated citizen complaints and access route to City General Hospital makes this the highest-priority municipal intervention."
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowReasoningModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>View Full Reasoning & Policy RAG</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* SECTION 5 — WHY CITYMIND                          */}
      {/* ================================================== */}
      <section id="why-section" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-3">
            Why CityMind AI?
          </h2>
          <p className="text-base text-slate-600 font-medium mt-2">Built specifically for smart city decision intelligence.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-7 hover:border-blue-400 hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">AI-Powered Insights</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Predict infrastructure risks using XGBoost machine learning models before catastrophic failures occur.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-7 hover:border-blue-400 hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Policy-Aware Decisions</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Use RAG vector search to ground every recommendation in official municipal road, water, and energy policy guidelines.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-7 hover:border-blue-400 hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Coins className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Budget Intelligence</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Optimize limited city resources using knapsack algorithms maximizing public risk reduction per rupee spent.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-7 hover:border-blue-400 hover:shadow-lg transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Real Impact Measurement</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Measure exact citizens, critical hospital services, and infrastructure corridors affected by each repair decision.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* FINAL CTA                                          */}
      {/* ================================================== */}
      <section className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-900 text-white py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="max-w-2xl text-center md:text-left space-y-4">
            <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">TRANSFORM MUNICIPAL DECISIONS</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              Give Your City an Intelligence Layer.
            </h2>
            <p className="text-base text-blue-100/90 font-medium">
              Connect your city's data. Let AI find what matters most.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button
                onClick={onExplore}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-xl transition-all"
              >
                Start Free Trial
              </button>
              <button
                onClick={onExplore}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-8 py-4 rounded-2xl border border-white/20 transition-colors"
              >
                Request Demo
              </button>
            </div>
          </div>

          {/* Futuristic Minimal City Graphic */}
          <div className="w-full md:w-96 h-64 bg-blue-500/10 border border-blue-400/20 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-md">
            <div className="flex justify-between text-xs text-blue-200 font-mono">
              <span>CITYMIND AI CORE</span>
              <span className="text-emerald-400">● LIVE</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-blue-400/30 rounded-full w-full" />
              <div className="h-2 bg-blue-400/40 rounded-full w-3/4" />
              <div className="h-2 bg-blue-400/20 rounded-full w-1/2" />
            </div>
            <div className="text-[11px] font-mono text-blue-300">
              Optimal Intervention: MG Road Corridor
            </div>
          </div>
        </div>
      </section>

      {/* RAG REASONING MODAL */}
      {showReasoningModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <BrainCircuit className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-black text-slate-900">AI Decision Reasoning & Policy Citation</h3>
              </div>
              <button onClick={() => setShowReasoningModal(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold">
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                <strong className="text-red-900 block font-bold">XGBoost Risk Score: 87%</strong>
                Structural degradation detected on cast iron support beams and bituminous pavement.
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                <strong className="text-blue-900 block font-bold">FAISS RAG Policy Citation:</strong>
                <p className="italic font-mono">
                  "Municipal Road Infrastructure Maintenance Policy 2024 (SECTION 4.2): Arterial corridors with daily traffic exceeding 25,000 PVUs yielding condition rating below 3.0 mandate emergency budget clearance within 7 days."
                </p>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <strong className="text-emerald-900 block font-bold">Citizen Reach: 25,000 Residents</strong>
                Protects central emergency hospital route and reduces congestion by 38%.
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setShowReasoningModal(false);
                  onExplore();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
              >
                Go to Live Command Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
