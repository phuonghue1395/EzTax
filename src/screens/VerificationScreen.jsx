import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  HelpCircle, 
  QrCode, 
  Building2, 
  ExternalLink, 
  Lock, 
  FileCheck2, 
  Share2, 
  Sparkles,
  CheckCircle,
  Landmark,
  BadgePercent
} from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const VerificationScreen = () => {
  const { 
    merchant, 
    openGlossary, 
    setBankShareModalOpen, 
    setExternalVerifyModalOpen,
    playSound 
  } = useApp();

  const stamp = merchant.quarterSummary.blockchainStamp;

  return (
    <div className="web-content">
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={28} color="#059669" />
            <span>Dấu Xác Thực Chống Sửa & Vay Vốn Ngân Hàng</span>
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B', marginTop: '4px' }}>
            "Con dấu mộc đỏ điện tử" niêm phong báo cáo doanh thu, ngân hàng và cơ quan thuế đối chiếu là tin ngay 100%.
          </p>
        </div>

        <button 
          className="btn-subtle-link" 
          onClick={() => openGlossary('Blockchain / Anchoring / Hash')}
          style={{ fontSize: '0.92rem' }}
        >
          <HelpCircle size={18} />
          <span>Dấu xác thực là gì?</span>
        </button>
      </div>

      {/* Horizontal Cryptographic Certificate Card */}
      <div className="blockchain-cert-card" style={{ marginBottom: '24px' }}>
        <div className="cert-watermark">EZTAX</div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: 'rgba(52, 211, 153, 0.2)', padding: '10px', borderRadius: '50%', display: 'flex' }}>
              <ShieldCheck size={32} color="#34D399" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#A7F3D0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Chứng Nhận Doanh Thu Thực Bất Khả Xâm Phạm
              </div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF' }}>
                {merchant.storeName} ({merchant.ownerName})
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{
              background: 'rgba(16, 185, 129, 0.2)',
              color: '#34D399',
              border: '1.5px solid #059669',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 800
            }}>
              🟢 ĐÃ NIÊM PHONG SỐ LIỆU
            </span>
          </div>
        </div>

        {/* 3-Column Info Inside Certificate */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          background: 'rgba(0,0,0,0.35)',
          padding: '18px',
          borderRadius: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Doanh thu đã xác thực ({merchant.quarterSummary.quarter}):</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', fontVariantNumeric: 'tabular-nums', marginTop: '2px' }}>
              {formatVND(merchant.quarterSummary.totalRevenue)}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#34D399', marginTop: '2px' }}>
              Khớp số liệu: <strong>{merchant.quarterSummary.matchRate}%</strong>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Mã chứng chỉ & Khối dữ liệu:</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34D399', fontFamily: 'monospace', marginTop: '4px' }}>
              {stamp.certCode}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '2px' }}>
              Block: {stamp.blockNumber}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Thời điểm khóa số & Đơn vị kiểm định:</div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FFFFFF', marginTop: '4px' }}>
              {stamp.timestamp}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
              {stamp.validator}
            </div>
          </div>
        </div>

        {/* Hash pill */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.76rem', color: '#94A3B8', marginBottom: '4px' }}>Mã băm SHA-256 chống chỉnh sửa:</div>
          <div className="hash-pill" style={{ margin: 0 }}>
            {stamp.hash}
          </div>
        </div>

        {/* Action Buttons Inside Card */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn-primary-cta"
            onClick={() => {
              setBankShareModalOpen(true);
              playSound('click');
            }}
            style={{ flex: 1 }}
          >
            <Landmark size={20} />
            <span>NỘP HỒ SƠ VAY VỐN TÍN CHẤP NGÂN HÀNG (HẠN MỨC 500TR)</span>
          </button>

          <button
            className="btn-secondary-outline"
            onClick={() => {
              setExternalVerifyModalOpen(true);
              playSound('click');
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF'
            }}
          >
            <QrCode size={18} color="#34D399" />
            <span>Xem Cổng Đối Soát Độc Lập Cho Cán Bộ Thuế / Ngân Hàng</span>
          </button>
        </div>
      </div>

      {/* 2-Column Benefits & Partner Banks Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Box 1: Merchant Benefits */}
        <div className="web-section-container" style={{ margin: 0 }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
            🌟 Lợi Ích Của Dấu Xác Thực Cho Quán:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ background: '#EFF6FF', padding: '8px', borderRadius: '10px', color: '#2563EB' }}>
                <BadgePercent size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>Vay vốn tín chấp không thế chấp tài sản</div>
                <div style={{ fontSize: '0.84rem', color: '#64748B' }}>Ngân hàng duyệt hồ sơ trực tiếp dựa trên doanh thu thực tế đã khóa số, không đòi hỏi giấy tờ nhà đất.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ background: '#ECFDF5', padding: '8px', borderRadius: '10px', color: '#059669' }}>
                <CheckCircle size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>An tâm tuyệt đối khi kiểm tra quyết toán thuế</div>
                <div style={{ fontSize: '0.84rem', color: '#64748B' }}>Dữ liệu không thể bị chỉnh sửa lùi ngày, giúp bảo vệ uy tín kinh doanh của hộ gia đình.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: Partner Banks Quick List */}
        <div className="web-section-container" style={{ margin: 0 }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '14px' }}>
            🏛️ Ngân Hàng Đối Tác Hỗ Trợ Gói Vay Ưu Đãi:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>🏛️ Vietcombank</div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>Lãi suất: 6.8%/năm</div>
              <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Hạn mức tới 300 triệu</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>🏦 BIDV</div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>Lãi suất: 7.0%/năm</div>
              <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Hạn mức tới 350 triệu</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>💳 VPBank SME</div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>Lãi suất: 7.5%/năm</div>
              <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Hạn mức tới 500 triệu</div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0F172A' }}>🌾 Agribank</div>
              <div style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>Lãi suất: 6.5%/năm</div>
              <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Hạn mức tới 250 triệu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
