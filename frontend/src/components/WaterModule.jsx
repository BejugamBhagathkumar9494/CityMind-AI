import React, { useState, useEffect } from 'react';
import { 
  Droplet, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { fetchWaterTelemetry } from '../services/api';

export default function WaterModule({ onOpenInspection }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWater() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetchWaterTelemetry();
        if (res) setData(res);
      } catch (err) {
        console.warn("Water telemetry load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadWater();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-600">Reading Acoustic Water Leak Sensors & Pipe Telemetry...</p>
      </div>
    );
  }

  const kpis = data?.kpis || { active_leaks_detected: 0, water_mains_monitored: 0, avg_pipe_pressure_bar: 0, daily_water_loss_pct: 0 };
  const assets = data?.assets || [];

  return (
    <div className="space-y-6 pb-12">
      
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Water Leakage & Acoustic Sensor Network</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time acoustic noise leak detection, pipe pressure bars, and non-revenue water loss metrics.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Leaks Detected</span>
          <p className="text-2xl font-extrabold text-red-600 mt-1">{kpis.active_leaks_detected}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Water Mains Monitored</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.water_mains_monitored}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Pipe Pressure</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.avg_pipe_pressure_bar} Bar</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Daily Water Loss Rate</span>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">{kpis.daily_water_loss_pct}%</p>
        </div>
      </div>

      {/* Water Network Status Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Water Mains Supply Inventory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Asset ID</th>
                <th className="p-3">Pipeline Name</th>
                <th className="p-3">Zone Location</th>
                <th className="p-3">Condition Rating</th>
                <th className="p-3">Leak Probability</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {assets.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{a.id}</td>
                  <td className="p-3 font-bold text-slate-900">{a.name}</td>
                  <td className="p-3 text-slate-600">{a.location}</td>
                  <td className="p-3 font-bold text-slate-700">{a.condition_rating || 4.5} / 10</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      (a.failure_probability || 0.5) >= 0.7 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {Math.round((a.failure_probability || 0.5) * 100)}%
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => onOpenInspection && onOpenInspection(a.id)}
                      className="text-blue-600 hover:underline font-bold text-xs"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
