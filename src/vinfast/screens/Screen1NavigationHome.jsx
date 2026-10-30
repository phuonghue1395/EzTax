import React, { useState } from 'react';
import { GpsMapCanvas } from '../components/GpsMapCanvas';
import { 
  Mic, 
  Search, 
  BatteryWarning, 
  Sparkles, 
  ArrowRight, 
  X, 
  Zap, 
  MapPin, 
  Filter,
  Volume2
} from 'lucide-react';

export const Screen1NavigationHome = ({ 
  onTriggerVoice, 
  onSelectStation,
  onDismissAlert,
  alertVisible = true
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [filterActive, setFilterActive] = useState('150kw');

  return (
    <div className="screen-container screen-1-nav-home">
      {/* 1. GPS Map View */}
      <div className="screen-map-wrapper">
        <GpsMapCanvas 
          currentScreen={1} 
          onSelectStation={onSelectStation}
          isRerouted={false}
          carSpeed={82}
        />
      </div>

      {/* 2. Top Voice Search Bar with Suggestion */}
      <div className="voice-search-hud-bar">
        <div className="search-input-pill" onClick={onTriggerVoice}>
          <div className="search-icon-box">
            <Search size={18} color="#94A3B8" />
          </div>

          <div className="search-text-content">
            <span className="search-placeholder-label">Tìm kiếm bằng giọng nói hoặc điểm đến:</span>
            {/* Exact required text in prompt */}
            <span className="search-prompt-highlight">
              "Tìm trạm sạc 150kW ít xe chờ nhất"
            </span>
          </div>

          {/* Voice Microphone Icon with ripple glow */}
          <button 
            className="search-mic-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onTriggerVoice();
            }}
            title="Nhấn để ra lệnh giọng nói rảnh tay cho ViVi"
          >
            <span className="mic-ripple" />
            <Mic size={20} color="#00F0FF" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="quick-filter-chips">
          <button 
            className={`filter-chip ${filterActive === '150kw' ? 'chip-active' : ''}`}
            onClick={() => onTriggerVoice()}
          >
            <Zap size={13} color="#00F0FF" />
            <span>Trạm 150kW - 300kW ít xe</span>
          </button>
          <button 
            className="filter-chip"
            onClick={() => onSelectStation('B')}
          >
            <Sparkles size={13} color="#10B981" />
            <span>Siêu trạm B (Km 32)</span>
          </button>
          <button 
            className="filter-chip"
            onClick={() => onSelectStation('A')}
          >
            <MapPin size={13} color="#EF4444" />
            <span>Trạm dịch vụ Km 29</span>
          </button>
        </div>
      </div>

      {/* 3. Smart Alert Widget in Screen Corner from AI Assistant */}
      {alertVisible && (
        <div className="ai-smart-alert-widget animate-slide-up-corner">
          <div className="alert-widget-glow-border" />
          <div className="alert-widget-content">
            {/* Top row with ViVi AI Badge & Close */}
            <div className="widget-header-row">
              <div className="widget-vivi-tag">
                <div className="vivi-pulse-ring">
                  <Sparkles size={14} color="#00F0FF" />
                </div>
                <div className="vivi-tag-text">
                  <span className="vivi-name">TRỢ LÝ AI VIVI</span>
                  <span className="vivi-sub">Chủ động phát hiện pin yếu</span>
                </div>
              </div>

              <div className="battery-critical-badge">
                <BatteryWarning size={14} color="#EF4444" />
                <span>PIN 15%</span>
              </div>

              <button 
                className="widget-dismiss-btn"
                onClick={onDismissAlert}
                title="Bỏ qua cảnh báo"
              >
                <X size={15} />
              </button>
            </div>

            {/* AI Warning Message - EXACT SPEC TEXT */}
            <div className="widget-body-message">
              <p className="ai-quote-text">
                "Pin xe còn 15%. Bạn có muốn tìm siêu trạm sạc gần nhất trên tuyến đường không?"
              </p>
              <div className="widget-meta-info">
                <span>Ước tính quãng đường còn lại: <strong>42 km</strong></span>
                <span className="bullet-dot">•</span>
                <span>Phạm vi an toàn: <strong>Khẩn cấp</strong></span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="widget-action-buttons">
              <button 
                className="widget-btn-primary btn-glow-cyan"
                onClick={onTriggerVoice}
              >
                <Zap size={16} fill="#06181B" color="#06181B" />
                <span>Tìm siêu trạm sạc ngay</span>
                <ArrowRight size={16} />
              </button>

              <button 
                className="widget-btn-secondary"
                onClick={onDismissAlert}
              >
                Bỏ qua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
