import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  Percent, 
  Sparkles,
  Building,
  Calendar,
  AlertCircle,
  Scale,
  TrendingUp,
  Receipt,
  Check,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Coins
} from 'lucide-react';
import { 
  calculateTax, 
  formatVND, 
  formatNumberOnly, 
  TAX_MANDATORY_SCALE, 
  TAX_LEGAL_FRAMEWORK, 
  BUSINESS_SECTORS,
  getRevenueTier 
} from '../utils/taxRules';

export const TaxScreen = () => {
  const { 
    merchant, 
    setTaxReportModalOpen, 
    quarterTaxInfo, 
    selectedSectorId,
    setSelectedSectorId,
    pitMethod,
    setPitMethod,
    quarterExpenses,
    setQuarterExpenses,
    playSound,
    showToast
  } = useApp();

  // State for Interactive Tax Simulator / Calculator
  const [simRevenue, setSimRevenue] = useState(2000000000); // Mặc định 2 tỷ để thử nghiệm phân khúc 1-3 tỷ
  const [simExpenses, setSimExpenses] = useState(1200000000); // 1.2 tỷ chi phí
  const [simSectorId, setSimSectorId] = useState('food_beverage');
  const [simPitMethod, setSimPitMethod] = useState('revenue');
  const [activeTabMode, setActiveTabMode] = useState('quarter'); // 'quarter' (Kê khai Quý 4) | 'simulator' (Mô phỏng tự do)

  const quarterRev = merchant.quarterSummary.totalRevenue;
  const taxCalc = quarterTaxInfo;

  // Simulator Calculation Result
  const simTaxResult = calculateTax({
    revenue: simRevenue,
    expenses: simExpenses,
    sectorId: simSectorId,
    pitMethod: simPitMethod,
    isQuarterly: false
  });

  const presetExamples = [
    { label: 'Quán nhỏ (800 tr/năm)', rev: 800000000, exp: 500000000, desc: '≤ 1 Tỷ → Miễn 100% thuế' },
    { label: 'Quán ăn (2 tỷ/năm)', rev: 2000000000, exp: 1200000000, desc: '1-3 Tỷ → Chọn 1 trong 2 PP TNCN' },
    { label: 'Quán Bác Ba (4.65 tỷ)', rev: 4650000000, exp: 2750000000, desc: '3-50 Tỷ → TNCN 17% thu nhập' },
    { label: 'Chuỗi lớn (55 tỷ)', rev: 55000000000, exp: 35000000000, desc: '> 50 Tỷ → TNCN 20% thu nhập' }
  ];

  return (
    <div className="web-content">
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', 
              color: '#FFFFFF', 
              padding: '6px 12px', 
              borderRadius: '8px', 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              letterSpacing: '0.5px' 
            }}>
              NGHỊ ĐỊNH 141/2026/NĐ-CP
            </span>
            <span style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 700 }}>
              Áp dụng từ 01/01/2026
            </span>
          </div>
          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
            <Calculator size={28} color="#059669" />
            <span>Kê Khai & Tính Thuế Hộ Kinh Doanh 2026</span>
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B', marginTop: '2px' }}>
            Ngưỡng doanh thu miễn thuế nâng lên <strong>1 tỷ đồng/năm</strong>. Hỗ trợ kê khai Quý và 2 phương pháp tính TNCN.
          </p>
        </div>
      </div>

      {/* 4-TIER LAW PROGRESSION BANNER (BẢN ĐỒ 4 PHÂN KHÚC DOANH THU 2026) */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '20px',
        padding: '18px 20px',
        border: '1.5px solid #E2E8F0',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={18} color="#059669" />
            <span>QUY ĐỊNH PHÂN KHÚC DOANH THU NĂM (NGHỊ ĐỊNH 141/2026/NĐ-CP)</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
            Quán Bác Ba: Quy mô ~4.65 Tỷ/năm
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {/* Tier 1 */}
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #86EFAC',
            borderRadius: '14px',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#166534' }}>
                1. Mức ≤ 1 Tỷ / năm
              </div>
              <div style={{ fontSize: '0.78rem', color: '#15803D', marginTop: '4px', fontWeight: 700 }}>
                🟢 MIỄN 100% THUẾ
              </div>
              <div style={{ fontSize: '0.78rem', color: '#166534', marginTop: '2px', lineHeight: '1.35' }}>
                • Không chịu thuế GTGT<br />
                • Không nộp thuế TNCN
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#166534', padding: '2px 6px', borderRadius: '4px', marginTop: '8px', alignSelf: 'flex-start', fontWeight: 700 }}>
              Ngưỡng mới
            </span>
          </div>

          {/* Tier 2 */}
          <div style={{
            background: '#EFF6FF',
            border: '1.5px solid #93C5FD',
            borderRadius: '14px',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1E40AF' }}>
                2. Mức &gt; 1 Tỷ → ≤ 3 Tỷ
              </div>
              <div style={{ fontSize: '0.78rem', color: '#1D4ED8', marginTop: '4px', fontWeight: 700 }}>
                🔵 CÓ GTGT + CHỌN PP TNCN
              </div>
              <div style={{ fontSize: '0.78rem', color: '#1E40AF', marginTop: '2px', lineHeight: '1.35' }}>
                • GTGT = Doanh thu × % ngành<br />
                • TNCN: Chọn PP1 (DT - 1 tỷ) hoặc PP2 (Thu nhập 15%)
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#DBEAFE', color: '#1E40AF', padding: '2px 6px', borderRadius: '4px', marginTop: '8px', alignSelf: 'flex-start', fontWeight: 700 }}>
              Được chọn 2 PP
            </span>
          </div>

          {/* Tier 3 (Bác Ba) */}
          <div style={{
            background: '#FEF3C7',
            border: '2px solid #F59E0B',
            borderRadius: '14px',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#92400E' }}>
                  3. Mức &gt; 3 Tỷ → ≤ 50 Tỷ
                </div>
                <span style={{ fontSize: '0.7rem', background: '#D97706', color: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                  Quán Bác Ba
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#B45309', marginTop: '4px', fontWeight: 700 }}>
                🟡 GTGT + TNCN 17%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#92400E', marginTop: '2px', lineHeight: '1.35' }}>
                • GTGT = Doanh thu × % ngành<br />
                • TNCN = (Doanh thu − Chi phí) × 17%
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#FDE68A', color: '#92400E', padding: '2px 6px', borderRadius: '4px', marginTop: '8px', alignSelf: 'flex-start', fontWeight: 700 }}>
              Thu nhập 17%
            </span>
          </div>

          {/* Tier 4 */}
          <div style={{
            background: '#FEF2F2',
            border: '1.5px solid #FCA5A5',
            borderRadius: '14px',
            padding: '12px 14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#991B1B' }}>
                4. Mức &gt; 50 Tỷ / năm
              </div>
              <div style={{ fontSize: '0.78rem', color: '#B91C1C', marginTop: '4px', fontWeight: 700 }}>
                🔴 GTGT + TNCN 20%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#991B1B', marginTop: '2px', lineHeight: '1.35' }}>
                • GTGT = Doanh thu × % ngành<br />
                • TNCN = (Doanh thu − Chi phí) × 20%
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#FEE2E2', color: '#991B1B', padding: '2px 6px', borderRadius: '4px', marginTop: '8px', alignSelf: 'flex-start', fontWeight: 700 }}>
              Thuế suất cao hơn
            </span>
          </div>
        </div>
      </div>

      {/* TABS SWITCHER: [Kê Khai Quý 4 Quán Phở Bác Ba] vs [Công Cụ Mô Phỏng Tính Thuế 2026] */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button
          onClick={() => {
            setActiveTabMode('quarter');
            playSound('click');
          }}
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: '16px',
            border: activeTabMode === 'quarter' ? '2px solid #059669' : '1.5px solid #E2E8F0',
            background: activeTabMode === 'quarter' ? '#ECFDF5' : '#FFFFFF',
            color: activeTabMode === 'quarter' ? '#065F46' : '#64748B',
            fontWeight: 800,
            fontSize: '0.98rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <Receipt size={20} color={activeTabMode === 'quarter' ? '#059669' : '#64748B'} />
          <span>TỜ KHAI THUẾ QUÝ 4/2026 (MẪU 01/CNKD)</span>
        </button>

        <button
          onClick={() => {
            setActiveTabMode('simulator');
            playSound('click');
          }}
          style={{
            flex: 1,
            padding: '14px 20px',
            borderRadius: '16px',
            border: activeTabMode === 'simulator' ? '2px solid #2563EB' : '1.5px solid #E2E8F0',
            background: activeTabMode === 'simulator' ? '#EFF6FF' : '#FFFFFF',
            color: activeTabMode === 'simulator' ? '#1E40AF' : '#64748B',
            fontWeight: 800,
            fontSize: '0.98rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <Sparkles size={20} color={activeTabMode === 'simulator' ? '#2563EB' : '#64748B'} />
          <span>MÔ PHỎNG NGHĨA VỤ THUẾ & SO SÁNH 2 PHƯƠNG PHÁP NĐ 141/2026</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: QUARTER 4 DECLARATION (QUÁN PHỞ BÁC BA)                           */}
      {/* ========================================================================= */}
      {activeTabMode === 'quarter' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Left Column: Hero Tax Card & Method Switcher */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Hero Tax Card */}
            <div style={{
              background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)',
              borderRadius: '24px',
              padding: '28px',
              color: '#FFFFFF',
              boxShadow: '0 10px 30px rgba(15, 23, 42, 0.25)',
              border: '1px solid #334155'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#34D399', fontWeight: 700, textTransform: 'uppercase' }}>
                    Tiền thuế Quý 4/2026 phải nộp (Nghị định 141/2026):
                  </div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1.1,
                    margin: '6px 0'
                  }}>
                    {formatVND(taxCalc.totalTax)}
                  </div>
                </div>

                <span className="status-triple-badge badge-matched" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', border: '1px solid #059669' }}>
                  <ShieldCheck size={16} />
                  <span>🟢 KÊ KHAI QUÝ</span>
                </span>
              </div>

              <div style={{ fontSize: '0.92rem', color: '#CBD5E1', marginBottom: '18px' }}>
                Tổng doanh thu Quý 4 đã kiểm tra: <strong>{formatVND(quarterRev)}</strong> • Ngành: <strong>{taxCalc.sector.shortName}</strong>
              </div>

              {/* GTGT & TNCN Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                background: 'rgba(0,0,0,0.35)',
                padding: '18px',
                borderRadius: '16px'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Thuế Giá trị gia tăng (GTGT)</span>
                    <span style={{ fontSize: '0.72rem', background: '#065F46', color: '#34D399', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      {taxCalc.vatRatePercent}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34D399', fontVariantNumeric: 'tabular-nums', marginTop: '4px' }}>
                    {formatVND(taxCalc.vatAmount)}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '4px' }}>
                    = Doanh thu × 3% (Tính trên toàn bộ doanh thu)
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Thuế Thu nhập cá nhân (TNCN)</span>
                    <span style={{ fontSize: '0.72rem', background: '#1E3A8A', color: '#93C5FD', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      {taxCalc.pitRatePercent}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#60A5FA', fontVariantNumeric: 'tabular-nums', marginTop: '4px' }}>
                    {formatVND(taxCalc.pitAmount)}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: '4px' }}>
                    {taxCalc.pitMethodLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* PIT Method Selector for Quán Phở Bác Ba (Phương pháp 1 vs Phương pháp 2) */}
            <div className="web-section-container" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Scale size={18} color="#059669" />
                  <span>Chọn Phương Pháp Tính Thuế TNCN:</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                {/* Method 1: Revenue Based */}
                <div 
                  onClick={() => {
                    setPitMethod('revenue');
                    playSound('click');
                  }}
                  style={{
                    background: pitMethod === 'revenue' ? '#ECFDF5' : '#F8FAFC',
                    border: pitMethod === 'revenue' ? '2px solid #059669' : '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: pitMethod === 'revenue' ? '#065F46' : '#0F172A' }}>
                      Phương Pháp 1: Doanh Thu
                    </span>
                    <input 
                      type="radio" 
                      name="pitMethodRadio" 
                      checked={pitMethod === 'revenue'} 
                      onChange={() => {}} 
                      style={{ accentColor: '#059669' }}
                    />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.4' }}>
                    Công thức: <strong>(Doanh thu − 1 tỷ) × 1.5%</strong>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#059669', marginTop: '8px' }}>
                    {formatVND(Math.round(Math.max(0, quarterRev - 250000000) * 0.015))}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px' }}>
                    Đã trừ ngưỡng 250 triệu/quý (1 tỷ/năm)
                  </div>
                </div>

                {/* Method 2: Income / Expenses Based */}
                <div 
                  onClick={() => {
                    setPitMethod('income');
                    playSound('click');
                  }}
                  style={{
                    background: pitMethod === 'income' ? '#EFF6FF' : '#F8FAFC',
                    border: pitMethod === 'income' ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.92rem', color: pitMethod === 'income' ? '#1E40AF' : '#0F172A' }}>
                      Phương Pháp 2: Thu Nhập
                    </span>
                    <input 
                      type="radio" 
                      name="pitMethodRadio" 
                      checked={pitMethod === 'income'} 
                      onChange={() => {}} 
                      style={{ accentColor: '#2563EB' }}
                    />
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: '1.4' }}>
                    Công thức: <strong>(Doanh thu − Chi phí) × 15%</strong>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#2563EB', marginTop: '8px' }}>
                    {formatVND(Math.round(Math.max(0, quarterRev - quarterExpenses) * 0.15))}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px' }}>
                    Chi phí hợp lệ Quý: {formatVND(quarterExpenses)}
                  </div>
                </div>
              </div>

              {/* Expense Input if Method 2 selected */}
              {pitMethod === 'income' && (
                <div style={{
                  background: '#F0F9FF',
                  border: '1px dashed #BAE6FD',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div style={{ fontSize: '0.86rem', color: '#0369A1' }}>
                    <strong>Chi phí hợp lý hợp lệ Quý 4:</strong> (thịt bò, bánh phở, rau, nhân viên...)
                  </div>
                  <input
                    type="number"
                    value={quarterExpenses}
                    onChange={(e) => setQuarterExpenses(Number(e.target.value))}
                    step="5000000"
                    style={{
                      width: '160px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #7DD3FC',
                      fontWeight: 700,
                      textAlign: 'right',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Business Scale Context Box */}
            <div className="web-section-container" style={{ margin: 0 }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={18} color="#059669" />
                <span>Hồ Sơ Quy Mô Kinh Doanh Quán Phở Bác Ba</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.86rem' }}>
                <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B' }}>Số ngày mở bán/năm:</span>
                  <div style={{ fontWeight: 800, color: '#0F172A' }}>300 ngày / 365 ngày</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B' }}>Doanh thu bình quân/ngày:</span>
                  <div style={{ fontWeight: 800, color: '#059669' }}>10 - 20 triệu / ngày</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B' }}>Giá trung bình 1 bát phở:</span>
                  <div style={{ fontWeight: 800, color: '#0F172A' }}>45.000 ₫ - 70.000 ₫</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B' }}>Doanh thu dự kiến cả năm:</span>
                  <div style={{ fontWeight: 800, color: '#059669' }}>~4,65 tỷ VNĐ/năm (&gt; 1 tỷ)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Rules of Decree 141 & 1-Click Declaration Button */}
          <div className="web-section-container" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
                Nguyên Tắc Vàng Kê Khai Thuế 2026 (NĐ 141/2026/NĐ-CP):
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                <div style={{
                  background: '#ECFDF5',
                  border: '1.5px solid #A7F3D0',
                  borderRadius: '14px',
                  padding: '14px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start'
                }}>
                  <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.86rem', color: '#064E3B', lineHeight: '1.45' }}>
                    <strong>Thuế GTGT tính trên toàn bộ Doanh thu:</strong> GTGT = Doanh thu × 3% (Quán ăn). <em>Tuyệt đối không tính GTGT trên lợi nhuận hay trừ chi phí.</em>
                  </div>
                </div>

                <div style={{
                  background: '#EFF6FF',
                  border: '1.5px solid #BFDBFE',
                  borderRadius: '14px',
                  padding: '14px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start'
                }}>
                  <CheckCircle2 size={20} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.86rem', color: '#1E40AF', lineHeight: '1.45' }}>
                    <strong>Ngưỡng 1 tỷ đồng/năm:</strong> Miễn hoàn toàn GTGT và TNCN cho hộ ≤ 1 tỷ. Với hộ &gt; 1 tỷ, phương pháp 1 cho phép trừ 1 tỷ trước khi nhân thuế suất TNCN.
                  </div>
                </div>

                <div style={{
                  background: '#FFFBEB',
                  border: '1.5px solid #FDE68A',
                  borderRadius: '14px',
                  padding: '14px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start'
                }}>
                  <Info size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.86rem', color: '#92400E', lineHeight: '1.45' }}>
                    <strong>Hóa đơn điện tử máy tính tiền:</strong> Bắt buộc áp dụng cho hộ có doanh thu trên 1 tỷ/năm, khởi tạo từ máy tính tiền có mã của CQT.
                  </div>
                </div>

                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '14px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start'
                }}>
                  <Calendar size={20} color="#64748B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.86rem', color: '#334155' }}>
                    <strong>Kỳ kê khai:</strong> Kê khai 3 tháng/lần (theo Quý). Hạn nộp tờ khai và nộp thuế Quý 4/2026 là ngày <strong>30/01/2027</strong>.
                  </div>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div style={{ marginTop: '20px' }}>
              <button
                id="web-open-tax-form-btn"
                className="btn-primary-cta"
                onClick={() => {
                  setTaxReportModalOpen(true);
                  playSound('click');
                }}
                style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }}
              >
                <FileText size={20} />
                <span>XUẤT TỜ KHAI THUẾ QUÝ MẪU 01/CNKD (1 CHẠM)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: INTERACTIVE TAX SIMULATOR & COMPARATOR (MÔ PHỎNG NGHỊ ĐỊNH 141)  */}
      {/* ========================================================================= */}
      {activeTabMode === 'simulator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.2fr', gap: '24px', marginBottom: '24px' }}>
          {/* Left Column: Interactive Inputs */}
          <div className="web-section-container" style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="#2563EB" />
              <span>Thiết Lập Số Liệu Mô Phỏng Tính Thuế:</span>
            </div>

            {/* Quick Preset Buttons */}
            <div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 700, marginBottom: '6px' }}>
                CHỌN VÍ DỤ TÌNH HUỐNG MẪU:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {presetExamples.map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSimRevenue(ex.rev);
                      setSimExpenses(ex.exp);
                      playSound('click');
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      background: simRevenue === ex.rev ? '#EFF6FF' : '#F8FAFC',
                      border: simRevenue === ex.rev ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: simRevenue === ex.rev ? '#1E40AF' : '#0F172A' }}>{ex.label}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px' }}>{ex.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sector Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Ngành nghề kinh doanh:
              </label>
              <select
                value={simSectorId}
                onChange={(e) => setSimSectorId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1.5px solid #CBD5E1',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  outline: 'none',
                  background: '#FFFFFF'
                }}
              >
                {BUSINESS_SECTORS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.name} ({s.vatRate * 100}% GTGT + {s.pitRateRevenue * 100}% TNCN)
                  </option>
                ))}
              </select>
            </div>

            {/* Revenue Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Tổng Doanh Thu Cả Năm (VNĐ):
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  value={simRevenue}
                  onChange={(e) => setSimRevenue(Math.max(0, Number(e.target.value)))}
                  step="50000000"
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    outline: 'none'
                  }}
                />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#059669', minWidth: '100px', textAlign: 'right' }}>
                  {formatVND(simRevenue)}
                </span>
              </div>
            </div>

            {/* Expenses Input */}
            <div>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Chi Phí Hợp Lý, Hợp Lệ Cả Năm (VNĐ):
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="number"
                  value={simExpenses}
                  onChange={(e) => setSimExpenses(Math.max(0, Number(e.target.value)))}
                  step="50000000"
                  style={{
                    flex: 1,
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #CBD5E1',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    outline: 'none'
                  }}
                />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563EB', minWidth: '100px', textAlign: 'right' }}>
                  {formatVND(simExpenses)}
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '4px' }}>
                Lợi nhuận ước tính: <strong>{formatVND(Math.max(0, simRevenue - simExpenses))}</strong>
              </div>
            </div>

            {/* PIT Method Selector if in Tier 2 (1-3B) */}
            {simTaxResult.tier.tierId === 'tier2_choice' && (
              <div style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD', borderRadius: '14px', padding: '14px' }}>
                <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0369A1', marginBottom: '8px' }}>
                  Lựa chọn Phương pháp tính TNCN (khung 1 - 3 Tỷ):
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setSimPitMethod('revenue')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: simPitMethod === 'revenue' ? '2px solid #059669' : '1px solid #CBD5E1',
                      background: simPitMethod === 'revenue' ? '#ECFDF5' : '#FFFFFF',
                      color: simPitMethod === 'revenue' ? '#065F46' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    PP1: Theo Doanh thu (Trừ 1 Tỷ)
                  </button>

                  <button
                    onClick={() => setSimPitMethod('income')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: simPitMethod === 'income' ? '2px solid #2563EB' : '1px solid #CBD5E1',
                      background: simPitMethod === 'income' ? '#EFF6FF' : '#FFFFFF',
                      color: simPitMethod === 'income' ? '#1E40AF' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    PP2: Theo Thu nhập (15%)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Live Calculated Breakdown & Comparison */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Total Tax Output Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              borderRadius: '20px',
              padding: '24px',
              color: '#FFFFFF',
              border: '1px solid #334155',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
                  Kết Quả Tính Thuế (Nghị Định 141/2026/NĐ-CP):
                </span>
                <span style={{
                  fontSize: '0.76rem',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: simTaxResult.tier.badgeColor,
                  color: '#FFFFFF',
                  fontWeight: 800
                }}>
                  {simTaxResult.tier.label}
                </span>
              </div>

              <div style={{
                fontSize: '2.8rem',
                fontWeight: 800,
                color: simTaxResult.totalTax === 0 ? '#34D399' : '#F8FAFC',
                fontVariantNumeric: 'tabular-nums',
                margin: '8px 0'
              }}>
                {formatVND(simTaxResult.totalTax)}
              </div>

              <div style={{ fontSize: '0.86rem', color: '#CBD5E1', lineHeight: '1.4' }}>
                {simTaxResult.tier.summaryText}
              </div>

              {/* VAT and PIT Breakdown */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                background: 'rgba(0,0,0,0.3)',
                padding: '14px',
                borderRadius: '12px',
                marginTop: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Thuế GTGT ({simTaxResult.vatRatePercent})</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34D399', marginTop: '2px' }}>
                    {formatVND(simTaxResult.vatAmount)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Thuế TNCN ({simTaxResult.pitRatePercent})</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#60A5FA', marginTop: '2px' }}>
                    {formatVND(simTaxResult.pitAmount)}
                  </div>
                </div>
              </div>
            </div>

            {/* Side-by-side Method Comparison (if in Tier 2 1-3B) */}
            {simTaxResult.method1Calc && simTaxResult.method2Calc && (
              <div className="web-section-container" style={{ margin: 0 }}>
                <div style={{ fontSize: '0.96rem', fontWeight: 800, color: '#0F172A', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Scale size={18} color="#2563EB" />
                  <span>So Sánh Trực Tiếp 2 Phương Pháp Tính TNCN:</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                  {/* PP1 Box */}
                  <div style={{
                    background: simTaxResult.method1Calc.totalTax <= simTaxResult.method2Calc.totalTax ? '#ECFDF5' : '#F8FAFC',
                    border: simTaxResult.method1Calc.totalTax <= simTaxResult.method2Calc.totalTax ? '2px solid #059669' : '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#065F46' }}>PP1: THEO DOANH THU</span>
                      {simTaxResult.method1Calc.totalTax <= simTaxResult.method2Calc.totalTax && (
                        <span style={{ fontSize: '0.68rem', background: '#059669', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                          TIẾT KIỆM HƠN
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '4px' }}>
                      TNCN: ({formatVND(simRevenue)} − 1 tỷ) × 1.5%
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669', marginTop: '4px' }}>
                      {formatVND(simTaxResult.method1Calc.totalTax)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#047857', marginTop: '2px' }}>
                      (GTGT: {formatVND(simTaxResult.vatAmount)} + TNCN: {formatVND(simTaxResult.method1Calc.pitAmount)})
                    </div>
                  </div>

                  {/* PP2 Box */}
                  <div style={{
                    background: simTaxResult.method2Calc.totalTax < simTaxResult.method1Calc.totalTax ? '#EFF6FF' : '#F8FAFC',
                    border: simTaxResult.method2Calc.totalTax < simTaxResult.method1Calc.totalTax ? '2px solid #2563EB' : '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1E40AF' }}>PP2: THEO THU NHẬP</span>
                      {simTaxResult.method2Calc.totalTax < simTaxResult.method1Calc.totalTax && (
                        <span style={{ fontSize: '0.68rem', background: '#2563EB', color: '#FFF', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                          TIẾT KIỆM HƠN
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '4px' }}>
                      TNCN: ({formatVND(simRevenue)} − {formatVND(simExpenses)}) × 15%
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2563EB', marginTop: '4px' }}>
                      {formatVND(simTaxResult.method2Calc.totalTax)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#1E40AF', marginTop: '2px' }}>
                      (GTGT: {formatVND(simTaxResult.vatAmount)} + TNCN: {formatVND(simTaxResult.method2Calc.pitAmount)})
                    </div>
                  </div>
                </div>

                {/* Savings Advice */}
                {simTaxResult.optimalComparison && (
                  <div style={{
                    background: '#F0FDF4',
                    border: '1px solid #86EFAC',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    fontSize: '0.84rem',
                    color: '#166534',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Sparkles size={18} color="#059669" style={{ flexShrink: 0 }} />
                    <span><strong>Lời khuyên EzTax:</strong> {simTaxResult.optimalComparison.explanation}</span>
                  </div>
                )}
              </div>
            )}

            {/* Formula Explanation Accordion Box */}
            <div className="web-section-container" style={{ margin: 0 }}>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                Chi Tiết Công Thức Tính Thuế:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem' }}>
                <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <strong>Thuế GTGT:</strong> {simTaxResult.vatFormulaExplanation}
                </div>
                <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <strong>Thuế TNCN:</strong> {simTaxResult.pitFormulaExplanation}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
