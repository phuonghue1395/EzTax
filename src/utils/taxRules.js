// ======================================================================================
// EZTAX - TAX RULE ENGINE (NGHỊ ĐỊNH 141/2026/NĐ-CP - ÁP DỤNG TỪ 01/01/2026)
// ======================================================================================
// Quy định chuẩn hóa về Thuế Giá trị gia tăng (GTGT) và Thuế Thu nhập cá nhân (TNCN)
// đối với Hộ kinh doanh & Cá nhân kinh doanh theo Nghị định 141/2026/NĐ-CP.
// ======================================================================================

export const TAX_LEGAL_FRAMEWORK = {
  decreeNumber: '141/2026/NĐ-CP',
  effectiveDate: '01/01/2026',
  annualThreshold: 1000000000, // 1 tỷ VNĐ / năm (nâng từ 500 triệu lên 1 tỷ)
  quarterThreshold: 250000000, // 250 triệu VNĐ / quý
  tier1Max: 1000000000,       // <= 1 tỷ: Miễn GTGT & TNCN
  tier2Max: 3000000000,       // > 1 tỷ đến <= 3 tỷ: CÓ GTGT + Chọn 1 trong 2 PP tính TNCN
  tier3Max: 50000000000,      // > 3 tỷ đến <= 50 tỷ: CÓ GTGT + TNCN theo Thu nhập 17%
  tier4Min: 50000000000,      // > 50 tỷ: CÓ GTGT + TNCN theo Thu nhập 20%
  declarationFrequency: '3 tháng / lần (Theo Quý)',
  eInvoiceRequired: true,
  eInvoiceType: 'Hóa đơn điện tử khởi tạo từ máy tính tiền có mã của cơ quan thuế',
  taxForm: 'Mẫu 01/CNKD (Kê khai theo Quý)'
};

// Danh mục ngành nghề kinh doanh theo Thông tư 40/2021/TT-BTC & NĐ 141/2026/NĐ-CP
export const BUSINESS_SECTORS = [
  {
    id: 'food_beverage',
    name: 'Quán ăn & Dịch vụ ăn uống (Quán Phở, Cơm, Cà phê, Nhà hàng...)',
    shortName: 'Dịch vụ ăn uống',
    icon: '🍜',
    vatRate: 0.03, // 3% GTGT
    pitRateRevenue: 0.015, // 1.5% TNCN khi tính theo doanh thu
    totalRateRevenue: 0.045, // 4.5% tổng tỷ lệ theo doanh thu
    description: 'Bán 100.000 ₫ nộp 3.000 ₫ GTGT (tính trên toàn bộ doanh thu) + TNCN theo phương pháp lựa chọn',
    legalBasis: 'Nghị định 141/2026/NĐ-CP & Thông tư 40/2021/TT-BTC'
  },
  {
    id: 'retail_distribution',
    name: 'Phân phối, bán buôn, bán lẻ hàng hóa (Tạp hóa, Mỹ phẩm, Thời trang...)',
    shortName: 'Bán lẻ & Phân phối',
    icon: '🏪',
    vatRate: 0.01, // 1% GTGT
    pitRateRevenue: 0.005, // 0.5% TNCN
    totalRateRevenue: 0.015, // 1.5%
    description: 'Bán hàng hóa: Thuế GTGT 1% trên doanh thu + TNCN theo phương pháp lựa chọn',
    legalBasis: 'Nghị định 141/2026/NĐ-CP & Thông tư 40/2021/TT-BTC'
  },
  {
    id: 'services_construction_no_materials',
    name: 'Dịch vụ, xây dựng không bao thầu NVL (Cắt tóc, Spa, Sửa chữa, Khách sạn...)',
    shortName: 'Dịch vụ & Lưu trú',
    icon: '💇',
    vatRate: 0.05, // 5% GTGT
    pitRateRevenue: 0.02, // 2% TNCN
    totalRateRevenue: 0.07, // 7%
    description: 'Dịch vụ: Thuế GTGT 5% trên doanh thu + TNCN theo phương pháp lựa chọn',
    legalBasis: 'Nghị định 141/2026/NĐ-CP & Thông tư 40/2021/TT-BTC'
  },
  {
    id: 'manufacturing_transport_materials',
    name: 'Sản xuất, vận tải, dịch vụ có gắn với hàng hóa, xây dựng có bao thầu NVL',
    shortName: 'Sản xuất & Vận tải',
    icon: '🚚',
    vatRate: 0.03, // 3% GTGT
    pitRateRevenue: 0.015, // 1.5% TNCN
    totalRateRevenue: 0.045, // 4.5%
    description: 'Sản xuất, vận tải: Thuế GTGT 3% trên doanh thu + TNCN theo phương pháp lựa chọn',
    legalBasis: 'Nghị định 141/2026/NĐ-CP & Thông tư 40/2021/TT-BTC'
  },
  {
    id: 'other_business',
    name: 'Hoạt động kinh doanh khác',
    shortName: 'Kinh doanh khác',
    icon: '💼',
    vatRate: 0.02, // 2% GTGT
    pitRateRevenue: 0.01, // 1% TNCN
    totalRateRevenue: 0.03, // 3%
    description: 'Hoạt động khác: Thuế GTGT 2% trên doanh thu + TNCN theo phương pháp lựa chọn',
    legalBasis: 'Nghị định 141/2026/NĐ-CP & Thông tư 40/2021/TT-BTC'
  }
];

