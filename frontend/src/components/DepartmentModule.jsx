import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  Coins, 
  TrendingUp, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { fetchDepartmentTelemetry } from '../services/api';

export default function DepartmentModule() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDepts() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetchDepartmentTelemetry();
        if (res) setData(res);
      } catch (err) {
        console.warn("Department telemetry load error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDepts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs font-bold text-slate-600">Loading Municipal Department SLA & Fiscal Performance...</p>
      </div>
    );
  }

  const depts = data?.departments || [];
  const budgets = data?.budgets || [];

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
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Municipal Department Performance & SLA Intelligence</h1>
          <p className="text-xs text-slate-500 mt-1">
            Department resolution SLA compliance percentages, ticket turnaround times, and departmental spending efficiency.
          </p>
        </div>
      </div>

      {/* Department SLA Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {depts.map((d, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-sm">{d.department}</span>
              <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-0.5 rounded-full border border-emerald-200">
                {d.resolution_sla_pct}% SLA
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase">Avg Turnaround</span>
                <p className="font-extrabold text-slate-900 mt-0.5">{d.avg_days} Days</p>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase">Open Tickets</span>
                <p className="font-extrabold text-slate-900 mt-0.5">{d.open_tickets} Issues</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Department Budget Register */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Department Fiscal Allocation Register</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Budget ID</th>
                <th className="p-3">Department</th>
                <th className="p-3">Allocated Amount</th>
                <th className="p-3">Spent Amount</th>
                <th className="p-3">Fiscal Year</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {budgets.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{b.id}</td>
                  <td className="p-3 font-bold text-slate-900">{b.department}</td>
                  <td className="p-3 font-bold text-slate-900">₹{(b.allocated_amount / 10000000).toFixed(2)} Cr</td>
                  <td className="p-3 text-slate-600">₹{(b.spent_amount / 10000000).toFixed(2)} Cr</td>
                  <td className="p-3">
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {b.fiscal_year || 'FY2026'}
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
