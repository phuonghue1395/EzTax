import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  Percent, 
  Sparkles,
  Printer,
  Send,
  Building,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { calculateTax, formatVND, TAX_MANDATORY_SCALE } from '../utils/taxRules';

export const TaxScreen = () => {
  const { merchant, setTaxReportModalOpen, openGlossary, quarterTaxInfo, playSound } = useApp();

  const quarterRev = merchant.quarterSummary.totalRevenue;
  const taxCalc = quarterTaxInfo;

  return (
    <div className="web-content">
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calculator size={28} color="#059669" />
            <span>Kê Khai Thuế Quý & Xuất Tờ Khai Mẫu 01/CNKD</span>
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B', marginTop: '4px' }}>
            Áp dụng cho Hộ kinh doanh có <strong>doanh thu trên 1 tỷ đồng/năm</strong> (Kê khai 3 tháng/lần theo Quý - Thông tư 40/2021/TT-BTC).
          </p>
        </div>

        <button 
          className="btn-subtle-link" 
          onClick={() => openGlossary('Doanh thu > 1 tỷ / Kê khai theo quý')}
          style={{ fontSize: '0.92rem' }}
        >
          <HelpCircle size={18} />
          <span>Quy định kê khai Quý là gì?</span>
        </button>
      </div>

      {/* 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Left: Hero Estimated Tax & Breakdown */}
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
                  Tiền thuế phải nộp {merchant.quarterSummary.quarter}:
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

            <div style={{ fontSize: '0.92rem', color: '#CBD5E1', marginBottom: '20px' }}>
              Tổng doanh thu Quý 4 đã kiểm tra: <strong>{formatVND(quarterRev)}</strong> (Quán Phở Bác Ba)
            </div>

            {/* GTGT & TNCN Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              background: 'rgba(0,0,0,0.3)',
              padding: '16px',
              borderRadius: '16px'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Thuế Giá trị gia tăng (GTGT - 3.0%)</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399', fontVariantNumeric: 'tabular-nums', marginTop: '2px' }}>
                  {formatVND(taxCalc.vatAmount)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Thuế Thu nhập cá nhân (TNCN - 1.5%)</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34D399', fontVariantNumeric: 'tabular-nums', marginTop: '2px' }}>
                  {formatVND(taxCalc.pitAmount)}
                </div>
              </div>
            </div>
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

        {/* Right: Legal Basis & 1-Click Declaration Button */}
        <div className="web-section-container" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
              Quy Định Thuế Bắt Buộc Dành Cho Quán Bác Ba:
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
                <div style={{ fontSize: '0.86rem', color: '#064E3B' }}>
                  <strong>Kê khai theo Quý (3 tháng/lần):</strong> Hạn nộp tờ khai và nộp thuế Quý 4/2026 là ngày 30/01/2027.
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
                <div style={{ fontSize: '0.86rem', color: '#1E40AF' }}>
                  <strong>Hóa đơn điện tử máy tính tiền:</strong> Đã kết nối tự động với Cục Thuế Hoàn Kiếm, không lo bị truy thu hay phạt vi phạm.
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
                <Info size={20} color="#64748B" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.86rem', color: '#334155' }}>
                  <strong>Công thức tính thuế ngành ăn uống:</strong> Tổng nộp 4.5% = 3.0% Thuế GTGT + 1.5% Thuế TNCN trên tổng doanh thu thực tế.
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
    </div>
  );
};
