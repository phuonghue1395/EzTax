import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  Upload, 
  FileText, 
  Landmark, 
  MapPin, 
  CheckCircle2, 
  Wifi,
  Sparkles,
  Banknote,
  AlertTriangle
} from 'lucide-react';

export const WebTopbar = () => {
  const { 
    merchant, 
    setCashModalOpen, 
    setUploadModalOpen,
    setTaxReportModalOpen, 
    isYesterdayCashForgotten,
    playSound 
  } = useApp();

  return (
    <header className="web-topbar">
      {/* Left: Store Location & Tax Scale Context */}
      <div className="topbar-left">
        <div className="store-context-pill">
          <MapPin size={16} color="#059669" />
          <span>{merchant.address}</span>
          <span style={{ color: '#94A3B8' }}>•</span>
          <span>MST: <strong>{merchant.taxCode}</strong></span>
        </div>

        <div className="topbar-sync-status">
          <span className="pulse-dot"></span>
          <span>Tự động gom VietQR & HĐĐT máy tính tiền</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="topbar-right">
        {/* Upload Statement Button */}
        <button
          id="web-topbar-upload-btn"
          className="btn-secondary-outline"
          onClick={() => {
            setUploadModalOpen(true);
            playSound('click');
          }}
          title="Tải lên file sao kê Excel/CSV/PDF từ Vietcombank/MoMo"
          style={{ padding: '0 16px', color: '#2563EB', borderColor: '#BFDBFE', background: '#EFF6FF' }}
        >
          <Upload size={18} />
          <span>Tải lên sao kê QR/Bank</span>
        </button>

        {/* Tax Form Shortcut */}
        <button
          className="btn-secondary-outline"
          onClick={() => {
            setTaxReportModalOpen(true);
            playSound('click');
          }}
          style={{ padding: '0 14px' }}
        >
          <FileText size={18} color="#059669" />
          <span>Tờ khai thuế Quý</span>
        </button>

        {/* Primary CTA: Chốt Tổng Tiền Mặt Cuối Ngày */}
        <button
          id="web-topbar-cash-btn"
          className="btn-primary-cta"
          onClick={() => {
            setCashModalOpen(true);
            playSound('click');
          }}
          style={{
            boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
            background: isYesterdayCashForgotten ? 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)' : 'linear-gradient(135deg, #059669 0%, #047857 100%)'
          }}
        >
          {isYesterdayCashForgotten ? <AlertTriangle size={18} /> : <Banknote size={18} />}
          <span>{isYesterdayCashForgotten ? '⚠️ CHỐT TIỀN MẶT HÔM QUA' : 'CHỐT TIỀN MẶT CUỐI NGÀY'}</span>
        </button>
      </div>
    </header>
  );
};
