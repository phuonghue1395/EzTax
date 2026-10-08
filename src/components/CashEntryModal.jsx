import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Banknote, Calendar, AlertTriangle, CheckCircle2, Sparkles, Keyboard } from 'lucide-react';
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
  const [amountStr, setAmountStr] = useState('0');

  const inputRef = useRef(null);

  useEffect(() => {
    if (cashModalOpen) {
      setAmountStr('0');
      const targetDate = yesterdayRecord ? '07/10/2026' : '08/10/2026';
      setSelectedDayDate(targetDate);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [cashModalOpen]);

  if (!cashModalOpen) return null;

  const isYesterday = selectedDayDate === '07/10/2026';

  const handleInputChange = (e) => {
    // Keep only numbers
    const rawVal = e.target.value.replace(/\D/g, '');
    setAmountStr(rawVal);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  };

  const handleQuickSet = (val) => {
    playSound('click');
    setAmountStr(String(val));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSave = () => {
    const targetRecord = dailyCashClosings.find(d => d.date === selectedDayDate);
    if (targetRecord && targetRecord.status === 'closed') {
      playSound('click');
      showToast(`Ngày ${targetRecord.dayLabel} đã kê khai hoàn tất, không thể sửa đổi! 🔒`, 'info');
      return;
    }
    if (targetRecord && targetRecord.status === 'unclosed' && yesterdayRecord) {
      playSound('click');
      showToast(`⛔ Vui lòng kê khai ngày ${yesterdayRecord.dayLabel} trước!`, 'error');
      return;
    }

    const num = Number(amountStr);
    if (num > 0) {
      closeDailyCash(selectedDayDate, num);
      playSound('success');
      showToast(
        selectedDayDate === '07/10/2026' 
          ? `Đã hoàn thiện chốt sổ tiền mặt ngày hôm qua (${formatVND(num)})! 🟢` 
          : `Đã chốt tổng doanh thu tiền mặt ngày hôm nay (${formatVND(num)})! 🟢`,
        'success'
      );
      setCashModalOpen(false);
    }
  };

  const numericValue = Number(amountStr) || 0;
  const displayFormatted = amountStr ? Number(amountStr).toLocaleString('vi-VN') : '';

  return (
    <div className="modal-overlay" onClick={() => setCashModalOpen(false)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
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
        {yesterdayRecord && selectedDayDate === '07/10/2026' && (
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
                Phát hiện: Ngày 07/10 chưa hoàn thành kê khai tiền mặt!
              </div>
              <div style={{ fontSize: '0.84rem', color: '#7F1D1D', marginTop: '3px' }}>
                Theo luật thuế, <strong>phải hoàn thiện kê khai riêng của ngày hôm trước</strong>, tuyệt đối <strong>không kê khai gộp vào hôm sau</strong>.
              </div>
            </div>
          </div>
        )}

        {/* Date Calendar Tool (Tool Ngày / Lịch Kê Khai) */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} color="#059669" />
              <span>Chọn ngày trong sổ lịch chốt tiền mặt:</span>
            </div>
            {/* Status Legend */}
            <div style={{ display: 'flex', gap: '10px', fontSize: '0.74rem', fontWeight: 700 }}>
              <span style={{ color: '#059669' }}>🟢 Đã kê khai</span>
              <span style={{ color: '#DC2626' }}>🔴 Chưa kê khai</span>
              <span style={{ color: '#D97706' }}>🟡 Mở hôm nay</span>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px'
          }}>
            {dailyCashClosings.map((item) => {
              const isSelected = selectedDayDate === item.date;
              const isClosed = item.status === 'closed';
              const isForgotten = item.status === 'forgotten';
              const isUnclosed = item.status === 'unclosed';

              let borderColor = '#E2E8F0';
              let bgColor = '#FFFFFF';
              let textColor = '#0F172A';
              let badgeBg = '#F1F5F9';
              let badgeColor = '#64748B';
              let badgeText = '🔒 Đã kê khai';

              if (isClosed) {
                badgeText = '🔒 Đã kê khai';
                badgeBg = '#F1F5F9';
                badgeColor = '#64748B';
                textColor = '#64748B';
              } else if (isForgotten) {
                badgeText = '🔴 Chưa kê khai';
                badgeBg = '#FEF2F2';
                badgeColor = '#DC2626';
                if (isSelected) {
                  borderColor = '#DC2626';
                  bgColor = '#FEF2F2';
                  textColor = '#991B1B';
                }
              } else if (isUnclosed) {
                badgeText = '🟡 Mở hôm nay';
                badgeBg = '#FFFBEB';
                badgeColor = '#D97706';
                if (isSelected) {
                  borderColor = '#D97706';
                  bgColor = '#FFFBEB';
                  textColor = '#92400E';
                }
              }

              return (
                <button
                  key={item.date}
                  onClick={() => {
                    if (isClosed) {
                      playSound('click');
                      showToast(`Sổ tiền mặt ngày ${item.dayLabel} đã kê khai hoàn tất, không thể sửa đổi! 🔒`, 'info');
                    } else if (isUnclosed && yesterdayRecord) {
                      playSound('click');
                      showToast(`⛔ Vui lòng kê khai ngày ${yesterdayRecord.dayLabel} trước!`, 'error');
                    } else {
                      setSelectedDayDate(item.date);
                      setAmountStr(item.status === 'closed' ? String(item.amount) : '0');
                      playSound('click');
                    }
                  }}
                  style={{
                    padding: '10px 8px',
                    borderRadius: '12px',
                    border: isSelected ? `2px solid ${borderColor}` : '1.5px solid #E2E8F0',
                    background: isClosed ? '#F8FAFC' : (isSelected ? bgColor : '#FFFFFF'),
                    color: textColor,
                    fontWeight: 700,
                    cursor: isClosed ? 'not-allowed' : 'pointer',
                    opacity: isClosed ? 0.65 : 1,
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: badgeColor,
                    background: badgeBg,
                    padding: '2px 6px',
                    borderRadius: '9999px',
                    display: 'inline-block',
                    marginBottom: '4px'
                  }}>
                    {badgeText}
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 800, lineHeight: '1.2' }}>
                    {item.dayLabel}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: isClosed ? '#94A3B8' : '#64748B', marginTop: '2px', fontVariantNumeric: 'tabular-nums' }}>
                    {isClosed ? formatVND(item.amount) : 'Chưa kê khai'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Field for Direct Typing */}
        <div style={{
          background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          border: '2px solid #6EE7B7',
          borderRadius: '20px',
          padding: '20px',
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#065F46', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Keyboard size={16} />
            <span>Nhập trực tiếp bằng bàn phím:</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={displayFormatted}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="0"
              style={{
                fontSize: '2.8rem',
                fontWeight: 800,
                color: '#064E3B',
                textAlign: 'center',
                background: '#FFFFFF',
                border: '2px solid #059669',
                borderRadius: '16px',
                padding: '8px 16px',
                width: '100%',
                maxWidth: '400px',
              }}
            />
            <span style={{ fontSize: '2rem', fontWeight: 800, color: '#064E3B' }}>đ</span>
          </div>
        </div>

        {/* Quick Amount Presets */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, marginBottom: '6px' }}>
            Gợi ý nhanh số tròn:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
              ? `Hoàn thiện chốt sổ ngày hôm qua (${formatVND(numericValue)})` 
              : `Chốt sổ tiền mặt cuối ngày hôm nay (${formatVND(numericValue)})`}
          </span>
        </button>
      </div>
    </div>
  );
};
