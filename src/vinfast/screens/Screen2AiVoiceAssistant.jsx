import React, { useEffect, useState } from 'react';
import { 
  Mic, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Zap, 
  MapPin, 
  Volume2, 
  X,
  TrendingDown,
  Navigation
} from 'lucide-react';

export const Screen2AiVoiceAssistant = ({ 
  onAcceptReroute, 
  onKeepOldRoute, 
  onClose,
  isAudioPlaying = false
}) => {
  const [waveformBars, setWaveformBars] = useState([20, 45, 80, 50, 95, 60, 40, 75, 90, 60, 35, 70, 85, 40, 20]);

  // Dynamic animation for voice waveform
  useEffect(() => {
    const timer = setInterval(() => {
      setWaveformBars(prev => prev.map(() => Math.floor(Math.random() * 70) + 25));
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="voice-assistant-popup-overlay">
      {/* Semi-transparent dark blur backdrop */}
      <div className="popup-backdrop" onClick={onClose} />

      {/* Slide-up Container from bottom edge */}
      <div className="voice-popup-modal animate-slide-up-modal">
        {/* Top Handle / Grab Bar */}
        <div className="modal-grab-handle" />

        {/* Modal Header with ViVi AI Brand & Close */}
        <div className="voice-modal-header">
          <div className="voice-ai-identity">
            <div className="vivi-avatar-glow">
              <Sparkles size={18} color="#00F0FF" />
            </div>
            <div>
              <div className="voice-title-row">
                <span className="voice-ai-name">VINFAST VIVI AI COPILOT</span>
                <span className="voice-status-live">TRỰC TUYẾN</span>
              </div>
              <div className="voice-ai-subtitle">Phân tích tải trạm & Tối ưu lộ trình thời gian thực</div>
            </div>
          </div>

          <button 
            className="voice-modal-close" 
            onClick={onClose}
            title="Đóng cửa sổ"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Voice Waveform Visualizer */}
        <div className="voice-waveform-container">
          <div className="waveform-spectrum">
            {waveformBars.map((height, i) => (
              <span 
                key={i} 
                className="wave-bar" 
                style={{ 
                  height: `${height}%`,
                  animationDelay: `${i * 0.05}s` 
                }} 
              />
            ))}
          </div>
          <div className="waveform-status-text">
            <Mic size={14} className="mic-active-icon" />
            <span>Đang tương tác giọng nói tự nhiên với tài xế</span>
          </div>
        </div>

        {/* Dialogue Exchanges */}
        <div className="dialogue-exchange-container">
          {/* 1. Driver's Question (Text format) */}
          <div className="driver-bubble-row">
            <div className="driver-avatar-label">Tài xế</div>
            <div className="driver-speech-bubble">
              <span className="driver-quote-mark">“</span>
              <p className="driver-speech-text">Đi trạm sạc nào nhanh nhất bây giờ?</p>
              <span className="driver-quote-mark">”</span>
            </div>
          </div>

          {/* 2. AI Assistant Response (Exact Required Text) */}
          <div className="ai-bubble-row">
            <div className="ai-avatar-badge">
              <Sparkles size={16} />
            </div>
            <div className="ai-speech-bubble">
              <div className="ai-bubble-badge">Đề xuất tối ưu từ ViVi</div>
              <p className="ai-speech-text">
                "Hệ thống ghi nhận <strong>trạm A đang quá tải</strong> (thời gian chờ dự kiến 25 phút). AI đề xuất bạn rẽ sang <strong>Siêu trạm sạc B (cách 3.2km)</strong>, hiện đang trống trụ và <strong>thời gian chờ bằng 0 phút</strong>."
              </p>
            </div>
          </div>
        </div>

        {/* Comparative Station Cards for Rapid Driver Decision */}
        <div className="station-comparison-grid">
          {/* Station A (Congested) */}
          <div className="station-card congested-card">
            <div className="card-top-tag tag-warning">
              <AlertTriangle size={13} />
              <span>LỘ TRÌNH CŨ: QUÁ TẢI</span>
            </div>
            <h4 className="station-name">Trạm Dịch Vụ KM29 (Trạm A)</h4>
            <div className="card-metrics-list">
              <div className="metric-row">
                <span className="m-label">Trạng thái trụ:</span>
                <span className="m-val text-red">8/8 trụ đang sạc (100% bận)</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Thời gian chờ dự kiến:</span>
                <span className="m-val text-red font-bold">⏱️ 25 phút</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Công suất tối đa:</span>
                <span className="m-val">60 kW (DC thường)</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Khoảng cách:</span>
                <span className="m-val">850 m (1 phút)</span>
              </div>
            </div>
          </div>

          {/* Station B (AI Recommended) */}
          <div className="station-card recommended-card">
            <div className="card-top-tag tag-success">
              <Sparkles size={13} />
              <span>AI ĐỀ XUẤT TỐI ƯU NHẤT</span>
            </div>
            <div className="badge-fast-saving">
              <TrendingDown size={14} />
              <span>Tiết kiệm 35 phút tổng hành trình</span>
            </div>
            <h4 className="station-name">Siêu trạm sạc VinFast KM32 (Trạm B)</h4>
            <div className="card-metrics-list">
              <div className="metric-row">
                <span className="m-label">Trạng thái trụ:</span>
                <span className="m-val text-green font-bold">🟢 Trống 12/20 trụ</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Thời gian chờ:</span>
                <span className="m-val text-green font-bold">⏱️ 0 phút (Vào sạc ngay)</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Công suất siêu nạp:</span>
                <span className="m-val text-cyan">150kW & 300kW Siêu tốc</span>
              </div>
              <div className="metric-row">
                <span className="m-label">Khoảng cách & ETA:</span>
                <span className="m-val">3.2 km (4 phút lái xe)</span>
              </div>
            </div>
          </div>
        </div>

        {/* TWO LARGE ACTION BUTTONS (Optimized for quick tactile tap while driving) */}
        <div className="driver-action-buttons-group">
          {/* Button 1: Reroute to Station B */}
          <button 
            className="large-driver-btn btn-primary-reroute"
            onClick={onAcceptReroute}
          >
            <div className="btn-icon-circle">
              <Navigation size={22} className="nav-turn-icon" />
            </div>
            <div className="btn-text-content">
              <span className="btn-main-label">Chuyển lộ trình sang Trạm B</span>
              <span className="btn-sub-label">Trống trụ sạc • Chờ 0 phút • Cách 3.2km</span>
            </div>
            <ArrowRight size={22} className="btn-arrow" />
          </button>

          {/* Button 2: Keep old route */}
          <button 
            className="large-driver-btn btn-secondary-keep"
            onClick={onKeepOldRoute}
          >
            <div className="btn-text-content">
              <span className="btn-main-label">Giữ nguyên lộ trình cũ</span>
              <span className="btn-sub-label">Tiếp tục đến Trạm A (Chờ ~25 phút)</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
