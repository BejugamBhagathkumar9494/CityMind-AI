import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, Database, FileText, ChevronRight, Loader2 } from 'lucide-react';
import { askCityAssistant } from '../services/api';

const QUICK_QUESTIONS = [
  "Which road should be repaired first? Why?",
  "Where are the highest complaints?",
  "What will happen if budget is reduced?",
  "Which department requires more funding?",
  "What is the city's health score?"
];

export default function CityAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Hello Officer! I am your City AI Assistant. Ask me anything about municipal infrastructure risk, citizen complaint hotspots, budget cuts, or department SLA performance.',
      citations: []
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (qText) => {
    const textToSend = qText || query;
    if (!textToSend.trim() || isLoading) return;

    // Add user message
    const userMsg = { sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const res = await askCityAssistant(textToSend);
      const assistantMsg = {
        sender: 'assistant',
        text: res.answer,
        citations: res.citations || []
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `Sorry, I encountered an error: ${err.message}`,
          citations: []
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9990] bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:to-indigo-800 text-white p-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 font-bold text-xs ring-4 ring-blue-500/20 active:scale-95"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <span className="hidden sm:inline pr-1">City AI Assistant</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9995] w-[92vw] sm:w-[460px] h-[580px] bg-white border border-slate-200 rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">
                C
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                  <span>City AI Assistant</span>
                  <span className="bg-blue-500/30 text-blue-200 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-400/30">
                    RAG Grounded
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300 font-medium">Zero Hallucinations • Database Verified</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="font-bold text-slate-400 shrink-0">Prompts:</span>
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 font-semibold shrink-0 transition-all text-[11px]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none font-medium'
                      : 'bg-slate-100 text-slate-900 border border-slate-200/80 rounded-bl-none leading-relaxed'
                  }`}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {(() => {
                    const validCitations = (m.citations || []).filter(c => 
                      typeof c === 'string' 
                        ? !c.includes('Database Table') && !c.includes('Table: public') && !c.includes('Database Record')
                        : true
                    );
                    if (validCitations.length === 0) return null;
                    return (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 space-y-1">
                        <div className="font-bold flex items-center gap-1 text-slate-600">
                          <FileText className="w-3 h-3 text-blue-600" />
                          <span>Policy & Statutory Citations:</span>
                        </div>
                        {validCitations.map((c, ci) => (
                          <div key={ci} className="font-sans font-semibold text-slate-700 bg-white px-2 py-1 rounded-md border border-slate-200 block">
                            {typeof c === 'object' ? `${c.doc_title || 'Policy Clause'} (Section: ${c.relevant_section || 'DMC Act'})` : c}
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-500 text-xs font-semibold p-2">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Querying database records & RAG policies...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask city AI assistant about roads, complaints, budget cuts..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
