import React, { useState, useEffect } from 'react';
import { 
  Bus, 
  Clock, 
  Users, 
  Activity, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { fetchTransportTelemetry } from '../services/api';

export default function TransportModule({ onOpenInspection }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTransport() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetchTransportTelemetry();
        setData(res);
      } catch (err) {
        setError(err.message || 'Failed to fetch public transport telemetry.');
      } finally {
        setIsLoading(false);
      }
    }
    loadTransport();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-600">Reading Public Transport Mobility & Transit Route Data...</p>
      </div>
    );
  }

  const kpis = data?.kpis || { routes_active: 0, avg_delay_minutes: 0, daily_ridership: 0, fleet_on_time_pct: 0 };
  const routes = data?.routes || [];

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
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Public Transport & Urban Mobility Telemetry</h1>
          <p className="text-xs text-slate-500 mt-1">
            Bus corridor speeds, route delay indexes, passenger volume, and schedule adherence metrics.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Routes Monitored</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.routes_active}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Avg Route Delay</span>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">{kpis.avg_delay_minutes} Mins</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Daily Passenger Ridership</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.daily_ridership.toLocaleString()}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Fleet On-Time Rate</span>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{kpis.fleet_on_time_pct}%</p>
        </div>
      </div>

      {/* Transit Route Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Transit Corridor & Fleet Inventory</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Route ID</th>
                <th className="p-3">Corridor Name</th>
                <th className="p-3">Coverage Zone</th>
                <th className="p-3">Ridership Reach</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {routes.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{r.id}</td>
                  <td className="p-3 font-bold text-slate-900">{r.name}</td>
                  <td className="p-3 text-slate-600">{r.location}</td>
                  <td className="p-3 font-bold text-slate-700">{(r.population_affected || 15000).toLocaleString()} riders</td>
                  <td className="p-3">
                    <button
                      onClick={() => onOpenInspection && onOpenInspection(r.id)}
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
