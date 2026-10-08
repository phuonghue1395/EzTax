import React from 'react';
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

  const quarterRev = merchant.quarterSummary.totalRevenue;
  const taxCalc = quarterTaxInfo;

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
        padding: '20px 24px',
        border: '1.5px solid #E2E8F0',
        marginBottom: '24px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={20} color="#059669" />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.01em' }}>Quy Định Phân Khúc Doanh Thu Năm (Nghị định 141/2026/NĐ-CP)</span>
          </span>
          <span style={{ fontSize: '0.82rem', color: '#059669', background: '#ECFDF5', padding: '4px 12px', borderRadius: '9999px', fontWeight: 800, border: '1px solid #A7F3D0' }}>
            Quán Bác Ba: Quy mô ~4.65 Tỷ/năm (Phân khúc 3)
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
          {/* Tier 1 */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
            border: '1.5px solid #86EFAC',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#166534' }}>
                1. Mức ≤ 1 Tỷ / năm
              </div>
              <div style={{ fontSize: '0.8rem', color: '#15803D', marginTop: '6px', fontWeight: 800 }}>
                🟢 MIỄN 100% THUẾ
              </div>
              <div style={{ fontSize: '0.78rem', color: '#166534', marginTop: '4px', lineHeight: '1.4' }}>
                • Miễn nộp thuế GTGT<br />
                • Miễn nộp thuế TNCN
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#166534', color: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', marginTop: '10px', alignSelf: 'flex-start', fontWeight: 800 }}>
              Ngưỡng miễn mới
            </span>
          </div>

          {/* Tier 2 */}
          <div style={{
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
            border: '1.5px solid #93C5FD',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1E40AF' }}>
                2. Mức &gt; 1 Tỷ → ≤ 3 Tỷ
              </div>
              <div style={{ fontSize: '0.8rem', color: '#1D4ED8', marginTop: '6px', fontWeight: 800 }}>
                🔵 NỘP GTGT + CHỌN PP TNCN
              </div>
              <div style={{ fontSize: '0.78rem', color: '#1E40AF', marginTop: '4px', lineHeight: '1.4' }}>
                • GTGT = Doanh thu × % ngành<br />
                • TNCN: Được chọn PP1 hoặc PP2
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#1E40AF', color: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', marginTop: '10px', alignSelf: 'flex-start', fontWeight: 800 }}>
              Được chọn 2 PP
            </span>
          </div>

          {/* Tier 3 (Quán Bác Ba) */}
          <div style={{
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            border: '2.5px solid #F59E0B',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 6px 18px rgba(245, 158, 11, 0.2)'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#92400E' }}>
                  3. Mức &gt; 3 Tỷ → ≤ 50 Tỷ
                </div>
                <span style={{ fontSize: '0.7rem', background: '#D97706', color: '#FFFFFF', padding: '2px 8px', borderRadius: '6px', fontWeight: 900 }}>
                  Quán Bác Ba
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#B45309', marginTop: '6px', fontWeight: 800 }}>
                🟡 NỘP GTGT + TNCN 17%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#92400E', marginTop: '4px', lineHeight: '1.4' }}>
                • GTGT = Doanh thu × % ngành<br />
                • TNCN = (Doanh thu − Chi phí) × 17%
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#92400E', color: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', marginTop: '10px', alignSelf: 'flex-start', fontWeight: 800 }}>
              Thu nhập 17%
            </span>
          </div>

          {/* Tier 4 */}
          <div style={{
            background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
            border: '1.5px solid #FCA5A5',
            borderRadius: '16px',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#991B1B' }}>
                4. Mức &gt; 50 Tỷ / năm
              </div>
              <div style={{ fontSize: '0.8rem', color: '#B91C1C', marginTop: '6px', fontWeight: 800 }}>
                🔴 NỘP GTGT + TNCN 20%
              </div>
              <div style={{ fontSize: '0.78rem', color: '#991B1B', marginTop: '4px', lineHeight: '1.4' }}>
                • GTGT = Doanh thu × % ngành<br />
                • TNCN = (Doanh thu − Chi phí) × 20%
              </div>
            </div>
            <span style={{ fontSize: '0.72rem', background: '#991B1B', color: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', marginTop: '10px', alignSelf: 'flex-start', fontWeight: 800 }}>
              Thuế suất 20%
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Left Column: Hero Tax Card & Method Switcher */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Hero Tax Card */}
            <div style={{
              background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)',
              borderRadius: '24px',
              padding: '28px',
              color: '#FFFFFF',
              boxShadow: '0 12px 36px rgba(15, 23, 42, 0.28)',
              border: '1px solid #334155',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#34D399', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    TỔNG TIỀN THUẾ QUÝ 4/2026 PHẢI NỘP (NGHỊ ĐỊNH 141/2026):
                  </div>
                  <div style={{
                    fontSize: '3.2rem',
                    fontWeight: 800,
                    color: '#FFFFFF',
                    fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1.1,
                    margin: '8px 0',
                    letterSpacing: '-0.02em'
                  }}>
                    {formatVND(taxCalc.totalTax)}
                  </div>
                </div>

                <span className="status-triple-badge badge-matched" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', border: '1.5px solid #059669', padding: '6px 12px', fontSize: '0.82rem' }}>
                  <ShieldCheck size={18} />
                  <span>🟢 KÊ KHAI QUÝ</span>
                </span>
              </div>

              <div style={{ fontSize: '0.92rem', color: '#CBD5E1', marginBottom: '20px' }}>
                Tổng doanh thu Quý 4 đã ghi nhận: <strong>{formatVND(quarterRev)}</strong> • Ngành: <strong>{taxCalc.sector.shortName}</strong>
              </div>

              {/* GTGT & TNCN Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
                background: 'rgba(0, 0, 0, 0.4)',
                padding: '20px',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 700 }}>Thuế Giá trị gia tăng (GTGT)</span>
                    <span style={{ fontSize: '0.72rem', background: '#065F46', color: '#34D399', padding: '2px 7px', borderRadius: '6px', fontWeight: 800 }}>
                      {taxCalc.vatRatePercent}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34D399', fontVariantNumeric: 'tabular-nums', marginTop: '6px' }}>
                    {formatVND(taxCalc.vatAmount)}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '4px', lineHeight: '1.35' }}>
                    = Doanh thu Quý × 3% (Tính trên toàn bộ doanh thu)
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 700 }}>Thuế Thu nhập cá nhân (TNCN)</span>
                    <span style={{ fontSize: '0.72rem', background: '#1E3A8A', color: '#93C5FD', padding: '2px 7px', borderRadius: '6px', fontWeight: 800 }}>
                      {taxCalc.pitRatePercent}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#60A5FA', fontVariantNumeric: 'tabular-nums', marginTop: '6px' }}>
                    {formatVND(taxCalc.pitAmount)}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginTop: '4px', lineHeight: '1.35' }}>
                    {taxCalc.pitMethodLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* PIT Method Selector for Quán Phở Bác Ba (Phương pháp 1 vs Phương pháp 2) */}
            <div className="web-section-container" style={{ margin: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Scale size={20} color="#059669" />
                  <span>Lựa Chọn Phương Pháp Tính Thuế TNCN (Dành Cho Hộ &gt; 1 Tỷ):</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                {/* Method 1: Revenue Based */}
                <div 
                  onClick={() => {
                    setPitMethod('revenue');
                    playSound('click');
                  }}
                  style={{
                    background: pitMethod === 'revenue' ? '#ECFDF5' : '#F8FAFC',
                    border: pitMethod === 'revenue' ? '2.5px solid #059669' : '1.5px solid #E2E8F0',
                    borderRadius: '18px',
                    padding: '18px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: pitMethod === 'revenue' ? '0 6px 18px rgba(5, 150, 105, 0.12)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.96rem', color: pitMethod === 'revenue' ? '#065F46' : '#0F172A' }}>
                      Phương Pháp 1: Doanh Thu
                    </span>
                    <input 
                      type="radio" 
                      name="pitMethodRadio" 
                      checked={pitMethod === 'revenue'} 
                      onChange={() => {}} 
                      style={{ accentColor: '#059669', width: '18px', height: '18px' }}
                    />
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.4' }}>
                    Công thức: <strong>(Doanh thu − 1 tỷ) × 1.5%</strong>
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669', marginTop: '8px', fontVariantNumeric: 'tabular-nums' }}>
                    {formatVND(Math.round(Math.max(0, quarterRev - 250000000) * 0.015))}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>
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
                    border: pitMethod === 'income' ? '2.5px solid #2563EB' : '1.5px solid #E2E8F0',
                    borderRadius: '18px',
                    padding: '18px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: pitMethod === 'income' ? '0 6px 18px rgba(37, 99, 235, 0.12)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.96rem', color: pitMethod === 'income' ? '#1E40AF' : '#0F172A' }}>
                      Phương Pháp 2: Thu Nhập
                    </span>
                    <input 
                      type="radio" 
                      name="pitMethodRadio" 
                      checked={pitMethod === 'income'} 
                      onChange={() => {}} 
                      style={{ accentColor: '#2563EB', width: '18px', height: '18px' }}
                    />
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.4' }}>
                    Công thức: <strong>(Doanh thu − Chi phí) × 15%</strong>
                  </div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#2563EB', marginTop: '8px', fontVariantNumeric: 'tabular-nums' }}>
                    {formatVND(Math.round(Math.max(0, quarterRev - quarterExpenses) * 0.15))}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>
                    Chi phí hợp lệ Quý: {formatVND(quarterExpenses)}
                  </div>
                </div>
              </div>

              {/* Expense Input if Method 2 selected */}
              {pitMethod === 'income' && (
                <div style={{
                  background: '#F0F9FF',
                  border: '1.5px dashed #7DD3FC',
                  borderRadius: '14px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px'
                }}>
                  <div style={{ fontSize: '0.88rem', color: '#0369A1' }}>
                    <strong>Chi phí hợp lý hợp lệ Quý 4:</strong> (thịt bò, bánh phở, rau, nhân công...)
                  </div>
                  <input
                    type="number"
                    value={quarterExpenses}
                    onChange={(e) => setQuarterExpenses(Number(e.target.value))}
                    step="5000000"
                    style={{
                      width: '180px',
                      padding: '8px 14px',
                      borderRadius: '10px',
                      border: '1.5px solid #0284C7',
                      fontWeight: 800,
                      textAlign: 'right',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Business Scale Context Box */}
            <div className="web-section-container" style={{ margin: 0 }}>
              <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={20} color="#059669" />
                <span>Hồ Sơ Quy Mô Kinh Doanh Quán Phở Bác Ba</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.88rem' }}>
                <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B' }}>Số ngày mở bán/năm:</span>
                  <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>300 ngày / 365 ngày</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B' }}>Doanh thu bình quân/ngày:</span>
                  <div style={{ fontWeight: 800, color: '#059669', marginTop: '2px' }}>10 - 20 triệu / ngày</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B' }}>Giá trung bình 1 bát phở:</span>
                  <div style={{ fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>45.000 ₫ - 70.000 ₫</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '12px 14px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
                  <span style={{ color: '#64748B' }}>Doanh thu dự kiến cả năm:</span>
                  <div style={{ fontWeight: 800, color: '#059669', marginTop: '2px' }}>~4,65 tỷ VNĐ/năm (&gt; 1 tỷ)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Rules of Decree 141 & 1-Click Declaration Button */}
          <div className="web-section-container" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
                Nguyên Tắc Vàng Kê Khai Thuế 2026 (NĐ 141/2026/NĐ-CP):
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  background: '#ECFDF5',
                  border: '1.5px solid #A7F3D0',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}>
                  <CheckCircle2 size={22} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.88rem', color: '#064E3B', lineHeight: '1.5' }}>
                    <strong>Thuế GTGT tính trên toàn bộ Doanh thu:</strong> GTGT = Doanh thu × 3% (Quán ăn). <em>Tuyệt đối không tính GTGT trên lợi nhuận hay trừ chi phí.</em>
                  </div>
                </div>

                <div style={{
                  background: '#EFF6FF',
                  border: '1.5px solid #BFDBFE',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}>
                  <CheckCircle2 size={22} color="#2563EB" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.88rem', color: '#1E40AF', lineHeight: '1.5' }}>
                    <strong>Ngưỡng 1 tỷ đồng/năm:</strong> Miễn hoàn toàn GTGT và TNCN cho hộ ≤ 1 tỷ. Với hộ &gt; 1 tỷ, phương pháp 1 cho phép trừ 1 tỷ trước khi nhân thuế suất TNCN.
                  </div>
                </div>

                <div style={{
                  background: '#FFFBEB',
                  border: '1.5px solid #FDE68A',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}>
                  <Info size={22} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.88rem', color: '#92400E', lineHeight: '1.5' }}>
                    <strong>Hóa đơn điện tử máy tính tiền:</strong> Bắt buộc áp dụng cho hộ có doanh thu trên 1 tỷ/năm, khởi tạo từ máy tính tiền có mã của CQT.
                  </div>
                </div>

                <div style={{
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}>
                  <Calendar size={22} color="#64748B" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.5' }}>
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
                style={{ width: '100%', minHeight: '52px', fontSize: '1.05rem', boxShadow: '0 8px 24px rgba(5, 150, 105, 0.28)' }}
              >
                <FileText size={22} />
                <span>XUẤT TỜ KHAI THUẾ QUÝ MẪU 01/CNKD (1 CHẠM)</span>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};
