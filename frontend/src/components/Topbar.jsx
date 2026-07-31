import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  User, 
  Building2, 
  ChevronDown, 
  ExternalLink,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function Topbar({ 
  selectedCity, 
  setSelectedCity, 
  onOpenAuth, 
  onShowLanding,
  onStartDemo 
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const cities = [
    { id: 'bengaluru', name: 'Bengaluru Metro Region', code: 'BLR' },
    { id: 'mumbai', name: 'Mumbai Metropolitan Area', code: 'BOM' },
    { id: 'delhi', name: 'Delhi National Capital Region', code: 'DEL' }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left: City Selector & Search */}
      <div className="flex items-center space-x-4 flex-1 max-w-2xl">
        {/* City Selector */}
        <div className="relative group">
          <button className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 transition-colors">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>{cities.find(c => c.id === selectedCity)?.name || 'Bengaluru Metro Region'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <div className="absolute top-full left-0 mt-1 w-60 bg-white border border-slate-200 rounded-xl shadow-lg py-1 hidden group-hover:block z-50">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Select City Network
            </div>
            {cities.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCity(c.id)}
                className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-slate-50 ${
                  selectedCity === c.id ? 'text-blue-600 bg-blue-50/50 font-semibold' : 'text-slate-700'
                }`}
              >
                <span>{c.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{c.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search infrastructure IDs, complaints, policy docs (Press '/' to search)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center space-x-3">
        {/* Landing Page Link */}
        <button
          onClick={onShowLanding}
          className="text-xs font-medium text-slate-600 hover:text-blue-600 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                <span className="text-xs font-bold text-slate-900">City Alerts</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div className="p-2 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-900">Critical Risk: MG Road Flyover</p>
                    <p className="text-[11px] text-red-700">Failure prob 87% • 482 Complaints</p>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-2">
                  <Bell className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-amber-900">Water Leakage Hotspot</p>
                    <p className="text-[11px] text-amber-700">319 complaints in Indiranagar Sector 12</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar / Auth */}
        <button
          onClick={onOpenAuth}
          className="flex items-center space-x-2 border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
            AD
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-900 leading-tight">Admin Officer</p>
            <p className="text-[10px] text-slate-500">City Authority</p>
          </div>
        </button>
      </div>
    </header>
  );
}
