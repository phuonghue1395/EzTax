import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, Send, Sparkles, User, HelpCircle, MessageSquare, Lightbulb, BookOpen, ShieldCheck } from 'lucide-react';
import { AI_FAQ_SAMPLES } from '../utils/mockData';

export const AdvisorScreen = () => {
  const { merchant, playSound } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Dạ cháu chào ${merchant.ownerName}! Cháu là Trợ lý Thuế EzTax. Bác có thắc mắc gì về Nghị định 141/2026/NĐ-CP mới (ngưỡng 1 tỷ/năm, 2 phương pháp tính TNCN), việc gom tiền VietQR ngân hàng, xuất hóa đơn máy tính tiền, hoặc tính tiền thuế của ${merchant.storeName} cứ nhắn cháu nhé!`
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
      let botResponse = 'Dạ câu hỏi này rất hay ạ! Theo Nghị định 141/2026/NĐ-CP và Thông tư 40/2021/TT-BTC, mọi khoản thu từ hoạt động bán hàng đều được EzTax tự động đối soát với hóa đơn máy tính tiền và áp dụng đúng thuế suất cho bác. Nếu là tiền cá nhân hoặc người thân trả nợ, bác chỉ cần bấm 1 chạm xác nhận là hệ thống sẽ loại trừ ngay, tuyệt đối không bị tính thuế oan ạ!';
      
      const lowerQ = query.toLowerCase();

      const foundFAQ = AI_FAQ_SAMPLES.find(f => 
        lowerQ.includes(f.q.toLowerCase().slice(0, 15)) ||
        f.q.toLowerCase().includes(lowerQ.slice(0, 15))
      );

      if (foundFAQ) {
        botResponse = foundFAQ.a;
      } else if (lowerQ.includes('141') || lowerQ.includes('ngưỡng') || lowerQ.includes('1 tỷ') || lowerQ.includes('dưới 1 tỷ')) {
        botResponse = 'Dạ theo Nghị định 141/2026/NĐ-CP áp dụng từ 01/01/2026, ngưỡng doanh thu miễn thuế được nâng từ 500 triệu lên 1 tỷ đồng/năm. Nếu doanh thu cả năm ≤ 1 tỷ, bác được miễn 100% cả thuế GTGT và TNCN. Khi doanh thu trên 1 tỷ/năm, quán bắt đầu nộp thuế và dùng hóa đơn điện tử máy tính tiền ạ.';
      } else if (lowerQ.includes('gtgt') || lowerQ.includes('lợi nhuận') || lowerQ.includes('chi phí')) {
        botResponse = 'Dạ lưu ý cực kỳ quan trọng: Thuế GTGT chỉ tính trên TỔNG DOANH THU (Doanh thu × % GTGT ngành, quán ăn là 3%), KHÔNG tính trên lợi nhuận hay trừ chi phí bác nhé. Ví dụ bán 5 triệu/ngày thì GTGT = 5 triệu × 3% = 150.000 ₫ ạ!';
      } else if (lowerQ.includes('phương pháp') || lowerQ.includes('2 cách') || lowerQ.includes('tncn') || lowerQ.includes('thu nhập')) {
        botResponse = 'Dạ đối với hộ doanh thu 1 - 3 tỷ/năm, bác có 2 lựa chọn tính TNCN: PP1 = (Doanh thu − 1 tỷ) × thuế suất ngành (ăn uống 1.5%); hoặc PP2 = (Doanh thu − Chi phí hợp lệ) × 15%. Nếu doanh thu trên 3 tỷ/năm, TNCN bắt buộc tính theo Thu nhập: (Doanh thu − Chi phí) × 17% (mức > 3-50 tỷ) hoặc 20% (mức > 50 tỷ) ạ.';
      } else if (lowerQ.includes('phở') || lowerQ.includes('ăn uống')) {
        botResponse = 'Dạ ngành dịch vụ ăn uống (quán phở, cơm, cà phê) có tỷ lệ GTGT là 3.0% trên toàn bộ doanh thu. Thuế TNCN tính theo phương pháp bác chọn (PP1 trừ 1 tỷ × 1.5% hoặc PP2 theo thu nhập). EzTax đã lập sẵn tờ khai Quý 4 tự động cho bác rồi ạ!';
      } else if (lowerQ.includes('nợ') || lowerQ.includes('người nhà') || lowerQ.includes('cá nhân')) {
        botResponse = 'Dạ tiền người nhà trả nợ hoặc gửi tiền cá nhân KHÔNG bị tính thuế bác nhé! Bác chỉ cần chạm vào giao dịch đó và chọn "Tiền cá nhân" là xong, thuế = 0 ₫ ạ.';
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
            <span>Trợ Lý Thuế "Bác Ba" (Hỏi Đáp Luật Mới 24/7)</span>
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748B', marginTop: '4px' }}>
            Tư vấn Nghị định 141/2026/NĐ-CP & hóa đơn điện tử bằng ngôn ngữ bình dân, ví dụ thực tế quán ăn dễ hiểu.
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
              placeholder="Nhập câu hỏi (vd: Nghị định 141 miễn thuế thế nào? 2 cách tính TNCN?)..."
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
              <span>Bấm để hỏi nhanh Nghị định 141/2026/NĐ-CP:</span>
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
                Cập Nhật Chuẩn Xác Theo Nghị Định 141/2026/NĐ-CP
              </div>
              <div style={{ fontSize: '0.84rem', color: '#047857', marginTop: '4px', lineHeight: '1.45' }}>
                Hệ thống EzTax áp dụng chính xác ngưỡng miễn thuế 1 tỷ đồng/năm, công thức GTGT trên doanh thu và 2 phương pháp tính TNCN theo quy định mới nhất của Chính phủ & Bộ Tài Chính.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
