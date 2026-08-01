import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ShieldAlert, Filter, Search, MapPin, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import { fetchInfrastructure } from '../services/api';

// Professional Smart City DivIcon with color coding
const createSmartCityMarker = (riskScore) => {
  let color = '#10B981'; // Green Low (< 40%)
  if (riskScore >= 75) color = '#EF4444'; // Red Critical (>= 75%)
  else if (riskScore >= 60) color = '#F97316'; // Orange High (>= 60%)
  else if (riskScore >= 40) color = '#F59E0B'; // Yellow Medium (>= 40%)

  return L.divIcon({
    className: 'smart-city-gis-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: 800;
        font-family: sans-serif;
      ">
        ${Math.round(riskScore)}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export default function InfrastructureMap({ height = "600px", onSelectAsset }) {
  const [assets, setAssets] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMapData() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchInfrastructure(selectedType);
        setAssets(data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch GIS map assets.');
      } finally {
        setIsLoading(false);
      }
    }
    loadMapData();
  }, [selectedType]);

  const defaultCenter = [12.9716, 77.5946]; // Bengaluru Metro GIS Center

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
  });

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-200" style={{ height }}>
      
      {/* GIS Control Overlay Toolbar */}
      <div className="absolute top-3 left-3 right-3 z-[400] bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-3 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-semibold">
        
        {/* Department / Sector Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
          <span className="text-slate-500 mr-1 text-[11px] uppercase font-bold">Department:</span>
          {['All', 'Road', 'Water', 'Electricity', 'Transport', 'Critical Facility'].map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                selectedType === t
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {t === 'Road' ? 'Roads & Bridges' : t === 'Electricity' ? 'Power Grid' : t}
            </button>
          ))}
        </div>

        {/* Live Map Search Input */}
        <div className="relative w-full md:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search GIS markers..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

      </div>

      {/* Map Legend Indicator Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-md space-y-1 text-[11px] font-bold text-slate-700">
        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">XGBoost Risk Legend</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critical Risk (≥ 75%)</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> High Risk (≥ 60%)</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Medium Risk (≥ 40%)</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Low Risk (&lt; 40%)</div>
      </div>

      {/* Leaflet Map Renderer */}
      {isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-2 bg-slate-50">
          <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
          <p className="text-xs font-bold text-slate-600">Rendering Smart City GIS Markers...</p>
        </div>
      ) : error ? (
        <div className="w-full h-full flex items-center justify-center p-6 bg-red-50 text-red-700 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <span>{error}</span>
        </div>
      ) : (
        <MapContainer
          center={defaultCenter}
          zoom={12}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredAssets.map((asset) => {
            const lat = asset.latitude || (defaultCenter[0] + (Math.random() - 0.5) * 0.08);
            const lng = asset.longitude || (defaultCenter[1] + (Math.random() - 0.5) * 0.08);
            const risk = asset.risk_score || Math.round((asset.failure_probability || 0.5) * 100);

            return (
              <Marker
                key={asset.id}
                position={[lat, lng]}
                icon={createSmartCityMarker(risk)}
              >
                <Popup className="smart-city-popup">
                  <div className="p-2 space-y-2 min-w-[220px]">
                    <div className="flex items-center justify-between">
                      <span className="bg-slate-100 text-slate-700 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded">
                        {asset.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        risk >= 75 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        Risk: {risk}%
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-900 text-xs">{asset.name}</h4>
                    <p className="text-[11px] text-slate-500">{asset.location}</p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-700">₹{asset.repair_cost_inr || 1.2} Cr</span>
                      <button
                        onClick={() => onSelectAsset && onSelectAsset(asset.id)}
                        className="bg-blue-600 text-white font-bold px-2.5 py-1 rounded hover:bg-blue-700 text-[10px] flex items-center gap-1"
                      >
                        <span>Inspect AI</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}

    </div>
  );
}