export const TAX_MANDATORY_SCALE = {
  annualThreshold: 1000000000, // 1 tỷ VNĐ / năm
  declarationFrequency: '3 tháng / lần (Theo Quý)',
  eInvoiceRequired: true,
  eInvoiceType: 'Hóa đơn điện tử khởi tạo từ máy tính tiền có mã của cơ quan thuế',
  taxForm: 'Mẫu 01/CNKD (Kê khai theo Quý)',
  operatingDaysPerYear: 300,
  averageDailyRevenueMin: 10000000,
  averageDailyRevenueMax: 20000000,
  averageBowlPrice: '45.000 - 70.000 ₫/bát',
  averageBowlsPerDay: '250 - 350 bát/ngày'
};

/**
 * Xác định phân khúc doanh thu theo Nghị định 141/2026/NĐ-CP
 * @param {number} revenue Doanh thu (năm hoặc quy đổi)
 * @returns {object} Thông tin phân khúc thuế
 */
export function getRevenueTier(revenue) {
  if (revenue <= TAX_LEGAL_FRAMEWORK.tier1Max) {
    return {
      tierId: 'tier1_exempt',
      label: 'Doanh thu ≤ 1 Tỷ / năm',
      shortLabel: '≤ 1 Tỷ',
      badgeColor: '#10B981',
      hasVAT: false,
      hasPIT: false,
      vatRuleDesc: 'Không chịu thuế GTGT (0 ₫)',
      pitRuleDesc: 'Không phải nộp thuế TNCN (0 ₫)',
      pitMethodOptions: ['exempt'],
      mandatoryEInvoice: false,
      summaryText: 'Miễn 100% thuế GTGT và thuế TNCN theo Nghị định 141/2026/NĐ-CP'
    };
  } else if (revenue <= TAX_LEGAL_FRAMEWORK.tier2Max) {
    return {
      tierId: 'tier2_choice',
      label: 'Doanh thu > 1 Tỷ → ≤ 3 Tỷ / năm',
      shortLabel: '1 - 3 Tỷ',
      badgeColor: '#3B82F6',
      hasVAT: true,
      hasPIT: true,
      vatRuleDesc: 'GTGT = Doanh thu × % GTGT ngành',
      pitRuleDesc: 'Được chọn 1 trong 2 phương pháp: Theo Doanh thu hoặc Theo Thu nhập (15%)',
      pitMethodOptions: ['revenue', 'income'],
      mandatoryEInvoice: true,
      summaryText: 'Chịu thuế GTGT và được lựa chọn 1 trong 2 phương pháp tính thuế TNCN'
    };
  } else if (revenue <= TAX_LEGAL_FRAMEWORK.tier3Max) {
    return {
      tierId: 'tier3_income_17',
      label: 'Doanh thu > 3 Tỷ → ≤ 50 Tỷ / năm',
      shortLabel: '3 - 50 Tỷ',
      badgeColor: '#F59E0B',
      hasVAT: true,
      hasPIT: true,
      vatRuleDesc: 'GTGT = Doanh thu × % GTGT ngành',
      pitRuleDesc: 'TNCN = (Doanh thu − Chi phí hợp lệ) × 17%',
      pitMethodOptions: ['income'],
      mandatoryEInvoice: true,
      summaryText: 'Chịu thuế GTGT và TNCN bắt buộc tính theo Thu nhập với thuế suất 17%'
    };
  } else {
    return {
      tierId: 'tier4_income_20',
      label: 'Doanh thu > 50 Tỷ / năm',
      shortLabel: '> 50 Tỷ',
      badgeColor: '#EF4444',
      hasVAT: true,
      hasPIT: true,
      vatRuleDesc: 'GTGT = Doanh thu × % GTGT ngành',
      pitRuleDesc: 'TNCN = (Doanh thu − Chi phí hợp lệ) × 20%',
      pitMethodOptions: ['income'],
      mandatoryEInvoice: true,
      summaryText: 'Chịu thuế GTGT và TNCN bắt buộc tính theo Thu nhập với thuế suất 20%'
    };
  }
}

