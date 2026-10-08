import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Banknote, Calendar, AlertTriangle, CheckCircle2, History, Sparkles, Delete } from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const CashEntryModal = () => {
  const { 
    cashModalOpen, 
    setCashModalOpen, 
    dailyCashClosings, 
    closeDailyCash, 
    playSound, 
    showToast 
  } = useApp();

  // Find if yesterday is forgotten/unclosed
  const yesterdayRecord = dailyCashClosings.find(d => d.date === '07/10/2026' && d.status === 'forgotten');
  const [selectedDayDate, setSelectedDayDate] = useState(yesterdayRecord ? '07/10/2026' : '08/10/2026');
  const [amountStr, setAmountStr] = useState(yesterdayRecord ? '3950000' : '3600000');

  if (!cashModalOpen) return null;

  const currentRecord = dailyCashClosings.find(d => d.date === selectedDayDate);
  const isYesterday = selectedDayDate === '07/10/2026';

  const handleNumClick = (val) => {
    playSound('click');
    if (amountStr === '0' || amountStr === '') {
      setAmountStr(val);
    } else {
      if (amountStr.length < 9) {
        setAmountStr(amountStr + val);
      }
    }
  };

  const handleBackspace = () => {
    playSound('click');
    if (amountStr.length > 1) {
      setAmountStr(amountStr.slice(0, -1));
    } else {
      setAmountStr('0');
    }
  };

  const handleQuickSet = (val) => {
    playSound('click');
    setAmountStr(String(val));
  };

  const handleSave = () => {
    const num = Number(amountStr);
    if (num > 0) {
      closeDailyCash(selectedDayDate, num);
      playSound('success');
      showToast(
        isYesterday 
          ? `Đã hoàn thiện chốt sổ tiền mặt ngày hôm qua (${formatVND(num)})! 🟢` 
          : `Đã chốt tổng doanh thu tiền mặt ngày hôm nay (${formatVND(num)})! 🟢`,
        'success'
      );
      setCashModalOpen(false);
    }
  };

  const numericValue = Number(amountStr) || 0;

  return (
    <div className="modal-overlay" onClick={() => setCashModalOpen(false)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#ECFDF5', padding: '8px', borderRadius: '10px', color: '#059669' }}>
                <Banknote size={24} />
              </div>
              <h2 className="sheet-header-title" style={{ marginBottom: 0 }}>
                Chốt Sổ Tổng Doanh Thu Tiền Mặt Cuối Ngày
              </h2>
            </div>
            <p className="sheet-subtitle" style={{ marginBottom: 0, marginTop: '4px' }}>
              Tiền mặt chỉ kê khai <strong>1 lần duy nhất vào cuối mỗi ngày</strong> (lập Bảng kê bán lẻ 1 lần/ngày).
            </p>
          </div>
          <button
            onClick={() => {
              setCashModalOpen(false);
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

        {/* Warning If Yesterday was Forgotten */}
        {yesterdayRecord && (
          <div style={{
            background: '#FEF2F2',
            border: '2px solid #FECACA',
            borderRadius: '16px',
            padding: '14px 16px',
            marginBottom: '16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <AlertTriangle size={22} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#991B1B' }}>
                Phát hiện: Hôm qua (07/10) bác chưa chốt sổ tiền mặt!
              </div>
              <div style={{ fontSize: '0.84rem', color: '#7F1D1D', marginTop: '3px' }}>
                Theo luật thuế, <strong>phải hoàn thiện kê khai riêng của ngày hôm trước</strong>, tuyệt đối <strong>không kê khai gộp vào hôm sau</strong>.
              </div>
            </div>
          </div>
        )}

        {/* Day Selector Tabs (Hôm qua vs Hôm nay) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          <button
            onClick={() => {
              setSelectedDayDate('07/10/2026');
              setAmountStr('3950000');
              playSound('click');
            }}
            style={{
              padding: '12px',
              borderRadius: '14px',
              border: selectedDayDate === '07/10/2026' ? '2px solid #DC2626' : '1px solid #E2E8F0',
              background: selectedDayDate === '07/10/2026' ? '#FEF2F2' : '#FFFFFF',
              color: selectedDayDate === '07/10/2026' ? '#991B1B' : '#64748B',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ fontSize: '0.78rem', color: '#DC2626', fontWeight: 700 }}>
              {yesterdayRecord ? '🔴 CHƯA KÊ KHAI' : '🟢 ĐÃ CHỐT'}
            </div>
            <div>Sổ Ngày Hôm Qua (07/10)</div>
          </button>

          <button
            onClick={() => {
              setSelectedDayDate('08/10/2026');
              setAmountStr('3600000');
              playSound('click');
            }}
            style={{
              padding: '12px',
              borderRadius: '14px',
              border: selectedDayDate === '08/10/2026' ? '2px solid #059669' : '1px solid #E2E8F0',
              background: selectedDayDate === '08/10/2026' ? '#ECFDF5' : '#FFFFFF',
              color: selectedDayDate === '08/10/2026' ? '#065F46' : '#64748B',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 700 }}>🟡 ĐANG MỞ SỔ</div>
            <div>Sổ Ngày Hôm Nay (08/10)</div>
          </button>
        </div>

        {/* Big Amount Display */}
        <div style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          border: '2px solid #6EE7B7',
          borderRadius: '20px',
          padding: '18px',
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#065F46', textTransform: 'uppercase', marginBottom: '4px' }}>
            Tổng tiền mặt kiểm đếm trong két ({isYesterday ? 'Hôm qua 07/10' : 'Hôm nay 08/10'}):
          </div>
          <div style={{
            fontSize: '2.8rem',
            fontWeight: 800,
            color: '#064E3B',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1.1
          }}>
            {formatVND(numericValue)}
          </div>
          <div style={{ fontSize: '0.84rem', color: '#047857', marginTop: '4px' }}>
            Ước tính khoảng <strong>{Math.round(numericValue / 55000)} bát phở</strong> • Thuế 4.5%: <strong>{formatVND(Math.round(numericValue * 0.045))}</strong>
          </div>
        </div>

        {/* Quick Amount Presets */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px' }}>
          {[2000000, 3000000, 3500000, 4000000, 5000000, 6000000, 8000000].map((val) => (
            <button
              key={val}
              className="preset-chip"
              onClick={() => handleQuickSet(val)}
            >
              {val / 1000000} triệu
            </button>
          ))}
        </div>

        {/* Keypad */}
        <div className="numpad-grid" style={{ marginBottom: '16px' }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              className="numpad-btn"
              onClick={() => handleNumClick(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            className="numpad-btn"
            style={{ fontSize: '1rem', color: '#059669', fontWeight: 800 }}
            onClick={() => handleNumClick('000')}
          >
            000
          </button>
          <button
            className="numpad-btn"
            onClick={() => handleNumClick('0')}
          >
            0
          </button>
          <button
            className="numpad-btn"
            style={{ background: '#FEE2E2', color: '#DC2626' }}
            onClick={handleBackspace}
          >
            <Delete size={22} />
          </button>
        </div>

        {/* Save Button */}
        <button
          id="confirm-daily-cash-btn"
          className="btn-primary-cta"
          onClick={handleSave}
          disabled={numericValue <= 0}
          style={{ width: '100%', minHeight: '52px', fontSize: '1.05rem' }}
        >
          <Check size={22} />
          <span>
            {isYesterday 
              ? `HOÀN THIỆN CHỐT SỔ TIỀN MẶT NGÀY HÔM QUA (${formatVND(numericValue)})` 
              : `CHỐT SỔ TỔNG TIỀN MẶT CUỐI NGÀY HÔM NAY (${formatVND(numericValue)})`}
          </span>
        </button>
      </div>
    </div>
  );
};
