import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Star, 
  Activity, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  ShieldCheck, 
  Coffee, 
  Wifi, 
  ShoppingBag, 
  Sparkles, 
  ChevronRight,
  Thermometer,
  Layers
} from 'lucide-react';
import { GpsMapCanvas } from '../components/GpsMapCanvas';

export const Screen3StationDetails = ({ 
  onStartNavigation,
  onBackToOverview
}) => {
  const [selectedPillar, setSelectedPillar] = useState(8); // Pillar #08 auto-reserved by AI
  const [isPreconditioning, setIsPreconditioning] = useState(true);

  // 20 Charging Pillars data (10x 150kW, 10x 300kW)
  const pillars = Array.from({ length: 20 }, (_, i) => {
    const pillarNumber = i + 1;
    const is300kW = pillarNumber > 10;
    const power = is300kW ? '300kW' : '150kW';
    // 45% utilization = 9 busy, 11 free
    const isOccupied = [2, 3, 5, 7, 10, 12, 14, 16, 19].includes(pillarNumber);
    const isReserved = pillarNumber === 8; // AI reserved for this car!

    return {
      number: pillarNumber < 10 ? `0${pillarNumber}` : `${pillarNumber}`,
      power,
      is300kW,
      status: isReserved ? 'reserved' : isOccupied ? 'occupied' : 'available',
      carCharging: isOccupied ? (pillarNumber % 2 === 0 ? 'VF 9' : 'VF 8') : null
    };
  });

  return (
    <div className="screen-container screen-3-station-details">
      {/* Background Map in Focused Rerouted Mode */}
      <div className="screen-map-wrapper">
        <GpsMapCanvas 
          currentScreen={3} 
          onSelectStation={() => {}}
          isRerouted={true}
          carSpeed={82}
        />
      </div>

      {/* Slide-in Details Drawer / Glassmorphic Card on Infotainment Screen */}
      <div className="station-details-panel animate-slide-in-left">
        {/* Top Header Card */}
        <div className="station-panel-header">
          <div className="station-brand-badge">
            <div className="vf-icon-box">
              <Zap size={18} fill="#00F0FF" color="#00F0FF" />
            </div>
            <div>
              <span className="station-sub-type">VINFAST ULTRA-FAST NETWORK</span>
              {/* EXACT SPEC TITLE */}
              <h2 className="station-main-title">
                Siêu trạm sạc VinFast - Cao tốc (Khu vực Miền Bắc)
              </h2>
            </div>
          </div>

          <div className="station-location-row">
            <MapPin size={15} color="#38BDF8" />
            <span>Km 32+400, Cao tốc Hà Nội - Hải Phòng • Cách 3.2 km (4 phút lái xe)</span>
          </div>
        </div>

        {/* 4 AI Operational Analytics Badges - EXACT SPEC */}
        <div className="ai-analytics-section">
          <div className="ai-section-title-row">
            <Sparkles size={15} color="#00F0FF" />
            <span>CHỈ SỐ VẬN HÀNH DO AI PHÂN TÍCH (PREDICTIVE QUEUE)</span>
          </div>

          <div className="analytics-metrics-grid">
            {/* Metric 1: Trạng thái hiện tại */}
            <div className="analytic-card">
              <div className="card-lbl">Trạng thái hiện tại</div>
              <div className="card-val-row status-green">
                <span className="live-dot green-dot" />
                <span className="val-text">Hoạt động bình thường</span>
              </div>
              <div className="card-sub-hint">Green Status • 100% kết nối lưới</div>
            </div>

            {/* Metric 2: Tỷ lệ khai thác (Utilization Rate) */}
            <div className="analytic-card">
              <div className="card-lbl">Tỷ lệ khai thác (Utilization Rate)</div>
              <div className="card-val-row">
                <span className="val-highlight text-cyan">45%</span>
                <span className="val-tag-optimal">TỐI ƯU</span>
              </div>
              {/* Progress bar */}
              <div className="utilization-bar-track">
                <div className="utilization-bar-fill" style={{ width: '45%' }} />
              </div>
              <div className="card-sub-hint">11/20 trụ trống sẵn sàng</div>
            </div>

            {/* Metric 3: Thời gian chờ dự kiến (waiting_minutes) */}
            <div className="analytic-card">
              <div className="card-lbl">Thời gian chờ dự kiến (waiting_minutes)</div>
              <div className="card-val-row">
                <Clock size={18} color="#10B981" />
                <span className="val-highlight text-green">0 - 3 phút</span>
              </div>
              <div className="card-sub-hint">Không có hàng xe chờ • Vào sạc ngay</div>
            </div>

            {/* Metric 4: Điểm đánh giá từ khách hàng (CSAT) */}
            <div className="analytic-card">
              <div className="card-lbl">Đánh giá khách hàng (CSAT)</div>
              <div className="card-val-row">
                <Star size={18} fill="#FBBF24" color="#FBBF24" />
                <span className="val-highlight text-yellow">4.8 / 5.0</span>
              </div>
              <div className="card-sub-hint">Dựa trên 1,420 lượt đánh giá</div>
            </div>
          </div>
        </div>

        {/* EXACT SPEC: Power Capacity: 20 pillars (10x 150kW, 10x 300kW) */}
        <div className="pillars-capacity-section">
          <div className="capacity-header-row">
            <div className="cap-title">
              <span className="cap-bold">Thông tin công suất:</span>
              <span className="cap-count">20 trụ sạc (10x 150kW, 10x 300kW)</span>
            </div>
            <div className="legend-pills">
              <span className="legend-item"><span className="legend-dot dot-reserved" /> AI giữ chỗ (#08)</span>
              <span className="legend-item"><span className="legend-dot dot-free" /> Trống</span>
              <span className="legend-item"><span className="legend-dot dot-busy" /> Đang sạc</span>
            </div>
          </div>

          {/* Interactive Pillars Grid Visualizer */}
          <div className="pillars-visual-grid">
            {pillars.map((p) => {
              const isSelected = selectedPillar === parseInt(p.number, 10);
              return (
                <div 
                  key={p.number}
                  className={`pillar-cell ${p.status} ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedPillar(parseInt(p.number, 10))}
                  title={`Trụ ${p.number} (${p.power}) - ${p.status === 'reserved' ? 'AI đã giữ trước cho xe bạn' : p.status === 'available' ? 'Trống' : 'Đang sạc'}`}
                >
                  <span className="pillar-num">#{p.number}</span>
                  <span className="pillar-kw">{p.power}</span>
                  {p.status === 'reserved' && (
                    <span className="reserved-tag">DÀNH CHO BẠN</span>
                  )}
                  {p.status === 'occupied' && (
                    <span className="car-tag">{p.carCharging}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Smart Pre-conditioning feature */}
        <div className="ai-precondition-banner">
          <div className="precondition-icon-box">
            <Thermometer size={18} color="#00F0FF" />
          </div>
          <div className="precondition-info">
            <div className="precondition-title">
              Chuẩn nhiệt độ pin thông minh (Battery Pre-conditioning)
            </div>
            <div className="precondition-desc">
              Hệ thống đã tự động kích hoạt điều hòa nhiệt độ pin về mức lý tưởng 32°C để tiếp nhận công suất tối đa 300kW ngay khi cắm sạc.
            </div>
          </div>
          <div className="precondition-status-pill">ĐANG KÍCH HOẠT</div>
        </div>

        {/* Amenities Bar */}
        <div className="amenities-row">
          <div className="amenity-item"><Coffee size={14} /> Highland Coffee</div>
          <div className="amenity-item"><ShoppingBag size={14} /> VinMart+ 24/7</div>
          <div className="amenity-item"><Wifi size={14} /> WiFi 5G Free</div>
          <div className="amenity-item"><ShieldCheck size={14} /> Bảo vệ 24/7</div>
        </div>

        {/* EXACT SPEC: Navigation CTA Button */}
        <div className="station-cta-actions">
          <button 
            className="btn-huge-navigation btn-glow-green"
            onClick={onStartNavigation}
          >
            <div className="btn-huge-icon">
              <Navigation size={26} />
            </div>
            <div className="btn-huge-text">
              <span className="huge-title">Dẫn đường đến trạm này</span>
              <span className="huge-sub">Km 32+400 • Cách 3.2 km • Đã giữ chỗ Trụ 300kW số 08</span>
            </div>
            <ChevronRight size={26} />
          </button>
        </div>
      </div>
    </div>
  );
};
