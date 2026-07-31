import React from 'react';
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
import { BarChart3, TrendingUp, ShieldAlert, PieChart as PieIcon } from 'lucide-react';

export default function Analytics() {
  const riskData = [
    { type: 'Roads', critical: 12, high: 24, medium: 30, low: 18 },
    { type: 'Water', critical: 8, high: 18, medium: 22, low: 14 },
    { type: 'Power', critical: 6, high: 14, medium: 20, low: 12 },
    { type: 'Transport', critical: 4, high: 10, medium: 18, low: 15 },
    { type: 'Hospital Feed', critical: 5, high: 8, medium: 12, low: 8 },
  ];

  const pieData = [
    { name: 'Road Potholes', value: 4892, color: '#EF4444' },
    { name: 'Water Leaks', value: 3210, color: '#0284C7' },
    { name: 'Power Grid Spikes', value: 2840, color: '#F59E0B' },
    { name: 'Drainage Flood', value: 1900, color: '#10B981' }
  ];

  const trendData = [
    { month: 'Jan', complaints: 1420, failures: 18 },
    { month: 'Feb', complaints: 1380, failures: 15 },
    { month: 'Mar', complaints: 1650, failures: 22 },
    { month: 'Apr', complaints: 1890, failures: 28 },
    { month: 'May', complaints: 2100, failures: 34 },
    { month: 'Jun', complaints: 1750, failures: 21 },
    { month: 'Jul', complaints: 1284, failures: 12 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">City Intelligence Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Statistical breakdown of risk ratings, complaint trends, department response efficiency, and failure probability distribution.
          </p>
        </div>
      </div>

      {/* CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Distribution Bar Chart */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-card">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-extrabold text-slate-900">Infrastructure Risk Matrix by Sector</h2>
            </div>
            <span className="text-[10px] text-slate-400">152 Total At Risk</span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="type" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip />
                <Bar dataKey="critical" stackId="a" fill="#EF4444" radius={[0, 0, 4, 4]} name="Critical" />
                <Bar dataKey="high" stackId="a" fill="#F97316" name="High" />
                <Bar dataKey="medium" stackId="a" fill="#F59E0B" name="Medium" />
                <Bar dataKey="low" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} name="Low" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaint Category Pie Chart */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-blue-600" />
                <h2 className="text-sm font-extrabold text-slate-900">Citizen Complaints by Category</h2>
              </div>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700 pt-2 border-t border-slate-100">
            {pieData.map(p => (
              <div key={p.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span>{p.name} ({((p.value/12842)*100).toFixed(0)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TREND FORECAST LINE CHART */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-card">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-extrabold text-slate-900">Complaint Volume vs Infrastructure Failures Trend</h2>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            -42% Failures Post CityMind Deployment
          </span>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip />
              <Line type="monotone" dataKey="complaints" stroke="#2563EB" strokeWidth={2.5} name="Complaints" />
              <Line type="monotone" dataKey="failures" stroke="#EF4444" strokeWidth={2.5} name="Major Failures" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
