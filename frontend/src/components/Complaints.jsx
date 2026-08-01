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
  Filter,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { fetchComplaints } from '../services/api';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCluster, setSelectedCluster] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadComplaints() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetchComplaints(searchTerm);
        setComplaints(res || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch citizen complaints.');
      } finally {
        setIsLoading(false);
      }
    }
    loadComplaints();
  }, [searchTerm]);

  const categories = ['All', ...Array.from(new Set(complaints.map(c => c.category)))];

  const filteredComplaints = complaints.filter(c => {
    if (selectedCluster !== 'All' && c.category !== selectedCluster) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Citizen Complaint Intelligence</h1>
          <p className="text-xs text-slate-500 mt-1">
            NLP Sentence Transformer embeddings + K-Means clustering categorizing live citizen feedback reports.
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
          <span className="text-[11px] text-slate-400">Search by query, location, or issue description</span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type natural language query (e.g., 'water leakage', 'power outage', 'road pothole')..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>
      </div>

      {/* Dynamic Clusters Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 mr-2 shrink-0">Filter Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCluster(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCluster === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {cat} ({cat === 'All' ? complaints.length : complaints.filter(c => c.category === cat).length})
          </button>
        ))}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-xs font-bold text-slate-600">Loading Citizen Complaints from Database...</p>
        </div>
      ) : (
        /* Complaints Feed List */
        <div className="space-y-3">
          {filteredComplaints.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-500">
              No citizen complaints found matching your query.
            </div>
          ) : (
            filteredComplaints.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-card hover:border-slate-300 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.priority} Priority
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-100">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location || 'Central City'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-sm mt-2">{item.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{item.description}</p>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
