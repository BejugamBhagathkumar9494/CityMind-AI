import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DemoBanner from './components/DemoBanner';
import Overview from './components/Overview';
import InfrastructureMap from './components/InfrastructureMap';
import InfrastructureTable from './components/InfrastructureTable';
import Complaints from './components/Complaints';
import AIAgents from './components/AIAgents';
import BudgetPlanning from './components/BudgetPlanning';
import Analytics from './components/Analytics';
import Reports from './components/Reports';
import DocumentsRAG from './components/DocumentsRAG';
import Alerts from './components/Alerts';
import SettingsDataIngestion from './components/SettingsDataIngestion';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import CityAssistantWidget from './components/CityAssistantWidget';
import AssetInspectionDrawer from './components/AssetInspectionDrawer';
import RoadsModule from './components/RoadsModule';
import WaterModule from './components/WaterModule';
import EnergyModule from './components/EnergyModule';
import TransportModule from './components/TransportModule';
import DepartmentModule from './components/DepartmentModule';
import { signOutUser } from './services/supabaseClient';

export default function App() {
  const [viewMode, setViewMode] = useState('dashboard'); // 'landing' | 'dashboard' | 'auth'
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCity, setSelectedCity] = useState('bengaluru');
  
  // Auth state persistent session
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('citymind_user');
      return saved ? JSON.parse(saved) : { name: 'Admin Officer', email: 'admin@citymind.ai', role: 'City Admin Officer' };
    } catch (e) {
      return { name: 'Admin Officer', email: 'admin@citymind.ai', role: 'City Admin Officer' };
    }
  });

  const handleLogout = async () => {
    try {
      await signOutUser();
    } catch (e) {}
    localStorage.removeItem('citymind_user');
    setUser(null);
    setViewMode('landing');
  };

  // 3-Minute Hackathon Demo Mode
  const [isDemoActive, setIsDemoActive] = useState(true);
  const [demoStep, setDemoStep] = useState(0);

  // Asset Inspection Drawer state
  const [inspectedAsset, setInspectedAsset] = useState(null);

  // Dedicated SaaS Auth Page (Full-Screen 100vw x 100vh)
  if (viewMode === 'auth') {
    return (
      <AuthPage
        onLoginSuccess={(u) => {
          setUser(u);
          setViewMode('dashboard');
        }}
        onBackToLanding={() => setViewMode('landing')}
      />
    );
  }

  // Landing Page Route: Whenever logged out or in 'landing' mode
  if (viewMode === 'landing' || !user) {
    return (
      <LandingPage
        onExplore={() => {
          if (!user) {
            setViewMode('auth');
          } else {
            setViewMode('dashboard');
          }
        }}
        onOpenAuth={() => setViewMode('auth')}
      />
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Overview
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenInspection={(asset) => setInspectedAsset(asset)}
          />
        );
      case 'infrastructure':
        return (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
              <h2 className="text-sm font-bold text-slate-900 mb-3">Geographic Infrastructure Risk Map</h2>
              <InfrastructureMap height="450px" selectedCity={selectedCity} onSelectAsset={(asset) => setInspectedAsset(asset)} />
            </div>
            <InfrastructureTable onOpenInspection={(asset) => setInspectedAsset(asset)} />
          </div>
        );
      case 'roads':
        return <RoadsModule onOpenInspection={(asset) => setInspectedAsset(asset)} />;
      case 'water':
        return <WaterModule onOpenInspection={(asset) => setInspectedAsset(asset)} />;
      case 'energy':
        return <EnergyModule onOpenInspection={(asset) => setInspectedAsset(asset)} />;
      case 'transport':
        return <TransportModule onOpenInspection={(asset) => setInspectedAsset(asset)} />;
      case 'department':
        return <DepartmentModule />;
      case 'complaints':
        return <Complaints />;
      case 'agents':
        return <AIAgents />;
      case 'budget':
        return <BudgetPlanning />;
      case 'analytics':
        return <Analytics />;
      case 'reports':
        return <Reports />;
      case 'documents':
        return <DocumentsRAG />;
      case 'alerts':
        return <Alerts />;
      case 'settings':
        return <SettingsDataIngestion />;
      default:
        return <Overview onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen text-slate-900 selection:bg-blue-100 selection:text-blue-700 font-sans">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartDemo={() => {
          setIsDemoActive(true);
          setDemoStep(0);
          setActiveTab('overview');
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <Topbar
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          onOpenAuth={() => setViewMode('auth')}
          onShowLanding={() => setViewMode('landing')}
          onStartDemo={() => setIsDemoActive(true)}
          user={user}
          onLogout={handleLogout}
        />

        {/* Hackathon Demo Walkthrough Banner */}
        {isDemoActive && (
          <DemoBanner
            currentStep={demoStep}
            setStep={setDemoStep}
            onClose={() => setIsDemoActive(false)}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        )}

        {/* View Body */}
        <main className="flex-1 p-6 overflow-y-auto">
          {renderTabContent()}
        </main>
      </div>

      {/* Floating City AI Assistant Chat Widget */}
      <CityAssistantWidget />

      {/* Slide-over Asset Inspection Drawer */}
      <AssetInspectionDrawer
        assetId={inspectedAsset}
        onClose={() => setInspectedAsset(null)}
      />
    </div>
  );
}
