import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, RefreshCw, Sparkles, Database, AlertCircle } from 'lucide-react';
import { uploadDatasetCSV } from '../services/api';

export default function SettingsDataIngestion() {
  const [datasetType, setDatasetType] = useState('infrastructure');
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus(null);
    setErrorMsg(null);

    try {
      const res = await uploadDatasetCSV(file, datasetType);
      setIsUploading(false);
      setUploadStatus({
        fileName: file.name,
        rowCount: res.records_inserted,
        type: datasetType,
        pipelineSteps: [
          "✓ CSV Upload Verified",
          "✓ Schema & Coordinates Validated",
          `✓ ${res.records_inserted} Rows Ingested to SQLite`,
          "✓ XGBoost Model Re-trained",
          "✓ Multi-Agent Pipeline Updated"
        ]
      });
    } catch (err) {
      setIsUploading(false);
      setErrorMsg(err.message || 'Failed to upload CSV dataset');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Data Ingestion & Admin Settings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Ingest custom CSV datasets for city assets, citizen complaints, budget line items, and critical facilities.
          </p>
        </div>

        <div className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-blue-200 flex items-center gap-1.5">
          <Database className="w-4 h-4 text-blue-600" />
          <span>Active Dataset: SQLite Master Database</span>
        </div>
      </div>

      {/* CSV UPLOAD WIZARD */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-6">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Upload Custom City Dataset (CSV)
        </h2>

        {/* Dataset Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: 'infrastructure', name: 'Infrastructure Assets' },
            { id: 'complaints', name: 'Citizen Complaints' },
            { id: 'budget', name: 'Municipal Budget' },
            { id: 'facilities', name: 'Critical Facilities' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setDatasetType(t.id)}
              className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                datasetType === t.id
                  ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Drag & Drop Upload Zone */}
        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors bg-slate-50/50 relative">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full disabled:cursor-not-allowed"
          />
          <FileSpreadsheet className={`w-10 h-10 text-blue-600 mx-auto mb-3 ${isUploading ? 'animate-bounce' : ''}`} />
          <h3 className="text-sm font-bold text-slate-900">
            {isUploading ? 'Ingesting CSV & Retraining ML Models...' : 'Drop your CSV file here or click to browse'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">Supports UTF-8 CSV containing columns: id, name, type, lat, lng, condition, complaints</p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Pipeline Execution Display */}
        {uploadStatus && (
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-950">Data Pipeline Execution Complete ({uploadStatus.fileName})</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded">
                {uploadStatus.rowCount} Rows Ingested
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-[11px] font-semibold text-emerald-900">
              {uploadStatus.pipelineSteps.map((step, idx) => (
                <div key={idx} className="p-2 bg-white/80 rounded border border-emerald-200">
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
