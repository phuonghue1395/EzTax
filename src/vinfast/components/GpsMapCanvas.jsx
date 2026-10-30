import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Zap, 
  AlertTriangle, 
  Layers, 
  Plus, 
  Minus, 
  Compass, 
  Crosshair, 
  ShieldCheck,
  Fuel,
  Maximize2
} from 'lucide-react';

export const GpsMapCanvas = ({ 
  currentScreen, 
  onSelectStation, 
  isRerouted = false,
  carSpeed = 82
}) => {
  const [zoom, setZoom] = useState(1);
  const [is3D, setIs3D] = useState(true);
  const [showTraffic, setShowTraffic] = useState(true);

  return (
    <div className={`gps-map-container ${is3D ? 'view-3d' : 'view-2d'}`}>
      {/* SVG Vector Map Rendering with automotive styling */}
      <svg 
        className="gps-svg-canvas" 
        viewBox="0 0 1000 620" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradients & Glow Filters */}
          <linearGradient id="routeGradOriginal" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="routeGradOptimized" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="1" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="1" />
          </linearGradient>

          <filter id="neonGlowCyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neonGlowGreen" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="neonGlowRed" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Grid pattern for high-tech HUD feel */}
          <pattern id="hudGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Map Dark Background & Grid */}
        <rect width="1000" height="620" fill="#0A0F1D" />
        <rect width="1000" height="620" fill="url(#hudGrid)" />

        {/* River & Landscape Features (Song Hong / Thai Binh river bends) */}
        <path 
          d="M -50,420 Q 200,360 450,480 T 950,380 T 1100,430" 
          fill="none" 
          stroke="#0F243A" 
          strokeWidth="38" 
          strokeLinecap="round" 
        />
        <text x="320" y="440" fill="#1E3A5F" fontSize="12" fontWeight="600" letterSpacing="3">SÔNG THÁI BÌNH</text>

        {/* Regional secondary roads */}
        <g stroke="#1A263C" strokeWidth="6" strokeLinecap="round">
          <path d="M 120,620 L 260,0" strokeWidth="8" />
          <path d="M 80,240 Q 300,280 880,180" />
          <path d="M 380,620 Q 520,380 720,0" />
          <path d="M 400,310 L 980,510" />
          <path d="M 640,620 L 820,0" />
        </g>

        {/* Major Expressway: Cao tốc Hà Nội - Hải Phòng (CT.04) */}
        {/* Road base asphalt */}
        <path 
          d="M 500,620 L 500,340 C 500,260 480,210 460,0" 
          fill="none" 
          stroke="#1E293B" 
          strokeWidth="32" 
          strokeLinecap="round" 
        />
        {/* Road lane markers */}
        <path 
          d="M 500,620 L 500,340 C 500,260 480,210 460,0" 
          fill="none" 
          stroke="#334155" 
          strokeWidth="28" 
        />
        <path 
          d="M 500,620 L 500,340 C 500,260 480,210 460,0" 
          fill="none" 
          stroke="#FCD34D" 
          strokeWidth="2" 
          strokeDasharray="14 14" 
        />

        {/* Traffic Overlay (Live congestion display) */}
        {showTraffic && (
          <g opacity="0.75">
            {/* Green flowing traffic on highway */}
            <path 
              d="M 508,620 L 508,410" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="4" 
            />
            {/* Congested stretch approaching Station A (Red) */}
            <path 
              d="M 508,410 L 508,310" 
              fill="none" 
              stroke="#EF4444" 
              strokeWidth="5" 
              strokeDasharray="6 4"
            />
            {/* Free flow green onward */}
            <path 
              d="M 508,310 C 508,260 488,210 468,0" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="4" 
            />
          </g>
        )}

        {/* ROUTE 1: Original route to Station A (red congested lane) */}
        {!isRerouted && (
          <g>
            <path 
              d="M 500,520 L 500,360 C 500,340 450,335 400,330" 
              fill="none" 
              stroke="url(#routeGradOriginal)" 
              strokeWidth="10" 
              strokeLinecap="round" 
              filter="url(#neonGlowRed)"
            />
            {/* Animated chevrons along path */}
            <path 
              d="M 500,520 L 500,360 C 500,340 450,335 400,330" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="3" 
              strokeDasharray="8 20" 
              className="pulse-chevrons"
            />
          </g>
        )}

        {/* ROUTE 2: AI Recommended Reroute to Station B (Superstation) */}
        {isRerouted && (
          <g>
            {/* Glowing reroute path branching to Station B at Km 32 */}
            <path 
              d="M 500,520 L 500,280 C 500,240 550,230 630,220" 
              fill="none" 
              stroke="url(#routeGradOptimized)" 
              strokeWidth="12" 
              strokeLinecap="round" 
              filter="url(#neonGlowCyan)"
            />
            <path 
              d="M 500,520 L 500,280 C 500,240 550,230 630,220" 
              fill="none" 
              stroke="#FFFFFF" 
              strokeWidth="4" 
              strokeDasharray="10 18" 
              className="pulse-chevrons-fast"
            />
          </g>
        )}

        {/* Expressway Branch roads to Stations */}
        {/* Exit to Station A */}
        <path d="M 500,370 Q 440,365 390,330" fill="none" stroke="#253248" strokeWidth="14" strokeLinecap="round" />
        {/* Exit to Station B */}
        <path d="M 500,290 Q 560,280 630,220" fill="none" stroke="#253248" strokeWidth="16" strokeLinecap="round" />

        {/* STATION A (Km 29 Rest Stop) - CONGESTED */}
        <g 
          className="map-marker-group clickable-marker" 
          onClick={() => onSelectStation('A')}
          transform="translate(370, 310)"
          style={{ cursor: 'pointer' }}
        >
          {/* Warning pulse circle */}
          <circle r="26" fill="rgba(239, 68, 68, 0.2)" className="pulse-slow" />
          <circle r="18" fill="#1E1B24" stroke="#EF4444" strokeWidth="2.5" />
          <path d="M 0,-8 L 8,7 L -8,7 Z" fill="#EF4444" />
          <circle cx="0" cy="3" r="1.5" fill="#FFFFFF" />

          {/* Marker Card Box */}
          <g transform="translate(-130, -56)">
            <rect 
              width="135" 
              height="48" 
              rx="8" 
              fill="rgba(20, 15, 20, 0.92)" 
              stroke="#EF4444" 
              strokeWidth="1.5" 
              filter="drop-shadow(0 4px 12px rgba(239,68,68,0.3))"
            />
            <text x="10" y="18" fill="#FCA5A5" fontSize="11" fontWeight="700">Trạm Dịch Vụ KM29</text>
            <text x="10" y="32" fill="#EF4444" fontSize="10" fontWeight="600">🔴 Quá tải (8/8 trụ bận)</text>
            <text x="10" y="43" fill="#94A3B8" fontSize="9">Chờ dự kiến: ~25 phút</text>
          </g>
        </g>

        {/* STATION B (Km 32 Supercharger) - RECOMMENDED & OPTIMAL */}
        <g 
          className="map-marker-group clickable-marker recommended" 
          onClick={() => onSelectStation('B')}
          transform="translate(640, 210)"
          style={{ cursor: 'pointer' }}
        >
          {/* Multi-ring AI highlight pulse */}
          <circle r="42" fill="rgba(0, 240, 255, 0.12)" className="pulse-fast" />
          <circle r="30" fill="rgba(16, 185, 129, 0.25)" className="pulse-slow" />
          <circle r="22" fill="#06181B" stroke="#00F0FF" strokeWidth="3" filter="url(#neonGlowCyan)" />
          {/* Lightning Zap icon in center */}
          <path 
            d="M 1,-12 L -6,0 L 0,0 L -2,12 L 8,-2 L 1,-2 Z" 
            fill="#00F0FF" 
          />

          {/* AI Best Choice Floating Pill */}
          <g transform="translate(-48, -44)">
            <rect width="96" height="20" rx="10" fill="#10B981" />
            <text x="48" y="14" fill="#FFFFFF" fontSize="10" fontWeight="800" textAnchor="middle" letterSpacing="0.5">
              ✨ AI ĐỀ XUẤT
            </text>
          </g>

          {/* Marker Detail Card */}
          <g transform="translate(32, -35)">
            <rect 
              width="185" 
              height="64" 
              rx="10" 
              fill="rgba(8, 20, 32, 0.95)" 
              stroke="#00F0FF" 
              strokeWidth="2" 
              filter="url(#neonGlowCyan)"
            />
            <text x="12" y="20" fill="#E2E8F0" fontSize="12" fontWeight="700">Siêu trạm VinFast KM32</text>
            <text x="12" y="38" fill="#10B981" fontSize="11" fontWeight="700">🟢 Trống 12/20 trụ (150-300kW)</text>
            <text x="12" y="52" fill="#38BDF8" fontSize="10">Chờ: 0 phút • Cách 3.2km (4p)</text>
          </g>
        </g>

        {/* CURRENT VEHICLE POSITION (VinFast Car on Highway Km 28.8) */}
        <g transform="translate(500, 520)">
          {/* Radar ripple emitting forward */}
          <circle r="45" fill="none" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1.5" className="radar-ping" />
          <circle r="80" fill="none" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="1" className="radar-ping-delayed" />

          {/* Car Heading Cone */}
          <path 
            d="M 0,-15 L -28,-90 L 28,-90 Z" 
            fill="url(#routeGradOptimized)" 
            opacity="0.18" 
          />

          {/* Outer Ring */}
          <circle r="22" fill="#0F172A" stroke="#00F0FF" strokeWidth="2.5" filter="url(#neonGlowCyan)" />
          
          {/* VinFast EV Icon representation */}
          <g transform="translate(-10, -10)">
            <path 
              d="M 10,2 L 17,17 L 10,13 L 3,17 Z" 
              fill="#00F0FF" 
            />
          </g>

          {/* Speed & Direction Tag */}
          <g transform="translate(32, -10)">
            <rect width="80" height="24" rx="12" fill="rgba(15, 23, 42, 0.9)" stroke="#00F0FF" strokeWidth="1" />
            <text x="40" y="16" fill="#FFFFFF" fontSize="11" fontWeight="700" textAnchor="middle">
              {carSpeed} km/h
            </text>
          </g>
        </g>

        {/* Highway Mile Markers */}
        <g fill="#64748B" fontSize="10" fontWeight="600">
          <text x="525" y="580">Km 28+200</text>
          <text x="525" y="440">Km 30+000</text>
          <text x="525" y="270">Km 32+400 (Nút giao trạm B)</text>
          <text x="480" y="60">Km 36+000 (Hướng Hải Phòng)</text>
        </g>
      </svg>

      {/* Floating HUD Controls (Automotive In-Car Navigation Controls) */}
      <div className="map-hud-controls">
        <button 
          className="map-btn" 
          title="Phóng to" 
          onClick={() => setZoom(z => Math.min(z + 0.2, 1.8))}
        >
          <Plus size={18} />
        </button>
        <button 
          className="map-btn" 
          title="Thu nhỏ" 
          onClick={() => setZoom(z => Math.max(z - 0.2, 0.8))}
        >
          <Minus size={18} />
        </button>
        <div className="map-btn-divider" />
        <button 
          className={`map-btn ${is3D ? 'active' : ''}`} 
          title="Góc nhìn 3D HUD / 2D" 
          onClick={() => setIs3D(!is3D)}
        >
          <Compass size={18} />
        </button>
        <button 
          className={`map-btn ${showTraffic ? 'active' : ''}`} 
          title="Lớp giao thông thời gian thực" 
          onClick={() => setShowTraffic(!showTraffic)}
        >
          <Layers size={18} />
        </button>
        <button 
          className="map-btn" 
          title="Định vị tâm xe" 
          onClick={() => setZoom(1)}
        >
          <Crosshair size={18} />
        </button>
      </div>

      {/* Turn-by-Turn Navigation HUD Card (Top Left) */}
      <div className="nav-hud-turn-card">
        <div className="turn-icon-box">
          <Navigation size={24} className="turn-arrow" />
        </div>
        <div className="turn-info">
          <div className="turn-distance">{isRerouted ? '3.2 km' : '850 m'}</div>
          <div className="turn-instruction">
            {isRerouted 
              ? 'Rẽ phải vào Làn ưu tiên Siêu trạm VinFast KM32' 
              : 'Tiếp tục thẳng trên Cao tốc Hà Nội - Hải Phòng'}
          </div>
          <div className="turn-subtext">
            {isRerouted ? 'Lộ trình AI đã tối ưu • Tiết kiệm 35 phút chờ' : 'Đang theo lộ trình cũ hướng Hải Phòng'}
          </div>
        </div>
      </div>

      {/* Highway Speed Limit Badge (Bottom Right) */}
      <div className="speed-limit-badge">
        <div className="speed-circle">
          <span className="speed-label">TỐI ĐA</span>
          <span className="speed-val">100</span>
        </div>
        <div className="speed-current">
          <span className="cur-val">{carSpeed}</span>
          <span className="cur-unit">km/h</span>
        </div>
      </div>
    </div>
  );
};
