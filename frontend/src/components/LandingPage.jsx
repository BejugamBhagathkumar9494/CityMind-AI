import React from 'react';
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
  Play
} from 'lucide-react';

export default function LandingPage({ onExplore, onOpenAuth }) {
  return (
    <div className="bg-[#F8FAFC] text-slate-900 min-h-screen font-sans selection:bg-blue-100 selection:text-blue-700">
      {/* Navigation Header */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-200/60 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            C
          </div>
          <div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">CityMind AI</span>
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Smart City Intelligence</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenAuth}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-2"
          >
            Sign In
          </button>
          <button
            onClick={onExplore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-700 mb-6 shadow-xs">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>The Intelligence Layer for Future Smart Cities</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Turn fragmented city data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">intelligent infrastructure decisions</span>.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
          CityMind AI connects roads, water networks, power grids, citizen complaints, and municipal budgets using XGBoost ML, FAISS RAG, and Autonomous AI Agents.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-7 py-4 rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Explore City Intelligence</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExplore}
            className="w-full sm:w-auto bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 font-bold text-sm px-7 py-4 rounded-2xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
            <span>View 3-Min AI Analysis</span>
          </button>
        </div>

        {/* Dashboard Preview Frame Mockup */}
        <div className="mt-14 max-w-5xl mx-auto bg-white border border-slate-200/80 rounded-2xl p-3 shadow-2xl">
          <div className="bg-slate-100 rounded-xl p-2 flex items-center gap-2 mb-2">
            <div className="flex gap-1.5 ml-2">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[11px] font-mono text-slate-400 mx-auto">citymind.ai/dashboard/overview</span>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/60 text-left space-y-4">
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200"><span className="text-[10px] text-slate-400">Total Complaints</span><p className="font-extrabold text-lg">12,842</p></div>
              <div className="p-3 bg-white rounded-xl border border-slate-200"><span className="text-[10px] text-slate-400">Infra at Risk</span><p className="font-extrabold text-lg text-red-600">152 Assets</p></div>
              <div className="p-3 bg-white rounded-xl border border-slate-200"><span className="text-[10px] text-slate-400">Budget Available</span><p className="font-extrabold text-lg text-blue-600">₹10.00 Cr</p></div>
              <div className="p-3 bg-white rounded-xl border border-slate-200"><span className="text-[10px] text-slate-400">Citizens Reach</span><p className="font-extrabold text-lg text-emerald-600">2.43 Lakh</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">The Core Problem</span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Fragmented city systems create slow and reactive decisions.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Municipal authorities manage roads, water supply, power grids, citizen complaints, and public transportation in isolated silos. When infrastructure fails, decisions are made blindly based on squeaky wheels rather than data-driven population impact.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">The CityMind Solution</span>
            <h3 className="text-lg font-bold text-slate-900">Unified Decision Intelligence Platform</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 pt-2">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Infrastructure Sensors</div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Citizen Complaints</div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Municipal Budgets</div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> RAG Policy Guidelines</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI INTELLIGENCE PIPELINE */}
      <section className="py-20 max-w-7xl mx-auto px-6 text-center">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">AI Intelligence Flow</span>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
          From Fragmented Data to Policy-Backed Action
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-card">
            <span className="text-xs font-mono font-bold text-blue-600 block mb-2">STEP 1</span>
            <h3 className="font-bold text-slate-900 text-sm">Data Connectors</h3>
            <p className="text-xs text-slate-500 mt-1">Ingests GIS maps, complaints, budgets, and hospital locations.</p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-card">
            <span className="text-xs font-mono font-bold text-blue-600 block mb-2">STEP 2</span>
            <h3 className="font-bold text-slate-900 text-sm">XGBoost ML Models</h3>
            <p className="text-xs text-slate-500 mt-1">Predicts asset degradation & failure probability scores.</p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-card">
            <span className="text-xs font-mono font-bold text-blue-600 block mb-2">STEP 3</span>
            <h3 className="font-bold text-slate-900 text-sm">6 Autonomous AI Agents</h3>
            <p className="text-xs text-slate-500 mt-1">LangGraph agents coordinate budget optimization & planning.</p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-card">
            <span className="text-xs font-mono font-bold text-blue-600 block mb-2">STEP 4</span>
            <h3 className="font-bold text-slate-900 text-sm">RAG Policy Evidence</h3>
            <p className="text-xs text-slate-500 mt-1">FAISS vector store cites exact municipal maintenance guidelines.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-900 text-white py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Transform your city's decisions with AI.</h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mt-4">
          Experience the complete hackathon-ready intelligence layer today.
        </p>
        <button
          onClick={onExplore}
          className="mt-8 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-lg transition-all"
        >
          Launch CityMind Command Center
        </button>
      </section>
    </div>
  );
}
