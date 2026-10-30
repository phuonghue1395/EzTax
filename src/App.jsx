import React, { useState, useEffect } from 'react';
import { VinFastInfotainment } from './vinfast/VinFastInfotainment';
import './vinfast/vinfast.css';

// Existing EzTax ecosystem
import { AppProvider, useApp } from './context/AppContext';
import { WebSidebar } from './components/WebSidebar';
import { WebTopbar } from './components/WebTopbar';
import { HomeScreen } from './screens/HomeScreen';
import { ReconciliationScreen } from './screens/ReconciliationScreen';
import { TaxScreen } from './screens/TaxScreen';
import { VerificationScreen } from './screens/VerificationScreen';
import { AdvisorScreen } from './screens/AdvisorScreen';
import { AlertTriangle, CheckCircle2, Info, Car, FileSpreadsheet } from 'lucide-react';

import { CashEntryModal } from './components/CashEntryModal';
import { UploadStatementModal } from './components/UploadStatementModal';
import { TransactionDetailModal } from './components/TransactionDetailModal';
import { DiscrepancyWizardModal } from './components/DiscrepancyWizardModal';
import { TaxReportModal } from './components/TaxReportModal';
import { BankShareModal } from './components/BankShareModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { VerifyExternalModal } from './components/VerifyExternalModal';

const EzTaxAppContent = () => {
  const { activeTab, isSeniorMode, toast } = useApp();

  useEffect(() => {
    if (isSeniorMode) {
      document.body.classList.add('senior-mode');
    } else {
      document.body.classList.remove('senior-mode');
    }
  }, [isSeniorMode]);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'reconcile':
        return <ReconciliationScreen />;
      case 'tax':
        return <TaxScreen />;
      case 'verify':
        return <VerificationScreen />;
      case 'advisor':
        return <AdvisorScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="web-layout">
      <WebSidebar />
      <main className="web-main">
        <WebTopbar />
        {renderActiveScreen()}
      </main>
      <CashEntryModal />
      <UploadStatementModal />
      <TransactionDetailModal />
      <DiscrepancyWizardModal />
      <TaxReportModal />
      <BankShareModal />
      <VoiceAssistantModal />
      <VerifyExternalModal />

      {toast && (
        <div className={`app-toast toast-${toast.type || 'success'}`}>
          {toast.type === 'error' && <AlertTriangle size={16} color="#FCA5A5" style={{ flexShrink: 0 }} />}
          {toast.type === 'info' && <Info size={16} color="#38BDF8" style={{ flexShrink: 0 }} />}
          {(toast.type === 'success' || !toast.type) && <CheckCircle2 size={16} color="#34D399" style={{ flexShrink: 0 }} />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  // Mode switcher: Default is 'vinfast' as requested in prompt!
  const [appMode, setAppMode] = useState('vinfast'); // 'vinfast' | 'eztax'

  return (
    <div className="app-root-container">
      {/* Floating Project Switcher in the top right corner */}
      <div 
        style={{
          position: 'fixed',
          top: '12px',
          right: '16px',
          zIndex: 99999,
          display: 'flex',
          background: 'rgba(10, 15, 26, 0.95)',
          backdropFilter: 'blur(16px)',
          padding: '4px',
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          gap: '4px'
        }}
      >
        <button
          onClick={() => setAppMode('vinfast')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            background: appMode === 'vinfast' ? 'linear-gradient(135deg, #00F0FF, #0080FF)' : 'transparent',
            color: appMode === 'vinfast' ? '#06181B' : '#94A3B8',
            fontWeight: 800,
            fontSize: '11px',
            padding: '6px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <Car size={14} />
          <span>VinFast AI Infotainment</span>
        </button>
        <button
          onClick={() => setAppMode('eztax')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            background: appMode === 'eztax' ? '#10B981' : 'transparent',
            color: appMode === 'eztax' ? '#FFFFFF' : '#94A3B8',
            fontWeight: 700,
            fontSize: '11px',
            padding: '6px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <FileSpreadsheet size={14} />
          <span>EzTax</span>
        </button>
      </div>

      {/* Main Content */}
      {appMode === 'vinfast' ? (
        <VinFastInfotainment />
      ) : (
        <AppProvider>
          <EzTaxAppContent />
        </AppProvider>
      )}
    </div>
  );
}
