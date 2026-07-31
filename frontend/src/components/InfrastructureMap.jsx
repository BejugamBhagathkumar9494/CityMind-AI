import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ShieldAlert, AlertTriangle, Layers, Filter, CheckCircle2, X } from 'lucide-react';
import { fetchInfrastructure } from '../services/api';

// Custom SVG map icons
const createCustomMarker = (riskScore) => {
  let color = '#10B981'; // Green low
  if (riskScore >= 85) color = '#EF4444'; // Red critical
  else if (riskScore >= 70) color = '#F97316'; // Orange high
  else if (riskScore >= 50) color = '#F59E0B'; // Yellow medium

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 9px;
        font-weight: bold;
      ">
        ${Math.round(riskScore)}
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
};

export default function InfrastructureMap({ height = "600px", onSelectAsset }) {
  const [assets, setAssets] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAsset, setSelectedAsset] = useState(null);

  useEffect(() => {
    fetchInfrastructure(selectedType).then(data => setAssets(data));
  }, [selectedType]);

  const defaultCenter = [12.9716, 77.5946]; // Bengaluru Metro Center

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-200" style={{ height }}>
      {/* Layer Filter Toolbar overlay */}
      <div className="absolute top-3 left-3 z-[400] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-2 shadow-md flex items-center gap-1.5 text-xs font-semibold">
        <Filter className="w-3.5 h-3.5 text-slate-500 ml-1" />
        <span className="text-slate-500 mr-1 text-[11px]">Filter Layer:</span>
        {['All', 'Road', 'Water', 'Electricity', 'Public Transport', 'Critical Facility'].map(t => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
              selectedType === t
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Map Risk Legend overlay */}
      <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-2.5 shadow-md text-[11px] flex items-center gap-3">
        <span className="font-bold text-slate-700">Risk Marker Legend:</span>
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critical (&ge;85%)</div>
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> High (&ge;70%)</div>
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium (&ge;50%)</div>
        <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low (&lt;50%)</div>
      </div>

      {/* Leaflet Map */}
      <MapContainer center={defaultCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {assets.map((asset) => (
          <Marker
            key={asset.id}
            position={[asset.latitude, asset.longitude]}
            icon={createCustomMarker(asset.risk_score)}
            eventHandlers={{
              click: () => {
                setSelectedAsset(asset);
                if (onSelectAsset) onSelectAsset(asset);
              }
            }}
          >
            <Popup>
              <div className="p-1 max-w-xs font-sans">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1">
                  <span className="text-[10px] font-mono text-slate-400">{asset.id}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    asset.risk_score >= 85 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    Risk {asset.risk_score}%
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{asset.name}</h4>
                <p className="text-[11px] text-slate-600 mt-1">{asset.location}</p>
                <div className="mt-2 text-[10px] text-slate-500 space-y-0.5">
                  <div>Failure Prob: <strong className="text-slate-800">{(asset.failure_probability * 100).toFixed(0)}%</strong></div>
                  <div>Reach: <strong className="text-slate-800">{asset.population_affected?.toLocaleString()} citizens</strong></div>
                  <div>Repair Cost: <strong className="text-slate-800">₹{asset.repair_cost_inr} Cr</strong></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Detail Inspection Drawer Sidebar */}
      {selectedAsset && (
        <div className="absolute top-0 right-0 h-full w-80 bg-white border-l border-slate-200 shadow-2xl z-[500] p-5 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-slate-400">{selectedAsset.id}</span>
                <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{selectedAsset.name}</h3>
              </div>
              <button
                onClick={() => setSelectedAsset(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">XGBoost Risk Rating</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-red-600">{selectedAsset.risk_score}%</span>
                  <span className="text-xs font-semibold text-slate-600">({(selectedAsset.failure_probability * 100).toFixed(0)}% Failure Prob)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400">Asset Type</span>
                  <p className="font-semibold text-slate-800">{selectedAsset.type}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400">Age</span>
                  <p className="font-semibold text-slate-800">{selectedAsset.age_years} Years</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400">Complaints</span>
                  <p className="font-semibold text-slate-800">{selectedAsset.complaints_count}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400">Repair Cost</span>
                  <p className="font-semibold text-blue-600">₹{selectedAsset.repair_cost_inr} Cr</p>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs">
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Recommended Action</span>
                <p className="font-medium text-blue-950 mt-1">{selectedAsset.recommended_action}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => alert(`Initiated repair workflow for ${selectedAsset.name}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-xl transition-colors"
            >
              Approve Repair Work Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
