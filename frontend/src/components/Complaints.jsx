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
  AlertCircle,
  PlusCircle,
  X,
  Send,
  Building2,
  UserCheck
} from 'lucide-react';
import { fetchComplaints, raiseComplaint } from '../services/api';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Raise Complaint Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBanner, setSuccessBanner] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Road Potholes',
    priority: 'High',
    location: 'Indiranagar Ward 82',
    citizen_name: 'Bhagath Kumar',
    description: ''
  });

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

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError('Please provide a title and detailed description for your complaint.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await raiseComplaint(form);
      const newCompl = res.complaint || {
        id: `CMP-${Date.now().toString().slice(-6)}`,
        title: form.title,
        category: form.category,
        priority: form.priority,
        severity: form.priority,
        location: form.location,
        citizen_name: form.citizen_name,
        description: form.description,
        status: 'Open',
        upvotes: 1,
        created_at: new Date().toISOString()
      };

      // Instantly update local state list & counts
      setComplaints(prev => [newCompl, ...prev]);

      // Show success notification banner
      setSuccessBanner(`✔ Complaint logged successfully! Ticket ID: ${newCompl.id}`);
      setTimeout(() => setSuccessBanner(null), 6000);

      // Reset form and close modal
      setForm({
        title: '',
        category: 'Road Potholes',
        priority: 'High',
        location: 'Indiranagar Ward 82',
        citizen_name: 'Bhagath Kumar',
        description: ''
      });
      setShowModal(false);

      // Broadcast custom event so topbar & overview reflect updated count
      window.dispatchEvent(new CustomEvent('citymind:complaint-raised', { detail: newCompl }));

    } catch (err) {
      setError(err.message || 'Failed to register complaint.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(complaints.map(c => c.category)))];

  const filteredComplaints = complaints.filter(c => {
    if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquareWarning className="w-5 h-5 text-blue-600" />
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Citizen Complaint Intelligence Portal</h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200 font-mono">
              {complaints.length} Total Complaints Logged
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Submit infrastructure issues, log citizen feedback, and track real-time resolution SLAs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Raise New Complaint</span>
          </button>
        </div>
      </div>

      {/* Success Banner Alert */}
      {successBanner && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-800 text-xs font-bold shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successBanner}</span>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-emerald-600 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* RAISE COMPLAINT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">Raise New Citizen Complaint</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitComplaint} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Complaint Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Severe Pothole & Road Collapse"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Infrastructure Sector</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Road Potholes">Roads & Potholes</option>
                    <option value="Water Leakage">Water Leakage & Drainage</option>
                    <option value="Power Outages">Power Grid & Transformer</option>
                    <option value="Public Transit">Public Transport & Bus Stops</option>
                    <option value="Sanitation & Garbage">Sanitation & Garbage</option>
                    <option value="General Facility">General Infrastructure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Priority Level</label>
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Critical">Critical Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Location / Ward</label>
                  <input
                    type="text"
                    placeholder="e.g. Indiranagar Ward 82"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Reporter Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Bhagath Kumar"
                    value={form.citizen_name}
                    onChange={(e) => setForm({ ...form, citizen_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the infrastructure issue, severity, and potential hazards to public safety..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center gap-2 shadow-md transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Ticket...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Complaint Ticket</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Semantic Search Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Semantic AI Complaint Search</span>
          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            Live Feed: {filteredComplaints.length} Tickets
          </span>
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

      {/* Dynamic Categories Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 mr-2 shrink-0">Filter Category:</span>
        {categories.map((cat) => {
          const count = cat === 'All' ? complaints.length : complaints.filter(c => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
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
            filteredComplaints.map((item, idx) => (
              <div 
                key={item.id || idx} 
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-card hover:border-blue-300 transition-all space-y-2 animate-in fade-in duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {item.id}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      (item.priority || item.severity) === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' : 
                      (item.priority || item.severity) === 'High' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {item.priority || item.severity || 'High'} Priority
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-100">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.location || 'Central City'}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <h3 className="font-extrabold text-slate-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-medium">Logged by: <strong className="text-slate-700">{item.citizen_name || 'Resident'}</strong></span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                    Status: {item.status || 'Open'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
