import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  Clock, 
  BatteryCharging, 
  CheckCircle2, 
  DollarSign, 
  ShieldCheck, 
  Power, 
  Unlock, 
  Thermometer, 
  Gauge, 
  RotateCcw,
  Sparkles,
  Car,
  Receipt,
  FileCheck
} from 'lucide-react';

export const Screen4ChargingLive = ({ 
  onFinishCharging, 
  onRestartScenario,
  initialBattery = 15
}) => {
  // Live dynamic telemetry simulation state
  const [batteryPercent, setBatteryPercent] = useState(initialBattery);
  const [elapsedSeconds, setElapsedSeconds] = useState(742); // 12m 22s
  const [energyKwh, setEnergyKwh] = useState(24.68);
  const [currentPowerKw, setCurrentPowerKw] = useState(248.5); // Peak supercharge
  const [targetLimit, setTargetLimit] = useState(80);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [isCabinAcOn, setIsCabinAcOn] = useState(true);

  // Price calculation: 3,858 VND / kWh (VinFast official public fast charge tariff)
  const unitPriceVnd = 3858;
  const estimatedCostVnd = Math.round(energyKwh * unitPriceVnd);

  // Real-time ticking simulation
  useEffect(() => {
    if (isCompletedModalOpen) return;

    const timer = setInterval(() => {
      setElapsedSeconds(s => s + 1);
      // Charging simulation: gradually increments kWh and battery percentage
      setEnergyKwh(k => Number((k + 0.045).toFixed(2)));
      setBatteryPercent(p => {
        if (p >= targetLimit) return p;
        return Number((p + 0.08).toFixed(1));
      });
      // Slight realistic fluctuations in power
      setCurrentPowerKw(pw => Number((248.0 + Math.sin(Date.now() / 2000) * 3.5).toFixed(1)));
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompletedModalOpen, targetLimit]);

  // Format seconds to mm:ss
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleEndCharging = () => {
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setIsCompletedModalOpen(true);
    if (onFinishCharging) {
      onFinishCharging({
        batteryPercent: Math.round(batteryPercent),
        energyKwh,
        estimatedCostVnd,
        elapsedTime: formatTime(elapsedSeconds)
      });
    }
  };

  return (
    <div className="screen-container screen-4-charging-live">
      {/* Background Graphic: Realistic VinFast Supercharger photo overlay */}
      <div className="charging-bg-backdrop">
        <img 
          src="/vinfast_charging_superstation.jpg" 
          alt="VinFast Supercharging Station" 
          className="charging-station-img"
        />
        <div className="charging-gradient-overlay" />
      </div>

      <div className="charging-content-canvas">
        {/* 1. EXACT SPEC: Auto Check-in Banner when entering Geo-fence */}
        <div className="auto-checkin-banner animate-bounce-gentle">
          <div className="banner-icon-pulse">
            <CheckCircle2 size={24} color="#10B981" />
          </div>
          <div className="banner-text-block">
            {/* EXACT SPEC TEXT */}
            <div className="banner-main-title">
              "Đã vào khuôn viên Siêu trạm sạc B. Hệ thống AI đã tự động ghi nhận check-in phiên sạc."
            </div>
            <div className="banner-sub-meta">
              <span>📍 Geofencing Radar: Đã kích hoạt</span>
              <span className="dot-sep">•</span>
              <span>Biển số xe: <strong>30K-888.88</strong></span>
              <span className="dot-sep">•</span>
              <span>Trụ số <strong>#08 (300kW)</strong></span>
              <span className="dot-sep">•</span>
              <span>Giao thức: <strong>Plug & Charge (ISO 15118)</strong></span>
            </div>
          </div>
          <div className="banner-live-tag">
            <span className="pulse-green-dot" />
            <span>ĐANG NẠP ĐIỆN</span>
          </div>
        </div>

        {/* 2. Main Live Charging Dashboard */}
        <div className="charging-dashboard-grid">
          {/* Left Column: Huge Circular Battery Gauge & Vehicle Twin */}
          <div className="battery-visual-card">
            <div className="battery-gauge-wrapper">
              {/* Animated SVG circular ring */}
              <svg className="battery-circle-svg" viewBox="0 0 240 240">
                <circle 
                  cx="120" 
                  cy="120" 
                  r="95" 
                  className="gauge-bg-ring" 
                />
                <circle 
                  cx="120" 
                  cy="120" 
                  r="95" 
                  className="gauge-fill-ring" 
                  style={{
                    strokeDasharray: 597,
                    strokeDashoffset: 597 - (597 * Math.min(batteryPercent, 100)) / 100
                  }}
                />
              </svg>

              {/* Center Readout */}
              <div className="gauge-center-content">
                <div className="battery-icon-zap">
                  <BatteryCharging size={36} color="#00F0FF" className="animate-zap-glow" />
                </div>
                <div className="battery-number-display">
                  <span className="big-percent">{Math.round(batteryPercent)}</span>
                  <span className="percent-symbol">%</span>
                </div>
                <div className="range-added-text">
                  +{Math.round((batteryPercent - initialBattery) * 2.8)} km vừa nạp
                </div>
                <div className="eta-to-target">
                  Dự kiến đạt {targetLimit}%: <strong>~12 phút</strong>
                </div>
              </div>
            </div>

            {/* Target Battery Slider / Limit Selector */}
            <div className="charge-limit-selector">
              <span className="limit-label">Giới hạn sạc pin:</span>
              <div className="limit-buttons">
                <button 
                  className={`limit-btn ${targetLimit === 80 ? 'active' : ''}`}
                  onClick={() => setTargetLimit(80)}
                >
                  80% (Bảo vệ pin tối ưu)
                </button>
                <button 
                  className={`limit-btn ${targetLimit === 100 ? 'active' : ''}`}
                  onClick={() => setTargetLimit(100)}
                >
                  100% (Hành trình dài)
                </button>
              </div>
            </div>

            {/* Vehicle Aux Status */}
            <div className="vehicle-aux-status">
              <div className="aux-item">
                <Thermometer size={15} color="#38BDF8" />
                <span>Nhiệt độ pin: <strong>32.1°C</strong></span>
              </div>
              <div className="aux-item">
                <span className="dot-green" />
                <span>Điều hòa khoang: <strong>{isCabinAcOn ? 'BẬT (22°C)' : 'TẮT'}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Real-time Telemetry Metrics Cards - EXACT SPEC */}
          <div className="telemetry-metrics-column">
            <div className="telemetry-grid">
              {/* Metric 1: Thời gian cắm sạc */}
              <div className="telemetry-card">
                <div className="t-card-header">
                  <Clock size={18} color="#00F0FF" />
                  <span className="t-card-title">Thời gian cắm sạc</span>
                </div>
                <div className="t-card-value text-cyan">
                  {formatTime(elapsedSeconds)}
                </div>
                <div className="t-card-sub">
                  Bắt đầu lúc: 14:14 • Phiên sạc liên tục
                </div>
              </div>

              {/* Metric 2: Điện năng nạp vào (energy_kwh) */}
              <div className="telemetry-card">
                <div className="t-card-header">
                  <Zap size={18} color="#10B981" />
                  <span className="t-card-title">Điện năng nạp vào (energy_kwh)</span>
                </div>
                <div className="t-card-value text-green">
                  {energyKwh.toFixed(2)} <span className="t-unit">kWh</span>
                </div>
                <div className="t-card-sub">
                  Tương đương ~{Math.round(energyKwh * 5.4)} km quãng đường di chuyển
                </div>
              </div>

              {/* Metric 3: Công suất sạc hiện tại */}
              <div className="telemetry-card highlight-glow">
                <div className="t-card-header">
                  <Gauge size={18} color="#F59E0B" />
                  <span className="t-card-title">Công suất sạc hiện tại</span>
                </div>
                <div className="t-card-value text-yellow">
                  {currentPowerKw} <span className="t-unit">kW</span>
                </div>
                <div className="t-card-sub">
                  Dòng DC Siêu sạc: 362A • 685V (Làm mát chất lỏng)
                </div>
              </div>

              {/* Metric 4: Chi phí dự kiến */}
              <div className="telemetry-card">
                <div className="t-card-header">
                  <DollarSign size={18} color="#38BDF8" />
                  <span className="t-card-title">Chi phí dự kiến</span>
                </div>
                <div className="t-card-value text-white">
                  {estimatedCostVnd.toLocaleString('vi-VN')} <span className="t-unit">VNĐ</span>
                </div>
                <div className="t-card-sub">
                  Đơn giá: 3,858 đ/kWh (Trừ ví VinFast AutoPay)
                </div>
              </div>
            </div>

            {/* Smart Station Diagnostics Box */}
            <div className="station-diagnostics-box">
              <div className="diag-item">
                <span className="diag-k">Điện áp lưới:</span>
                <span className="diag-v">685 V</span>
              </div>
              <div className="diag-item">
                <span className="diag-k">Cường độ dòng:</span>
                <span className="diag-v">362 A</span>
              </div>
              <div className="diag-item">
                <span className="diag-k">Tốc độ nạp:</span>
                <span className="diag-v text-cyan">+18 km / phút</span>
              </div>
              <div className="diag-item">
                <span className="diag-k">Trụ sạc:</span>
                <span className="diag-v">Pillar #08 (300kW)</span>
              </div>
            </div>

            {/* EXACT SPEC ACTION BUTTON: [ Kết thúc sạc / Mở cổng ] */}
            <div className="charging-actions-bar">
              <button 
                className="btn-end-charging btn-pulse-red"
                onClick={handleEndCharging}
              >
                <div className="end-icon-ring">
                  <Unlock size={22} />
                </div>
                <div className="end-text-group">
                  <span className="end-title">Kết thúc sạc / Mở cổng</span>
                  <span className="end-sub">Ngắt kết nối an toàn & Mở khóa chốt sạc trên xe</span>
                </div>
                <Power size={22} className="power-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CHARGING SUMMARY RECEIPT MODAL (Upon Ending Charging) */}
      {isCompletedModalOpen && (
        <div className="charging-receipt-modal-overlay">
          <div className="receipt-card animate-scale-up">
            <div className="receipt-header">
              <div className="receipt-check-icon">
                <CheckCircle2 size={32} color="#10B981" />
              </div>
              <h3 className="receipt-title">Phiên Sạc Hoàn Tất An Toàn</h3>
              <p className="receipt-sub">Cổng sạc trên xe VinFast VF 8 đã được mở khóa tự động</p>
            </div>

            <div className="receipt-summary-table">
              <div className="r-row">
                <span>Vị trí trạm:</span>
                <strong>Siêu trạm VinFast KM32 (Cao tốc)</strong>
              </div>
              <div className="r-row">
                <span>Trụ sạc:</span>
                <strong>Trụ #08 (300kW Hyper-Charge)</strong>
              </div>
              <div className="r-row">
                <span>Mức pin đạt được:</span>
                <strong className="text-cyan">{Math.round(batteryPercent)}% (Ban đầu 15%)</strong>
              </div>
              <div className="r-row">
                <span>Điện năng tiêu thụ:</span>
                <strong className="text-green">{energyKwh.toFixed(2)} kWh</strong>
              </div>
              <div className="r-row">
                <span>Thời gian sạc:</span>
                <strong>{formatTime(elapsedSeconds)}</strong>
              </div>
              <div className="r-row total-row">
                <span>Tổng chi phí:</span>
                <strong className="total-vnd">{estimatedCostVnd.toLocaleString('vi-VN')} VNĐ</strong>
              </div>
              <div className="payment-note">
                <FileCheck size={14} color="#10B981" />
                <span>Đã tự động thanh toán qua thẻ liên kết VinFast AutoPay</span>
              </div>
            </div>

            <div className="receipt-actions">
              <button 
                className="receipt-btn-primary"
                onClick={() => {
                  setIsCompletedModalOpen(false);
                  onRestartScenario();
                }}
              >
                <RotateCcw size={16} />
                <span>Chạy lại kịch bản (Reset)</span>
              </button>

              <button 
                className="receipt-btn-secondary"
                onClick={() => setIsCompletedModalOpen(false)}
              >
                Đóng biên nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
