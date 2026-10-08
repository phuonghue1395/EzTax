import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldCheck, 
  FileText, 
  Receipt, 
  CreditCard, 
  Wallet, 
  Banknote,
  Share2,
  Sparkles
} from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const TransactionDetailModal = () => {
  const { selectedTx, setSelectedTx, resolveTransaction, playSound, setDiscrepancyTx } = useApp();

  if (!selectedTx) return null;

  const getSourceIcon = (source) => {
    switch (source) {
      case 'bank': return <CreditCard size={22} color="#2563EB" />;
      case 'wallet': return <Wallet size={22} color="#D97706" />;
      case 'cash': return <Banknote size={22} color="#059669" />;
      default: return <FileText size={22} />;
    }
  };

  const getStatusBadge = () => {
    if (selectedTx.status === 'matched') {
      return (
        <span className="status-triple-badge badge-matched">
          <CheckCircle2 size={16} />
          <span>🟢 Đã khớp hóa đơn</span>
        </span>
      );
    }
    if (selectedTx.status === 'pending') {
      return (
        <span className="status-triple-badge badge-pending">
          <AlertTriangle size={16} />
          <span>🟡 Chờ xuất hóa đơn</span>
        </span>
      );
    }
    return (
      <span className="status-triple-badge badge-issue">
        <XCircle size={16} />
        <span>🔴 Cần bạn xem lại</span>
      </span>
    );
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedTx(null)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '560px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#F8FAFC', padding: '8px', borderRadius: '10px' }}>
              {getSourceIcon(selectedTx.source)}
            </div>
            <h2 className="sheet-header-title" style={{ marginBottom: 0 }}>Chi Tiết Giao Dịch</h2>
          </div>
          <button
            onClick={() => {
              setSelectedTx(null);
              playSound('click');
            }}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} color="#64748B" />
          </button>
        </div>

        {/* Large Amount Box */}
        <div style={{
          background: selectedTx.isTaxable === false ? '#F1F5F9' : '#ECFDF5',
          border: selectedTx.isTaxable === false ? '1.5px solid #CBD5E1' : '2px solid #6EE7B7',
          borderRadius: '20px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ marginBottom: '8px' }}>
            {getStatusBadge()}
          </div>
          <div style={{
            fontSize: '2.6rem',
            fontWeight: 800,
            color: selectedTx.isTaxable === false ? '#475569' : '#064E3B',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1.1
          }}>
            +{formatVND(selectedTx.amount)}
          </div>
          <div style={{ fontSize: '0.94rem', color: '#475569', marginTop: '6px', fontWeight: 600 }}>
            {selectedTx.description}
          </div>
        </div>

        {/* Details Grid */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '16px',
          padding: '18px',
          border: '1px solid #E2E8F0',
          marginBottom: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: '#64748B' }}>Nguồn nhận tiền:</span>
            <span style={{ fontWeight: 700, color: '#0F172A' }}>{selectedTx.sourceName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: '#64748B' }}>Thời gian ghi nhận:</span>
            <span style={{ fontWeight: 700, color: '#0F172A' }}>{selectedTx.time}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: '#64748B' }}>Hóa đơn điện tử máy tính tiền:</span>
            <span style={{ fontWeight: 700, color: selectedTx.invoiceId ? '#059669' : '#D97706' }}>
              {selectedTx.invoiceId ? `Đã xuất (${selectedTx.invoiceId})` : 'Chưa xuất'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
            <span style={{ color: '#64748B' }}>Tính thuế kinh doanh:</span>
            <span style={{ fontWeight: 700, color: selectedTx.isTaxable === false ? '#64748B' : '#059669' }}>
              {selectedTx.isTaxable === false ? 'Không tính thuế (Tiền cá nhân)' : `Có (+${formatVND(selectedTx.taxCalculated)})`}
            </span>
          </div>
          {selectedTx.verifiedStamp && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#059669', background: '#ECFDF5', padding: '8px 12px', borderRadius: '10px' }}>
              <ShieldCheck size={18} />
              <span>Đã có <strong>Dấu xác thực chống sửa</strong> lưu trên hệ thống liên ngân hàng</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        {selectedTx.status === 'issue' && (
          <button
            className="btn-primary-cta btn-danger-cta"
            onClick={() => {
              setSelectedTx(null);
              setDiscrepancyTx(selectedTx);
            }}
            style={{ width: '100%', minHeight: '48px', fontSize: '0.95rem' }}
          >
            <span>BẤM ĐỂ CHỌN PHƯƠNG ÁN XỬ LÝ NGAY</span>
          </button>
        )}

        {selectedTx.status === 'pending' && (
          <button
            className="btn-primary-cta btn-warning-cta"
            onClick={() => {
              resolveTransaction(selectedTx.id, 'create_invoice');
              setSelectedTx(null);
            }}
            style={{ width: '100%', minHeight: '48px', fontSize: '0.95rem' }}
          >
            <Receipt size={20} />
            <span>XUẤT HÓA ĐƠN ĐIỆN TỬ NGAY (1 CHẠM)</span>
          </button>
        )}

        {selectedTx.status === 'matched' && (
          <button
            className="btn-secondary-outline"
            onClick={() => {
              setSelectedTx(null);
              playSound('click');
            }}
            style={{ width: '100%', minHeight: '48px', fontSize: '0.95rem' }}
          >
            <CheckCircle2 size={18} color="#059669" />
            <span>Số liệu đã hoàn toàn chuẩn xác - Đóng lại</span>
          </button>
        )}
      </div>
    </div>
  );
};
