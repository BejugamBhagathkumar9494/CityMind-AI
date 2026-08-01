import React, { useState, useEffect } from 'react';
import { 
  MessageSquareWarning, 
  ShieldAlert, 
  Coins, 
  Users, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  AlertTriangle, 
  ArrowUpRight,
  TrendingDown,
  CheckCircle2,
  FileText
} from 'lucide-react';
import InfrastructureMap from './InfrastructureMap';
import { fetchAnalytics, runAgentAnalysis, fetchInfrastructure } from '../services/api';

export default function Overview({ onNavigate, onOpenInspection }) {
  const [analytics, setAnalytics] = useState(null);
  const [infraItems, setInfraItems] = useState([]);
  const [agentResult, setAgentResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetchAnalytics().then(res => setAnalytics(res)).catch(() => {});
    fetchInfrastructure().then(data => setInfraItems(data.slice(0, 3))).catch(() => {});
  }, []);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    const res = await runAgentAnalysis();
    setAgentResult(res);
    setIsAnalyzing(false);
  };

  const kpis = analytics?.kpis || {
    total_complaints: 0,
    infra_at_risk: 0,
    budget_available_inr_cr: 10.00,
    citizens_impacted: 0,
    avg_resolution_time_days: 2.4
  };

  const topRecommendations = agentResult?.summary?.top_recommendation 
    ? [{
        rank: 1,
        id: agentResult.summary.top_recommendation.asset_id,
        title: agentResult.summary.top_recommendation.title,
        type: agentResult.summary.top_recommendation.type,
        risk_score: agentResult.summary.top_recommendation.risk_score,
        citizens: agentResult.summary.top_recommendation.citizens_impacted?.toLocaleString() || '10,000',
        cost: agentResult.summary.top_recommendation.estimated_cost_inr,
        reason: agentResult.summary.top_recommendation.reasoning
      }]
    : infraItems.map((item, idx) => ({
        rank: idx + 1,
        id: item.id,
        title: `${item.recommended_action || 'Repair'} — ${item.name}`,
        type: item.type,
        risk_score: item.risk_score,
        citizens: item.population_affected?.toLocaleString() || '10,000',
        cost: `₹${item.repair_cost_inr} Cr`,
        reason: `${item.name} in ${item.location} exhibits ${item.risk_score}% risk score with ${item.complaints_count || 0} citizen complaints.`
      }));

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Bengaluru Smart City Command Center</h1>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-200">
              Live Network Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time intelligence combining 12,842 complaints, XGBoost risk models, and 6 autonomous AI agents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Executing Agent Workflow...' : 'Run City Analysis'}</span>
          </button>
        </div>
      </div>

      {/* KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Complaints</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <MessageSquareWarning className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.total_complaints.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>12% from last week</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Infra at Risk</span>
            <div className="p-2 rounded-lg bg-red-50 text-red-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.infra_at_risk}</p>
          <div className="flex items-center gap-1 text-[11px] text-red-600 font-semibold mt-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>18 Critical Assets</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Budget Available</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">₹{kpis.budget_available_inr_cr.toFixed(2)} Cr</p>
          <div className="flex items-center gap-1 text-[11px] text-blue-600 font-semibold mt-1">
            <span>FY 2026-27 Allocation</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Citizens Impacted</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{(kpis.citizens_impacted / 100000).toFixed(2)} Lakh</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>84% Reach Protected</span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Avg Resolution</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.avg_resolution_time_days} days</p>
          <div className="flex items-center gap-1 text-[11px] text-purple-600 font-semibold mt-1">
            <span>-0.8 days vs benchmark</span>
          </div>
        </div>
      </div>

      {/* MAP & AI RECOMMENDATIONS SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Interactive Map Preview */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">City Infrastructure Risk Map</h2>
              <p className="text-xs text-slate-500">GIS geographic view color-coded by failure probability score.</p>
            </div>
            <button
              onClick={() => onNavigate('infrastructure')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Full Map View</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-[380px] rounded-xl overflow-hidden border border-slate-200 relative">
            <InfrastructureMap height="380px" onSelectAsset={onOpenInspection} />
          </div>
        </div>

        {/* Right 5 Columns: Top AI Recommendations */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Top AI Recommendations</h2>
              </div>
              <button
                onClick={() => onNavigate('agents')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Agent Workflow</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {topRecommendations.map((rec) => (
                <div
                  key={rec.rank}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all bg-slate-50/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                        #{rec.rank}
                      </span>
                      <h3 className="text-xs font-bold text-slate-900">{rec.title}</h3>
                    </div>
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Risk {rec.risk_score}%
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-1.5 leading-snug">{rec.reason}</p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Reach: <strong className="text-slate-800">{rec.citizens}</strong></span>
                    <span>Cost: <strong className="text-slate-800">{rec.cost}</strong></span>
                    <button
                      onClick={() => onNavigate('documents')}
                      className="text-blue-600 font-semibold hover:underline flex items-center gap-0.5"
                    >
                      <span>Why? (RAG)</span>
                      <FileText className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Powered by Decision Agent & FAISS Policy RAG</span>
            <button
              onClick={() => onNavigate('budget')}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              Optimize Budget (₹10 Cr)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
