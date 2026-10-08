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
        <div className="store-context-pill" style={{ maxWidth: '320px', overflow: 'hidden' }}>
          <MapPin size={16} color="#059669" style={{ flexShrink: 0 }} />
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{merchant.address}</span>
          <span style={{ color: '#94A3B8', flexShrink: 0 }}>•</span>
          <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>MST: <strong>{merchant.taxCode}</strong></span>
        </div>

        <div className="topbar-sync-status">
          <span className="pulse-dot"></span>
          <span>Tự động gom VietQR & HĐĐT</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="topbar-right">
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
          <span>{isYesterdayCashForgotten ? 'Chốt tiền mặt hôm qua' : 'Chốt tiền mặt cuối ngày'}</span>
        </button>
      </div>
    </header>
  );
};
