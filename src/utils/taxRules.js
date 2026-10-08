// Quy định Thuế Hộ Kinh Doanh Cá Thể Doanh Thu Trên 1 Tỷ/Năm (Thông tư 40/2021/TT-BTC & Nghị định 123/2020/NĐ-CP)

export const BUSINESS_SECTORS = [
  {
    id: 'food_beverage',
    name: 'Quán ăn & Nước uống (Quán Phở, Cơm, Cà phê...)',
    shortName: 'Dịch vụ ăn uống',
    icon: '🍜',
    vatRate: 0.03, // 3%
    pitRate: 0.015, // 1.5%
    totalRate: 0.045, // 4.5%
    description: 'Bán 100.000 ₫ nộp 4.500 ₫ thuế (3.000 ₫ GTGT + 1.500 ₫ TNCN)',
    legalBasis: 'Khoản 2 Điều 10 Thông tư 40/2021/TT-BTC & NĐ 123/2020'
  }
];

// Quy định pháp lý quan trọng: Doanh thu trên 1 tỷ/năm
export const TAX_MANDATORY_SCALE = {
  annualThreshold: 1000000000, // 1 tỷ VNĐ / năm
  declarationFrequency: '3 tháng / lần (Theo Quý)',
  eInvoiceRequired: true,
  eInvoiceType: 'Hóa đơn điện tử khởi tạo từ máy tính tiền có mã của cơ quan thuế',
  taxForm: 'Mẫu 01/CNKD (Kê khai theo Quý)',
  operatingDaysPerYear: 300, // 300 ngày mở bán / năm
  averageDailyRevenueMin: 10000000, // 10 triệu / ngày
  averageDailyRevenueMax: 20000000, // 20 triệu / ngày
  averageBowlPrice: '45.000 - 70.000 ₫/bát',
  averageBowlsPerDay: '250 - 350 bát/ngày'
};

export function calculateTax(revenue, sectorId = 'food_beverage') {
  const sector = BUSINESS_SECTORS[0];
  const vatAmount = Math.round(revenue * sector.vatRate);
  const pitAmount = Math.round(revenue * sector.pitRate);
  const totalTax = vatAmount + pitAmount;

  return {
    sector,
    revenue,
    vatRatePercent: '3.0%',
    pitRatePercent: '1.5%',
    totalRatePercent: '4.5%',
    vatAmount,
    pitAmount,
    totalTax,
    plainExplanation: `Doanh thu ${formatVND(revenue)}: Thuế GTGT (3%) là ${formatVND(vatAmount)}, Thuế TNCN (1.5%) là ${formatVND(pitAmount)}. Tổng nộp ngân sách: ${formatVND(totalTax)}.`
  };
}

export function formatVND(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
}

export function formatNumberOnly(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return '0';
  return new Intl.NumberFormat('vi-VN').format(amount);
}
