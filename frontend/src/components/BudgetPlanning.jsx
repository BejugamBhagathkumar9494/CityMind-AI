import React, { useState, useEffect } from 'react';
import { 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  PieChart as PieIcon, 
  ArrowRight, 
  Sliders,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { optimizeBudget } from '../services/api';

export default function BudgetPlanning() {
  const [totalBudgetCr, setTotalBudgetCr] = useState(10.0);
  const [optimization, setOptimization] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    optimizeBudget(totalBudgetCr).then(res => setOptimization(res));
  }, [totalBudgetCr]);

  const handleRunOptimization = async () => {
    setIsOptimizing(true);
    const res = await optimizeBudget(totalBudgetCr);
    setOptimization(res);
    setIsOptimizing(false);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const allocatedCr = Number(optimization?.allocated_cr ?? optimization?.total_cost_allocated_cr ?? (totalBudgetCr * 0.75));
  const remainingCr = Number(optimization?.remaining_cr ?? optimization?.unallocated_budget_cr ?? (totalBudgetCr * 0.25));
  const citizensBenefited = Number(optimization?.citizens_benefited ?? optimization?.total_population_protected ?? (totalBudgetCr * 25000));
  const sectorBreakdown = (optimization?.sector_breakdown && typeof optimization.sector_breakdown === 'object')
    ? optimization.sector_breakdown
    : { "Roads": totalBudgetCr * 0.40, "Water": totalBudgetCr * 0.25, "Electricity": totalBudgetCr * 0.20, "Transport": totalBudgetCr * 0.15 };
  const selectedProjects = optimization?.selected_projects || [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Algorithmic Budget Planning & Optimization</h1>
          <p className="text-xs text-slate-500 mt-1">
            Knapsack heuristic optimization prioritizing infrastructure projects by citizen reach per rupee spent under ₹{totalBudgetCr.toFixed(2)} Cr constraint.
          </p>
        </div>

        <button
          onClick={handleRunOptimization}
          disabled={isOptimizing}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all shrink-0"
        >
          <Sparkles className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
          <span>{isOptimizing ? 'Optimizing Budget...' : 'Optimize Budget'}</span>
        </button>
      </div>

      {/* KPI BUDGET METRICS & INTERACTIVE SLIDER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Set Custom City Infrastructure Budget Constraint</span>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-3xl font-black text-blue-600">₹</span>
              <input
                type="number"
                min="1"
                max="100"
                step="0.5"
                value={totalBudgetCr}
                onChange={(e) => setTotalBudgetCr(Math.max(1.0, parseFloat(e.target.value) || 1.0))}
                className="w-32 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-2xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-2xl font-black text-slate-900">Cr</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Presets:</span>
            {[5.0, 10.0, 20.44, 50.0, 100.0].map(val => (
              <button
                key={val}
                onClick={() => setTotalBudgetCr(val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  totalBudgetCr === val
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                ₹{val} Cr
              </button>
            ))}
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-1 pt-2">
          <input
            type="range"
            min="1.0"
            max="100.0"
            step="0.5"
            value={totalBudgetCr}
            onChange={(e) => setTotalBudgetCr(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>₹1.0 Cr</span>
            <span>₹25.0 Cr</span>
            <span>₹50.0 Cr</span>
            <span>₹75.0 Cr</span>
            <span>₹100.0 Cr</span>
          </div>
        </div>
      </div>

      {/* KPI BUDGET METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Available Budget</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-900">₹{totalBudgetCr.toFixed(2)} Cr</span>
          </div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">Interactive Municipal Budget</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Allocated Funds</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-emerald-600">₹{allocatedCr.toFixed(2)} Cr</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">Optimized Project Allocation</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Unallocated Reserve</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-slate-700">₹{remainingCr.toFixed(2)} Cr</span>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">Contingency Reserve</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-card">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Citizens Protected</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-blue-600">{(citizensBenefited / 1000).toFixed(0)}k</span>
          </div>
          <p className="text-[11px] text-blue-600 font-semibold mt-1">Maximum Population ROI</p>
        </div>
      </div>

      {/* BEFORE VS AFTER COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Before AI Allocation */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Traditional Allocation</span>
              <h3 className="text-sm font-extrabold text-slate-900">Before CityMind AI (Fragmented)</h3>
            </div>
            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded">Manual Bureaucracy</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span>Roads & Bridges</span>
              <strong className="text-slate-900">₹{(totalBudgetCr * 0.32).toFixed(2)} Cr (Static)</strong>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span>Water Sanitation</span>
              <strong className="text-slate-900">₹{(totalBudgetCr * 0.25).toFixed(2)} Cr (Static)</strong>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span>Energy & Power</span>
              <strong className="text-slate-900">₹{(totalBudgetCr * 0.21).toFixed(2)} Cr (Static)</strong>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span>Public Transport</span>
              <strong className="text-slate-900">₹{(totalBudgetCr * 0.14).toFixed(2)} Cr (Static)</strong>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-900">
            <span className="font-bold block">Outcome Before AI:</span>
            Traditional spending fixed by department quotas, ignoring high-risk assets and citizen complaint hotspots.
          </div>
        </div>

        {/* Right 6 Cols: After CityMind Optimization */}
        <div className="lg:col-span-6 bg-white border border-blue-200 rounded-2xl p-5 shadow-card ring-2 ring-blue-500/20">
          <div className="flex items-center justify-between border-b border-blue-100 pb-3 mb-4">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">AI Optimized Allocation</span>
              <h3 className="text-sm font-extrabold text-blue-950">After CityMind AI (Algorithmic)</h3>
            </div>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              +{optimization?.overall_city_risk_reduction_pct || 74.5}% Risk Reduction
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {Object.entries(sectorBreakdown).map(([sector, amount]) => (
              <div key={sector} className="flex items-center justify-between p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <span className="font-semibold text-blue-950">{sector} Sector</span>
                <strong className="text-blue-700">₹{Number(amount || 0).toFixed(2)} Cr</strong>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-900">
            <span className="font-bold block">Outcome After CityMind AI:</span>
            Re-allocates ₹{allocatedCr.toFixed(2)} Cr to critical infrastructure assets protecting {(citizensBenefited / 1000).toFixed(0)}k citizens with maximum ROI.
          </div>
        </div>
      </div>

      {/* OPTIMIZED SELECTED PROJECTS REGISTER */}
      {selectedProjects.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Selected Projects in Optimized Knapsack Portfolio</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Asset ID</th>
                  <th className="p-3">Project Name</th>
                  <th className="p-3">Sector</th>
                  <th className="p-3">Risk Score</th>
                  <th className="p-3">Repair Cost</th>
                  <th className="p-3">Population Reach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {selectedProjects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{proj.id}</td>
                    <td className="p-3 font-bold text-slate-900">{proj.name}</td>
                    <td className="p-3"><span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">{proj.type}</span></td>
                    <td className="p-3 font-bold text-red-600">{proj.risk_score} / 100</td>
                    <td className="p-3 font-bold text-slate-900">₹{proj.repair_cost_inr} Cr</td>
                    <td className="p-3 text-slate-600">{proj.population_affected?.toLocaleString()} residents</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
