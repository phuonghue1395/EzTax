// ======================================================================================
// EZTAX - MOCK DATA (CẬP NHẬT THEO NGHỊ ĐỊNH 141/2026/NĐ-CP ÁP DỤNG TỪ 01/01/2026)
// ======================================================================================

export const MERCHANT_PHO_BAC_BA = {
  id: 'pho_bac_ba',
  storeName: 'Quán Phở Bác Ba',
  brandName: 'Phở Gia Truyền Bác Ba Hà Nội',
  ownerName: 'Nguyễn Văn Ba',
  taxCode: '0108928374',
  address: '48 Hàng Điếu, P. Cửa Đông, Hoàn Kiếm, Hà Nội',
  sectorId: 'food_beverage',
  sectorName: 'Quán ăn & Dịch vụ ăn uống (Quán phở)',
  avatar: '🍜',
  taxAuthority: 'Chi cục Thuế Quận Hoàn Kiếm, TP. Hà Nội',
  legalBasis: 'Nghị định 141/2026/NĐ-CP & Thông tư 40/2021/TT-BTC',
  businessScale: {
    operatingDaysPerYear: 300, // Quán bán 300 ngày / 365 ngày
    averageDailyRevenue: 15500000, // 15.5 triệu / ngày
    averageBowlPrice: '45.000 ₫ - 70.000 ₫ / bát',
    annualProjectedRevenue: 4650000000, // ~4.65 tỷ VNĐ/năm (Phân khúc > 3 tỷ → ≤ 50 tỷ)
    annualProjectedExpenses: 2750000000, // Chi phí hợp lệ ước tính cả năm (~2.75 tỷ)
    taxPeriod: 'Kê khai 3 tháng/lần (Theo Quý)',
    eInvoiceStatus: 'Bắt buộc Hóa đơn điện tử máy tính tiền có mã CQT (> 1 tỷ/năm)'
  },
  connectedSources: [
    { name: 'Vietcombank QR (VietQR)', status: 'connected', type: 'bank', account: '0011004892837' },
    { name: 'Ví MoMo Kinh Doanh', status: 'connected', type: 'wallet', account: '0912345678' },
    { name: 'HĐĐT VNPT Máy Tính Tiền', status: 'connected', type: 'einvoice', account: 'HD-0108928' },
    { name: 'Bảng Kê Tiền Mặt Cuối Ngày', status: 'active', type: 'cash', account: 'Sổ chốt cuối ngày' }
  ],
  summaryToday: {
    date: '08/10/2026',
    totalRevenue: 16850000, // 16.85 triệu hôm nay
    yesterdayRevenue: 15200000,
    estimatedExpensesToday: 9500000, // Chi phí nguyên liệu thịt, xương bò, bánh phở, rau thơm hôm nay
    bankAmount: 10450000, // 172 giao dịch VietQR
    bankCount: 172,
    walletAmount: 2800000, // 46 giao dịch MoMo
    walletCount: 46,
    cashAmount: 3600000, // 1 lần tổng doanh thu tiền mặt cuối ngày
    cashCount: 62,
    matchedCount: 218,
    pendingCount: 1,
    issueCount: 1
  },
  quarterSummary: {
    quarter: 'Quý 4/2026',
    totalRevenue: 1285000000, // 1 tỷ 285 triệu VNĐ Quý 4 (Quy mô năm ~4.65 tỷ)
    totalExpenses: 760000000, // Chi phí hợp lệ Quý 4 (thịt bò, phở tươi, nhân công, mặt bằng...)
    vatTax: 38550000, // 1.285.000.000 × 3% GTGT = 38.55 triệu
    pitMethodSelected: 'revenue', // Lựa chọn phương pháp tính TNCN ('revenue' | 'income')
    estimatedTax: 57825000,
    matchRate: 99.2,
    blockchainStamp: {
      hash: '0x8f2d9c4a1e7b30f5a9e1d827c6b4a395e8f172ab9d0124ca6b8e3a51f28d7e9c',
      timestamp: '08/10/2026 16:30:00',
      blockNumber: '#19482103',
      validator: 'Mạng Kiểm Định Liên Ngân Hàng & Cục Thuế',
      certCode: 'EZT-2026-Q4-0108928374'
    }
  }
};

