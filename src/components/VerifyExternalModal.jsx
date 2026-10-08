import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  CheckCircle, 
  ExternalLink, 
  Lock, 
  FileCheck2, 
  Cpu,
  Fingerprint
} from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const VerifyExternalModal = () => {
  const { externalVerifyModalOpen, setExternalVerifyModalOpen, merchant, playSound } = useApp();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (externalVerifyModalOpen) {
      setIsVerifying(true);
      const timer = setTimeout(() => {
        setIsVerifying(false);
        playSound('success');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [externalVerifyModalOpen]);

  if (!externalVerifyModalOpen) return null;

  const stamp = merchant.quarterSummary.blockchainStamp;

  return (
    <div className="modal-overlay" onClick={() => setExternalVerifyModalOpen(false)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ background: '#0F172A', color: '#FFFFFF', maxWidth: '640px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Fingerprint size={28} color="#34D399" />
            <h2 className="sheet-header-title" style={{ marginBottom: 0, color: '#FFFFFF' }}>
              Cổng Kiểm Định Đối Soát Độc Lập
            </h2>
          </div>
          <button
            onClick={() => {
              setExternalVerifyModalOpen(false);
              playSound('click');
            }}
            style={{
              background: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} color="#94A3B8" />
          </button>
        </div>

        {/* Verification Status Banner */}
        {isVerifying ? (
          <div style={{
            background: '#1E293B',
            borderRadius: '16px',
            padding: '28px',
            textAlign: 'center',
            border: '1px solid #334155',
            marginBottom: '20px'
          }}>
            <div className="pulse-dot" style={{ width: '16px', height: '16px', margin: '0 auto 12px auto' }} />
            <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>Đang kiểm tra chữ ký số SHA-256 trên sổ cái liên ngân hàng...</div>
            <div style={{ fontSize: '0.84rem', color: '#94A3B8', marginTop: '6px' }}>Đối chiếu dữ liệu gốc không qua trung gian</div>
          </div>
        ) : (
          <div style={{
            background: 'linear-gradient(135deg, #064E3B 0%, #065F46 100%)',
            borderRadius: '16px',
            padding: '20px',
            border: '2px solid #34D399',
            marginBottom: '20px',
            boxShadow: '0 8px 24px rgba(6, 78, 59, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={32} color="#34D399" />
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  XÁC THỰC THÀNH CÔNG 100%
                </div>
                <div style={{ fontSize: '0.85rem', color: '#A7F3D0' }}>
                  Số liệu hoàn toàn nguyên bản, KHÔNG BỊ SỬA LÙI NGÀY
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verification Details */}
        <div style={{
          background: '#1E293B',
          borderRadius: '16px',
          padding: '18px',
          border: '1px solid #334155',
          marginBottom: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '0.88rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
            <span style={{ color: '#94A3B8' }}>Hộ kinh doanh:</span>
            <span style={{ fontWeight: 700, color: '#FFFFFF' }}>{merchant.storeName} ({merchant.taxCode})</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
            <span style={{ color: '#94A3B8' }}>Doanh thu ghi nhận:</span>
            <span style={{ fontWeight: 800, color: '#34D399', fontSize: '1.1rem' }}>{formatVND(merchant.quarterSummary.totalRevenue)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
            <span style={{ color: '#94A3B8' }}>Thời điểm khóa số:</span>
            <span style={{ color: '#CBD5E1' }}>{stamp.timestamp}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
            <span style={{ color: '#94A3B8' }}>Khối dữ liệu (Block):</span>
            <span style={{ color: '#CBD5E1', fontFamily: 'monospace' }}>{stamp.blockNumber}</span>
          </div>
          <div>
            <div style={{ color: '#94A3B8', marginBottom: '6px' }}>Chữ ký số SHA-256:</div>
            <div className="hash-pill" style={{ margin: 0 }}>{stamp.hash}</div>
          </div>
        </div>

        {/* Close Button */}
        <button
          className="btn-primary-cta"
          onClick={() => {
            setExternalVerifyModalOpen(false);
            playSound('click');
          }}
          style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }}
        >
          <CheckCircle size={20} />
          <span>HOÀN TẤT KIỂM ĐỊNH</span>
        </button>
      </div>
    </div>
  );
};
