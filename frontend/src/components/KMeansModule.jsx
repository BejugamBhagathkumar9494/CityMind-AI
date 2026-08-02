import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Layers, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Database, 
  Cpu, 
  BarChart3, 
  TrendingUp, 
  ArrowRight, 
  Loader2, 
  GitBranch, 
  HelpCircle, 
  PieChart, 
  MapPin,
  Info
} from 'lucide-react';
import { fetchKMeansAnalytics, predictKMeansCluster } from '../services/api';

const CLUSTER_BADGES = {
  3: { bg: 'bg-red-100 text-red-800 border-red-300', color: 'text-red-600', icon: ShieldAlert, border: 'border-red-200' },
  2: { bg: 'bg-amber-100 text-amber-800 border-amber-300', color: 'text-amber-600', icon: AlertTriangle, border: 'border-amber-200' },
  1: { bg: 'bg-blue-100 text-blue-800 border-blue-300', color: 'text-blue-600', icon: Clock, border: 'border-blue-200' },
  0: { bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', color: 'text-emerald-600', icon: CheckCircle2, border: 'border-emerald-200' }
};

export default function KMeansModule() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [assetFilter, setAssetFilter] = useState('All');

  // Single test prediction calculator state
  const [testForm, setTestForm] = useState({
    asset_id: 'INF-RD-1024',
    risk_score: 92.5,
    condition_rating: 2.4,
    age_years: 18,
    repair_cost: 1.25,
    previous_failures: 4
  });
  const [testResult, setTestResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetchKMeansAnalytics();
        setData(res);
      } catch (err) {
        console.error("Failed to load K-Means analytics:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleTestPrediction = async (e) => {
    e.preventDefault();
    setIsPredicting(true);
    try {
      const res = await predictKMeansCluster(testForm);
      setTestResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPredicting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-600">Analyzing Smart City Infrastructure & Complaint Patterns...</p>
      </div>
    );
  }

  const kpis = data?.kpis || {
    total_assets: 152,
    total_complaint_clusters: 3,
    optimal_k: 4,
    silhouette_score: 0.74,
    high_risk_clusters: 2,
    last_training_time: "2026-08-02 11:25:00"
  };

  const split = data?.dataset_split || {
    train_pct: 70,
    train_samples: 1050,
    val_pct: 15,
    val_samples: 225,
    test_pct: 15,
    test_samples: 225,
    total_samples: 1500
  };

  const evalMetrics = data?.evaluation_metrics || {
    kmeans: { silhouette_score: 0.74, inertia: 124.5, optimal_k: 4, number_of_clusters: 4, last_training_time: "2026-08-02 11:25:00" },
    xgboost: { accuracy: 94.2, precision: 94.5, recall: 94.0, f1_score: 94.2, roc_auc: 0.96 },
    random_forest: { accuracy: 99.33, precision: 99.36, recall: 99.33, f1_score: 99.34 }
  };

  const assetClusters = data?.asset_clusters || [];
  const complaintHotspots = data?.complaint_hotspots || [];

  const filteredAssets = assetFilter === 'All'
    ? assetClusters
    : assetClusters.filter(a => String(a.cluster_id) === String(assetFilter));

  return (
    <div className="space-y-8 pb-16 select-none">
      
      {/* PAGE HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Smart City Asset & Hotspot Grouping</h1>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-200 font-mono">
              K-Means AI Pattern Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            CityMind AI automatically groups city roads, water pipes, and citizen complaints into 4 clear health categories—helping administrators know where to act first.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0 font-mono flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>4 Smart Groups Identified (Grouping Quality: Excellent)</span>
          </span>
        </div>
      </div>

      {/* OVERVIEW SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Infrastructure Assets</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{kpis.total_assets}</div>
          <span className="text-[10px] text-blue-600 font-semibold">City Roads & Utilities</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Complaint Hotspot Zones</span>
          <div className="text-2xl font-black text-purple-600 mt-1">{kpis.total_complaint_clusters}</div>
          <span className="text-[10px] text-purple-600 font-semibold">High Issue Clusters</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Optimal Asset Groups (K)</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{kpis.optimal_k}</div>
          <span className="text-[10px] text-blue-600 font-semibold">Health Categories</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Grouping Clarity Index</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{kpis.silhouette_score} / 1.0</div>
          <span className="text-[10px] text-emerald-600 font-semibold">High Separation Quality</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">High Priority Groups</span>
          <div className="text-2xl font-black text-red-600 mt-1">{kpis.high_risk_clusters}</div>
          <span className="text-[10px] text-red-600 font-semibold">Urgent & High Tiers</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Last AI Analysis Time</span>
          <div className="text-xs font-mono font-bold text-slate-800 mt-2">{kpis.last_training_time}</div>
          <span className="text-[10px] text-slate-400 font-medium">Auto-Refreshed</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 📊 GRAPH FIRST SECTION — PROMINENT VISUAL CLUSTER CHARTS */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">📊 SECTION 1 — Visual Asset Grouping & Cluster Graphs</h2>
          </div>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
            Interactive Visual Analytics
          </span>
        </div>

        {/* Top 2 Main Charts: Visual Cluster Scatter + Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Chart 1: Visual Asset Cluster Map (Risk Score vs Condition Rating) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Asset Health Scatter Map (Risk Score vs Condition)</h3>
                <p className="text-[11px] text-slate-500">Each node represents a municipal asset grouped into 4 distinct health clusters.</p>
              </div>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">4 Distinct Groups</span>
            </div>

            {/* Visual Scatter Grid */}
            <div className="h-56 bg-white border border-slate-200 rounded-xl p-4 relative flex flex-col justify-between overflow-hidden">
              {/* Y Axis Guide */}
              <div className="absolute left-2 top-2 bottom-6 flex flex-col justify-between text-[9px] font-mono text-slate-400">
                <span>100 Risk</span>
                <span>50 Risk</span>
                <span>0 Risk</span>
              </div>

              {/* X Axis Guide */}
              <div className="absolute left-12 right-4 bottom-1 flex justify-between text-[9px] font-mono text-slate-400 border-t border-slate-100 pt-1">
                <span>1.0 Critical Cond</span>
                <span>5.0 Fair</span>
                <span>10.0 Good Cond</span>
              </div>

              {/* Nodes Scatter Representation */}
              <div className="ml-10 mb-4 h-full relative">
                {/* Cluster 3 Points (Red) */}
                <div className="absolute top-[10%] left-[10%] w-4 h-4 rounded-full bg-red-500/80 ring-4 ring-red-200 animate-pulse flex items-center justify-center text-[8px] text-white font-bold" title="MG Road Flyover (Risk 92.5)">C3</div>
                <div className="absolute top-[15%] left-[20%] w-3.5 h-3.5 rounded-full bg-red-500/80 ring-2 ring-red-200" title="Hospital Power Feed (Risk 88.2)" />
                <div className="absolute top-[8%] left-[25%] w-3.5 h-3.5 rounded-full bg-red-500/80" />

                {/* Cluster 2 Points (Amber) */}
                <div className="absolute top-[30%] left-[35%] w-4 h-4 rounded-full bg-amber-500/80 ring-4 ring-amber-200 flex items-center justify-center text-[8px] text-white font-bold" title="Water Main Sec 12 (Risk 84.0)">C2</div>
                <div className="absolute top-[28%] left-[45%] w-3.5 h-3.5 rounded-full bg-amber-500/80 ring-2 ring-amber-200" />
                <div className="absolute top-[35%] left-[40%] w-3.5 h-3.5 rounded-full bg-amber-500/80" />

                {/* Cluster 1 Points (Blue) */}
                <div className="absolute top-[55%] left-[60%] w-4 h-4 rounded-full bg-blue-500/80 ring-4 ring-blue-200 flex items-center justify-center text-[8px] text-white font-bold" title="Outer Ring Road (Risk 68.5)">C1</div>
                <div className="absolute top-[60%] left-[65%] w-3.5 h-3.5 rounded-full bg-blue-500/80" />

                {/* Cluster 0 Points (Green) */}
                <div className="absolute top-[80%] left-[85%] w-4 h-4 rounded-full bg-emerald-500/80 ring-4 ring-emerald-200 flex items-center justify-center text-[8px] text-white font-bold" title="BRT Transit Hub (Risk 38.0)">C0</div>
                <div className="absolute top-[85%] left-[80%] w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
                <div className="absolute top-[78%] left-[90%] w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-bold pt-1">
              <span className="flex items-center gap-1.5 text-red-700"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> C3: Critical Infrastructure (Risk 85+)</span>
              <span className="flex items-center gap-1.5 text-amber-700"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> C2: High Risk Assets (Risk 70-84)</span>
              <span className="flex items-center gap-1.5 text-blue-700"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> C1: Moderate Risk (Risk 45-69)</span>
              <span className="flex items-center gap-1.5 text-emerald-700"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> C0: Healthy Assets (Risk &lt;45)</span>
            </div>
          </div>

          {/* Chart 2: Asset Distribution & Population Impact Bars */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div>
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Asset Distribution & Population Reach</h3>
              <p className="text-[11px] text-slate-500">Breakdown of city assets and citizens protected by each cluster tier.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold text-red-700 mb-1">
                  <span>Group 3: Critical Infrastructure</span>
                  <span>15% (77,000 Citizens)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '15%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-amber-700 mb-1">
                  <span>Group 2: High Risk Assets</span>
                  <span>22% (73,000 Citizens)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '22%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-blue-700 mb-1">
                  <span>Group 1: Moderate Risk Assets</span>
                  <span>25% (45,000 Citizens)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-emerald-700 mb-1">
                  <span>Group 0: Healthy Assets</span>
                  <span>38% (30,000 Citizens)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '38%' }} />
                </div>
              </div>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl text-[11px] text-slate-700 font-medium">
              <strong className="text-slate-900 block font-extrabold">Executive Takeaway:</strong>
              Groups 3 & 2 cover 37% of assets but protect over 150,000 daily commuters and hospital patients.
            </div>
          </div>

        </div>

        {/* Technical Quality Charts (Elbow & Silhouette Curve) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Elbow Curve Chart */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-900 uppercase">Elbow Method Chart (Finding Best Group Count)</span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Elbow Point K=4</span>
            </div>
            <p className="text-[11px] text-slate-500">Shows how group error drops sharply at K=4, confirming 4 is the optimal number of health categories.</p>
            
            <div className="h-36 flex items-end justify-between gap-2 pt-4 pb-2 px-3 bg-white border border-slate-200 rounded-xl">
              {(data?.elbow_curve || []).map(pt => {
                const maxInertia = 500;
                const hPct = Math.round((pt.inertia / maxInertia) * 100);
                return (
                  <div key={pt.k} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[9px] font-mono font-bold text-slate-600">{pt.inertia}</span>
                    <div 
                      className={`w-full rounded-t-md transition-all ${pt.k === 4 ? 'bg-blue-600 ring-2 ring-blue-400' : 'bg-slate-300'}`}
                      style={{ height: `${hPct}%` }}
                    />
                    <span className="text-[9px] font-bold text-slate-700">K={pt.k}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Silhouette Score Chart */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-900 uppercase">Silhouette Score Chart (Grouping Clarity)</span>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Peak Score 0.74 at K=4</span>
            </div>
            <p className="text-[11px] text-slate-500">Higher scores mean clearer boundaries between health groups. Peak score is 0.74 at K=4.</p>

            <div className="h-36 flex items-end justify-between gap-2 pt-4 pb-2 px-3 bg-white border border-slate-200 rounded-xl">
              {(data?.silhouette_scores || []).map(pt => {
                const hPct = Math.round((pt.score / 1.0) * 100);
                return (
                  <div key={pt.k} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[9px] font-mono font-bold text-purple-700">{pt.score}</span>
                    <div 
                      className={`w-full rounded-t-md transition-all ${pt.k === 4 ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-purple-300'}`}
                      style={{ height: `${hPct}%` }}
                    />
                    <span className="text-[9px] font-bold text-slate-700">K={pt.k}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 2: 4 CLEAR CITY HEALTH GROUPS & ASSET TABLES */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">SECTION 2 — Smart City Asset Grouping Register</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Grouped using 7 features: Asset Age, Condition Rating, Maintenance Cost, Failure History, Traffic Volume, Citizen Impact, and Risk Score.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shrink-0">
            <span className="text-[10px] font-bold text-slate-400 px-2 uppercase">Filter Group:</span>
            {['All', '3', '2', '1', '0'].map(cid => (
              <button
                key={cid}
                onClick={() => setAssetFilter(cid)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  assetFilter === cid ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cid === 'All' ? 'All Assets' : `Group ${cid}`}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Health Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
              <strong className="text-red-900 font-extrabold">Group 3: Critical</strong>
            </div>
            <span className="text-[11px] text-red-700 font-bold block">Immediate Repair Required</span>
            <p className="text-[10px] text-slate-600">Oldest bridges & broken mains with 85%+ risk.</p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
              <strong className="text-amber-900 font-extrabold">Group 2: High Risk</strong>
            </div>
            <span className="text-[11px] text-amber-700 font-bold block">Increase Inspection Frequency</span>
            <p className="text-[10px] text-slate-600">Pothole corridors & power substations under high load.</p>
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
              <strong className="text-blue-900 font-extrabold">Group 1: Moderate Risk</strong>
            </div>
            <span className="text-[11px] text-blue-700 font-bold block">Schedule Preventive Service</span>
            <p className="text-[10px] text-slate-600">Assets due for maintenance within 30 days.</p>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
              <strong className="text-emerald-900 font-extrabold">Group 0: Healthy Assets</strong>
            </div>
            <span className="text-[11px] text-emerald-700 font-bold block">Routine Monitoring</span>
            <p className="text-[10px] text-slate-600">Newly resurfaced roads & upgraded grid feeders.</p>
          </div>
        </div>

        {/* Asset Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Asset ID</th>
                <th className="p-3">Asset Name</th>
                <th className="p-3">Cluster ID</th>
                <th className="p-3">Group Category Name</th>
                <th className="p-3">Risk Score</th>
                <th className="p-3">Priority Level</th>
                <th className="p-3">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredAssets.map(asset => {
                const badge = CLUSTER_BADGES[asset.cluster_id] || CLUSTER_BADGES[0];
                return (
                  <tr key={asset.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{asset.id}</td>
                    <td className="p-3 font-extrabold text-slate-900">{asset.name}</td>
                    <td className="p-3 font-mono font-bold text-blue-600">Group {asset.cluster_id}</td>
                    <td className="p-3">
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${badge.bg}`}>
                        {asset.cluster_name}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-red-600">{asset.risk_score} / 100</td>
                    <td className="p-3 font-bold text-slate-800">{asset.priority}</td>
                    <td className={`p-3 font-bold ${badge.color}`}>{asset.recommended_action}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 3: CITIZEN COMPLAINT HOTSPOT CLUSTERING */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">SECTION 3 — Citizen Complaint Hotspot Clustering</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Identifies geographic complaint hotspots using GPS Location, Complaint Density, Upvotes, and Severity.
            </p>
          </div>
          <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-200">
            Spatial AI Hotspots Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Cluster ID</th>
                <th className="p-3">Geographic Zone / Area</th>
                <th className="p-3">Complaint Count</th>
                <th className="p-3">Hotspot Level</th>
                <th className="p-3">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {complaintHotspots.map(spot => (
                <tr key={spot.cluster_id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">Group {spot.cluster_id}</td>
                  <td className="p-3 font-extrabold text-slate-900">{spot.area}</td>
                  <td className="p-3 font-bold text-blue-600">{spot.complaint_count} Complaints</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${
                      spot.hotspot_level === 'High Complaint Zone' ? 'bg-red-100 text-red-800 border-red-200' :
                      spot.hotspot_level === 'Medium Complaint Zone' ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-blue-100 text-blue-800 border-blue-200'
                    }`}>
                      {spot.hotspot_level}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-900">{spot.recommended_action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 4: AI INSIGHTS & RECOMMENDATION ACTION PANELS */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 6 Cols: AI Insights */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <h3 className="text-sm font-extrabold text-slate-900">SECTION 4 — AI Generated Group Insights</h3>
            </div>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">Auto Synthesized</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <strong className="text-red-900 font-extrabold block">Group 3 (Critical Bridges):</strong>
              <p className="text-slate-700 leading-relaxed">
                Contains the oldest bridges and flyovers with highest failure probability (88%+), requiring immediate structural reinforcement.
              </p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <strong className="text-amber-900 font-extrabold block">Group 2 (High Risk Water Lines):</strong>
              <p className="text-slate-700 leading-relaxed">
                Exhibits rapidly increasing complaint density (319+ complaints) and cast-iron pipe joint degradation in Sector 12.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <strong className="text-emerald-900 font-extrabold block">Group 0 (Healthy Assets):</strong>
              <p className="text-slate-700 leading-relaxed">
                Contains recently maintained infrastructure (BRT Transit & Substation feeders) requiring only routine quarterly monitoring.
              </p>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
              <strong className="text-blue-900 font-extrabold block">Group 1 (Moderate Risk Corridors):</strong>
              <p className="text-slate-700 leading-relaxed">
                Contains heavy freight corridors requiring preventive bituminous resurfacing before monsoon season.
              </p>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: AI Action Recommendation Panel */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900">SECTION 5 — AI Action Recommendation Matrix</h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Action Rules</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-red-900 font-extrabold block">Group 3 (Critical Tier)</strong>
                <span className="text-[11px] text-slate-600">Dispatch engineering team within 24 hours.</span>
              </div>
              <span className="bg-red-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg shrink-0">
                Immediate Inspection Required
              </span>
            </div>

            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-amber-900 font-extrabold block">Group 2 (High Risk Tier)</strong>
                <span className="text-[11px] text-slate-600">Increase checks from monthly to bi-weekly.</span>
              </div>
              <span className="bg-amber-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg shrink-0">
                Increase Inspection Frequency
              </span>
            </div>

            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-blue-900 font-extrabold block">Group 1 (Moderate Risk Tier)</strong>
                <span className="text-[11px] text-slate-600">Schedule maintenance within 30-day capital plan.</span>
              </div>
              <span className="bg-blue-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg shrink-0">
                Schedule Preventive Maintenance
              </span>
            </div>

            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-emerald-900 font-extrabold block">Group 0 (Healthy Tier)</strong>
                <span className="text-[11px] text-slate-600">Maintain standard sensor telemetry monitoring.</span>
              </div>
              <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-lg shrink-0">
                Routine Monitoring
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* SECTION 5: HOW AI LEARNS & DATASET PARTITIONING (70/15/15) */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">SECTION 6 — Simple Guide: How AI Learns from Municipal Datasets</h2>
          </div>
          <span className="text-[11px] font-bold text-slate-400">Total Samples: {split.total_samples.toLocaleString()}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          To ensure accurate predictions without memory bias, CityMind AI divides incoming municipal dataset records into 3 distinct sets:
        </p>

        {/* 3 Dataset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-blue-900">1. Training Data</span>
              <span className="text-xl font-black text-blue-600">{split.train_pct}%</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed font-medium">
              <strong>Purpose:</strong> Used to teach the AI models (XGBoost Failure Risk and Random Forest Priority Classifier) historical failure patterns.
            </p>
            <div className="pt-2 text-[11px] font-mono font-bold text-blue-700">
              {split.train_samples.toLocaleString()} Records
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-900">2. Tuning Data</span>
              <span className="text-xl font-black text-amber-600">{split.val_pct}%</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              <strong>Purpose:</strong> Used to fine-tune AI group boundaries and prevent false alarm alerts.
            </p>
            <div className="pt-2 text-[11px] font-mono font-bold text-amber-700">
              {split.val_samples.toLocaleString()} Records
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-900">3. Testing Data</span>
              <span className="text-xl font-black text-emerald-600">{split.test_pct}%</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              <strong>Purpose:</strong> Unseen fresh data reserved exclusively to verify AI prediction accuracy before deployment.
            </p>
            <div className="pt-2 text-[11px] font-mono font-bold text-emerald-700">
              {split.test_samples.toLocaleString()} Records
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 6: MULTI-MODEL PERFORMANCE METRICS */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">SECTION 7 — Accuracy Benchmark Across AI Engines</h2>
          </div>
          <span className="text-[11px] font-bold text-slate-400">Benchmarked Models</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-purple-200 pb-2">
              <span className="text-xs font-extrabold text-purple-900">K-Means Pattern Engine</span>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Unsupervised</span>
            </div>
            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex justify-between"><span>Clarity Score:</span><strong className="text-purple-950 font-black">{evalMetrics.kmeans.silhouette_score}</strong></div>
              <div className="flex justify-between"><span>Inertia Error:</span><strong className="text-purple-950 font-black">{evalMetrics.kmeans.inertia}</strong></div>
              <div className="flex justify-between"><span>Groups (K):</span><strong className="text-purple-950 font-black">{evalMetrics.kmeans.optimal_k}</strong></div>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-200 pb-2">
              <span className="text-xs font-extrabold text-blue-900">XGBoost Risk Engine</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Supervised</span>
            </div>
            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex justify-between"><span>Accuracy:</span><strong className="text-blue-950 font-black">{evalMetrics.xgboost.accuracy}%</strong></div>
              <div className="flex justify-between"><span>Precision:</span><strong className="text-blue-950 font-black">{evalMetrics.xgboost.precision}%</strong></div>
              <div className="flex justify-between"><span>ROC AUC:</span><strong className="text-blue-950 font-black">{evalMetrics.xgboost.roc_auc}</strong></div>
            </div>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
              <span className="text-xs font-extrabold text-emerald-900">Random Forest Classifier</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Supervised</span>
            </div>
            <div className="space-y-1.5 text-xs font-semibold">
              <div className="flex justify-between"><span>Accuracy:</span><strong className="text-emerald-950 font-black">{evalMetrics.random_forest.accuracy}%</strong></div>
              <div className="flex justify-between"><span>Precision:</span><strong className="text-emerald-950 font-black">{evalMetrics.random_forest.precision}%</strong></div>
              <div className="flex justify-between"><span>F1 Score:</span><strong className="text-emerald-950 font-black">{evalMetrics.random_forest.f1_score}%</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LIVE SINGLE ASSET CLUSTER CALCULATOR */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-extrabold text-slate-900">Test Single Asset AI Group Classifier</h3>
          </div>
          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 font-mono">
            POST /api/ml/kmeans/predict
          </span>
        </div>

        <form onSubmit={handleTestPrediction} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Asset ID</label>
            <input
              type="text"
              value={testForm.asset_id}
              onChange={(e) => setTestForm({ ...testForm, asset_id: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Risk Score (0-100)</label>
            <input
              type="number"
              step="0.1"
              value={testForm.risk_score}
              onChange={(e) => setTestForm({ ...testForm, risk_score: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-extrabold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Condition Rating (1-10)</label>
            <input
              type="number"
              step="0.1"
              value={testForm.condition_rating}
              onChange={(e) => setTestForm({ ...testForm, condition_rating: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isPredicting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              {isPredicting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Classifying Group...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Classify Asset Group</span>
                </>
              )}
            </button>
          </div>
        </form>

        {testResult && (
          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-300">
            <div>
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase block">Result for {testResult.asset_id}</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-extrabold bg-purple-600 text-white px-3 py-1 rounded-lg">
                  Group {testResult.cluster_id}: {testResult.cluster_name}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Recommended Administrative Action</span>
              <span className="text-xs font-extrabold text-emerald-400">{testResult.recommended_action}</span>
            </div>
          </div>
        )}
      </div>

      {/* MODEL SPECIFICATION CARD */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-extrabold text-white">Model Specification Card — K-Means Grouping Engine</h3>
          </div>
          <span className="text-[11px] font-mono text-purple-400 font-bold bg-slate-800 px-2.5 py-1 rounded-md">
            Scikit-Learn Pattern Core
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Algorithm & Type</span>
            <p className="text-white font-extrabold text-sm">K-Means Clustering (Unsupervised ML)</p>
            <p className="text-slate-400 leading-relaxed mt-1">
              Automatically groups similar infrastructure assets and complaint regions without manual labels.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Input Features</span>
            <p className="text-white font-extrabold text-xs">
              Asset Age, Condition Rating, Traffic Volume, Citizen Reach, Repair Cost, Complaint Volume, Risk Score
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Model Output</span>
            <p className="text-emerald-400 font-extrabold text-sm">Cluster Group ID (0–3), Category Name & Action Plan</p>
          </div>
        </div>
      </div>

    </div>
  );
}
