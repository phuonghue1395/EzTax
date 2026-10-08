import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Clock } from 'lucide-react';

export const WebTopbar = () => {
  const { merchant } = useApp();
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
    <header className="web-topbar">
      {/* Left: Store Location & Tax Scale Context */}
      <div className="topbar-left">
        <div className="store-context-pill">
          <MapPin size={16} color="#059669" style={{ flexShrink: 0 }} />
          <span>{merchant.address}</span>
          <span style={{ color: '#94A3B8', flexShrink: 0 }}>•</span>
          <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>MST: <strong>{merchant.taxCode}</strong></span>
        </div>

        <div className="topbar-sync-status">
          <span className="pulse-dot"></span>
          <span>Tự động gom VietQR & HĐĐT</span>
        </div>
      </div>

      {/* Right: Realtime Clock Badge */}
      <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className="realtime-clock-pill" style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
          color: '#FFFFFF',
          borderRadius: '9999px',
          padding: '6px 14px',
          fontSize: '0.84rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.15)',
          border: '1px solid #334155'
        }}>
          <Clock size={15} color="#34D399" />
          <span style={{ color: '#CBD5E1', fontSize: '0.8rem' }}>{formatDate(time)}</span>
          <span style={{ color: '#34D399', fontVariantNumeric: 'tabular-nums', fontWeight: 800, fontFamily: 'monospace', fontSize: '0.9rem' }}>
            {formatTime(time)}
          </span>
        </div>
      </div>
    </header>
  );
};
