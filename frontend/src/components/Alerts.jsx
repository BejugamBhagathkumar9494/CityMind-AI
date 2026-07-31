import React, { useState, useEffect } from 'react';
import { ShieldAlert, Bell, AlertTriangle, CheckCircle2, Filter } from 'lucide-react';
import { fetchAlerts } from '../services/api';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchAlerts().then(data => setAlerts(data));
  }, []);

  const filtered = alerts.filter(a => filter === 'All' || a.severity === filter);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Real-Time City Alert Center</h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated threshold alerts triggered by XGBoost risk probability spikes and citizen complaint volume surges.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-500">Filter Severity:</span>
          {['All', 'Critical', 'High', 'Medium'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filter === s
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ALERT FEED */}
      <div className="space-y-3">
        {filtered.map((alt) => (
          <div
            key={alt.id}
            className={`p-5 rounded-2xl border shadow-card flex items-start justify-between gap-4 ${
              alt.severity === 'Critical'
                ? 'bg-red-50/50 border-red-200'
                : alt.severity === 'High'
                ? 'bg-orange-50/50 border-orange-200'
                : 'bg-amber-50/50 border-amber-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-xl shrink-0 ${
                alt.severity === 'Critical'
                  ? 'bg-red-600 text-white'
                  : 'bg-orange-600 text-white'
              }`}>
                <ShieldAlert className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500">{alt.id}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    alt.severity === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {alt.severity} Alert
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 mt-1">{alt.title}</h3>
                <p className="text-xs text-slate-700 mt-1">{alt.message}</p>
              </div>
            </div>

            <button
              onClick={() => alert(`Alert ${alt.id} acknowledged and logged.`)}
              className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl shrink-0 transition-colors"
            >
              Acknowledge
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
