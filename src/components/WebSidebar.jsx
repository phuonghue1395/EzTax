import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  CheckCheck, 
  Calculator, 
  ShieldCheck, 
  Bot, 
  BookOpen, 
  Glasses, 
  Volume2, 
  VolumeX, 
  Receipt,
  Upload,
  UserCheck,
  Building
} from 'lucide-react';

export const WebSidebar = () => {
  const { 
    activeTab, 
    setActiveTab, 
    merchant, 
    isSeniorMode, 
    setIsSeniorMode, 
    soundEnabled, 
    setSoundEnabled,
    openGlossary,
    pendingCount,
    issueCount,
    setUploadModalOpen,
    isYesterdayCashForgotten,
    playSound 
  } = useApp();

  const totalNeedsAction = pendingCount + issueCount + (isYesterdayCashForgotten ? 1 : 0);

  const navLinks = [
    { id: 'home', label: 'Trang Chủ', icon: Home, badge: null, sublabel: '3 câu hỏi cốt lõi' },
    { id: 'reconcile', label: 'Đối Soát & Thu Chi', icon: CheckCheck, badge: totalNeedsAction > 0 ? totalNeedsAction : null, sublabel: 'Kiểm tra khớp số liệu' },
    { id: 'tax', label: 'Kê Khai Thuế Quý', icon: Calculator, badge: null, sublabel: 'Mẫu 01/CNKD (Doanh thu > 1 tỷ)' },
    { id: 'verify', label: 'Dấu Xác Thực & Vay Vốn', icon: ShieldCheck, badge: null, sublabel: 'Chứng nhận chống sửa' },
    { id: 'advisor', label: 'Trợ Lý Thuế Bác Ba', icon: Bot, badge: null, sublabel: 'AI tư vấn 24/7' }
  ];

  return (
    <aside className="web-sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <Receipt size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="brand-title">EzTax</span>
              <span className="brand-badge">QUÁN ĂN</span>
            </div>
            <div className="brand-tagline">Thuế & Kê Khai Hộ Kinh Doanh</div>
          </div>
        </div>
      </div>

      {/* Single Business Profile Badge (Bác Ba - Phở Bác Ba Hà Nội) */}
      <div style={{
        margin: '16px 18px 8px 18px',
        background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
        border: '1.5px solid #334155',
        borderRadius: '16px',
        padding: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#064E3B',
          border: '2px solid #10B981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          flexShrink: 0
        }}>
          🍜
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ color: '#FFFFFF', fontSize: '0.98rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {merchant.storeName}
          </div>
          <div style={{ color: '#34D399', fontSize: '0.78rem', fontWeight: 600 }}>
            Chủ quán: {merchant.ownerName}
          </div>
          <div style={{ color: '#94A3B8', fontSize: '0.72rem', marginTop: '1px' }}>
            MST: <strong>{merchant.taxCode}</strong>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', padding: '0 12px 6px 12px' }}>
          Menu Chức Năng
        </div>

        {navLinks.map((item) => {
          const IconComp = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                playSound('click');
              }}
            >
              <div className="nav-item-left">
                <IconComp size={20} strokeWidth={isActive ? 2.5 : 2} />
                <div>
                  <div>{item.label}</div>
                  <div style={{ fontSize: '0.72rem', opacity: isActive ? 0.9 : 0.6 }}>{item.sublabel}</div>
                </div>
              </div>

              {item.badge && (
                <span className="nav-item-badge">{item.badge}</span>
              )}
            </button>
          );
        })}

        {/* Upload Statement Button in Sidebar */}
        <button
          className="sidebar-nav-item"
          onClick={() => {
            setUploadModalOpen(true);
            playSound('click');
          }}
          style={{ marginTop: '8px', background: 'rgba(37, 99, 235, 0.12)', color: '#60A5FA', border: '1px dashed #2563EB' }}
        >
          <div className="nav-item-left">
            <Upload size={20} />
            <div>
              <div>Tải Lên Sao Kê</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Excel / VietQR / MoMo</div>
            </div>
          </div>
        </button>

        {/* Dictionary button in sidebar */}
        <button
          className="sidebar-nav-item"
          onClick={() => openGlossary()}
          style={{ marginTop: '4px', background: 'rgba(16, 185, 129, 0.08)', color: '#34D399', border: '1px dashed #059669' }}
        >
          <div className="nav-item-left">
            <BookOpen size={20} />
            <div>
              <div>Cẩm Nang Thuật Ngữ</div>
              <div style={{ fontSize: '0.72rem', opacity: 0.8 }}>Tiếng Việt dễ hiểu</div>
            </div>
          </div>
        </button>
      </nav>

      {/* Footer Accessibility Controls */}
      <div className="sidebar-footer">
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              setIsSeniorMode(!isSeniorMode);
              playSound('click');
            }}
            style={{
              flex: 1,
              padding: '8px 10px',
              borderRadius: '10px',
              border: isSeniorMode ? '1.5px solid #10B981' : '1px solid #334155',
              background: isSeniorMode ? 'rgba(16, 185, 129, 0.2)' : '#1E293B',
              color: isSeniorMode ? '#34D399' : '#CBD5E1',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Glasses size={16} />
            <span>{isSeniorMode ? 'Chữ to: BẬT' : 'Chữ to'}</span>
          </button>

          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playSound('click');
            }}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #334155',
              background: '#1E293B',
              color: soundEnabled ? '#34D399' : '#94A3B8',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        <div style={{ fontSize: '0.72rem', color: '#64748B', textAlign: 'center' }}>
          Doanh thu &gt; 1 tỷ/năm • Kê khai theo Quý
        </div>
      </div>
    </aside>
  );
};
