import React from 'react';
import { Database, Activity, ArrowRight, X } from 'lucide-react';

export default function DemoBanner({ currentStep, setStep, onClose, onNavigate }) {
  const steps = [
    {
      title: "1. City Health Overview",
      desc: "Live analytics from ingested Hospitals, Grid Outages, Water Networks, and Census Datasets.",
      actionLabel: "Go to Overview",
      action: () => onNavigate('overview')
    },
    {
      title: "2. Trigger Real AI Agent Pipeline",
      desc: "Execute live multi-agent workflow graph operating on real SQLite infrastructure assets.",
      actionLabel: "Open AI Agents",
      action: () => onNavigate('agents')
    },
    {
      title: "3. Real-Time Risk & Priority Scoring",
      desc: "ML model evaluates actual failure probabilities based on hospital capacities & outage histories.",
      actionLabel: "View Map & Assets",
      action: () => onNavigate('overview')
    },
    {
      title: "4. RAG Vector Policy Evidence",
      desc: "Query live FAISS vector store containing Municipal Infrastructure Policies & Guidelines.",
      actionLabel: "Open RAG Documents",
      action: () => onNavigate('documents')
    },
    {
      title: "5. Real Knapsack Budget Optimizer",
      desc: "Optimize municipal fund allocation dynamically to maximize citizen protection reach.",
      actionLabel: "Open Budget Optimizer",
      action: () => onNavigate('budget')
    }
  ];

  const stepObj = steps[currentStep] || steps[0];

  return (
    <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 text-white px-6 py-2.5 border-b border-emerald-800/40 shadow-sm sticky top-16 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Status Badge */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                REAL DATASET ENGINE ACTIVE
              </span>
              <h2 className="text-xs font-bold text-white">{stepObj.title}</h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">{stepObj.desc}</p>
          </div>
        </div>

        {/* Step Progress & Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setStep(idx);
                  s.action();
                }}
                className={`w-7 h-1.5 rounded-full transition-all ${
                  idx === currentStep
                    ? 'bg-emerald-400 w-10'
                    : idx < currentStep
                    ? 'bg-emerald-600'
                    : 'bg-slate-700'
                }`}
                title={s.title}
              />
            ))}
          </div>

          <button
            onClick={() => {
              stepObj.action();
              if (currentStep < steps.length - 1) {
                setStep(currentStep + 1);
              }
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>{stepObj.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md"
            title="Dismiss Status Bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