/**
 * Tính thuế chính xác theo Nghị định 141/2026/NĐ-CP
 * @param {object} options
 * @param {number} options.revenue Doanh thu thực tế (VNĐ)
 * @param {number} [options.expenses] Chi phí hợp lý, hợp lệ (VNĐ) - Dùng khi tính TNCN theo Thu nhập
 * @param {string} [options.sectorId] ID ngành nghề ('food_beverage', 'retail_distribution', ...)
 * @param {string} [options.pitMethod] Phương pháp tính TNCN: 'revenue' (theo doanh thu) | 'income' (theo thu nhập)
 * @param {boolean} [options.isQuarterly] True nếu đây là số liệu kê khai Quý (đã đối soát), False nếu là năm
 * @param {number} [options.annualEstimatedRevenue] Doanh thu năm ước tính (dùng để xác định ngưỡng > 1 tỷ khi kê khai quý)
 */
export function calculateTax({
  revenue = 0,
  expenses = 0,
  sectorId = 'food_beverage',
  pitMethod = 'revenue',
  isQuarterly = false,
  annualEstimatedRevenue = null
} = {}) {
  // Hỗ trợ truyền thẳng tham số `calculateTax(revenue, sectorId)` như code cũ
  if (typeof arguments[0] === 'number') {
    revenue = arguments[0];
    sectorId = arguments[1] || 'food_beverage';
  }

  const safeRevenue = Math.max(0, Number(revenue) || 0);
  const safeExpenses = Math.max(0, Number(expenses) || 0);

  const sector = BUSINESS_SECTORS.find(s => s.id === sectorId) || BUSINESS_SECTORS[0];

  // Xác định quy mô năm để xét ngưỡng 1 tỷ (nếu kê khai quý, nhân 4 hoặc dùng annualEstimatedRevenue)
  const annualRefRevenue = annualEstimatedRevenue || (isQuarterly ? safeRevenue * 4 : safeRevenue);
  const tier = getRevenueTier(annualRefRevenue);

  // -------------------------------------------------------------
  // 1. TÍNH THUẾ GTGT (CHỈ CÓ 1 CÁCH CHÍNH: Doanh thu × % GTGT)
  // -------------------------------------------------------------
  // Quan trọng: GTGT tính trên toàn bộ doanh thu, KHÔNG tính trên lợi nhuận!
  let vatAmount = 0;
  let vatRatePercent = `${(sector.vatRate * 100).toFixed(1)}%`;
  let vatFormulaExplanation = '';

  if (tier.tierId === 'tier1_exempt') {
    vatAmount = 0;
    vatRatePercent = '0% (Miễn GTGT)';
    vatFormulaExplanation = `Doanh thu năm ≤ 1 tỷ đồng: Không chịu thuế GTGT (0 ₫) theo NĐ 141/2026/NĐ-CP.`;
  } else {
    vatAmount = Math.round(safeRevenue * sector.vatRate);
    vatFormulaExplanation = `GTGT = Doanh thu (${formatVND(safeRevenue)}) × Tỷ lệ ngành (${vatRatePercent}) = ${formatVND(vatAmount)} (Không tính trên lợi nhuận).`;
  }

  // -------------------------------------------------------------
  // 2. TÍNH THUẾ TNCN THEO CÁC PHƯƠNG PHÁP CỦA NĐ 141/2026
  // -------------------------------------------------------------
  let pitAmount = 0;
  let pitRatePercent = '';
  let pitMethodUsed = 'exempt';
  let pitMethodLabel = '';
  let pitFormulaExplanation = '';
  let taxableRevenueForPIT = 0;
  let taxableIncomeForPIT = 0;

  // Dữ liệu so sánh 2 phương pháp (đặc biệt hữu ích cho mức 1 - 3 tỷ)
  let method1Calc = null; // PP1: Doanh thu
  let method2Calc = null; // PP2: Thu nhập

  if (tier.tierId === 'tier1_exempt') {
    pitAmount = 0;
    pitRatePercent = '0% (Miễn TNCN)';
    pitMethodUsed = 'exempt';
    pitMethodLabel = 'Miễn thuế TNCN (≤ 1 Tỷ/năm)';
    pitFormulaExplanation = `Doanh thu năm ≤ 1 tỷ đồng: Không phải nộp thuế TNCN (0 ₫).`;
  } else if (tier.tierId === 'tier2_choice') {
    // Phân khúc 1 - 3 Tỷ: Có 2 phương pháp lựa chọn
    // Phương pháp 1: TNCN = (Doanh thu - 1 tỷ) × % thuế suất TNCN theo ngành
    const thresholdDeduction = isQuarterly ? (TAX_LEGAL_FRAMEWORK.annualThreshold / 4) : TAX_LEGAL_FRAMEWORK.annualThreshold;
    const m1TaxableRev = Math.max(0, safeRevenue - thresholdDeduction);
    const m1Amount = Math.round(m1TaxableRev * sector.pitRateRevenue);

    method1Calc = {
      id: 'revenue',
      name: 'Phương pháp 1: Tính theo Doanh thu',
      thresholdDeduction,
      taxableRevenue: m1TaxableRev,
      rate: sector.pitRateRevenue,
      ratePercent: `${(sector.pitRateRevenue * 100).toFixed(1)}%`,
      pitAmount: m1Amount,
      totalTax: vatAmount + m1Amount,
      formula: `(Doanh thu − ${formatVND(thresholdDeduction)}) × ${(sector.pitRateRevenue * 100).toFixed(1)}% = ${formatVND(m1Amount)}`
    };

    // Phương pháp 2: TNCN = (Doanh thu - Chi phí hợp lý) × 15%
    const m2TaxableIncome = Math.max(0, safeRevenue - safeExpenses);
    const m2Amount = Math.round(m2TaxableIncome * 0.15);

    method2Calc = {
      id: 'income',
      name: 'Phương pháp 2: Tính theo Thu nhập (15%)',
      expenses: safeExpenses,
      taxableIncome: m2TaxableIncome,
      rate: 0.15,
      ratePercent: '15.0%',
      pitAmount: m2Amount,
      totalTax: vatAmount + m2Amount,
      formula: `(Doanh thu − Chi phí hợp lệ) × 15% = (${formatVND(safeRevenue)} − ${formatVND(safeExpenses)}) × 15% = ${formatVND(m2Amount)}`
    };

    // Chọn phương pháp active
    if (pitMethod === 'income') {
      pitMethodUsed = 'income';
      pitMethodLabel = 'Phương pháp 2: Tính theo Thu nhập (15%)';
      pitRatePercent = '15.0%';
      taxableIncomeForPIT = m2TaxableIncome;
      pitAmount = m2Amount;
      pitFormulaExplanation = `TNCN = [Doanh thu (${formatVND(safeRevenue)}) − Chi phí (${formatVND(safeExpenses)})] × 15% = ${formatVND(pitAmount)}.`;
    } else {
      pitMethodUsed = 'revenue';
      pitMethodLabel = 'Phương pháp 1: Tính theo Doanh thu (Trừ ngưỡng 1 tỷ)';
      pitRatePercent = `${(sector.pitRateRevenue * 100).toFixed(1)}%`;
      taxableRevenueForPIT = m1TaxableRev;
      pitAmount = m1Amount;
      pitFormulaExplanation = `TNCN = [Doanh thu (${formatVND(safeRevenue)}) − Ngưỡng 1 tỷ (${formatVND(thresholdDeduction)})] × ${pitRatePercent} = ${formatVND(pitAmount)}.`;
    }
  } else if (tier.tierId === 'tier3_income_17') {
    // Phân khúc > 3 Tỷ đến 50 Tỷ: Bắt buộc theo Thu nhập 17%
    taxableIncomeForPIT = Math.max(0, safeRevenue - safeExpenses);
    pitAmount = Math.round(taxableIncomeForPIT * 0.17);
    pitMethodUsed = 'income_17';
    pitMethodLabel = 'Tính theo Thu nhập (Bắt buộc 17%)';
    pitRatePercent = '17.0%';
    pitFormulaExplanation = `TNCN = [Doanh thu (${formatVND(safeRevenue)}) − Chi phí hợp lý (${formatVND(safeExpenses)})] × 17% = ${formatVND(pitAmount)}.`;
  } else {
    // Phân khúc > 50 Tỷ: Bắt buộc theo Thu nhập 20%
    taxableIncomeForPIT = Math.max(0, safeRevenue - safeExpenses);
    pitAmount = Math.round(taxableIncomeForPIT * 0.20);
    pitMethodUsed = 'income_20';
    pitMethodLabel = 'Tính theo Thu nhập (Bắt buộc 20%)';
    pitRatePercent = '20.0%';
    pitFormulaExplanation = `TNCN = [Doanh thu (${formatVND(safeRevenue)}) − Chi phí hợp lý (${formatVND(safeExpenses)})] × 20% = ${formatVND(pitAmount)}.`;
  }

  const totalTax = vatAmount + pitAmount;

  // Xác định phương pháp tối ưu hơn nếu nằm trong khung 1 - 3 tỷ
  let optimalComparison = null;
  if (method1Calc && method2Calc) {
    const diff = Math.abs(method1Calc.totalTax - method2Calc.totalTax);
    const isM1Better = method1Calc.totalTax <= method2Calc.totalTax;
    optimalComparison = {
      recommendedMethod: isM1Better ? 'revenue' : 'income',
      recommendedName: isM1Better ? 'Phương pháp 1 (Theo Doanh thu)' : 'Phương pháp 2 (Theo Thu nhập)',
      savingsAmount: diff,
      explanation: isM1Better
        ? `Phương pháp 1 (Theo Doanh thu) giúp tiết kiệm ${formatVND(diff)} tiền thuế so với Phương pháp 2.`
        : `Phương pháp 2 (Theo Thu nhập) giúp tiết kiệm ${formatVND(diff)} tiền thuế do chi phí đầu vào hợp lệ cao.`
    };
  }

  return {
    sector,
    revenue: safeRevenue,
    expenses: safeExpenses,
    tier,
    vatRatePercent,
    vatAmount,
    vatFormulaExplanation,
    pitMethodUsed,
    pitMethodLabel,
    pitRatePercent,
    pitAmount,
    pitFormulaExplanation,
    taxableRevenueForPIT,
    taxableIncomeForPIT,
    totalTax,
    method1Calc,
    method2Calc,
    optimalComparison,
    legalBasis: `Nghị định 141/2026/NĐ-CP (áp dụng từ 01/01/2026)`,
    plainExplanation: tier.tierId === 'tier1_exempt'
      ? `Doanh thu ≤ 1 tỷ/năm: Miễn 100% thuế GTGT & TNCN theo Nghị định 141/2026/NĐ-CP.`
      : `Doanh thu ${formatVND(safeRevenue)}: Thuế GTGT là ${formatVND(vatAmount)}, Thuế TNCN là ${formatVND(pitAmount)}. Tổng nộp ngân sách: ${formatVND(totalTax)}.`
  };
}

/**
 * Format số tiền sang định dạng VNĐ (vd: 1.285.000.000 ₫)
 */
export function formatVND(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
}

/**
 * Format số nguyên có dấu chấm phân cách (vd: 1.285.000)
 */
export function formatNumberOnly(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '0';
  return new Intl.NumberFormat('vi-VN').format(amount);
}
