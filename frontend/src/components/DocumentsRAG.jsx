import React, { useState } from 'react';
import { FolderGit2, Search, FileText, Upload, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import { queryRAG } from '../services/api';

export default function DocumentsRAG() {
  const [query, setQuery] = useState("Why did CityMind recommend repairing MG Road flyover first?");
  const [ragResult, setRagResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setIsSearching(true);
    const res = await queryRAG(query);
    setRagResult(res);
    setIsSearching(false);
  };

  const policyDocs = [
    { id: "DOC-POL-001", title: "Municipal Road Infrastructure Maintenance Policy 2024", category: "Roads Policy", chunks: 4 },
    { id: "DOC-POL-002", title: "Smart City Water Supply & Sanitation Standards", category: "Water Guidelines", chunks: 3 },
    { id: "DOC-POL-003", title: "Urban Power Grid Resilience & Critical Backup Guidelines", category: "Energy Regulations", chunks: 5 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">RAG Policy Document Intelligence</h1>
          <p className="text-xs text-slate-500 mt-1">
            FAISS vector search over municipal policy PDF standards to provide legally backed AI recommendations.
          </p>
        </div>

        <button
          onClick={() => alert("Upload Policy PDF feature ready. Ingesting into FAISS vector store...")}
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Upload className="w-4 h-4 text-blue-600" />
          <span>Upload Municipal Policy PDF</span>
        </button>
      </div>

      {/* RAG QUERY SEARCH BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Query Policy RAG Vector Index
        </h2>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask RAG why a decision was made (e.g. 'Why did CityMind recommend repairing MG Road first?')"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all shrink-0"
          >
            <Sparkles className={`w-4 h-4 ${isSearching ? 'animate-spin' : ''}`} />
            <span>{isSearching ? 'Querying FAISS...' : 'Ask AI Policy'}</span>
          </button>
        </form>
      </div>

      {/* RAG RESULTS DISPLAY */}
      {ragResult && (
        <div className="bg-white border border-blue-200 rounded-2xl p-6 shadow-card space-y-4 ring-2 ring-blue-500/20">
          <div className="flex items-center justify-between border-b border-blue-100 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900">RAG Semantic Search Reasoning</h3>
            </div>
            <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              FAISS Vector Similarity High
            </span>
          </div>

          <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-950 font-medium leading-relaxed">
            <strong className="block text-blue-900 mb-1">AI Explanation & Policy Justification:</strong>
            {ragResult.ai_explanation}
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Cited Policy Documents:</span>
            {ragResult.citations.map((c, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900">{c.doc_title}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Confidence {(c.confidence_score * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-xs text-slate-700 italic bg-white p-2.5 rounded border border-slate-200 mt-2 font-mono">
                  "{c.relevant_section}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INDEXED POLICY DOCUMENTS REGISTER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
          Indexed Municipal Guidelines Register
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {policyDocs.map((doc) => (
            <div key={doc.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-bold">{doc.id}</span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">{doc.title}</h4>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                  <span className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-semibold">{doc.category}</span>
                  <span>{doc.chunks} Embeddings</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
