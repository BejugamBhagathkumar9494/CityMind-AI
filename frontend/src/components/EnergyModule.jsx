import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { fetchEnergyTelemetry } from '../services/api';

export default function EnergyModule({ onOpenInspection }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEnergy() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetchEnergyTelemetry();
        setData(res);
      } catch (err) {
        setError(err.message || 'Failed to fetch power grid telemetry.');
      } finally {
        setIsLoading(false);
      }
    }
    loadEnergy();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-600">Reading Electrical Power Grid & Substation Feeder Data...</p>
      </div>
    );
  }

  const kpis = data?.kpis || { active_grid_disruptions: 0, substations_monitored: 0, customers_affected: 0, avg_outage_duration_mins: 0 };
  const substations = data?.substations || [];
  const disruptions = data?.disruptions || [];

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
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Power Outages & Electrical Grid Intelligence</h1>
          <p className="text-xs text-slate-500 mt-1">
            Substation feeder loads, blackout logs, voltage spikes, and emergency transformer dispatch metrics.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Disruption Logs</span>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">{kpis.active_grid_disruptions}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Substations Monitored</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.substations_monitored}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Customers Affected</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.customers_affected.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Outage Duration</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.avg_outage_duration_mins} Mins</p>
        </div>
      </div>

      {/* Grid Outage Log Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Power Disruption Event Register</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">Event Description</th>
                <th className="p-3">Duration (Mins)</th>
                <th className="p-3">Customers Impacted</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {disruptions.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{d.id}</td>
                  <td className="p-3 font-bold text-slate-900">{d.event_description}</td>
                  <td className="p-3 font-bold text-slate-700">{d.duration_minutes || 45} mins</td>
                  <td className="p-3 text-slate-600">{(d.customers_affected || 1200).toLocaleString()}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {d.status || 'Resolved'}
                    </span>
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