// Lịch sử chốt tổng tiền mặt cuối ngày (Tiền mặt chỉ kê khai 1 lần tổng doanh thu/ngày)
export const INITIAL_DAILY_CASH_CLOSINGS = [
  {
    date: '08/10/2026',
    dayLabel: 'Hôm nay (08/10)',
    amount: 0,
    bowlCountEstimate: 0,
    status: 'unclosed', // 🟡 Chưa chốt cuối ngày
    statusLabel: 'Đang mở sổ hôm nay',
    note: 'Thu tiền mặt tại bàn ca sáng & ca trưa',
    closedAt: null
  },
  {
    date: '07/10/2026',
    dayLabel: 'Hôm qua (07/10)',
    amount: 0,
    bowlCountEstimate: 0,
    status: 'forgotten', // 🔴 Quên chưa kê khai hôm qua -> Phải hoàn thiện trước
    statusLabel: 'Chưa chốt sổ hôm qua (Cần hoàn thiện)',
    note: 'Bác Ba quên chốt sổ tổng tiền mặt tối hôm qua',
    closedAt: null
  },
  {
    date: '06/10/2026',
    dayLabel: 'Hôm kia (06/10)',
    amount: 4200000,
    bowlCountEstimate: 72,
    status: 'closed', // 🟢 Đã chốt xong
    statusLabel: 'Đã hoàn thành bảng kê',
    note: 'Đã chốt tổng tiền mặt cuối ngày lúc 21:30',
    closedAt: '06/10/2026 21:30'
  },
  {
    date: '05/10/2026',
    dayLabel: 'Ngày 05/10',
    amount: 3800000,
    bowlCountEstimate: 65,
    status: 'closed',
    statusLabel: 'Đã hoàn thành bảng kê',
    note: 'Đã chốt tổng tiền mặt cuối ngày',
    closedAt: '05/10/2026 21:15'
  }
];

// Danh sách giao dịch hôm nay (Quán bán 10-20 triệu/ngày, bát phở 45-70k)
export const INITIAL_TRANSACTIONS = [
  {
    id: 'tx-001',
    time: '12:15 Hôm nay',
    timestamp: Date.now() - 1000 * 60 * 10,
    source: 'bank',
    sourceName: 'Vietcombank QR',
    amount: 210000, // 3 bát phở đặc biệt 70k
    type: 'income',
    description: 'Chuyển khoản QR bàn 05 (3 tô phở đặc biệt 70.000 ₫)',
    status: 'matched', // 🟢 Đã khớp
    statusLabel: 'Đã khớp hóa đơn máy tính tiền',
    invoiceId: 'HĐ-00342',
    invoiceTime: '12:15',
    isTaxable: true,
    taxCalculated: 9450,
    verifiedStamp: true,
    note: 'Máy tính tiền tự động xuất HĐĐT có mã CQT'
  },
  {
    id: 'tx-002',
    time: '11:50 Hôm nay',
    timestamp: Date.now() - 1000 * 60 * 35,
    source: 'wallet',
    sourceName: 'Ví MoMo',
    amount: 150000, // 2 tô phở nạm gầu 65k + 2 quẩy 20k
    type: 'income',
    description: 'MoMo: Khách bàn 03 thanh toán tiền ăn phở',
    status: 'pending', // 🟡 Cần xác nhận
    statusLabel: 'Chờ xuất hóa đơn máy tính tiền',
    invoiceId: null,
    isTaxable: true,
    taxCalculated: 6750,
    verifiedStamp: false,
    note: 'Khách thanh toán MoMo lúc đông khách, chưa kịp bấm xuất HĐĐT máy tính tiền'
  },
  {
    id: 'tx-003',
    time: '11:15 Hôm nay',
    timestamp: Date.now() - 1000 * 60 * 70,
    source: 'bank',
    sourceName: 'Vietcombank',
    amount: 500000,
    type: 'income',
    description: 'Chi Ba tra no tien rau cu thang truoc',
    status: 'issue', // 🔴 Cần xác nhận
    statusLabel: 'Cần bạn xác nhận',
    invoiceId: null,
    isTaxable: null, // Chưa phân loại
    taxCalculated: 0,
    verifiedStamp: false,
    note: 'Nội dung người nhà chuyển khoản trả nợ. Hãy chọn "Tiền cá nhân" để không bị tính thuế.'
  },
  {
    id: 'tx-004',
    time: '10:45 Hôm nay',
    timestamp: Date.now() - 1000 * 60 * 100,
    source: 'bank',
    sourceName: 'Vietcombank QR',
    amount: 130000, // 2 bát phở tái 65k
    type: 'income',
    description: 'Chuyển khoản QR bàn 08 (2 bát phở tái chín)',
    status: 'matched',
    statusLabel: 'Đã khớp hóa đơn máy tính tiền',
    invoiceId: 'HĐ-00341',
    invoiceTime: '10:45',
    isTaxable: true,
    taxCalculated: 5850,
    verifiedStamp: true,
    note: 'Khớp 100% với hóa đơn điện tử'
  },
  {
    id: 'tx-005',
    time: '10:10 Hôm nay',
    timestamp: Date.now() - 1000 * 60 * 135,
    source: 'bank',
    sourceName: 'Vietcombank QR',
    amount: 320000, // Bàn gia đình 5 bát 60k + quẩy
    type: 'income',
    description: 'Chuyển khoản QR bàn 12 (5 phở tái + quẩy + trứng trần)',
    status: 'matched',
    statusLabel: 'Đã khớp hóa đơn máy tính tiền',
    invoiceId: 'HĐ-00340',
    invoiceTime: '10:10',
    isTaxable: true,
    taxCalculated: 14400,
    verifiedStamp: true,
    note: 'Đã xuất HĐĐT'
  },
  {
    id: 'tx-006',
    time: '09:20 Hôm nay',
    timestamp: Date.now() - 1000 * 60 * 185,
    source: 'bank',
    sourceName: 'Vietcombank QR',
    amount: 90000, // 2 bát phở truyền thống 45k
    type: 'income',
    description: 'Thanh toán QR bàn 01 (2 phở bò truyền thống 45k)',
    status: 'matched',
    statusLabel: 'Đã khớp hóa đơn máy tính tiền',
    invoiceId: 'HĐ-00339',
    invoiceTime: '09:20',
    isTaxable: true,
    taxCalculated: 4050,
    verifiedStamp: true,
    note: 'Khớp 100%'
  },
  {
    id: 'tx-007',
    time: '08:30 Hôm nay',
    timestamp: Date.now() - 1000 * 60 * 235,
    source: 'bank',
    sourceName: 'Vietcombank QR',
    amount: 140000, // 2 tô đặc biệt 70k
    type: 'income',
    description: 'Thanh toán QR bàn 04 (2 phở đặc biệt bắp bò 70k)',
    status: 'matched',
    statusLabel: 'Đã khớp hóa đơn máy tính tiền',
    invoiceId: 'HĐ-00338',
    invoiceTime: '08:30',
    isTaxable: true,
    taxCalculated: 6300,
    verifiedStamp: true,
    note: 'Khớp 100%'
  }
];

