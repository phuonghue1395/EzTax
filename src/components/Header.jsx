import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ChevronDown, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Glasses, 
  Wifi, 
  CheckCircle2, 
  Store,
  Sparkles
} from 'lucide-react';

export const Header = () => {
  const { 
    merchant, 
    merchants, 
    handleSelectMerchant, 
    isSeniorMode, 
    setIsSeniorMode, 
    soundEnabled, 
    setSoundEnabled,
    openGlossary,
    playSound
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="app-header">
      {/* Top Row: Store Picker & Quick Accessibility Controls */}
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

        {/* Quick Utilities: Senior Mode & Glossary */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            id="senior-mode-btn"
            title="Chế độ Bác Ba (Cỡ chữ to)"
            onClick={() => {
              setIsSeniorMode(!isSeniorMode);
              playSound('click');
            }}
            style={{
              padding: '6px 10px',
              borderRadius: '9999px',
              border: isSeniorMode ? '1.5px solid #059669' : '1px solid #E2E8F0',
              background: isSeniorMode ? '#ECFDF5' : '#FFFFFF',
              color: isSeniorMode ? '#059669' : '#475569',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <Glasses size={16} />
            <span>{isSeniorMode ? 'Chữ to: BẬT' : 'Chữ to'}</span>
          </button>

          <button
            id="glossary-btn"
            title="Từ điển tiếng Việt dễ hiểu"
            onClick={() => openGlossary()}
            style={{
              padding: '6px',
              borderRadius: '50%',
              border: '1px solid #E2E8F0',
              background: '#FFFFFF',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <HelpCircle size={18} />
          </button>
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
