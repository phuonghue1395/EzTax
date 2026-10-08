import React, { createContext, useContext, useState, useEffect } from 'react';
import { MERCHANT_PHO_BAC_BA, INITIAL_TRANSACTIONS, INITIAL_DAILY_CASH_CLOSINGS } from '../utils/mockData';
import { calculateTax, TAX_MANDATORY_SCALE, TAX_LEGAL_FRAMEWORK, BUSINESS_SECTORS } from '../utils/taxRules';
import { playSound } from '../utils/sound';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const merchant = MERCHANT_PHO_BAC_BA;
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'reconcile' | 'tax' | 'verify' | 'advisor'
  const [isSeniorMode, setIsSeniorMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Sector & PIT Method selection (Theo Nghị định 141/2026/NĐ-CP)
  const [selectedSectorId, setSelectedSectorId] = useState('food_beverage');
  const [pitMethod, setPitMethod] = useState('revenue'); // 'revenue' (PP1) | 'income' (PP2)
  const [quarterExpenses, setQuarterExpenses] = useState(merchant.quarterSummary.totalExpenses || 760000000);
  const [todayExpenses, setTodayExpenses] = useState(merchant.summaryToday.estimatedExpensesToday || 9500000);

  // Transactions State
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [dailyCashClosings, setDailyCashClosings] = useState(INITIAL_DAILY_CASH_CLOSINGS);
  const [filterStatus, setFilterStatus] = useState('all');

  // Modals & Sheets
  const [cashModalOpen, setCashModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [discrepancyTx, setDiscrepancyTx] = useState(null);
  const [taxReportModalOpen, setTaxReportModalOpen] = useState(false);
  const [bankShareModalOpen, setBankShareModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [externalVerifyModalOpen, setExternalVerifyModalOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Cash amount for today
  const todayCashRecord = dailyCashClosings.find(d => d.date === '08/10/2026');
  const cashAmount = todayCashRecord && todayCashRecord.status === 'closed' ? todayCashRecord.amount : 0;

  // Bank amount & Wallet amount from today's transactions
  const bankAmount = transactions
    .filter(t => t.source === 'bank' && t.isTaxable !== false)
    .reduce((acc, t) => acc + t.amount, 0) + (10450000 - 1145000); // Base bank QR sync

  const walletAmount = transactions
    .filter(t => t.source === 'wallet' && t.isTaxable !== false)
    .reduce((acc, t) => acc + t.amount, 0) + (2800000 - 150000); // Base MoMo sync

  // Today Total Revenue
  const todayRevenue = bankAmount + walletAmount + cashAmount;

  // Counts
  const matchedCount = transactions.filter(t => t.status === 'matched').length + 215;
  const pendingCount = transactions.filter(t => t.status === 'pending').length;
  const issueCount = transactions.filter(t => t.status === 'issue').length;

  // Check if yesterday cash was forgotten
  const isYesterdayCashForgotten = dailyCashClosings.some(d => d.date === '07/10/2026' && d.status === 'forgotten');

  // Tax calculations theo Nghị định 141/2026/NĐ-CP
  const taxInfo = calculateTax({
    revenue: todayRevenue,
    expenses: todayExpenses,
    sectorId: selectedSectorId,
    pitMethod: pitMethod,
    isQuarterly: false,
    annualEstimatedRevenue: merchant.businessScale.annualProjectedRevenue
  });

  const quarterTaxInfo = calculateTax({
    revenue: merchant.quarterSummary.totalRevenue,
    expenses: quarterExpenses,
    sectorId: selectedSectorId,
    pitMethod: pitMethod,
    isQuarterly: true,
    annualEstimatedRevenue: merchant.businessScale.annualProjectedRevenue
  });

  const annualTaxInfo = calculateTax({
    revenue: merchant.businessScale.annualProjectedRevenue,
    expenses: merchant.businessScale.annualProjectedExpenses,
    sectorId: selectedSectorId,
    pitMethod: pitMethod,
    isQuarterly: false
  });

  // Close daily cash total (1 time per day at end of day)
  const closeDailyCash = (dateStr, amount) => {
    setDailyCashClosings(prev => prev.map(d => {
      if (d.date === dateStr) {
        return {
          ...d,
          amount: Number(amount),
          status: 'closed',
          statusLabel: 'Đã hoàn thành bảng kê',
          closedAt: new Date().toLocaleString('vi-VN')
        };
      }
      return d;
    }));

    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.8 }
    });
  };

  // Resolve Discrepancy / Transaction
  const resolveTransaction = (txId, resolutionType, customNote) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === txId) {
        if (resolutionType === 'non_taxable') {
          return {
            ...t,
            status: 'matched',
            statusLabel: 'Đã xác nhận Tiền cá nhân',
            isTaxable: false,
            taxCalculated: 0,
            verifiedStamp: true,
            note: customNote || 'Tiền cá nhân - Không tính thuế'
          };
        } else if (resolutionType === 'create_invoice') {
          return {
            ...t,
            status: 'matched',
            statusLabel: 'Đã xuất HĐĐT máy tính tiền',
            invoiceId: `HĐ-00${Math.floor(345 + Math.random() * 50)}`,
            invoiceTime: 'Vừa xong',
            isTaxable: true,
            verifiedStamp: true,
            note: customNote || 'Đã xuất hóa đơn điện tử tự động từ máy tính tiền'
          };
        }
      }
      return t;
    }));

    playSound('success', soundEnabled);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 }
    });
    showToast('Đã xử lý xong! Số liệu đã được cập nhật an toàn 🟢', 'success');
  };

  // Auto Reconcile All Pending
  const autoReconcileAll = () => {
    playSound('click', soundEnabled);
    setTransactions(prev => prev.map(t => {
      if (t.status === 'pending') {
        return {
          ...t,
          status: 'matched',
          statusLabel: 'Đã xuất HĐĐT máy tính tiền',
          invoiceId: `HĐ-00345`,
          invoiceTime: 'Vừa xong',
          isTaxable: true,
          verifiedStamp: true,
          note: 'Đã tự động đối soát và phát hành hóa đơn điện tử'
        };
      }
      return t;
    }));

    setTimeout(() => {
      playSound('success', soundEnabled);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 }
      });
      showToast('Tuyệt vời! Đã tự động đối soát và khớp toàn bộ 🟢', 'success');
    }, 400);
  };

  const value = {
    merchant,
    isSeniorMode,
    setIsSeniorMode,
    soundEnabled,
    setSoundEnabled,
    playSound: (type) => playSound(type, soundEnabled),

    // Navigation
    activeTab,
    setActiveTab,

    // Tax settings & state
    selectedSectorId,
    setSelectedSectorId,
    pitMethod,
    setPitMethod,
    quarterExpenses,
    setQuarterExpenses,
    todayExpenses,
    setTodayExpenses,
    businessSectors: BUSINESS_SECTORS,
    decreeInfo: TAX_LEGAL_FRAMEWORK,

    // Data & Calculations
    transactions,
    dailyCashClosings,
    closeDailyCash,
    isYesterdayCashForgotten,
    filterStatus,
    setFilterStatus,
    todayRevenue,
    yesterdayRevenue: merchant.summaryToday.yesterdayRevenue,
    bankAmount,
    walletAmount,
    cashAmount,
    matchedCount,
    pendingCount,
    issueCount,
    taxInfo,
    quarterTaxInfo,
    annualTaxInfo,
    scaleInfo: TAX_MANDATORY_SCALE,

    // Actions
    resolveTransaction,
    autoReconcileAll,
    showToast,
    toast,

    // Modals
    cashModalOpen,
    setCashModalOpen,
    uploadModalOpen,
    setUploadModalOpen,
    selectedTx,
    setSelectedTx,
    discrepancyTx,
    setDiscrepancyTx,
    taxReportModalOpen,
    setTaxReportModalOpen,
    bankShareModalOpen,
    setBankShareModalOpen,
    voiceModalOpen,
    setVoiceModalOpen,
    externalVerifyModalOpen,
    setExternalVerifyModalOpen
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