export const AI_FAQ_SAMPLES = [
  {
    q: 'Nghị định 141/2026/NĐ-CP quy định ngưỡng thuế 1 tỷ/năm thế nào?',
    a: 'Dạ theo Nghị định 141/2026/NĐ-CP áp dụng từ 01/01/2026, hộ kinh doanh có doanh thu dưới hoặc bằng 1 tỷ đồng/năm được MIỄN HOÀN TOÀN thuế GTGT và thuế TNCN (0 ₫). Chỉ khi doanh thu trên 1 tỷ/năm mới bắt đầu chịu thuế và bắt buộc sử dụng Hóa đơn điện tử máy tính tiền có mã của cơ quan thuế ạ!'
  },
  {
    q: 'Thuế GTGT tính trên doanh thu hay tính trên lợi nhuận?',
    a: 'Dạ thuế GTGT chỉ tính trên TỔNG DOANH THU, KHÔNG tính trên lợi nhuận bác nhé! Ví dụ quán thu 5 triệu/ngày, chi phí 3 triệu, lãi 2 triệu thì GTGT = 5 triệu × 3% (ngành ăn uống), tuyệt đối không lấy 2 triệu × 3% ạ.'
  },
  {
    q: 'Hộ doanh thu từ 1 tỷ đến 3 tỷ/năm có 2 cách tính TNCN nào?',
    a: 'Dạ bác được chọn 1 trong 2 cách: (1) Phương pháp Doanh thu: TNCN = (Doanh thu − 1 tỷ) × thuế suất ngành (ví dụ ăn uống là 1.5%); hoặc (2) Phương pháp Thu nhập: TNCN = (Doanh thu − Chi phí hợp lệ) × 15%. EzTax có sẵn công cụ so sánh giúp bác chọn cách nào nộp ít tiền thuế hơn ạ!'
  },
  {
    q: 'Doanh thu quán phở trên 3 tỷ/năm thì tính thuế TNCN ra sao?',
    a: 'Dạ nếu doanh thu trên 3 tỷ/năm, TNCN bắt buộc chuyển sang tính theo Thu nhập: (Doanh thu − Chi phí hợp lý, hợp lệ) × Thuế suất. Khung từ trên 3 tỷ đến 50 tỷ thuế suất là 17%; trên 50 tỷ thuế suất là 20% ạ.'
  },
  {
    q: 'Tiền mặt quán phở ghi thế nào, có phải gõ từng bát không?',
    a: 'Dạ KHÔNG cần gõ từng bát ạ! Tiền mặt chỉ cần kê khai ĐÚNG 1 LẦN tổng số tiền mặt thu được vào CUỐI MỖI NGÀY. Nếu hôm trước bác quên, hệ thống sẽ nhắc bác hoàn thiện riêng cho ngày hôm trước, tuyệt đối không kê khai gộp vào ngày hôm sau.'
  },
  {
    q: 'Tiền người thân chuyển khoản trả nợ thì xử lý sao?',
    a: 'Dạ bác chỉ cần bấm vào giao dịch đó và chọn "Tiền cá nhân". Hệ thống EzTax sẽ tự động ghi chú chứng từ cá nhân an toàn và KHÔNG TÍNH THUẾ (0 ₫) ạ!'
  }
];
