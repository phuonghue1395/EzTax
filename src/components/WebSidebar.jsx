import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  CheckCheck, 
  Calculator, 
  ShieldCheck, 
  Bot, 
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
    pendingCount,
    issueCount,
    setUploadModalOpen,
    isYesterdayCashForgotten,
    playSound 
  } = useApp();

  const totalNeedsAction = pendingCount + issueCount + (isYesterdayCashForgotten ? 1 : 0);

  const navLinks = [
    { id: 'home', label: 'Trang Chủ', icon: Home, badge: null },
    { id: 'reconcile', label: 'Đối Soát & Thu Chi', icon: CheckCheck, badge: totalNeedsAction > 0 ? totalNeedsAction : null },
    { id: 'tax', label: 'Kê Khai Thuế Quý', icon: Calculator, badge: null },
    { id: 'verify', label: 'Dấu Xác Thực & Vay Vốn', icon: ShieldCheck, badge: null },
    { id: 'advisor', label: 'Trợ Lý Thuế Bác Ba', icon: Bot, badge: null }
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
                </div>
              </div>

              {item.badge && (
                <span className="nav-item-badge">{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
