import React from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Eye, 
  Compass, 
  Sparkles,
  Info,
  ChevronRight,
  Monitor,
  Layout
} from 'lucide-react';

export const ScenarioBar = ({
  currentScreen,
  onSelectScreen,
  isPlayingAuto,
  onToggleAutoPlay,
  onResetScenario,
  isAudioEnabled,
  onToggleAudio,
  viewMode,
  onChangeViewMode
}) => {
  const steps = [
    {
      id: 1,
      title: 'Màn hình 1: Khởi tạo & Tìm kiếm',
      sub: 'Bản đồ GPS, Pin 15%, Widget ViVi đề xuất',
      tag: 'Home / Nav'
    },
    {
      id: 2,
      title: 'Màn hình 2: Tra cứu & Đề xuất Trợ lý AI',
      sub: 'ViVi cảnh báo Trạm A quá tải, gợi ý Siêu trạm B',
      tag: 'AI Voice Widget'
    },
    {
      id: 3,
      title: 'Màn hình 3: Chi tiết Trạm & Dự báo Chờ',
      sub: 'Siêu trạm B 20 trụ, Chờ 0-3p, CSAT 4.8★',
      tag: 'Station Details'
    },
    {
      id: 4,
      title: 'Màn hình 4: Auto Check-in & Giám sát Sạc',
      sub: 'Geo-fencing check-in, kWh, công suất 248kW',
      tag: 'Auto Check-in'
    }
  ];

  return (
    <div className="scenario-controller-bar">
      <div className="controller-top-row">
        {/* Scenario Title & Story Context */}
        <div className="scenario-brand-info">
          <div className="vf-electric-pill">
            <span className="dot-pulse" />
            <Sparkles size={14} />
            <span>VINFAST SMART MOBILITY AI</span>
          </div>
          <h1 className="scenario-main-title">
            Kịch Bản Trải Nghiệm Điều Hướng & Sạc Thông Minh AI
          </h1>
          <p className="scenario-situation-desc">
            <strong>Tình huống:</strong> Chủ xe VF 8 đang lái xe, pin còn 15%, mở bản đồ tìm trạm sạc. Trợ lý AI chủ động can thiệp tối ưu hóa hành trình và chuyển hướng sang Siêu trạm sạc không phải chờ đợi.
          </p>
        </div>

        {/* Global Action Tools */}
        <div className="controller-action-tools">
          {/* View mode toggle */}
          <div className="view-mode-selector">
            <button 
              className={`tool-pill-btn ${viewMode === 'bezel' ? 'active' : ''}`}
              onClick={() => onChangeViewMode('bezel')}
              title="Khung viền màn hình giải trí trung tâm 15.6 inch"
            >
              <Monitor size={15} />
              <span>Màn hình 15.6"</span>
            </button>
            <button 
              className={`tool-pill-btn ${viewMode === 'cockpit' ? 'active' : ''}`}
              onClick={() => onChangeViewMode('cockpit')}
              title="Góc nhìn thực tế từ khoang lái VinFast VF 8"
            >
              <Eye size={15} />
              <span>Khoang lái VF 8</span>
            </button>
            <button 
              className={`tool-pill-btn ${viewMode === 'fluid' ? 'active' : ''}`}
              onClick={() => onChangeViewMode('fluid')}
              title="Chế độ xem phẳng toàn khung"
            >
              <Layout size={15} />
              <span>Tràn viền</span>
            </button>
          </div>

          {/* Audio voice toggle */}
          <button 
            className={`tool-pill-btn audio-btn ${isAudioEnabled ? 'audio-on' : 'audio-off'}`}
            onClick={onToggleAudio}
            title={isAudioEnabled ? 'Tắt âm thanh & Giọng nói ViVi' : 'Bật âm thanh & Giọng nói ViVi (Web Speech API)'}
          >
            {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{isAudioEnabled ? 'Âm thanh: BẬT' : 'Âm thanh: TẮT'}</span>
          </button>

          {/* Autoplay walkthrough button */}
          <button 
            className={`tool-pill-btn autoplay-btn ${isPlayingAuto ? 'playing' : ''}`}
            onClick={onToggleAutoPlay}
          >
            {isPlayingAuto ? (
              <>
                <Pause size={16} />
                <span>Tạm dừng diễn</span>
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                <span>Diễn tự động kịch bản</span>
              </>
            )}
          </button>

          {/* Reset button */}
          <button 
            className="tool-pill-btn reset-btn" 
            onClick={onResetScenario}
            title="Làm mới kịch bản từ Màn 1"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 4 Steps Timeline Tabs */}
      <div className="scenario-steps-track">
        {steps.map((step, idx) => {
          const isActive = currentScreen === step.id;
          const isPassed = currentScreen > step.id;

          return (
            <div 
              key={step.id} 
              className={`step-tab-item ${isActive ? 'current-step' : ''} ${isPassed ? 'completed-step' : ''}`}
              onClick={() => onSelectScreen(step.id)}
            >
              <div className="step-num-badge">
                {isPassed ? '✓' : `0${step.id}`}
              </div>
              <div className="step-tab-content">
                <div className="step-tag-row">
                  <span className="step-subtag">{step.tag}</span>
                  {isActive && <span className="step-live-dot">ĐANG HIỂN THỊ</span>}
                </div>
                <div className="step-name">{step.title}</div>
                <div className="step-micro-desc">{step.sub}</div>
              </div>
              {idx < steps.length - 1 && (
                <div className="step-connector">
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
