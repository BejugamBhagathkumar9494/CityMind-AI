import React, { useState } from 'react';
import { FileText, Download, Sparkles, CheckCircle2, Building, ShieldAlert } from 'lucide-react';
import jsPDF from 'jspdf';

export default function Reports() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExportPDF = () => {
    setIsGenerating(true);
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("CityMind AI — Executive City Intelligence Report", 14, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Jurisdiction: Bengaluru Metro Region`, 14, 28);

    doc.setLineWidth(0.5);
    doc.line(14, 32, 196, 32);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("1. Executive Summary", 14, 42);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const summary = [
      "CityMind AI analyzed 12,842 citizen complaints and evaluated 1,245 infrastructure assets across 5 municipal departments.",
      "XGBoost risk models identified 152 assets operating above critical degradation thresholds (80%+ failure probability).",
      "Algorithmic budget optimization re-allocated Rs 6.25 Cr of the Rs 10.00 Cr budget to protect 243,000 citizens."
    ];
    doc.text(summary, 14, 50);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("2. Top Priority AI Action Recommendations", 14, 80);

    const recs = [
      "#1 Repair Road — MG Road Stretch | Risk: 92.5% | Citizens: 35,000 | Cost: Rs 1.25 Cr",
      "#2 Fix Water Pipeline — Sector 12 | Risk: 84.0% | Citizens: 28,000 | Cost: Rs 0.85 Cr",
      "#3 Hospital Backup Power Feed | Risk: 89.0% | Citizens: 18,000 | Cost: Rs 0.45 Cr"
    ];
    doc.text(recs, 14, 90);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("3. Municipal Policy Justification (FAISS RAG)", 14, 120);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Cited Document: Municipal Road Infrastructure Maintenance Policy 2024 (SECTION 4.2)", 14, 128);
    doc.text("Emergency clearance mandated for arterial corridors exceeding 25,000 PVUs with condition below 3.0.", 14, 134);

    doc.save("CityMind_Executive_City_Intelligence_Report.pdf");
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Executive City Intelligence Reports</h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated PDF synthesis incorporating executive summary, high-risk asset audits, budget allocations, and RAG policy evidence.
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>{isGenerating ? 'Generating PDF...' : 'Download Executive Report (PDF)'}</span>
        </button>
      </div>

      {/* REPORT PREVIEW CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-card max-w-4xl mx-auto space-y-6 font-sans">
        <div className="border-b border-slate-200 pb-6 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-widest">OFFICIAL MUNICIPAL DOCUMENT</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">CityMind AI — Executive City Intelligence Report</h2>
            <p className="text-xs text-slate-500 mt-1">Prepared for City Commissioner & Department Heads • Bengaluru Metro Region</p>
          </div>
          <div className="text-right">
            <span className="bg-slate-900 text-white text-xs font-mono px-3 py-1 rounded-lg">FY 2026-Q3</span>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm mb-1">1. Executive Summary</h3>
            <p>
              CityMind AI combined datasets across road networks, water mains, power substations, transit hubs, and 12,842 citizen complaint tickets.
              Multi-agent execution identified <strong>MG Road Flyover</strong> as the top priority repair action with 92.5% risk rating and 35,000 residents impacted.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm mb-2">2. Key Action Recommendations</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                <span><strong>#1 Repair Road — MG Road Stretch</strong> (Failure Prob: 87%, Reach: 35k)</span>
                <span className="font-bold text-blue-600">₹1.25 Cr</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                <span><strong>#2 Fix Water Trunk Line — Sector 12</strong> (Failure Prob: 78%, Reach: 28k)</span>
                <span className="font-bold text-blue-600">₹0.85 Cr</span>
              </li>
              <li className="flex items-center justify-between p-2 bg-white rounded border border-slate-200">
                <span><strong>#3 Hospital Backup Power Feed Upgrade</strong> (Failure Prob: 83%, Reach: 18k)</span>
                <span className="font-bold text-blue-600">₹0.45 Cr</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <h3 className="font-extrabold text-blue-950 text-sm mb-1">3. RAG Policy Evidence Justification</h3>
            <p className="text-blue-900">
              Cited Document: <em>Municipal Road Infrastructure Maintenance Policy 2024 (SECTION 4.2)</em>.
              "Arterial corridors with daily traffic exceeding 25,000 PVUs yielding condition rating below 3.0 mandate emergency budget clearance within 7 days."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
