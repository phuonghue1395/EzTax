import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GLOSSARY_ITEMS } from '../utils/mockData';
import { X, BookOpen, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';

export const GlossaryModal = () => {
  const { glossaryModalOpen, setGlossaryModalOpen, glossaryInitialTerm, playSound } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  if (!glossaryModalOpen) return null;

  const filteredItems = GLOSSARY_ITEMS.filter(item => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return item.techTerm.toLowerCase().includes(q) ||
           item.plainTerm.toLowerCase().includes(q) ||
           item.explanation.toLowerCase().includes(q);
  });

  return (
    <div className="modal-overlay" onClick={() => setGlossaryModalOpen(false)}>
      <div 
        className="web-modal-box" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#ECFDF5', padding: '8px', borderRadius: '10px', color: '#059669' }}>
                <BookOpen size={24} />
              </div>
              <h2 className="sheet-header-title">Cẩm Nang "Dịch Thuật Ngữ"</h2>
            </div>
            <p className="sheet-subtitle" style={{ marginBottom: 0, marginTop: '4px' }}>
              Giải thích mọi từ khó bằng tiếng Việt đời thường & ví dụ thực tế quán phở / tiệm tạp hóa
            </p>
          </div>
          <button
            onClick={() => {
              setGlossaryModalOpen(false);
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

        {/* Search filter */}
        <div style={{ marginBottom: '18px' }}>
          <input
            type="text"
            placeholder="Tìm nhanh từ cần hiểu (vd: Đối soát, Blockchain, Thuế, Cần xem lại...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1.5px solid #CBD5E1',
              fontSize: '0.94rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Dictionary items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#F8FAFC',
                borderRadius: '16px',
                padding: '18px',
                border: '1.5px solid #E2E8F0',
                borderLeft: '4px solid #059669'
              }}
            >
              {/* Comparison title */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.84rem', textDecoration: 'line-through', color: '#94A3B8' }}>
                    {item.techTerm}
                  </span>
                  <ArrowRight size={16} color="#059669" />
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>
                    "{item.plainTerm}"
                  </span>
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '4px 10px', borderRadius: '9999px', background: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' }}>
                  {item.badge}
                </span>
              </div>

              {/* Explanation */}
              <p style={{ fontSize: '0.94rem', color: '#1E293B', lineHeight: '1.5', marginBottom: '12px' }}>
                {item.explanation}
              </p>

              {/* Example */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '12px 14px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '0.88rem',
                color: '#475569'
              }}>
                <Lightbulb size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{item.example}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <button
          className="btn-primary-cta"
          onClick={() => {
            setGlossaryModalOpen(false);
            playSound('click');
          }}
          style={{ width: '100%', minHeight: '48px', fontSize: '1rem' }}
        >
          <CheckCircle size={20} />
          <span>Tôi đã hiểu rồi!</span>
        </button>
      </div>
    </div>
  );
};
