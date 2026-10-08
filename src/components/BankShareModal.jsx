import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  BadgePercent, 
  Landmark,
  Share2
} from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const BankShareModal = () => {
  const { bankShareModalOpen, setBankShareModalOpen, merchant, playSound, showToast } = useApp();
  const [selectedBank, setSelectedBank] = useState('vcb');

  if (!bankShareModalOpen) return null;

  const banks = [
    { id: 'vcb', name: 'Vietcombank', logo: '🏛️', limit: '300.000.000 ₫', rate: '6.8%/năm', desc: 'Gói vay Hộ kinh doanh ẩm thực & dịch vụ' },
    { id: 'bidv', name: 'BIDV', logo: '🏦', limit: '350.000.000 ₫', rate: '7.0%/năm', desc: 'Duyệt hạn mức trong 2 giờ' },
    { id: 'vp', name: 'VPBank SME', logo: '💳', limit: '500.000.000 ₫', rate: '7.5%/năm', desc: 'Miễn phí quản lý tài khoản & POS' },
    { id: 'agri', name: 'Agribank', logo: '🌾', limit: '250.000.000 ₫', rate: '6.5%/năm', desc: 'Lãi suất hỗ trợ phát triển kinh tế địa phương' }
  ];

  const handleSendToBank = () => {
    playSound('success');
    showToast(`Đã chuyển hồ sơ doanh thu xác thực sang ngân hàng đã chọn!`, 'success');
    setBankShareModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setBankShareModalOpen(false)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#EFF6FF', padding: '8px', borderRadius: '10px', color: '#2563EB' }}>
                <Landmark size={24} />
              </div>
              <h2 className="sheet-header-title" style={{ marginBottom: 0 }}>Gói Vay Vốn Tín Chấp Hộ Kinh Doanh</h2>
            </div>
            <p className="sheet-subtitle" style={{ marginBottom: 0, marginTop: '4px' }}>
              Dành riêng cho cửa hàng có <strong>Dấu xác thực doanh thu EzTax</strong>
            </p>
          </div>
          <button
            onClick={() => {
              setBankShareModalOpen(false);
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

        {/* Value Prop Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          border: '1.5px solid #93C5FD',
          borderRadius: '16px',
          padding: '18px',
          marginBottom: '20px',
          display: 'flex',
          gap: '14px',
          alignItems: 'center'
        }}>
          <div style={{ background: '#2563EB', padding: '10px', borderRadius: '12px', color: '#FFFFFF', flexShrink: 0 }}>
            <BadgePercent size={32} />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1E40AF' }}>
              Không cần thế chấp sổ đỏ / giấy tờ nhà đất
            </div>
            <div style={{ fontSize: '0.86rem', color: '#1E3A8A', marginTop: '4px', lineHeight: '1.45' }}>
              Ngân hàng duyệt vay tức thì dựa trên <strong>doanh thu thực tế {formatVND(merchant.quarterSummary.totalRevenue)}</strong> đã khóa số chống sửa trên hệ thống.
            </div>
          </div>
        </div>

        {/* Bank Selection List */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
            Chọn ngân hàng đối tác:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {banks.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  setSelectedBank(b.id);
                  playSound('click');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  border: selectedBank === b.id ? '2px solid #059669' : '1px solid #E2E8F0',
                  background: selectedBank === b.id ? '#ECFDF5' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.6rem' }}>{b.logo}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0F172A' }}>{b.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 600 }}>Lãi suất: {b.rate} • {b.desc}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#064E3B' }}>Hạn mức: {b.limit}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>Duyệt online</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          className="btn-primary-cta"
          onClick={handleSendToBank}
          style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }}
        >
          <Share2 size={20} />
          <span>GỬI HỒ SƠ DOANH THU ĐÃ XÁC THỰC SANG NGÂN HÀNG</span>
        </button>
      </div>
    </div>
  );
};
