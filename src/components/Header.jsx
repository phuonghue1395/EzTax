import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ChevronDown, 
  Wifi, 
  CheckCircle2, 
  Store,
  Sparkles,
  Clock
} from 'lucide-react';

export const Header = () => {
  const { 
    merchant, 
    merchants, 
    handleSelectMerchant, 
    playSound
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) => {
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (d) => {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[d.getDay()];
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${dayName}, ${day}/${month}/${year}`;
  };

  return (
    <header className="app-header">
      {/* Top Row: Store Picker & Realtime Clock */}
      <div className="store-selector-row">
        <div className="relative">
          <button 
            id="store-picker-btn"
            className="store-badge" 
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              playSound('click');
            }}
          >
            <span className="store-avatar">{merchant.avatar}</span>
            <span style={{ maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {merchant.storeName}
            </span>
            <ChevronDown size={16} color="#64748B" />
          </button>

          {/* Store Switcher Dropdown */}
          {dropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '110%',
              left: 0,
              width: '280px',
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
              border: '1.5px solid #E2E8F0',
              zIndex: 60,
              padding: '8px',
              animation: 'fadeIn 0.15s ease'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', padding: '6px 10px', textTransform: 'uppercase' }}>
                Chọn Hộ Kinh Doanh mẫu:
              </div>
              {merchants.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    handleSelectMerchant(m.id);
                    setDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px',
                    borderRadius: '10px',
                    border: 'none',
                    background: m.id === merchant.id ? '#ECFDF5' : 'transparent',
                    color: m.id === merchant.id ? '#059669' : '#0F172A',
                    fontWeight: m.id === merchant.id ? 700 : 500,
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    marginBottom: '4px'
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{m.avatar}</span>
                  <div>
                    <div>{m.storeName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{m.sectorName}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Realtime Clock Badge */}
        <div style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          borderRadius: '9999px',
          padding: '6px 12px',
          fontSize: '0.78rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          border: '1px solid #334155'
        }}>
          <Clock size={14} color="#34D399" />
          <span style={{ color: '#CBD5E1' }}>{formatDate(time)}</span>
          <span style={{ color: '#34D399', fontVariantNumeric: 'tabular-nums', fontWeight: 800, fontFamily: 'monospace' }}>
            {formatTime(time)}
          </span>
        </div>
      </div>

      {/* "ĐANG Ở ĐÂU" Status Context Bar */}
      <div className="location-context-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Wifi size={14} color="#059669" />
          <span>MST: <strong>{merchant.taxCode}</strong></span>
        </div>
        <div className="sync-live-pill">
          <span className="sync-dot"></span>
          <span>Đã nối Ngân hàng & HĐĐT</span>
        </div>
      </div>
    </header>
  );
};
