import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Smartphone, 
  Monitor, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard,
  Maximize2
} from 'lucide-react';

export const DeviceFrame = ({ children }) => {
  const { 
    viewMode, 
    setViewMode, 
    isSeniorMode, 
    setIsSeniorMode, 
    soundEnabled, 
    setSoundEnabled,
    merchant,
    playSound 
  } = useApp();

  return (
    <div className={`app-wrapper mode-${viewMode}`}>
      {/* Top Floating Control Bar */}
      <div className="top-control-toolbar">
        <div className="toolbar-group">
          <span style={{ fontWeight: 800, color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>EzTax</span>
            <span style={{ fontSize: '0.68rem', background: '#059669', color: '#FFF', padding: '2px 6px', borderRadius: '4px' }}>PROTOTYPE</span>
          </span>
        </div>

        <div className="toolbar-group">


          {/* View mode toggle */}
          <button
            className={`toolbar-toggle-btn ${viewMode === 'frame' ? 'active' : ''}`}
            onClick={() => {
              setViewMode(viewMode === 'frame' ? 'split' : 'frame');
              playSound('click');
            }}
            title="Đổi góc nhìn điện thoại / Trình diễn thiết kế"
          >
            {viewMode === 'frame' ? <Monitor size={14} /> : <Smartphone size={14} />}
            <span>{viewMode === 'frame' ? 'Chế độ Thuyết Trình' : 'Khung Điện Thoại'}</span>
          </button>
        </div>
      </div>

      {/* Main Layout */}
      {viewMode === 'split' ? (
        <div className="presentation-layout">
          {/* Left: Mobile Phone */}
          <div className="device-container" style={{ flexShrink: 0 }}>
            {/* Phone Status Bar */}
            <div className="phone-status-bar">
              <span>9:41</span>
              <div className="dynamic-island">
                <span className="dynamic-island-dot"></span>
                <span style={{ fontSize: '10px', color: '#A7F3D0' }}>EzTax Live</span>
              </div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontSize: '11px' }}>5G</span>
                <span>100%</span>
              </div>
            </div>

            {children}
          </div>

          {/* Right: Senior Designer Presentation & Feature Walkthrough */}
          <div className="presentation-side-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Sparkles size={24} color="#34D399" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>
                Hồ Sơ Thiết Kế UX/UI EzTax (Fintech Hộ Kinh Doanh)
              </h2>
            </div>

            <p style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
              EzTax được thiết kế riêng cho người bán hàng truyền thống tại Việt Nam (30–60 tuổi) với tôn chỉ: 
              <strong> "Không cần hỏi – Một chạm giải quyết – Số tiền là nhân vật chính"</strong>.
            </p>

            {/* 3 Core Golden Cards */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '16px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#34D399', marginBottom: '10px' }}>
                🎯 3 Khối Thông Tin Cốt Lõi Trên Màn Hình Chính:
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#E2E8F0' }}>
                <li><strong>• Doanh thu thực nhận hôm nay:</strong> Số tiền tổng hợp từ 3 nguồn (VietQR, MoMo, Tiền mặt).</li>
                <li><strong>• Xử lý giao dịch & đối soát:</strong> Thẻ cảnh báo phân loại giao dịch & phát hành HĐĐT.</li>
                <li><strong>• Nghĩa vụ thuế Quý tạm tính:</strong> Tự động tính thuế GTGT & TNCN theo NĐ 141/2026/NĐ-CP.</li>
              </ul>
            </div>

            {/* Plain Language Mapping */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '16px', marginBottom: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#34D399', marginBottom: '10px' }}>
                📖 Quy Đổi Ngôn Ngữ Chuyên Môn Sang Tiếng Đời Thường:
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.85rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ color: '#94A3B8' }}>Reconcile / Đối soát</div>
                  <div style={{ color: '#34D399', fontWeight: 700 }}>"Kiểm tra số liệu khớp chưa"</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ color: '#94A3B8' }}>Blockchain / Anchoring</div>
                  <div style={{ color: '#34D399', fontWeight: 700 }}>"Dấu xác thực chống chỉnh sửa"</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ color: '#94A3B8' }}>Verified Revenue</div>
                  <div style={{ color: '#34D399', fontWeight: 700 }}>"Doanh thu đã kiểm tra"</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>
                  <div style={{ color: '#94A3B8' }}>Unresolved</div>
                  <div style={{ color: '#34D399', fontWeight: 700 }}>"Cần bạn xem lại"</div>
                </div>
              </div>
            </div>

            {/* Quick Interactive Testing Actions */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn-primary-cta"
                onClick={() => {
                  setViewMode('frame');
                  playSound('click');
                }}
                style={{ flex: 1 }}
              >
                <Smartphone size={18} />
                <span>Trải Nghiệm Trên Điện Thoại 375px</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="device-container">
          {/* Phone Status Bar */}
          <div className="phone-status-bar">
            <span>9:41</span>
            <div className="dynamic-island">
              <span className="dynamic-island-dot"></span>
              <span style={{ fontSize: '10px', color: '#A7F3D0' }}>EzTax Live</span>
            </div>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '11px' }}>5G</span>
              <span>100%</span>
            </div>
          </div>

          {children}
        </div>
      )}
    </div>
  );
};
