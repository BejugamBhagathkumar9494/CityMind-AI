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
  ExternalLink
} from 'lucide-react';
import { fetchInfrastructure } from '../services/api';

export default function InfrastructureTable({ onOpenInspection }) {
  const [assets, setAssets] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('priority_score');
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    fetchInfrastructure(typeFilter, urgencyFilter).then(data => setAssets(data));
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
            Detailed asset register with XGBoost failure probabilities, priority scores, and maintenance cost estimates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Exporting Infrastructure Register to CSV...")}
            className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Asset ID, name, ward location..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Type Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Road">Roads</option>
              <option value="Water">Water Network</option>
              <option value="Electricity">Electricity Grid</option>
              <option value="Public Transport">Public Transport</option>
              <option value="Critical Facility">Critical Facilities</option>
            </select>
          </div>

          {/* Urgency Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Urgency:</span>
            <select
              value={urgencyFilter}
              onChange={(e) => setUrgencyFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Urgencies</option>
              <option value="Critical">Critical Only</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium</option>
              <option value="Low">Operational Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enterprise Data Grid Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Asset ID & Name</th>
                <th className="py-3 px-3">Type & Location</th>
                <th className="py-3 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort('condition_rating')}>
                  <div className="flex items-center gap-1">
                    <span>Condition</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort('risk_score')}>
                  <div className="flex items-center gap-1">
                    <span>Risk Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 cursor-pointer hover:text-slate-900" onClick={() => handleSort('failure_probability')}>
                  <div className="flex items-center gap-1">
                    <span>Failure Prob</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Complaints</th>
                <th className="py-3 px-3">Citizens Reach</th>
                <th className="py-3 px-3">Repair Cost</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredAssets.map((asset) => {
                const isCritical = asset.risk_score >= 85;
                const isHigh = asset.risk_score >= 70 && asset.risk_score < 85;

                return (
                  <tr
                    key={asset.id}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                    onClick={() => onOpenInspection && onOpenInspection(asset)}
                  >
                    <td className="py-3 px-4">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">{asset.id}</span>
                        <span className="font-bold text-slate-900 text-xs">{asset.name}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {asset.type}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5">{asset.location}</p>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${asset.condition_rating < 3 ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ width: `${(asset.condition_rating / 10) * 100}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-900">{asset.condition_rating}/10</span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 font-extrabold px-2 py-0.5 rounded-full text-[10px] ${
                        isCritical
                          ? 'bg-red-100 text-red-700'
                          : isHigh
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {isCritical && <ShieldAlert className="w-3 h-3" />}
                        {asset.risk_score}%
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-mono text-xs font-semibold text-slate-800">
                        {(asset.failure_probability * 100).toFixed(0)}%
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-900">{asset.complaints_count}</span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-slate-800 font-medium">{asset.population_affected?.toLocaleString()}</span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-bold text-blue-700">₹{asset.repair_cost_inr} Cr</span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenInspection) onOpenInspection(asset);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-xs font-bold hover:underline flex items-center gap-0.5 justify-end ml-auto"
                      >
                        <span>Inspect</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
