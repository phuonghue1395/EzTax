import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Printer, 
  Share2, 
  Send, 
  ShieldCheck, 
  QrCode, 
  FileCheck, 
  CheckCircle,
  Building
} from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const TaxReportModal = () => {
  const { taxReportModalOpen, setTaxReportModalOpen, merchant, quarterTaxInfo, playSound, showToast } = useApp();

  if (!taxReportModalOpen) return null;

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  const handleShareZalo = () => {
    playSound('ting');
    showToast('Đã sao chép liên kết tờ khai để gửi Zalo cho kế toán!', 'success');
  };

  const handleSubmitTax = () => {
    playSound('success');
    showToast('Đã truyền dữ liệu tờ khai sang Cổng Thuế điện tử eTax! 🟢', 'success');
    setTaxReportModalOpen(false);
  };

  const stamp = merchant.quarterSummary.blockchainStamp;

  return (
    <div className="modal-overlay" onClick={() => setTaxReportModalOpen(false)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '780px', maxHeight: '92vh' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ECFDF5', padding: '8px', borderRadius: '10px', color: '#059669' }}>
              <FileCheck size={26} />
            </div>
            <div>
              <h2 className="sheet-header-title" style={{ marginBottom: 0 }}>Tờ Khai Thuế Mẫu 01/CNKD</h2>
              <div style={{ fontSize: '0.84rem', color: '#64748B' }}>Chuẩn Thông tư 40/2021/TT-BTC có dấu xác thực chống sửa</div>
            </div>
          </div>
          <button
            onClick={() => {
              setTaxReportModalOpen(false);
              playSound('click');
            }}
            style={{
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} color="#64748B" />
          </button>
        </div>

        {/* Printable Official Form Preview */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          border: '1.5px solid #CBD5E1',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          marginBottom: '20px'
        }}>
          {/* Form Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #0F172A', paddingBottom: '14px', marginBottom: '18px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </div>
            <div style={{ fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '6px' }}>
              Độc lập - Tự do - Hạnh phúc
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#064E3B', textTransform: 'uppercase' }}>
              TỜ KHAI THUẾ ĐỐI VỚI HỘ KINH DOANH
            </div>
            <div style={{ fontSize: '0.84rem', color: '#64748B' }}>
              Kỳ tính thuế: {merchant.quarterSummary.quarter} (Mẫu 01/CNKD - Ban hành kèm Thông tư 40/2021/TT-BTC)
            </div>
          </div>

          {/* Merchant Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', marginBottom: '18px' }}>
            <div><strong>Tên người nộp thuế:</strong> {merchant.ownerName}</div>
            <div><strong>Tên cửa hàng:</strong> {merchant.storeName}</div>
            <div><strong>Mã số thuế:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{merchant.taxCode}</span></div>
            <div><strong>Địa chỉ:</strong> {merchant.address}</div>
            <div style={{ gridColumn: 'span 2' }}><strong>Cơ quan thuế quản lý:</strong> {merchant.taxAuthority}</div>
          </div>

          {/* Tax Calculation Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', marginBottom: '18px' }}>
            <thead>
              <tr style={{ background: '#F1F5F9', textAlign: 'left' }}>
                <th style={{ border: '1px solid #CBD5E1', padding: '10px' }}>Chỉ tiêu kinh doanh & sắc thuế</th>
                <th style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'right' }}>Số tiền (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px' }}>
                  <strong>1. Doanh thu tính thuế</strong> ({merchant.sectorName})
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'right', fontWeight: 800, fontSize: '0.95rem' }}>
                  {formatVND(merchant.quarterSummary.totalRevenue)}
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px' }}>
                  2. Thuế Giá trị gia tăng (GTGT) phải nộp ({quarterTaxInfo.vatRatePercent})
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'right', color: '#059669', fontWeight: 700 }}>
                  {formatVND(quarterTaxInfo.vatAmount)}
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px' }}>
                  3. Thuế Thu nhập cá nhân (TNCN) phải nộp ({quarterTaxInfo.pitRatePercent})
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'right', color: '#059669', fontWeight: 700 }}>
                  {formatVND(quarterTaxInfo.pitAmount)}
                </td>
              </tr>
              <tr style={{ background: '#ECFDF5' }}>
                <td style={{ border: '1px solid #CBD5E1', padding: '12px 10px', fontWeight: 800, color: '#064E3B', fontSize: '0.95rem' }}>
                  TỔNG SỐ TIỀN THUẾ PHẢI NỘP
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '12px 10px', textAlign: 'right', fontWeight: 800, fontSize: '1.2rem', color: '#064E3B' }}>
                  {formatVND(quarterTaxInfo.totalTax)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Blockchain Seal Stamp Box */}
          <div style={{
            background: '#0F172A',
            color: '#FFFFFF',
            borderRadius: '14px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              background: '#FFFFFF',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex'
            }}>
              <QrCode size={52} color="#0F172A" />
            </div>
            <div style={{ flex: 1, fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399', fontWeight: 800 }}>
                <ShieldCheck size={18} />
                <span>DẤU XÁC THỰC CHỐNG SỬA SỐ LIỆU ĐIỆN TỬ</span>
              </div>
              <div style={{ color: '#94A3B8', marginTop: '2px', fontFamily: 'monospace' }}>
                Mã chứng thư: {stamp.certCode} • Khối {stamp.blockNumber}
              </div>
              <div style={{ color: '#CBD5E1', fontSize: '0.76rem', marginTop: '2px' }}>
                Khóa: {stamp.hash}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn-primary-cta"
            onClick={handleSubmitTax}
            style={{ flex: 1.5, minHeight: '48px', fontSize: '1rem' }}
          >
            <Send size={20} />
            <span>NỘP TỜ KHAI LÊN CHI CỤC THUẾ (1 CHẠM)</span>
          </button>

          <button
            className="btn-secondary-outline"
            onClick={handlePrint}
            style={{ flex: 1, minHeight: '48px' }}
          >
            <Printer size={18} />
            <span>In tờ khai A4</span>
          </button>

          <button
            className="btn-secondary-outline"
            onClick={handleShareZalo}
            style={{ flex: 1, minHeight: '48px' }}
          >
            <Share2 size={18} color="#0068FF" />
            <span>Gửi qua Zalo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
