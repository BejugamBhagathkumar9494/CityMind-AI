import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MessageSquareWarning, 
  Sparkles, 
  ThumbsUp, 
  MapPin, 
  Tag, 
  CheckCircle2, 
  Clock, 
  Layers,
  Filter
} from 'lucide-react';
import { fetchComplaints } from '../services/api';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCluster, setSelectedCluster] = useState('All');

  useEffect(() => {
    fetchComplaints(searchTerm).then(res => setComplaints(res));
  }, [searchTerm]);

  const clusters = [
    { id: 'All', name: 'All Complaints', count: 12842 },
    { id: 'potholes', name: 'Road Potholes & Cave-ins', count: 4892 },
    { id: 'water', name: 'Water Quality & Contamination', count: 3210 },
    { id: 'power', name: 'Power Grid Voltage Spikes', count: 2840 },
    { id: 'drainage', name: 'Drainage & Overflow', count: 1900 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Citizen Complaint Intelligence</h1>
          <p className="text-xs text-slate-500 mt-1">
            NLP Sentence Transformer embeddings + K-Means clustering categorizing 12,842 raw citizen feedback reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>NLP Embeddings Active</span>
          </div>
        </div>
      </div>

      {/* Semantic Search Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Semantic AI Complaint Search</span>
          <span className="text-[11px] text-slate-400">Try query: "Find recurring water problems near schools"</span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type natural language query (e.g., 'water leakage in indiranagar', 'transformer spark whitefield')..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* NLP Clusters Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 mr-2 shrink-0">AI Clusters:</span>
        {clusters.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCluster(c.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCluster === c.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {c.name} <span className="opacity-75 text-[10px] ml-1">({c.count.toLocaleString()})</span>
          </button>
        ))}
      </div>

      {/* Complaint Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {complaints.map((cmp) => (
          <div
            key={cmp.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-card hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">{cmp.id}</span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  cmp.severity === 'Critical'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {cmp.severity} Severity
                </span>
              </div>

              <h3 className="text-xs font-extrabold text-slate-900 mt-1">{cmp.title}</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{cmp.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  {cmp.location}
                </span>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-600">
                  {cmp.category}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
                <span>{cmp.upvotes} Citizens Supported</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
