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
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react';
import InfrastructureMap from './InfrastructureMap';
import SettingsDataIngestion from './SettingsDataIngestion';
import { fetchAnalytics, runAgentAnalysis, fetchInfrastructure } from '../services/api';

const CITY_METRICS = {
  bengaluru: {
    name: "Bengaluru Metro Region Command Center",
    code: "BLR",
    total_complaints: 40,
    infra_at_risk: 7,
    budget_available_inr_cr: 20.44,
    citizens_impacted: 36950311,
    avg_resolution_time_days: 2.4
  },
  mumbai: {
    name: "Mumbai Metropolitan Area Command Center",
    code: "BOM",
    total_complaints: 58,
    infra_at_risk: 12,
    budget_available_inr_cr: 34.80,
    citizens_impacted: 21340000,
    avg_resolution_time_days: 1.8
  },
  delhi: {
    name: "Delhi National Capital Region Command Center",
    code: "DEL",
    total_complaints: 74,
    infra_at_risk: 15,
    budget_available_inr_cr: 42.10,
    citizens_impacted: 32940000,
    avg_resolution_time_days: 3.1
  }
};

export default function Overview({ onNavigate, onOpenInspection, selectedCity = "bengaluru" }) {
  const [activeSubTab, setActiveSubTab] = useState('dashboard'); // 'dashboard' or 'upload'
  const [analytics, setAnalytics] = useState(null);
  const [infraItems, setInfraItems] = useState([]);
  const [agentResult, setAgentResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeCityMetrics = CITY_METRICS[selectedCity] || CITY_METRICS.bengaluru;

  useEffect(() => {
    async function loadData() {
      try {
        const [anRes, infraRes] = await Promise.all([
          fetchAnalytics(),
          fetchInfrastructure()
        ]);
        setAnalytics(anRes);
        setInfraItems(infraRes.slice(0, 5));
      } catch (err) {
        setError(err.message || 'Failed to load live city overview data from backend server.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
    const interval = setInterval(loadData, 10000); // Live poll DB every 10 seconds
    return () => clearInterval(interval);
  }, [selectedCity]);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await runAgentAnalysis();
      setAgentResult(res);
    } catch (err) {
      alert(`Error running agent analysis: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const kpis = {
    total_complaints: selectedCity === 'bengaluru' && analytics?.kpis?.total_complaints ? analytics.kpis.total_complaints : activeCityMetrics.total_complaints,
    infra_at_risk: selectedCity === 'bengaluru' && analytics?.kpis?.infra_at_risk ? analytics.kpis.infra_at_risk : activeCityMetrics.infra_at_risk,
    budget_available_inr_cr: selectedCity === 'bengaluru' && analytics?.kpis?.budget_available_inr_cr ? analytics.kpis.budget_available_inr_cr : activeCityMetrics.budget_available_inr_cr,
    citizens_impacted: selectedCity === 'bengaluru' && analytics?.kpis?.citizens_impacted ? analytics.kpis.citizens_impacted : activeCityMetrics.citizens_impacted,
    avg_resolution_time_days: activeCityMetrics.avg_resolution_time_days
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
        risk_score: item.risk_score || roundRiskScore(item.failure_probability),
        citizens: item.population_affected?.toLocaleString() || '10,000',
        cost: item.repair_cost_inr ? `₹${item.repair_cost_inr} Cr` : '₹1.2 Cr',
        reason: `${item.name} in ${item.location} exhibits high risk criteria requiring priority allocation.`
      }));

  function roundRiskScore(prob) {
    if (!prob) return 50;
    return Math.round(prob * 100);
  }

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-600">Fetching Live Smart City Telemetry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      
      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{activeCityMetrics.name}</h1>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Network Active ({activeCityMetrics.code})
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time intelligence combining XGBoost risk models, live telemetry, and 6 autonomous AI agents.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setActiveSubTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'dashboard'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📊 Live Command Dashboard
            </button>
            <button
              onClick={() => setActiveSubTab('upload')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'upload'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📤 Data Ingestion & Upload
            </button>
          </div>

          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all shrink-0"
          >
            <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Running Agents...' : 'Run Agent Analysis'}</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'upload' ? (
        <SettingsDataIngestion />
      ) : (
        <>

      {/* KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Complaints</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <MessageSquareWarning className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.total_complaints.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Infra at Risk</span>
            <div className="p-2 rounded-lg bg-red-50 text-red-600">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.infra_at_risk}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Budget Available</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">₹{kpis.budget_available_inr_cr.toFixed(2)} Cr</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Citizens Impacted</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.citizens_impacted.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Avg Resolution</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-2">{kpis.avg_resolution_time_days} days</p>
        </div>
      </div>

      {/* TOP AI PRIORITIZATION RECOMMENDATIONS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Top Recommended Actions (XGBoost + RAG)</h2>
          </div>
          <button 
            onClick={() => onNavigate('agents')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Agent Recommendations</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topRecommendations.map((item) => (
            <div key={item.id} className="border border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-all bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-red-100 text-red-700 font-bold text-[10px] px-2 py-0.5 rounded-md">
                    Risk Score: {item.risk_score}%
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">{item.type}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.reason}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{item.cost}</span>
                <button
                  onClick={() => onOpenInspection && onOpenInspection(item.id || 'INF-RD-1024')}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <span>Inspect Asset</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP PREVIEW COMPONENT */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Live GIS Map Network</h2>
          <button
            onClick={() => onNavigate('map')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>Full Map View</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="h-[380px] rounded-xl overflow-hidden border border-slate-200">
          <InfrastructureMap />
        </div>
      </div>
      </>
      )}

    </div>
  );
}
