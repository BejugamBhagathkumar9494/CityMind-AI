import React from 'react';
import { Sparkles, Play, CheckCircle2, ChevronRight, X, ArrowRight } from 'lucide-react';

export default function DemoBanner({ currentStep, setStep, onClose, onNavigate }) {
  const steps = [
    {
      time: "0:00 - 0:20",
      title: "1. City Health Overview",
      desc: "Review city KPIs: 12,842 Complaints, 152 Assets at Risk, ₹10 Cr Budget.",
      actionLabel: "Go to Overview",
      action: () => onNavigate('overview')
    },
    {
      time: "0:20 - 0:45",
      title: "2. Trigger Agent Pipeline",
      desc: "Navigate to AI Agents page and click 'Run City Analysis'.",
      actionLabel: "Open AI Agents",
      action: () => onNavigate('agents')
    },
    {
      time: "0:45 - 1:20",
      title: "3. Multi-Agent Orchestration",
      desc: "Watch Complaint → Risk → Budget → Impact → Planning → Decision agents execute.",
      actionLabel: "View Agents Working",
      action: () => onNavigate('agents')
    },
    {
      time: "1:20 - 1:50",
      title: "4. Top Priority AI Action",
      desc: "Inspect Top Recommendation: MG Road Flyover (Risk 87%, 35k citizens, ₹1.25 Cr).",
      actionLabel: "View Recommendation",
      action: () => onNavigate('overview')
    },
    {
      time: "1:50 - 2:20",
      title: "5. RAG Policy Evidence",
      desc: "Ask 'Why?' to view exact municipal policy citations (Road Policy 2024 Section 4.2).",
      actionLabel: "Open RAG Documents",
      action: () => onNavigate('documents')
    },
    {
      time: "2:20 - 2:45",
      title: "6. Optimize Budget",
      desc: "Click 'Optimize Budget' to re-allocate ₹10 Cr maximizing citizen reach.",
      actionLabel: "Open Budget Optimizer",
      action: () => onNavigate('budget')
    },
    {
      time: "2:45 - 3:00",
      title: "7. Impact Summary",
      desc: "Before CityMind (Fragmented) → After CityMind (Unified AI Decision Intelligence).",
      actionLabel: "View Analytics",
      action: () => onNavigate('analytics')
    }
  ];

  const stepObj = steps[currentStep] || steps[0];

  return (
    <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-900 text-white px-6 py-3 border-b border-blue-800 shadow-md sticky top-16 z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-blue-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/30 text-blue-200 text-[10px] font-mono px-2 py-0.5 rounded border border-blue-400/30">
                HACKATHON DEMO MODE • {stepObj.time}
              </span>
              <h2 className="text-xs font-bold text-white">{stepObj.title}</h2>
            </div>
            <p className="text-xs text-blue-100/90 mt-0.5">{stepObj.desc}</p>
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
                    ? 'bg-blue-400 w-10'
                    : idx < currentStep
                    ? 'bg-blue-600'
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
            className="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>{stepObj.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md"
            title="Exit Demo Guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
