import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  CreditCard, 
  Wallet, 
  Banknote, 
  HelpCircle, 
  Sparkles, 
  Filter, 
  CheckCheck,
  Search,
  Plus,
  Receipt,
  Download,
  Upload,
  Calendar,
  History
} from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const ReconciliationScreen = () => {
  const { 
    transactions, 
    dailyCashClosings,
    filterStatus, 
    setFilterStatus, 
    setSelectedTx, 
    setDiscrepancyTx, 
    autoReconcileAll, 
    openGlossary, 
    setCashModalOpen,
    setUploadModalOpen,
    pendingCount,
    issueCount,
    matchedCount,
    playSound 
  } = useApp();

  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredList = transactions.filter(t => {
    if (filterStatus !== 'all') {
      if (filterStatus === 'matched' && t.status !== 'matched') return false;
      if (filterStatus === 'pending' && t.status !== 'pending') return false;
      if (filterStatus === 'issue' && t.status !== 'issue') return false;
      if (filterStatus === 'cash' && t.source !== 'cash') return false;
    }
    if (searchKeyword) {
      const q = searchKeyword.toLowerCase();
      return t.description.toLowerCase().includes(q) || 
             t.sourceName.toLowerCase().includes(q) ||
             (t.invoiceId && t.invoiceId.toLowerCase().includes(q));
    }
    return true;
  });

  const getSourceIcon = (source) => {
    switch (source) {
      case 'bank': return <CreditCard size={18} color="#2563EB" />;
      case 'wallet': return <Wallet size={18} color="#D97706" />;
      case 'cash': return <Banknote size={18} color="#059669" />;
      default: return <CreditCard size={18} />;
    }
  };

  return (
    <div className="web-content">
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCheck size={28} color="#059669" />
            <span>Sổ Thu Chi & Đối Soát Khớp Số Liệu Quán Phở</span>
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B', marginTop: '4px' }}>
            Tự động đối chiếu sao kê ngân hàng Vietcombank QR & MoMo với hóa đơn điện tử máy tính tiền.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-secondary-outline"
            onClick={() => {
              setUploadModalOpen(true);
              playSound('click');
            }}
            style={{ color: '#2563EB', borderColor: '#BFDBFE', background: '#EFF6FF' }}
          >
            <Upload size={18} />
            <span>Tải lên file sao kê QR/Bank</span>
          </button>

          <button 
            className="btn-subtle-link" 
            onClick={() => openGlossary('Reconcile / Đối soát')}
            style={{ fontSize: '0.92rem' }}
          >
            <HelpCircle size={18} />
            <span>Đối soát là gì?</span>
          </button>
        </div>
      </div>

      {/* Daily Cash Register Closures Strip (Rule: 1 time per day at end of day) */}
      <div className="web-section-container" style={{ padding: '18px 22px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Banknote size={20} color="#059669" />
            <span>Sổ Chốt Tổng Tiền Mặt Theo Từng Ngày (Chốt 1 lần/ngày)</span>
          </div>
          <button
            className="btn-primary-cta"
            onClick={() => {
              setCashModalOpen(true);
              playSound('click');
            }}
            style={{ minHeight: '36px', fontSize: '0.84rem' }}
          >
            <Calendar size={16} />
            <span>Mở sổ chốt tiền mặt</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {dailyCashClosings.map((d, idx) => (
            <div
              key={idx}
              onClick={() => {
                setCashModalOpen(true);
                playSound('click');
              }}
              style={{
                background: d.status === 'forgotten' ? '#FEF2F2' : (d.status === 'closed' ? '#ECFDF5' : '#FFFBEB'),
                border: d.status === 'forgotten' ? '2px solid #FCA5A5' : (d.status === 'closed' ? '1.5px solid #A7F3D0' : '1.5px solid #FDE68A'),
                borderRadius: '14px',
                padding: '12px 14px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#0F172A' }}>{d.dayLabel}</span>
                {d.status === 'closed' && <span style={{ fontSize: '0.74rem', color: '#065F46', fontWeight: 700 }}>🟢 Đã chốt</span>}
                {d.status === 'forgotten' && <span style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: 800 }}>🔴 Chưa chốt</span>}
                {d.status === 'unclosed' && <span style={{ fontSize: '0.74rem', color: '#D97706', fontWeight: 700 }}>🟡 Đang mở</span>}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: d.status === 'forgotten' ? '#DC2626' : '#064E3B', fontVariantNumeric: 'tabular-nums' }}>
                {formatVND(d.amount)}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>
                {d.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto Reconcile Action Banner (If items pending) */}
      {pendingCount > 0 && (
        <div style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          border: '2px solid #6EE7B7',
          borderRadius: '16px',
          padding: '16px 24px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: '#059669', color: '#FFFFFF', padding: '10px', borderRadius: '12px' }}>
              <Sparkles size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#064E3B' }}>
                Có {pendingCount} giao dịch MoMo/Ngân hàng đang chờ khớp hóa đơn máy tính tiền
              </div>
              <div style={{ fontSize: '0.84rem', color: '#047857' }}>
                Hệ thống có thể tự động đối soát và phát hành hóa đơn điện tử cho toàn bộ chỉ trong 1 giây.
              </div>
            </div>
          </div>

          <button
            id="auto-reconcile-web-btn"
            className="btn-primary-cta"
            onClick={autoReconcileAll}
            style={{ fontSize: '0.92rem', padding: '0 24px' }}
          >
            <Sparkles size={18} />
            <span>TỰ ĐỘNG ĐỐI SOÁT & KHỚP TẤT CẢ</span>
          </button>
        </div>
      )}

      {/* Table Filter & Search Controls */}
      <div className="web-section-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { id: 'all', label: 'Tất cả giao dịch' },
              { id: 'matched', label: '🟢 Đã khớp HĐĐT' },
              { id: 'pending', label: '🟡 Chờ xuất HĐ' },
              { id: 'issue', label: '🔴 Cần xác nhận Tiền cá nhân' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilterStatus(tab.id);
                  playSound('click');
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: filterStatus === tab.id ? '2px solid #059669' : '1px solid #E2E8F0',
                  background: filterStatus === tab.id ? '#ECFDF5' : '#FFFFFF',
                  color: filterStatus === tab.id ? '#059669' : '#64748B',
                  fontWeight: filterStatus === tab.id ? 800 : 500,
                  fontSize: '0.88rem',
                  cursor: 'pointer'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', top: '12px', left: '12px' }} />
            <input
              type="text"
              placeholder="Tìm theo nội dung, mã HĐ..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '9999px',
                border: '1.5px solid #E2E8F0',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="web-table-wrapper">
          <table className="web-data-table">
            <thead>
              <tr>
                <th>Nguồn tiền</th>
                <th>Thời gian</th>
                <th>Nội dung thanh toán</th>
                <th>Số tiền</th>
                <th>HĐĐT máy tính tiền</th>
                <th>Trạng thái đối soát</th>
                <th style={{ textAlign: 'right' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: tx.source === 'bank' ? '#EFF6FF' : (tx.source === 'wallet' ? '#FFFBEB' : '#ECFDF5'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {getSourceIcon(tx.source)}
                      </div>
                      <span style={{ fontWeight: 700 }}>{tx.sourceName}</span>
                    </div>
                  </td>

                  <td style={{ color: '#64748B', fontSize: '0.88rem' }}>
                    {tx.time}
                  </td>

                  <td>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>{tx.description}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{tx.note}</div>
                  </td>

                  <td>
                    <span style={{
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: tx.isTaxable === false ? '#64748B' : (tx.status === 'issue' ? '#DC2626' : '#059669'),
                      fontVariantNumeric: 'tabular-nums'
                    }}>
                      +{formatVND(tx.amount)}
                    </span>
                  </td>

                  <td>
                    {tx.invoiceId ? (
                      <span style={{ color: '#059669', fontWeight: 700 }}>
                        ✓ {tx.invoiceId}
                      </span>
                    ) : (
                      <span style={{ color: '#94A3B8', fontSize: '0.84rem' }}>
                        Chưa xuất
                      </span>
                    )}
                  </td>

                  <td>
                    {tx.status === 'matched' && (
                      <span className="status-triple-badge badge-matched">
                        <CheckCircle2 size={14} />
                        <span>🟢 Đã khớp</span>
                      </span>
                    )}
                    {tx.status === 'pending' && (
                      <span className="status-triple-badge badge-pending">
                        <AlertTriangle size={14} />
                        <span>🟡 Chờ xuất HĐ</span>
                      </span>
                    )}
                    {tx.status === 'issue' && (
                      <span className="status-triple-badge badge-issue">
                        <XCircle size={14} />
                        <span>🔴 Cần xác nhận</span>
                      </span>
                    )}
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    {tx.status === 'issue' ? (
                      <button
                        className="btn-primary-cta btn-danger-cta"
                        onClick={() => setDiscrepancyTx(tx)}
                        style={{ minHeight: '34px', fontSize: '0.82rem', padding: '0 14px' }}
                      >
                        <span>Xác nhận Tiền cá nhân</span>
                      </button>
                    ) : tx.status === 'pending' ? (
                      <button
                        className="btn-primary-cta btn-warning-cta"
                        onClick={() => setSelectedTx(tx)}
                        style={{ minHeight: '34px', fontSize: '0.82rem', padding: '0 14px' }}
                      >
                        <span>Xuất HĐĐT</span>
                      </button>
                    ) : (
                      <button
                        className="btn-secondary-outline"
                        onClick={() => setSelectedTx(tx)}
                        style={{ minHeight: '34px', fontSize: '0.82rem', padding: '0 14px' }}
                      >
                        <span>Xem chi tiết</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
