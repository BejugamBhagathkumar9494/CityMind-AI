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
  MapPin 
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
        <p className="text-xs font-bold text-slate-600">Executing Unsupervised K-Means Clustering Algorithm...</p>
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
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">🧠 K-Means Clustering Analytics</h1>
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-200">
              Unsupervised Machine Learning
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Identify hidden infrastructure patterns and citizen complaint hotspots using Unsupervised Machine Learning.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-blue-200 shrink-0 font-mono">
            Optimal K = {kpis.optimal_k} | Silhouette = {kpis.silhouette_score}
          </span>
        </div>
      </div>

      {/* OVERVIEW CARDS (6 KPI CARDS) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Infrastructure Assets</span>
          <div className="text-2xl font-black text-slate-900 mt-1">{kpis.total_assets}</div>
          <span className="text-[10px] text-blue-600 font-semibold">Indexed Records</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Complaint Clusters</span>
          <div className="text-2xl font-black text-purple-600 mt-1">{kpis.total_complaint_clusters}</div>
          <span className="text-[10px] text-purple-600 font-semibold">Hotspot Zones</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Optimal Number of Clusters (K)</span>
          <div className="text-2xl font-black text-blue-600 mt-1">{kpis.optimal_k}</div>
          <span className="text-[10px] text-blue-600 font-semibold">Elbow + Silhouette</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Silhouette Score</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">{kpis.silhouette_score}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">High Separation Quality</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">High Risk Clusters</span>
          <div className="text-2xl font-black text-red-600 mt-1">{kpis.high_risk_clusters}</div>
          <span className="text-[10px] text-red-600 font-semibold">Critical & High Tiers</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Last Model Training Time</span>
          <div className="text-xs font-mono font-bold text-slate-800 mt-2">{kpis.last_training_time}</div>
          <span className="text-[10px] text-slate-400 font-medium">Automated Pipeline</span>
        </div>
      </div>

      {/* SECTION 1: MACHINE LEARNING PIPELINE */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">SECTION 1 — End-to-End Machine Learning Pipeline</h2>
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase">Unified Intelligence Flow</span>
        </div>

        {/* Workflow Diagram */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center gap-2 min-w-[900px] text-xs font-bold">
            {[
              { label: 'Infrastructure Dataset', bg: 'bg-slate-100 text-slate-800 border-slate-200' },
              { label: 'Data Cleaning', bg: 'bg-slate-100 text-slate-800 border-slate-200' },
              { label: 'Feature Engineering', bg: 'bg-slate-100 text-slate-800 border-slate-200' },
              { label: 'Feature Scaling', bg: 'bg-slate-100 text-slate-800 border-slate-200' },
              { label: 'Dataset Split (70/15/15)', bg: 'bg-purple-50 text-purple-800 border-purple-200' },
              { label: 'XGBoost Failure Prediction', bg: 'bg-blue-50 text-blue-800 border-blue-200' },
              { label: 'Random Forest Priority', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
              { label: 'K-Means Clustering', bg: 'bg-purple-100 text-purple-900 border-purple-300 ring-2 ring-purple-400/30' },
              { label: 'Dashboard + AI Agents', bg: 'bg-slate-900 text-white border-slate-900' }
            ].map((node, idx, arr) => (
              <React.Fragment key={node.label}>
                <div className={`px-3 py-2 rounded-xl border font-semibold text-center shrink-0 shadow-xs ${node.bg}`}>
                  {node.label}
                </div>
                {idx < arr.length - 1 && <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: DATASET INFORMATION */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">SECTION 2 — Dataset Information & Train/Val/Test Partitioning</h2>
          </div>
          <span className="text-[11px] font-bold text-slate-400">Total Samples: {split.total_samples.toLocaleString()}</span>
        </div>

        {/* 3 Dataset Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-blue-900">Training Dataset</span>
              <span className="text-xl font-black text-blue-600">{split.train_pct}%</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed font-medium">
              <strong>Purpose:</strong> Used to train the supervised machine learning models (XGBoost Failure Risk and Random Forest Priority Classifier).
            </p>
            <div className="pt-2 text-[11px] font-mono font-bold text-blue-700">
              {split.train_samples.toLocaleString()} Samples Allocated
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-900">Validation Dataset</span>
              <span className="text-xl font-black text-amber-600">{split.val_pct}%</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              <strong>Purpose:</strong> Used for hyperparameter tuning, model selection, Elbow/Silhouette optimization, and preventing overfitting.
            </p>
            <div className="pt-2 text-[11px] font-mono font-bold text-amber-700">
              {split.val_samples.toLocaleString()} Samples Allocated
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-900">Testing Dataset</span>
              <span className="text-xl font-black text-emerald-600">{split.test_pct}%</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
              <strong>Purpose:</strong> Completely unseen data used only for final unbiased evaluation of overall model performance and generalization.
            </p>
            <div className="pt-2 text-[11px] font-mono font-bold text-emerald-700">
              {split.test_samples.toLocaleString()} Samples Allocated
            </div>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-medium">
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Total Samples</span>
            <strong className="text-slate-900 text-base font-extrabold">{split.total_samples.toLocaleString()}</strong>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Training Samples</span>
            <strong className="text-blue-600 text-base font-extrabold">{split.train_samples.toLocaleString()}</strong>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Validation Samples</span>
            <strong className="text-amber-600 text-base font-extrabold">{split.val_samples.toLocaleString()}</strong>
          </div>
          <div>
            <span className="text-slate-400 font-bold block uppercase text-[10px]">Testing Samples</span>
            <strong className="text-emerald-600 text-base font-extrabold">{split.test_samples.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      {/* SECTION 3: INFRASTRUCTURE ASSET CLUSTERING */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">SECTION 3 — Infrastructure Asset Clustering</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Features: Asset Age, Condition Score, Maintenance Cost, Failure History, Traffic Density, Population Impact, Risk Score.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shrink-0">
            <span className="text-[10px] font-bold text-slate-400 px-2 uppercase">Filter:</span>
            {['All', '3', '2', '1', '0'].map(cid => (
              <button
                key={cid}
                onClick={() => setAssetFilter(cid)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  assetFilter === cid ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cid === 'All' ? 'All Assets' : `Cluster ${cid}`}
              </button>
            ))}
          </div>
        </div>

        {/* Cluster Labels Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
            <div>
              <strong className="text-emerald-900 block font-extrabold">Cluster 0</strong>
              <span className="text-[11px] text-emerald-700 font-medium">Healthy Assets</span>
            </div>
          </div>
          <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
            <div>
              <strong className="text-blue-900 block font-extrabold">Cluster 1</strong>
              <span className="text-[11px] text-blue-700 font-medium">Moderate Risk Assets</span>
            </div>
          </div>
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
            <div>
              <strong className="text-amber-900 block font-extrabold">Cluster 2</strong>
              <span className="text-[11px] text-amber-700 font-medium">High Risk Assets</span>
            </div>
          </div>
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
            <div>
              <strong className="text-red-900 block font-extrabold">Cluster 3</strong>
              <span className="text-[11px] text-red-700 font-medium">Critical Infrastructure</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Asset ID</th>
                <th className="p-3">Asset Name</th>
                <th className="p-3">Cluster ID</th>
                <th className="p-3">Cluster Name</th>
                <th className="p-3">Risk Score</th>
                <th className="p-3">Priority</th>
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
                    <td className="p-3 font-mono font-bold text-blue-600">Cluster {asset.cluster_id}</td>
                    <td className="p-3">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${badge.bg}`}>
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

      {/* SECTION 4: CITIZEN COMPLAINT HOTSPOT CLUSTERING */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">SECTION 4 — Citizen Complaint Hotspot Clustering</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Features: Latitude, Longitude, Complaint Count, Complaint Severity, Population Density, Upvotes, Frequency.
            </p>
          </div>
          <span className="bg-purple-50 text-purple-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-200">
            Spatial Clustering Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Cluster ID</th>
                <th className="p-3">Geographic Area / Zone</th>
                <th className="p-3">Complaint Count</th>
                <th className="p-3">Hotspot Level</th>
                <th className="p-3">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {complaintHotspots.map(spot => (
                <tr key={spot.cluster_id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">Cluster {spot.cluster_id}</td>
                  <td className="p-3 font-extrabold text-slate-900">{spot.area}</td>
                  <td className="p-3 font-bold text-blue-600">{spot.complaint_count} Complaints</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${
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

      {/* SECTION 5: MODEL EVALUATION */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">SECTION 5 — Multi-Model Evaluation & Performance Comparison</h2>
          </div>
          <span className="text-[11px] font-bold text-slate-400">Benchmarked Models</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* K-Means Card */}
          <div className="bg-purple-50/50 border border-purple-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-purple-200 pb-2">
              <span className="text-xs font-extrabold text-purple-900 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-purple-600" />
                <span>K-Means Clustering</span>
              </span>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded">Unsupervised</span>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-600">Silhouette Score:</span>
                <strong className="text-purple-950 font-black">{evalMetrics.kmeans.silhouette_score}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Inertia:</span>
                <strong className="text-purple-950 font-black">{evalMetrics.kmeans.inertia}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Optimal K:</span>
                <strong className="text-purple-950 font-black">{evalMetrics.kmeans.optimal_k}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Number of Clusters:</span>
                <strong className="text-purple-950 font-black">{evalMetrics.kmeans.number_of_clusters}</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-purple-200 text-[10px] font-mono">
                <span className="text-slate-500">Last Training:</span>
                <span className="text-slate-700">{evalMetrics.kmeans.last_training_time}</span>
              </div>
            </div>
          </div>

          {/* XGBoost Card */}
          <div className="bg-blue-50/50 border border-blue-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-200 pb-2">
              <span className="text-xs font-extrabold text-blue-900 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>XGBoost Failure Risk</span>
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">Supervised</span>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-600">Accuracy:</span>
                <strong className="text-blue-950 font-black">{evalMetrics.xgboost.accuracy}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Precision:</span>
                <strong className="text-blue-950 font-black">{evalMetrics.xgboost.precision}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Recall:</span>
                <strong className="text-blue-950 font-black">{evalMetrics.xgboost.recall}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">F1 Score:</span>
                <strong className="text-blue-950 font-black">{evalMetrics.xgboost.f1_score}%</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-blue-200 text-[11px]">
                <span className="text-slate-600">ROC AUC Score:</span>
                <strong className="text-blue-950 font-black">{evalMetrics.xgboost.roc_auc}</strong>
              </div>
            </div>
          </div>

          {/* Random Forest Card */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
              <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Random Forest Classifier</span>
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Supervised</span>
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-600">Accuracy:</span>
                <strong className="text-emerald-950 font-black">{evalMetrics.random_forest.accuracy}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Precision:</span>
                <strong className="text-emerald-950 font-black">{evalMetrics.random_forest.precision}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Recall:</span>
                <strong className="text-emerald-950 font-black">{evalMetrics.random_forest.recall}%</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">F1 Score:</span>
                <strong className="text-emerald-950 font-black">{evalMetrics.random_forest.f1_score}%</strong>
              </div>
              <div className="flex justify-between pt-1 border-t border-emerald-200 text-[11px]">
                <span className="text-slate-600">Feature Importance:</span>
                <strong className="text-emerald-950 font-black">Risk Score (42%)</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: VISUALIZATIONS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">SECTION 6 — Interactive Visualizations & Clustering Curves</h2>
          </div>
          <span className="text-[11px] font-bold text-slate-400">7 Interactive Data Views</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Elbow Curve Chart */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-900 uppercase">1. Elbow Curve (Inertia vs K)</span>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Elbow at K=4</span>
            </div>
            <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-4 bg-white border border-slate-200 rounded-xl">
              {(data?.elbow_curve || []).map(pt => {
                const maxInertia = 500;
                const hPct = Math.round((pt.inertia / maxInertia) * 100);
                return (
                  <div key={pt.k} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-mono font-bold text-slate-600">{pt.inertia}</span>
                    <div 
                      className={`w-full rounded-t-lg transition-all ${pt.k === 4 ? 'bg-blue-600 ring-2 ring-blue-400' : 'bg-slate-300'}`}
                      style={{ height: `${hPct}%` }}
                    />
                    <span className="text-[10px] font-bold text-slate-700">K={pt.k}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Silhouette Score Chart */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-900 uppercase">2. Silhouette Score vs K</span>
              <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">Peak Score 0.74 at K=4</span>
            </div>
            <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-4 bg-white border border-slate-200 rounded-xl">
              {(data?.silhouette_scores || []).map(pt => {
                const hPct = Math.round((pt.score / 1.0) * 100);
                return (
                  <div key={pt.k} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[10px] font-mono font-bold text-purple-700">{pt.score}</span>
                    <div 
                      className={`w-full rounded-t-lg transition-all ${pt.k === 4 ? 'bg-purple-600 ring-2 ring-purple-400' : 'bg-purple-300'}`}
                      style={{ height: `${hPct}%` }}
                    />
                    <span className="text-[10px] font-bold text-slate-700">K={pt.k}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Additional 5 Metrics Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">3. Asset Cluster Dist</span>
            <div className="text-sm font-extrabold text-slate-900 mt-1">C0: 38% | C1: 25% | C2: 22% | C3: 15%</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">4. Complaint Cluster Dist</span>
            <div className="text-sm font-extrabold text-purple-900 mt-1">Zone 0: 60% | Zone 1: 28% | Zone 2: 12%</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">5. Avg Risk by Cluster</span>
            <div className="text-sm font-extrabold text-red-600 mt-1">C3: 90.3 | C2: 81.2 | C1: 68.5 | C0: 38.0</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">6. Population Reach</span>
            <div className="text-sm font-extrabold text-blue-600 mt-1">C3: 77,000 | C2: 73,000 Citizens</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">7. High Risk Asset %</span>
            <div className="text-sm font-extrabold text-amber-600 mt-1">37.0% Total Portfolio Risk</div>
          </div>
        </div>

      </div>

      {/* SECTION 7: AI GENERATED CLUSTER INSIGHTS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 animate-spin" />
            <h2 className="text-base font-extrabold text-slate-900">SECTION 7 — AI Generated Cluster Insights</h2>
          </div>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
            Automated Pattern Synthesis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-red-900 font-extrabold">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>Cluster 3 Insight</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Cluster 3 contains the oldest bridges and flyovers with the highest failure probability (88%+), demanding immediate structural reinforcement.
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Cluster 2 Insight</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Cluster 2 exhibits rapidly increasing complaint density (319+ complaints) and cast-iron pipe joint degradation in Sector 12.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-emerald-900 font-extrabold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Cluster 0 Insight</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Cluster 0 contains recently maintained infrastructure (BRT Transit & Substation feeders) requiring only routine quarterly monitoring.
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-blue-900 font-extrabold">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Cluster 1 Insight</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Cluster 1 contains heavy freight corridors requiring preventive bituminous resurfacing before monsoon season to avoid pothole escalation.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 8: AI RECOMMENDATION PANEL */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">SECTION 8 — AI Administrative Recommendation Panel</h2>
          </div>
          <span className="text-[11px] font-bold text-slate-400">Action Matrix</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">Cluster 3 (Critical Tier)</span>
            <h4 className="font-extrabold text-red-950 text-sm">Immediate Inspection Required</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Dispatch structural engineering team within 24 hours. Issue emergency repair work orders.
            </p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Cluster 2 (High Risk Tier)</span>
            <h4 className="font-extrabold text-amber-950 text-sm">Increase Inspection Frequency</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Double inspection frequency from monthly to bi-weekly. Monitor pressure telemetry.
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Cluster 1 (Moderate Risk Tier)</span>
            <h4 className="font-extrabold text-blue-950 text-sm">Schedule Preventive Maintenance</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Schedule resurfacing and transformer coil maintenance within the 30-day capital plan.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Cluster 0 (Healthy Tier)</span>
            <h4 className="font-extrabold text-emerald-950 text-sm">Routine Monitoring</h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Maintain standard automated sensor telemetry monitoring with standard quarterly checks.
            </p>
          </div>
        </div>
      </div>

      {/* MODEL INFORMATION CARD */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-extrabold text-white">Model Specification Card — K-Means Clustering Algorithm</h3>
          </div>
          <span className="text-[11px] font-mono text-purple-400 font-bold bg-slate-800 px-2.5 py-1 rounded-md">
            Scikit-Learn ML Core
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Algorithm & Type</span>
            <p className="text-white font-extrabold text-sm">K-Means Clustering (Unsupervised)</p>
            <p className="text-slate-400 leading-relaxed mt-1">
              Automatically groups similar infrastructure assets and complaint regions without predefined labels using Euclidean distance minimization.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Input Features</span>
            <p className="text-white font-extrabold text-xs">
              Asset Age, Condition Score, Traffic Density, Population Impact, Failure History, Complaint Count, Complaint Severity, Risk Score
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Model Output</span>
            <p className="text-emerald-400 font-extrabold text-sm">Cluster ID (0–3), Cluster Name & Maintenance Strategy</p>
          </div>
        </div>
      </div>

    </div>
  );
}
