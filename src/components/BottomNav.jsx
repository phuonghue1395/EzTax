import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  CheckCheck, 
  Calculator, 
  ShieldCheck, 
  Bot
} from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab, pendingCount, issueCount, playSound } = useApp();

  const totalNeedsAction = pendingCount + issueCount;

  const tabs = [
    {
      id: 'home',
      label: 'Trang chủ',
      icon: Home,
      badge: null
    },
    {
      id: 'reconcile',
      label: 'Kiểm tra',
      sublabel: 'Đối soát',
      icon: CheckCheck,
      badge: totalNeedsAction > 0 ? totalNeedsAction : null
    },
    {
      id: 'tax',
      label: 'Tiền thuế',
      icon: Calculator,
      badge: null
    },
    {
      id: 'verify',
      label: 'Dấu xác thực',
      icon: ShieldCheck,
      badge: null
    },
    {
      id: 'advisor',
      label: 'Trợ lý thuế',
      icon: Bot,
      badge: null
    }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            id={`nav-tab-${tab.id}`}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id);
              playSound('click');
            }}
          >
            <div style={{ position: 'relative' }}>
              <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
              {tab.badge && (
                <span style={{
                  position: 'absolute',
                  top: -5,
                  right: -8,
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  minWidth: '16px',
                  height: '16px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  border: '1.5px solid #FFFFFF'
                }}>
                  {tab.badge}
                </span>
              )}
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
