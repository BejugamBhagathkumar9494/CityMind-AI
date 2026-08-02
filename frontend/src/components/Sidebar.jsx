import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  MessageSquareWarning, 
  Bot, 
  PieChart, 
  BarChart3, 
  FileText, 
  FolderGit2, 
  Bell, 
  Settings,
  Sparkles,
  ChevronRight,
  Car,
  Droplet,
  Zap,
  Bus,
  Building2,
  Cpu,
  Brain
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview & Upload', icon: LayoutDashboard, badge: 'Live' },
  { id: 'infrastructure', label: 'Infrastructure Risk', icon: MapPin, badge: 'XGBoost' },
  { id: 'priority', label: 'Priority Classifier', icon: Cpu, badge: 'Random Forest' },
  { id: 'kmeans', label: 'K-Means Analytics', icon: Brain, badge: 'Unsupervised' },
  { id: 'agents', label: 'AI Agents', icon: Bot, badge: '4 Active', highlight: true },
  { id: 'complaints', label: 'Citizen Complaints', icon: MessageSquareWarning, badge: 'NLP' },
  { id: 'documents', label: 'Policy RAG Search', icon: FolderGit2, badge: 'FAISS' },
  { id: 'budget', label: 'Budget Optimization', icon: PieChart, badge: 'Knapsack' },
];

export default function Sidebar({ activeTab, setActiveTab, onStartDemo }) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
            C
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base leading-tight tracking-tight flex items-center gap-1.5">
              CityMind AI
              <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-blue-200">
                PRO
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">Smart City Intelligence</p>
          </div>
        </div>
      </div>

      {/* Quick Hackathon Demo Trigger */}
      <div className="px-3 pt-4 pb-2">
        <button
          onClick={onStartDemo}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between shadow-sm transition-all group"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-200 animate-pulse" />
            <span>3-Min Demo Mode</span>
          </div>
          <ChevronRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
          Command Center
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    item.highlight
                      ? 'bg-blue-600 text-white'
                      : isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            FastAPI Backend
          </span>
          <span className="font-mono text-[10px] text-slate-400">v1.0.0</span>
        </div>
        <div className="text-[10px] text-slate-400 flex justify-between">
          <span>XGBoost + RAG + Agents</span>
          <span className="text-emerald-600 font-medium">Operational</span>
        </div>
      </div>
    </aside>
  );
}
