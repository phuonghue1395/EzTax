import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  AlertCircle, 
  ArrowRight,
  Download,
  CreditCard
} from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const UploadStatementModal = () => {
  const { uploadModalOpen, setUploadModalOpen, playSound, showToast, importStatementData } = useApp();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [parseResult, setParseResult] = useState(null);

  if (!uploadModalOpen) return null;

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0] || { name: 'SaoKe_Vietcombank_VietQR_08102026.xlsx', size: '248 KB' };
    setSelectedFile(file);
    setIsProcessing(true);
    playSound('click');

    setTimeout(() => {
      setIsProcessing(false);
      setParseResult({
        bankName: 'Vietcombank (VietQR) - STK 0011004892837',
        totalTxs: 172,
        totalAmount: 10450000,
        matchedCount: 170,
        unclassifiedCount: 2,
        unclassifiedItems: [
          { amount: 500000, desc: 'Chi Ba tra no tien rau cu', suggestion: 'Tiền cá nhân' },
          { amount: 200000, desc: 'Ban Thang chuyen tien ca phe', suggestion: 'Tiền cá nhân' }
        ]
      });
      playSound('success');
    }, 1200);
  };

  const handleConfirmImport = () => {
    playSound('ting');
    showToast('Đã nạp thành công 172 giao dịch từ sao kê Vietcombank vào sổ đối soát! 🟢', 'success');
    setUploadModalOpen(false);
    setSelectedFile(null);
    setParseResult(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setUploadModalOpen(false)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#EFF6FF', padding: '8px', borderRadius: '10px', color: '#2563EB' }}>
                <Upload size={24} />
              </div>
              <h2 className="sheet-header-title" style={{ marginBottom: 0 }}>Tải Lên Sao Kê Ngân Hàng / VietQR</h2>
            </div>
            <p className="sheet-subtitle" style={{ marginBottom: 0, marginTop: '4px' }}>
              Tải file Excel / CSV / PDF từ Vietcombank, MoMo để EzTax tự động đối soát với máy tính tiền
            </p>
          </div>
          <button
            onClick={() => {
              setUploadModalOpen(false);
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

        {/* Upload Drag & Drop Zone */}
        {!parseResult && !isProcessing && (
          <div>
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '36px 20px',
              border: '2px dashed #059669',
              borderRadius: '20px',
              background: '#F0FDF4',
              cursor: 'pointer',
              marginBottom: '16px',
              transition: 'all 0.15s ease'
            }}>
              <FileSpreadsheet size={48} color="#059669" style={{ marginBottom: '12px' }} />
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#064E3B', marginBottom: '4px' }}>
                Kéo thả file sao kê hoặc bấm để chọn file
              </div>
              <div style={{ fontSize: '0.84rem', color: '#64748B' }}>
                Hỗ trợ định dạng: <strong>.XLSX, .CSV, .PDF</strong> (Sao kê Vietcombank, MBBank, Techcombank, MoMo...)
              </div>
              <input
                type="file"
                accept=".xlsx,.xls,.csv,.pdf"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </label>

            {/* Quick Demo Upload Button */}
            <button
              onClick={() => handleFileSelect({ target: { files: [] } })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid #CBD5E1',
                background: '#F8FAFC',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                marginBottom: '14px'
              }}
            >
              <Sparkles size={16} color="#059669" />
              <span>Thử nạp file sao kê mẫu Vietcombank hôm nay (172 giao dịch)</span>
            </button>
          </div>
        )}

        {/* Loading / Processing State */}
        {isProcessing && (
          <div style={{
            background: '#F8FAFC',
            borderRadius: '18px',
            padding: '36px',
            textAlign: 'center',
            border: '1px solid #E2E8F0',
            marginBottom: '16px'
          }}>
            <div className="pulse-dot" style={{ width: '18px', height: '18px', margin: '0 auto 12px auto' }} />
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A' }}>
              EzTax đang đọc dữ liệu sao kê & đối chiếu với hóa đơn máy tính tiền...
            </div>
            <div style={{ fontSize: '0.84rem', color: '#64748B', marginTop: '6px' }}>
              Tự động phân loại dòng tiền và bóc tách các khoản tiền cá nhân
            </div>
          </div>
        )}

        {/* Parse Result Summary */}
        {parseResult && (
          <div>
            <div style={{
              background: '#ECFDF5',
              border: '2px solid #6EE7B7',
              borderRadius: '18px',
              padding: '20px',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <CheckCircle2 size={24} color="#059669" />
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#064E3B' }}>
                    Đã đọc thành công {parseResult.totalTxs} giao dịch sao kê!
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#047857' }}>
                    Nguồn: {parseResult.bankName} • Tổng tiền: <strong>{formatVND(parseResult.totalAmount)}</strong>
                  </div>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                background: 'rgba(255,255,255,0.7)',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '0.86rem'
              }}>
                <div>
                  <span style={{ color: '#64748B' }}>Khớp hóa đơn máy tính tiền:</span>
                  <div style={{ fontWeight: 800, color: '#059669', fontSize: '1.05rem' }}>
                    🟢 {parseResult.matchedCount} giao dịch ({formatVND(9750000)})
                  </div>
                </div>
                <div>
                  <span style={{ color: '#64748B' }}>Cần bạn xác nhận:</span>
                  <div style={{ fontWeight: 800, color: '#DC2626', fontSize: '1.05rem' }}>
                    🔴 {parseResult.unclassifiedCount} giao dịch (Tiền cá nhân)
                  </div>
                </div>
              </div>
            </div>

            {/* Unclassified preview */}
            <div style={{
              background: '#FEF2F2',
              border: '1.5px solid #FECACA',
              borderRadius: '14px',
              padding: '14px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#991B1B', marginBottom: '8px' }}>
                Phát hiện 2 giao dịch có nội dung cá nhân (Không phải tiền bán phở):
              </div>
              {parseResult.unclassifiedItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#7F1D1D', marginBottom: '4px' }}>
                  <span>• "{item.desc}"</span>
                  <strong>+{formatVND(item.amount)} ➔ {item.suggestion}</strong>
                </div>
              ))}
            </div>

            {/* Confirm button */}
            <button
              id="confirm-import-statement-btn"
              className="btn-primary-cta"
              onClick={handleConfirmImport}
              style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }}
            >
              <CheckCircle2 size={20} />
              <span>NẠP VÀO SỔ ĐỐI SOÁT & CẬP NHẬT DOANH THU</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
