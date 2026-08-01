import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { BarChart3, TrendingUp, ShieldAlert, PieChart as PieIcon, Loader2, AlertCircle } from 'lucide-react';
import { fetchAnalytics } from '../services/api';

const CATEGORY_COLORS = ['#EF4444', '#0284C7', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'];

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAnalytics() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetchAnalytics();
        setAnalytics(res);
      } catch (err) {
        setError(err.message || 'Failed to fetch city analytics.');
      } finally {
        setIsLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-600">Computing Cross-Sector City Analytics from Database...</p>
      </div>
    );
  }

  const sectorRiskObj = analytics?.sector_risk_matrix || {};
  const riskData = Object.keys(sectorRiskObj).map(sec => ({
    type: sec,
    risk: Math.round(sectorRiskObj[sec] * 100)
  }));

  const complaintCatObj = analytics?.complaint_categories || {};
  const pieData = Object.keys(complaintCatObj).map((cat, idx) => ({
    name: cat,
    value: complaintCatObj[cat],
    color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length]
  }));

  const totalComplaintCount = pieData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Cross-Sector Analytics & Intelligence</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time analytics aggregating infrastructure risk probability, citizen complaint density, and fiscal budgets.
          </p>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Critical Assets Monitored</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {analytics?.summary?.critical_infra_count || 0}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Complaints</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            {analytics?.summary?.open_complaints_count || 0}
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Allocated Budget</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">
            ₹{((analytics?.summary?.total_budget_allocated || 0) / 10000000).toFixed(2)} Cr
          </p>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sector Risk Bar Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Average Sector Failure Risk (%)</h2>
          </div>

          <div className="h-[280px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="type" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="risk" fill="#0284C7" radius={[6, 6, 0, 0]} name="Failure Risk %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaint Category Pie Chart */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-indigo-600" />
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Complaint Distribution by Sector</h2>
          </div>

          <div className="h-[280px] flex items-center justify-center">
            {pieData.length === 0 ? (
              <p className="text-xs text-slate-400">No complaint data recorded.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
