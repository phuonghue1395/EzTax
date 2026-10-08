import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, ShieldAlert, CheckCircle2, UserCheck, Receipt, RotateCcw, X, Info, Shield } from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const DiscrepancyWizardModal = () => {
  const { discrepancyTx, setDiscrepancyTx, resolveTransaction, playSound, openGlossary } = useApp();
  const [selectedOption, setSelectedOption] = useState('non_taxable');

  if (!discrepancyTx) return null;

  const handleResolve = () => {
    if (selectedOption === 'non_taxable') {
      resolveTransaction(discrepancyTx.id, 'non_taxable', 'Tiền cá nhân - Không tính thuế');
    } else if (selectedOption === 'taxable_invoice') {
      resolveTransaction(discrepancyTx.id, 'create_invoice', 'Bán hàng - Đã xuất hóa đơn điện tử');
    } else if (selectedOption === 'refund') {
      resolveTransaction(discrepancyTx.id, 'non_taxable', 'Khách chuyển nhầm đã hoàn lại - Không tính thuế');
    }
    setDiscrepancyTx(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setDiscrepancyTx(null)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '620px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#FEE2E2', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                <ShieldAlert size={24} color="#DC2626" />
              </div>
              <h2 className="sheet-header-title" style={{ marginBottom: 0, color: '#991B1B' }}>
                Xử Lý Khoản Tiền Cần Xác Nhận
              </h2>
            </div>
            <p className="sheet-subtitle" style={{ marginBottom: 0, marginTop: '4px' }}>
              EzTax giúp bác làm rõ để <strong>không bị tính thuế oan</strong> vào doanh thu quán phở!
            </p>
          </div>
          <button
            onClick={() => {
              setDiscrepancyTx(null);
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

        {/* Transaction Summary Card */}
        <div style={{
          background: '#FEF2F2',
          border: '1.5px solid #FECACA',
          borderRadius: '16px',
          padding: '18px',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.82rem', color: '#991B1B', fontWeight: 700 }}>
                {discrepancyTx.sourceName} • {discrepancyTx.time}
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>
                "{discrepancyTx.description}"
              </div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#DC2626', fontVariantNumeric: 'tabular-nums' }}>
              +{formatVND(discrepancyTx.amount)}
            </div>
          </div>
          <div style={{ fontSize: '0.86rem', color: '#7F1D1D', marginTop: '10px', borderTop: '1px dashed #FCA5A5', paddingTop: '10px' }}>
            💡 <em>{discrepancyTx.note}</em>
          </div>
        </div>

        {/* 3 Action Choices */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>
            Bác hãy chọn phân loại phù hợp:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Option 1: "Tiền cá nhân" (Exact wording requested by user) */}
            <div
              id="opt-personal-money"
              onClick={() => {
                setSelectedOption('non_taxable');
                playSound('click');
              }}
              style={{
                background: selectedOption === 'non_taxable' ? '#ECFDF5' : '#FFFFFF',
                border: selectedOption === 'non_taxable' ? '2px solid #059669' : '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                boxShadow: selectedOption === 'non_taxable' ? '0 4px 12px rgba(5, 150, 105, 0.15)' : 'none'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: selectedOption === 'non_taxable' ? '7px solid #059669' : '2px solid #CBD5E1',
                marginTop: '2px',
                flexShrink: 0
              }} />
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: selectedOption === 'non_taxable' ? '#065F46' : '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🛡️</span>
                  <span>Tiền cá nhân</span>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#475569', marginTop: '3px' }}>
                  <strong>Không tính thuế (0 ₫)</strong>. EzTax sẽ tự động ghi chú chứng từ cá nhân an toàn.
                </div>
              </div>
            </div>

            {/* Option 2: Actual Sales */}
            <div
              onClick={() => {
                setSelectedOption('taxable_invoice');
                playSound('click');
              }}
              style={{
                background: selectedOption === 'taxable_invoice' ? '#ECFDF5' : '#FFFFFF',
                border: selectedOption === 'taxable_invoice' ? '2px solid #059669' : '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: selectedOption === 'taxable_invoice' ? '7px solid #059669' : '2px solid #CBD5E1',
                marginTop: '2px',
                flexShrink: 0
              }} />
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: selectedOption === 'taxable_invoice' ? '#065F46' : '#0F172A' }}>
                  🍜 Tiền bán hàng của quán phở
                </div>
                <div style={{ fontSize: '0.86rem', color: '#475569', marginTop: '2px' }}>
                  Cộng vào doanh thu chịu thuế và <strong>tự động xuất 1 hóa đơn điện tử máy tính tiền</strong>.
                </div>
              </div>
            </div>

            {/* Option 3: Customer mistake refund */}
            <div
              onClick={() => {
                setSelectedOption('refund');
                playSound('click');
              }}
              style={{
                background: selectedOption === 'refund' ? '#ECFDF5' : '#FFFFFF',
                border: selectedOption === 'refund' ? '2px solid #059669' : '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '16px',
                cursor: 'pointer',
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: selectedOption === 'refund' ? '7px solid #059669' : '2px solid #CBD5E1',
                marginTop: '2px',
                flexShrink: 0
              }} />
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: selectedOption === 'refund' ? '#065F46' : '#0F172A' }}>
                  ↩️ Khách chuyển nhầm và đã chuyển trả
                </div>
                <div style={{ fontSize: '0.86rem', color: '#475569', marginTop: '2px' }}>
                  Loại trừ khỏi doanh thu, không tính thuế.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          id="confirm-discrepancy-btn"
          className="btn-primary-cta"
          onClick={handleResolve}
          style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }}
        >
          <CheckCircle2 size={22} />
          <span>XÁC NHẬN PHƯƠNG ÁN NÀY NGAY</span>
        </button>
      </div>
    </div>
  );
};
