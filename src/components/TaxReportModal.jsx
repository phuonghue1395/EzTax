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
  Building,
  Scale
} from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const TaxReportModal = () => {
  const { 
    taxReportModalOpen, 
    setTaxReportModalOpen, 
    merchant, 
    quarterTaxInfo, 
    pitMethod, 
    quarterExpenses,
    playSound, 
    showToast 
  } = useApp();

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
        style={{ maxWidth: '820px', maxHeight: '92vh' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ECFDF5', padding: '8px', borderRadius: '10px', color: '#059669' }}>
              <FileCheck size={26} />
            </div>
            <div>
              <h2 className="sheet-header-title" style={{ marginBottom: 0 }}>Tờ Khai Thuế Mẫu 01/CNKD</h2>
              <div style={{ fontSize: '0.84rem', color: '#64748B' }}>
                Chuẩn <strong>Nghị định 141/2026/NĐ-CP</strong> & Thông tư 40/2021/TT-BTC (Có dấu chống sửa)
              </div>
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
              TỜ KHAI THUẾ ĐỐI VỚI HỘ KINH DOANH, CÁ NHÂN KINH DOANH
            </div>
            <div style={{ fontSize: '0.84rem', color: '#64748B' }}>
              Kỳ tính thuế: {merchant.quarterSummary.quarter} (Theo Nghị định 141/2026/NĐ-CP & TT 40/2021/TT-BTC)
            </div>
          </div>

          {/* Merchant Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.88rem', marginBottom: '18px' }}>
            <div><strong>Tên người nộp thuế:</strong> {merchant.ownerName}</div>
            <div><strong>Tên cửa hàng:</strong> {merchant.storeName}</div>
            <div><strong>Mã số thuế:</strong> <span style={{ fontFamily: 'monospace', fontWeight: 800 }}>{merchant.taxCode}</span></div>
            <div><strong>Địa chỉ:</strong> {merchant.address}</div>
            <div><strong>Ngành nghề kinh doanh:</strong> {merchant.sectorName}</div>
            <div><strong>Cơ quan thuế quản lý:</strong> {merchant.taxAuthority}</div>
          </div>

          {/* Tax Calculation Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', marginBottom: '18px' }}>
            <thead>
              <tr style={{ background: '#F1F5F9', textAlign: 'left' }}>
                <th style={{ border: '1px solid #CBD5E1', padding: '10px' }}>Chỉ tiêu kinh doanh & căn cứ tính thuế</th>
                <th style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'center' }}>Cơ sở pháp lý / Tỷ lệ</th>
                <th style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'right' }}>Số tiền (VNĐ)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px' }}>
                  <strong>[01] Tổng Doanh thu thực tế trong Quý</strong>
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'center', color: '#64748B' }}>
                  Đã đối soát 100%
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'right', fontWeight: 800, fontSize: '0.95rem' }}>
                  {formatVND(merchant.quarterSummary.totalRevenue)}
                </td>
              </tr>

              {/* Chi phí nếu chọn PP thu nhập */}
              {pitMethod === 'income' && (
                <tr>
                  <td style={{ border: '1px solid #CBD5E1', padding: '10px' }}>
                    <strong>[02] Chi phí hợp lý, hợp lệ được trừ</strong> (Nguyên liệu, nhân công, mặt bằng...)
                  </td>
                  <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'center', color: '#64748B' }}>
                    Chứng từ hợp lệ
                  </td>
                  <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'right', fontWeight: 700, color: '#2563EB' }}>
                    {formatVND(quarterExpenses)}
                  </td>
                </tr>
              )}

              {/* Thuế GTGT */}
              <tr>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px' }}>
                  <strong>[03] Thuế Giá trị gia tăng (GTGT) phải nộp</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                    = Doanh thu × 3% (Tính trên toàn bộ doanh thu thực tế, không trừ chi phí)
                  </div>
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'center', color: '#059669', fontWeight: 700 }}>
                  {quarterTaxInfo.vatRatePercent}
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'right', color: '#059669', fontWeight: 700 }}>
                  {formatVND(quarterTaxInfo.vatAmount)}
                </td>
              </tr>

              {/* Thuế TNCN */}
              <tr>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px' }}>
                  <strong>[04] Thuế Thu nhập cá nhân (TNCN) phải nộp</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                    {pitMethod === 'income' 
                      ? `= (Doanh thu − Chi phí hợp lệ) × 15% (theo NĐ 141/2026)`
                      : `= (Doanh thu − Ngưỡng 250 triệu/quý) × 1.5%`}
                  </div>
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'center', color: '#2563EB', fontWeight: 700 }}>
                  {quarterTaxInfo.pitRatePercent}
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '10px', textAlign: 'right', color: '#2563EB', fontWeight: 700 }}>
                  {formatVND(quarterTaxInfo.pitAmount)}
                </td>
              </tr>

              {/* Total Tax */}
              <tr style={{ background: '#ECFDF5' }}>
                <td colSpan="2" style={{ border: '1px solid #CBD5E1', padding: '12px 10px', fontWeight: 800, color: '#064E3B', fontSize: '0.98rem' }}>
                  [05] TỔNG SỐ TIỀN THUẾ PHẢI NỘP VÀO NGÂN SÁCH (GTGT + TNCN)
                </td>
                <td style={{ border: '1px solid #CBD5E1', padding: '12px 10px', textAlign: 'right', fontWeight: 800, fontSize: '1.25rem', color: '#064E3B' }}>
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
                <span>DẤU XÁC THỰC CHỐNG SỬA SỐ LIỆU THEO NGHỊ ĐỊNH 141/2026/NĐ-CP</span>
              </div>
              <div style={{ color: '#94A3B8', marginTop: '2px', fontFamily: 'monospace' }}>
                Mã chứng thư: {stamp.certCode} • Khối {stamp.blockNumber}
              </div>
              <div style={{ color: '#CBD5E1', fontSize: '0.76rem', marginTop: '2px' }}>
                Khóa niêm phong: {stamp.hash}
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
