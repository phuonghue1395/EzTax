import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  Wallet, 
  Banknote, 
  Receipt,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Calculator,
  FileCheck,
  Check,
  Upload,
  Calendar
} from 'lucide-react';
import { formatVND } from '../utils/taxRules';

export const HomeScreen = () => {
  const { 
    merchant, 
    todayRevenue, 
    bankAmount, 
    walletAmount, 
    cashAmount, 
    transactions, 
    matchedCount, 
    pendingCount, 
    issueCount, 
    taxInfo,
    quarterTaxInfo,
    setCashModalOpen,
    setSelectedTx,
    setDiscrepancyTx,
    setActiveTab,
    setUploadModalOpen,
    isYesterdayCashForgotten,
    playSound 
  } = useApp();

  const issueTx = transactions.find(t => t.status === 'issue');
  const pendingTx = transactions.find(t => t.status === 'pending');

  const getSourceIcon = (source) => {
    switch (source) {
      case 'bank': return <CreditCard size={18} color="#2563EB" />;
      case 'wallet': return <Wallet size={18} color="#D97706" />;
      case 'cash': return <Banknote size={18} color="#059669" />;
      default: return <CreditCard size={18} />;
    }
  };

  return (
    <div className="web-content">
      {/* Top Banner if Yesterday Cash was Forgotten */}
      {isYesterdayCashForgotten && (
        <div style={{
          background: '#FEF2F2',
          border: '1.5px solid #FCA5A5',
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 14px rgba(220, 38, 38, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ background: '#DC2626', color: '#FFFFFF', padding: '10px', borderRadius: '12px', flexShrink: 0, display: 'flex' }}>
              <AlertTriangle size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#991B1B' }}>
                Hôm qua (07/10) bác chưa chốt sổ tổng tiền mặt cuối ngày!
              </div>
              <div style={{ fontSize: '0.86rem', color: '#7F1D1D', marginTop: '2px' }}>
                Bác hãy hoàn thiện kê khai tiền mặt của ngày hôm qua trước, <strong>không kê khai gộp vào hôm nay</strong>.
              </div>
            </div>
          </div>

          <button
            id="resolve-yesterday-cash-btn"
            className="btn-primary-cta btn-danger-cta"
            onClick={() => {
              setCashModalOpen(true);
              playSound('click');
            }}
            style={{ fontSize: '0.9rem', padding: '0 18px', whiteSpace: 'nowrap' }}
          >
            <Calendar size={18} />
            <span>Hoàn thiện sổ 07/10</span>
          </button>
        </div>
      )}

      {/* ========================================================== */}
      {/* 3 GOLDEN QUESTIONS GRID FOR PHO BAC BA                      */}
      {/* ========================================================== */}
      <div className="golden-questions-grid">
        {/* CARD 1: TỔNG DOANH THU HÔM NAY */}
        <div className="web-hero-card-primary">
          <div>
            <div className="web-card-label">
              <TrendingUp size={18} />
              <span>TỔNG DOANH THU HÔM NAY</span>
            </div>

            <div className="web-hero-number">
              {formatVND(todayRevenue)}
            </div>

            <div className="web-hero-subtext">
              Doanh thu tổng hợp từ VietQR, Ví điện tử & Tiền mặt
            </div>
          </div>

          {/* 3 Source Breakdown Pills */}
          <div className="web-source-pills-row">
            <div className="web-source-pill">
              <div className="web-source-pill-title">💳 VietQR Bank</div>
              <div className="web-source-pill-val">{formatVND(bankAmount)}</div>
            </div>
            <div className="web-source-pill">
              <div className="web-source-pill-title">📱 Ví MoMo</div>
              <div className="web-source-pill-val">{formatVND(walletAmount)}</div>
            </div>
            <div className="web-source-pill">
              <div className="web-source-pill-title">💵 Tiền mặt cuối ngày</div>
              <div className="web-source-pill-val">{formatVND(cashAmount)}</div>
            </div>
          </div>
        </div>

        {/* CARD 2: GIAO DỊCH CẦN XỬ LÝ & ĐỐI SOÁT */}
        <div className="web-action-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Xử Lý Giao Dịch & Đối Soát</span>
            </div>
          </div>

          {/* Alert items */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {issueTx ? (
              <div style={{
                background: '#FEF2F2',
                border: '1.5px solid #FECACA',
                borderRadius: '12px',
                padding: '10px 12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="status-triple-badge badge-issue" style={{ fontSize: '0.74rem', padding: '2px 6px' }}>
                    <XCircle size={13} />
                    <span>🔴 CẦN XÁC NHẬN</span>
                  </span>
                  <span style={{ fontWeight: 800, color: '#DC2626', fontSize: '0.92rem' }}>+{formatVND(issueTx.amount)}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600, marginBottom: '6px' }}>
                  "{issueTx.description}"
                </div>
                <button
                  id="resolve-issue-home-btn"
                  className="btn-primary-cta btn-danger-cta"
                  onClick={() => setDiscrepancyTx(issueTx)}
                  style={{ width: '100%', minHeight: '34px', fontSize: '0.82rem', padding: '0 10px' }}
                >
                  <span>Xác nhận: Tiền cá nhân (Không tính thuế)</span>
                </button>
              </div>
            ) : pendingTx ? (
              <div style={{
                background: '#FFFBEB',
                border: '1.5px solid #FDE68A',
                borderRadius: '12px',
                padding: '10px 12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="status-triple-badge badge-pending" style={{ fontSize: '0.74rem', padding: '2px 6px' }}>
                    <AlertTriangle size={13} />
                    <span>🟡 CHỜ XUẤT HÓA ĐƠN</span>
                  </span>
                  <span style={{ fontWeight: 800, color: '#D97706', fontSize: '0.92rem' }}>+{formatVND(pendingTx.amount)}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#0F172A', fontWeight: 600, marginBottom: '6px' }}>
                  {pendingTx.description}
                </div>
                <button
                  className="btn-primary-cta btn-warning-cta"
                  onClick={() => setSelectedTx(pendingTx)}
                  style={{ width: '100%', minHeight: '34px', fontSize: '0.82rem', padding: '0 10px' }}
                >
                  <Receipt size={15} />
                  <span>Phát hành Hóa Đơn Điện Tử</span>
                </button>
              </div>
            ) : (
              <div style={{
                background: '#ECFDF5',
                border: '1.5px solid #A7F3D0',
                borderRadius: '12px',
                padding: '12px 14px',
                textAlign: 'center'
              }}>
                <CheckCircle2 size={26} color="#059669" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontWeight: 800, color: '#065F46', fontSize: '0.95rem' }}>
                  🟢 MỌI THỨ ĐÃ KHỚP 100%!
                </div>
                <div style={{ fontSize: '0.8rem', color: '#047857', marginTop: '2px' }}>
                  Toàn bộ giao dịch ngân hàng & ví điện tử đã đối soát xong với HĐĐT.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CARD 3: Thuế Quý 4/2026 Tạm Tính */}
        <div className="web-tax-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A' }}>
              Thuế Quý 4/2026 Tạm Tính
            </div>
            <span className="status-triple-badge badge-matched" style={{ fontSize: '0.74rem', padding: '2px 6px' }}>
              <ShieldCheck size={13} />
              <span>🟢 NĐ 141/2026</span>
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
              Tiền thuế Quý (GTGT + TNCN):
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#059669', fontVariantNumeric: 'tabular-nums', margin: '2px 0 6px 0' }}>
              {formatVND(quarterTaxInfo.totalTax)}
            </div>

            <div style={{
              background: '#F8FAFC',
              borderRadius: '10px',
              padding: '8px 10px',
              fontSize: '0.78rem',
              color: '#475569',
              lineHeight: '1.4',
              border: '1px solid #E2E8F0'
            }}>
              📜 <strong>Doanh thu Quý: {formatVND(merchant.quarterSummary.totalRevenue)}</strong> (&gt; 1 tỷ/năm). Thuế GTGT 3% ({formatVND(quarterTaxInfo.vatAmount)}) + Thuế TNCN ({formatVND(quarterTaxInfo.pitAmount)}).
            </div>
          </div>

          <div style={{ marginTop: '8px' }}>
            <button
              className="btn-primary-cta"
              onClick={() => setActiveTab('tax')}
              style={{ width: '100%', minHeight: '34px', fontSize: '0.84rem' }}
            >
              <Calculator size={16} />
              <span>Xem tờ khai Mẫu 01/CNKD</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* RECENT TRANSACTIONS PREVIEW (MINIMAL DASHBOARD PREVIEW)    */}
      {/* ========================================================== */}
      <div className="web-section-container">
        <div className="web-section-header">
          <h2 className="web-section-title">
            <Receipt size={22} color="#059669" />
            <span>Giao Dịch Gần Nhất</span>
          </h2>

          <button
            className="btn-secondary-outline"
            onClick={() => setActiveTab('reconcile')}
            style={{ minHeight: '36px', fontSize: '0.86rem' }}
          >
            <span>Xem toàn bộ sổ đối soát</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Table */}
        <div className="web-table-wrapper">
          <table className="web-data-table">
            <thead>
              <tr>
                <th>Nguồn tiền</th>
                <th>Thời gian</th>
                <th>Nội dung thanh toán</th>
                <th>Số tiền</th>
                <th>HĐĐT máy tính tiền</th>
                <th>Trạng thái</th>
                <th style={{ textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {transactions.slice(0, 4).map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: tx.source === 'bank' ? '#EFF6FF' : (tx.source === 'wallet' ? '#FFFBEB' : '#ECFDF5'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {getSourceIcon(tx.source)}
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap' }}>{tx.sourceName}</span>
                    </div>
                  </td>

                  <td style={{ color: '#64748B', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    {tx.time}
                  </td>

                  <td style={{ maxWidth: '340px' }}>
                    <div className="table-cell-ellipsis" style={{ fontWeight: 600, color: '#0F172A' }}>
                      {tx.description}
                    </div>
                    {tx.note && (
                      <div className="table-cell-ellipsis" style={{ fontSize: '0.76rem', color: '#64748B' }}>
                        {tx.note}
                      </div>
                    )}
                  </td>

                  <td style={{ whiteSpace: 'nowrap' }}>
                    <span style={{
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: tx.isTaxable === false ? '#64748B' : (tx.status === 'issue' ? '#DC2626' : '#059669'),
                      fontVariantNumeric: 'tabular-nums',
                      whiteSpace: 'nowrap'
                    }}>
                      +{formatVND(tx.amount)}
                    </span>
                  </td>

                  <td style={{ whiteSpace: 'nowrap' }}>
                    {tx.invoiceId ? (
                      <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                        ✓ {tx.invoiceId}
                      </span>
                    ) : (
                      <span style={{ color: '#94A3B8', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                        Chưa xuất
                      </span>
                    )}
                  </td>

                  <td style={{ whiteSpace: 'nowrap' }}>
                    {tx.status === 'matched' && (
                      <span className="status-triple-badge badge-matched">
                        <CheckCircle2 size={14} />
                        <span>Đã khớp</span>
                      </span>
                    )}
                    {tx.status === 'pending' && (
                      <span className="status-triple-badge badge-pending">
                        <AlertTriangle size={14} />
                        <span>Chờ xuất HĐ</span>
                      </span>
                    )}
                    {tx.status === 'issue' && (
                      <span className="status-triple-badge badge-issue">
                        <XCircle size={14} />
                        <span>Cần xác nhận</span>
                      </span>
                    )}
                  </td>

                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {tx.status === 'issue' ? (
                      <button
                        className="btn-primary-cta btn-danger-cta"
                        onClick={() => setDiscrepancyTx(tx)}
                        style={{ minHeight: '34px', fontSize: '0.8rem', padding: '0 12px' }}
                      >
                        <span>Xác nhận Tiền cá nhân</span>
                      </button>
                    ) : tx.status === 'pending' ? (
                      <button
                        className="btn-primary-cta btn-warning-cta"
                        onClick={() => setSelectedTx(tx)}
                        style={{ minHeight: '34px', fontSize: '0.8rem', padding: '0 12px' }}
                      >
                        <span>Xuất HĐĐT</span>
                      </button>
                    ) : (
                      <button
                        className="btn-secondary-outline"
                        onClick={() => setSelectedTx(tx)}
                        style={{ minHeight: '34px', fontSize: '0.8rem', padding: '0 12px' }}
                      >
                        <span>Chi tiết</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
