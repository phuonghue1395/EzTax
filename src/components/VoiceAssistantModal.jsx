import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Mic, Check, X, Sparkles, Volume2 } from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const VoiceAssistantModal = () => {
  const { voiceModalOpen, setVoiceModalOpen, addCashTransaction, playSound } = useApp();
  const [isListening, setIsListening] = useState(true);
  const [recognizedText, setRecognizedText] = useState('Đang lắng nghe giọng của bạn...');
  const [parsedAmount, setParsedAmount] = useState(110000);
  const [parsedNote, setParsedNote] = useState('2 tô phở đặc biệt');

  useEffect(() => {
    if (voiceModalOpen) {
      setIsListening(true);
      setRecognizedText('Đang lắng nghe...');
      
      const t1 = setTimeout(() => {
        setRecognizedText('"Bán hai tô phở đặc biệt..."');
      }, 900);

      const t2 = setTimeout(() => {
        setRecognizedText('"Bán hai tô phở đặc biệt một trăm mười ngàn"');
        setParsedAmount(110000);
        setParsedNote('2 tô phở đặc biệt');
        setIsListening(false);
        playSound('ting');
      }, 2000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [voiceModalOpen]);

  if (!voiceModalOpen) return null;

  const handleConfirm = () => {
    addCashTransaction(parsedAmount, parsedNote);
    setVoiceModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setVoiceModalOpen(false)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', textAlign: 'center', padding: '32px 24px' }}
      >
        <h2 className="sheet-header-title">Trợ Lý Giọng Nói EzTax</h2>
        <p className="sheet-subtitle">
          Vừa bán hàng vừa nói, hệ thống tự động bóc tách số tiền và ghi vào sổ
        </p>

        {/* Animated Mic Wave */}
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          background: isListening ? '#ECFDF5' : '#E2E8F0',
          border: isListening ? '3px solid #10B981' : '2px solid #CBD5E1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '16px auto',
          boxShadow: isListening ? '0 0 30px rgba(16, 185, 129, 0.4)' : 'none'
        }}>
          {isListening ? (
            <Mic size={44} color="#059669" />
          ) : (
            <Check size={44} color="#059669" />
          )}
        </div>

        {/* Transcript box */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '16px',
          padding: '18px',
          border: '1.5px dashed #CBD5E1',
          marginBottom: '20px',
          minHeight: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', fontStyle: 'italic' }}>
            {recognizedText}
          </div>
        </div>

        {/* Parsed Result */}
        {!isListening && (
          <div style={{
            background: '#ECFDF5',
            border: '2px solid #6EE7B7',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#065F46', textTransform: 'uppercase', marginBottom: '4px' }}>
              EzTax đã tự động nhận diện:
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>{parsedNote}</div>
                <div style={{ fontSize: '0.82rem', color: '#059669' }}>Phân loại: Bán hàng thu tiền mặt</div>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#065F46', fontVariantNumeric: 'tabular-nums' }}>
                {formatVND(parsedAmount)}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn-primary-cta"
            disabled={isListening}
            onClick={handleConfirm}
            style={{ flex: 1.5, minHeight: '48px', fontSize: '1rem', opacity: isListening ? 0.6 : 1 }}
          >
            <Check size={20} />
            <span>XÁC NHẬN LƯU VÀO SỔ ({formatVND(parsedAmount)})</span>
          </button>

          <button
            className="btn-secondary-outline"
            onClick={() => {
              setVoiceModalOpen(false);
              playSound('click');
            }}
            style={{ flex: 1, minHeight: '48px' }}
          >
            <span>Hủy bỏ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
