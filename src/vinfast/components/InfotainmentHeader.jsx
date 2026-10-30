import React from 'react';
import { 
  Wifi, 
  BatteryWarning, 
  BatteryCharging, 
  Wind, 
  Sun, 
  User, 
  ShieldCheck,
  Radio,
  Clock,
  Gauge
} from 'lucide-react';

export const InfotainmentHeader = ({ 
  batteryPercent = 15, 
  isCharging = false,
  chargingKw = 0
}) => {
  return (
    <header className="infotainment-header">
      {/* Left: VinFast Logo & Vehicle Info */}
      <div className="header-left">
        <div className="vinfast-brand-badge">
          {/* VinFast stylized V-Wings SVG */}
          <svg className="vf-logo-svg" viewBox="0 0 100 70" width="32" height="22">
            <path 
              d="M 5,12 Q 28,10 42,42 L 50,60 L 58,42 Q 72,10 95,12 Q 70,22 55,54 L 50,64 L 45,54 Q 30,22 5,12 Z" 
              fill="#FFFFFF" 
            />
            <path 
              d="M 22,24 Q 35,22 45,46 L 50,56 L 55,46 Q 65,22 78,24 Q 62,32 53,50 L 50,56 L 47,50 Q 38,32 22,24 Z" 
              fill="#00F0FF" 
            />
          </svg>
          <span className="brand-name">VINFAST</span>
          <span className="model-tag">VF 8 PLUS</span>
        </div>

        <div className="driver-pill">
          <User size={13} className="driver-icon" />
          <span>Nguyễn Văn Tuấn</span>
        </div>
      </div>

      {/* Center: Clock & Weather */}
      <div className="header-center">
        <div className="time-display">
          <span className="time-hours">14:26</span>
          <span className="time-tz">GMT+7</span>
        </div>
        <div className="weather-pill">
          <Sun size={15} color="#FBBF24" />
          <span>28°C • Nắng ráo</span>
        </div>
      </div>

      {/* Right: Telemetry & Critical Battery Status */}
      <div className="header-right">
        {/* Climate readout */}
        <div className="header-climate-pill">
          <Wind size={14} color="#38BDF8" />
          <span>22.5°C AUTO</span>
        </div>

        {/* 5G Signal */}
        <div className="signal-box" title="Viettel 5G Ultra">
          <div className="signal-bars">
            <span className="bar active" />
            <span className="bar active" />
            <span className="bar active" />
            <span className="bar active" />
          </div>
          <span className="signal-label">5G</span>
        </div>

        {/* Battery Indicator with Warning */}
        <div className={`battery-pill-header ${batteryPercent <= 20 ? 'critical-battery' : ''} ${isCharging ? 'is-charging-badge' : ''}`}>
          {isCharging ? (
            <BatteryCharging size={18} className="battery-icon zap-icon" />
          ) : (
            <BatteryWarning size={18} className="battery-icon warning-pulse" />
          )}
          <div className="battery-text-group">
            <span className="battery-percentage">{batteryPercent}%</span>
            <span className="battery-range">
              {isCharging ? `${chargingKw} kW` : `${Math.round(batteryPercent * 2.8)} km`}
            </span>
          </div>
          {batteryPercent <= 20 && !isCharging && (
            <span className="low-pill-alert">PIN YẾU</span>
          )}
        </div>
      </div>
    </header>
  );
};
