import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, Sparkles, User, HelpCircle, MessageSquare, Lightbulb, BookOpen, ShieldCheck } from 'lucide-react';
import { AI_FAQ_SAMPLES } from '../utils/mockData';

export const AdvisorScreen = () => {
  const { merchant, playSound } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Dạ cháu chào ${merchant.ownerName}! Cháu là Trợ lý Thuế EzTax. Bác có thắc mắc gì về việc gom tiền ngân hàng, xuất hóa đơn máy tính tiền, hoặc tính tiền thuế của ${merchant.storeName} cứ nhắn cháu nhé!`
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (textToSend = null) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    playSound('click');
    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      let botResponse = 'Dạ câu hỏi này rất hay ạ! Theo quy định Thông tư 40/2021/TT-BTC, mọi khoản thu từ hoạt động bán hàng đều được EzTax tự động đối soát với hóa đơn máy tính tiền và áp dụng đúng thuế suất cho bác. Nếu là tiền cá nhân hoặc người thân trả nợ, bác chỉ cần bấm 1 chạm xác nhận là hệ thống sẽ loại trừ ngay, tuyệt đối không bị tính thuế oan ạ!';
      
      const foundFAQ = AI_FAQ_SAMPLES.find(f => 
        query.toLowerCase().includes(f.q.toLowerCase().slice(0, 15)) ||
        f.q.toLowerCase().includes(query.toLowerCase().slice(0, 15))
      );

      if (foundFAQ) {
        botResponse = foundFAQ.a;
      } else if (query.toLowerCase().includes('phở') || query.toLowerCase().includes('ăn uống')) {
        botResponse = 'Dạ ngành ăn uống của bác chịu thuế 4,5% trên doanh thu (3% GTGT + 1,5% TNCN). Bác bán 100.000 ₫ nộp 4.500 ₫ thuế. Ứng dụng đã tự động tính sẵn từng hóa đơn cho bác rồi ạ!';
      } else if (query.toLowerCase().includes('nợ') || query.toLowerCase().includes('người nhà')) {
        botResponse = 'Dạ tiền người nhà trả nợ hoặc gửi tiền cá nhân KHÔNG bị tính thuế bác nhé! Bác chỉ cần chạm vào giao dịch đó và chọn "Tiền cá nhân" là xong ạ.';
      }

      playSound('ting');
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 500);
  };

  return (
    <div className="web-content">
      {/* Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bot size={28} color="#059669" />
            <span>Trợ Lý Thuế "Bác Ba" (Hỏi Đáp 24/7)</span>
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B', marginTop: '4px' }}>
            Tư vấn thuế & hóa đơn bằng ngôn ngữ bình dân, ví dụ thực tế quán ăn dễ hiểu.
          </p>
        </div>
      </div>

      {/* 2-Column Grid: Left Chat Area, Right FAQ & Guidelines */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px' }}>
        {/* Left: Chat Window */}
        <div className="web-section-container" style={{ margin: 0, display: 'flex', flexDirection: 'column', height: '640px', padding: '20px' }}>
          {/* Chat Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            paddingRight: '6px',
            marginBottom: '16px'
          }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '10px'
                }}
              >
                {m.sender === 'bot' && (
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#059669',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Bot size={20} />
                  </div>
                )}

                <div style={{
                  maxWidth: '80%',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : '#F8FAFC',
                  color: m.sender === 'user' ? '#FFFFFF' : '#0F172A',
                  padding: '14px 18px',
                  borderRadius: m.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  border: m.sender === 'user' ? 'none' : '1.5px solid #E2E8F0',
                  fontSize: '0.94rem',
                  lineHeight: '1.5',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div style={{
            display: 'flex',
            gap: '10px',
            background: '#F8FAFC',
            padding: '8px',
            borderRadius: 'var(--radius-pill)',
            border: '1.5px solid #CBD5E1'
          }}>
            <input
              type="text"
              placeholder="Nhập câu hỏi cho trợ lý thuế (vd: Bán phở tính thuế bao nhiêu?)..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              style={{
                flex: 1,
                padding: '10px 16px',
                border: 'none',
                background: 'transparent',
                fontSize: '0.92rem',
                outline: 'none',
                color: '#0F172A'
              }}
            />

            <button
              onClick={() => handleSend()}
              className="btn-primary-cta"
              style={{ minHeight: '42px', padding: '0 18px' }}
            >
              <Send size={18} />
              <span>Gửi hỏi</span>
            </button>
          </div>
        </div>

        {/* Right: Suggested Questions & Key Rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Box 1: Click to Ask FAQs */}
          <div className="web-section-container" style={{ margin: 0 }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lightbulb size={18} color="#D97706" />
              <span>Bấm để hỏi nhanh các tình huống thực tế:</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {AI_FAQ_SAMPLES.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(faq.q)}
                  style={{
                    textAlign: 'left',
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    fontSize: '0.86rem',
                    color: '#1E293B',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#059669'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E2E8F0'}
                >
                  <span style={{ fontWeight: 600 }}>{faq.q}</span>
                  <Sparkles size={16} color="#059669" style={{ flexShrink: 0, marginLeft: '8px' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Box 2: Peace of Mind Card */}
          <div style={{
            background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
            border: '1.5px solid #6EE7B7',
            borderRadius: '20px',
            padding: '20px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <ShieldCheck size={26} color="#059669" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#064E3B' }}>
                Cam Kết Bảo Vệ Chủ Hộ Kinh Doanh
              </div>
              <div style={{ fontSize: '0.84rem', color: '#047857', marginTop: '4px', lineHeight: '1.45' }}>
                Mọi quy định được đội ngũ chuyên gia tài chính và luật sư cập nhật liên tục theo chính sách của Tổng Cục Thuế & Bộ Tài Chính.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
