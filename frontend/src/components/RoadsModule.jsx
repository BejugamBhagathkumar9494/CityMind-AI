import React, { useState, useEffect } from 'react';
import { 
  Car, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  BarChart3, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { fetchRoadsTelemetry } from '../services/api';

export default function RoadsModule({ onOpenInspection }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRoads() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetchRoadsTelemetry();
        setData(res);
      } catch (err) {
        setError(err.message || 'Failed to fetch road damage telemetry.');
      } finally {
        setIsLoading(false);
      }
    }
    loadRoads();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-600">Loading Road Network & Flyover Telemetry...</p>
      </div>
    );
  }

  const kpis = data?.kpis || { pothole_count: 0, corridors_monitored: 0, flyovers_critical: 0, avg_pavement_index: 0 };
  const corridors = data?.corridors || [];
  const flyovers = data?.flyovers || [];

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
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Road Damage & Flyover Structural Intelligence</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time pothole density tracking, pavement condition index, and structural inspection logs.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reported Potholes</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.pothole_count}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Arterial Corridors Monitored</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.corridors_monitored}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Critical Flyovers</span>
          <p className="text-2xl font-extrabold text-red-600 mt-1">{kpis.flyovers_critical}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Pavement Index</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.avg_pavement_index} / 10</p>
        </div>
      </div>

      {/* Corridor Health Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Road Corridor Condition Inventory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Corridor ID</th>
                <th className="p-3">Road Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3">Failure Prob</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {corridors.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{c.id}</td>
                  <td className="p-3 font-bold text-slate-900">{c.name}</td>
                  <td className="p-3 text-slate-600">{c.location}</td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      c.urgency === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {c.urgency || 'Medium'}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-700">{(c.failure_probability || 0.5).toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => onOpenInspection && onOpenInspection(c.id)}
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
