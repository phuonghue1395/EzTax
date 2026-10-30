import React from 'react';
import { 
  Navigation, 
  Car, 
  Mic, 
  Music, 
  Zap, 
  Settings, 
  ShieldAlert, 
  Grid
} from 'lucide-react';

export const InfotainmentDock = ({ 
  currentScreen, 
  onTriggerVoice, 
  onGoToScreen,
  isVoiceActive = false 
}) => {
  return (
    <aside className="infotainment-dock">
      <div className="dock-top-group">
        {/* Navigation Icon */}
        <button 
          className={`dock-btn ${currentScreen === 1 || currentScreen === 3 ? 'active' : ''}`}
          onClick={() => onGoToScreen(1)}
          title="Bản đồ & Dẫn đường GPS"
        >
          <Navigation size={22} />
          <span className="dock-label">Bản đồ</span>
        </button>

        {/* Vehicle Controls */}
        <button 
          className="dock-btn"
          title="Điều khiển xe & Cửa gió"
        >
          <Car size={22} />
          <span className="dock-label">Xe</span>
        </button>

        {/* ViVi Voice Assistant Button */}
        <button 
          className={`dock-btn vivi-voice-btn ${isVoiceActive || currentScreen === 2 ? 'voice-glowing' : ''}`}
          onClick={onTriggerVoice}
          title="Trợ lý ảo ViVi (Bấm để hỏi)"
        >
          <div className="vivi-icon-halo">
            <Mic size={22} />
          </div>
          <span className="dock-label">ViVi</span>
        </button>

        {/* Music / Entertainment */}
        <button 
          className="dock-btn"
          title="Giải trí & Âm nhạc"
        >
          <Music size={22} />
          <span className="dock-label">Nhạc</span>
        </button>

        {/* Charging & Energy */}
        <button 
          className={`dock-btn ${currentScreen === 4 ? 'active' : ''}`}
          onClick={() => onGoToScreen(4)}
          title="Quản lý pin & Sạc điện"
        >
          <Zap size={22} />
          <span className="dock-label">Trạm sạc</span>
        </button>
      </div>

      <div className="dock-bottom-group">
        <button 
          className="dock-btn"
          title="Tất cả ứng dụng"
        >
          <Grid size={20} />
        </button>
        <button 
          className="dock-btn"
          title="Cài đặt hệ thống"
        >
          <Settings size={20} />
        </button>
      </div>
    </aside>
  );
};
