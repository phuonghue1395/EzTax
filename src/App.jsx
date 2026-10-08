import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WebSidebar } from './components/WebSidebar';
import { WebTopbar } from './components/WebTopbar';
import { HomeScreen } from './screens/HomeScreen';
import { ReconciliationScreen } from './screens/ReconciliationScreen';
import { TaxScreen } from './screens/TaxScreen';
import { VerificationScreen } from './screens/VerificationScreen';
import { AdvisorScreen } from './screens/AdvisorScreen';

// Modals
import { CashEntryModal } from './components/CashEntryModal';
import { UploadStatementModal } from './components/UploadStatementModal';
import { TransactionDetailModal } from './components/TransactionDetailModal';
import { DiscrepancyWizardModal } from './components/DiscrepancyWizardModal';
import { TaxReportModal } from './components/TaxReportModal';
import { BankShareModal } from './components/BankShareModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { VerifyExternalModal } from './components/VerifyExternalModal';

const AppContent = () => {
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
      {/* Left Sidebar */}
      <WebSidebar />

      {/* Main App Canvas */}
      <main className="web-main">
        <WebTopbar />
        {renderActiveScreen()}
      </main>

      {/* Global Dialogs & Modals */}
      <CashEntryModal />
      <UploadStatementModal />
      <TransactionDetailModal />
      <DiscrepancyWizardModal />
      <TaxReportModal />
      <BankShareModal />
      <VoiceAssistantModal />
      <VerifyExternalModal />

      {/* Toast Notification */}
      {toast && (
        <div className="app-toast">
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
