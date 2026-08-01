import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  FileSpreadsheet,
  ChevronDown,
  ArrowUpDown,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { fetchInfrastructure } from '../services/api';

export default function InfrastructureTable({ onOpenInspection }) {
  const [assets, setAssets] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('priority_score');
  const [sortAsc, setSortAsc] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAssets() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchInfrastructure(typeFilter, urgencyFilter);
        setAssets(data || []);
      } catch (err) {
        setError(err.message || 'Failed to load infrastructure inventory.');
      } finally {
        setIsLoading(false);
      }
    }
    loadAssets();
  }, [typeFilter, urgencyFilter]);

  const filteredAssets = assets.filter(a => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        a.id.toLowerCase().includes(term) ||
        a.name.toLowerCase().includes(term) ||
        a.location.toLowerCase().includes(term) ||
        a.type.toLowerCase().includes(term)
      );
    }
    return true;
  }).sort((a, b) => {
    const valA = a[sortField] || 0;
    const valB = b[sortField] || 0;
    return sortAsc ? valA - valB : valB - valA;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Title & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">City Infrastructure Inventory</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time asset registry linked with XGBoost risk probabilities & priority ranking.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, asset name, location..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Sectors</option>
            <option value="Road">Road Corridor</option>
            <option value="Water">Water Supply</option>
            <option value="Electricity">Electricity Grid</option>
            <option value="Transport">Public Transport</option>
            <option value="Critical Facility">Critical Facility</option>
          </select>

          {/* Urgency Filter */}
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Urgencies</option>
            <option value="Critical">Critical Urgency</option>
            <option value="High">High Urgency</option>
            <option value="Medium">Medium Urgency</option>
            <option value="Low">Low Urgency</option>
          </select>
        </div>

        <div className="text-xs font-bold text-slate-500">
          Showing {filteredAssets.length} of {assets.length} assets
        </div>
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
        <div className="min-h-[350px] flex flex-col items-center justify-center space-y-3 bg-white border border-slate-200 rounded-2xl p-12">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-xs font-bold text-slate-600">Loading Infrastructure Assets from Database...</p>
        </div>
      ) : (
        /* Inventory Table */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('id')}>Asset ID</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('name')}>Asset Name</th>
                  <th className="p-4">Sector Type</th>
                  <th className="p-4">Location</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('risk_score')}>Risk Score</th>
                  <th className="p-4 cursor-pointer" onClick={() => handleSort('failure_probability')}>Fail Prob</th>
                  <th className="p-4">Urgency</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredAssets.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-slate-400">
                      No assets found matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredAssets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-900">{asset.id}</td>
                      <td className="p-4 font-bold text-slate-900">{asset.name}</td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded-md">
                          {asset.type}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">{asset.location}</td>
                      <td className="p-4">
                        <span className={`font-bold px-2 py-0.5 rounded-md text-[10px] ${
                          (asset.risk_score || asset.failure_probability * 100) >= 75
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {asset.risk_score || Math.round((asset.failure_probability || 0.5) * 100)}%
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-700">
                        {(asset.failure_probability || 0.5).toFixed(2)}
                      </td>
                      <td className="p-4">
                        <span className={`font-bold text-[10px] px-2 py-0.5 rounded-md ${
                          asset.urgency === 'Critical' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}>
                          {asset.urgency || 'Medium'}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => onOpenInspection && onOpenInspection(asset.id)}
                          className="text-blue-600 hover:text-blue-700 font-bold text-xs flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
