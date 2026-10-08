// Mock Data for Quán Phở Bác Ba (Hộ Kinh Doanh Doanh Thu Trên 1 Tỷ/Năm)

export const MERCHANT_PHO_BAC_BA = {
  id: 'pho_bac_ba',
  storeName: 'Quán Phở Bác Ba',
  brandName: 'Phở Gia Truyền Bác Ba Hà Nội',
  ownerName: 'Nguyễn Văn Ba (Bác Ba)',
  taxCode: '0108928374',
  address: '48 Hàng Điếu, P. Cửa Đông, Hoàn Kiếm, Hà Nội',
  sectorId: 'food_beverage',
  sectorName: 'Dịch vụ ăn uống (Quán phở)',
  avatar: '🍜',
  taxAuthority: 'Chi cục Thuế Quận Hoàn Kiếm, TP. Hà Nội',
  businessScale: {
    operatingDaysPerYear: 300, // Quán bán 300 ngày / 365 ngày
    averageDailyRevenue: 15500000, // 15.5 triệu / ngày
    averageBowlPrice: '45.000 ₫ - 70.000 ₫ / bát',
    annualProjectedRevenue: 4650000000, // ~4.65 tỷ VNĐ/năm (> 1 tỷ/năm)
    taxPeriod: 'Kê khai 3 tháng/lần (Theo Quý)',
    eInvoiceStatus: 'Bắt buộc Hóa đơn điện tử máy tính tiền có mã CQT'
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
    totalRevenue: 1285000000, // 1 tỷ 285 triệu VNĐ (> 1 tỷ/năm)
    estimatedTax: 57825000, // 4.5% tổng thuế
    vatTax: 38550000, // 3% GTGT
    pitTax: 19275000, // 1.5% TNCN
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
    amount: 3600000,
    bowlCountEstimate: 62,
    status: 'unclosed', // 🟡 Chưa chốt cuối ngày
    statusLabel: 'Đang mở sổ hôm nay',
    note: 'Thu tiền mặt tại bàn ca sáng & ca trưa',
    closedAt: null
  },
  {
    date: '07/10/2026',
    dayLabel: 'Hôm qua (07/10)',
    amount: 3950000,
    bowlCountEstimate: 68,
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

export const GLOSSARY_ITEMS = [
  {
    techTerm: 'Reconcile / Đối soát',
    plainTerm: 'Kiểm tra số liệu khớp chưa',
    badge: '🟢 Đã khớp / 🟡 Chờ xác nhận',
    explanation: 'Giống như việc cuối ngày bác cầm sao kê ngân hàng Vietcombank, MoMo so với hóa đơn máy tính tiền xem có bị sót đơn nào chưa xuất hóa đơn không.',
    example: 'Ví dụ: Khách quét QR 55.000 ₫ ăn bát phở tái, ứng dụng đối chiếu thấy máy tính tiền đã xuất HĐ #HD00342 -> Báo màu xanh 🟢 Đã khớp.'
  },
  {
    techTerm: 'Doanh thu > 1 tỷ / Kê khai theo quý',
    plainTerm: 'Kê khai thuế 3 tháng/lần & HĐĐT máy tính tiền',
    badge: '📜 Bắt buộc theo luật',
    explanation: 'Quán phở Bác Ba bán 300 ngày/năm với doanh thu 10-20 triệu/ngày (tổng trên 1 tỷ/năm) thuộc diện nộp thuế theo phương pháp kê khai 3 tháng một lần (theo Quý) và dùng Hóa đơn điện tử máy tính tiền có mã của cơ quan thuế.',
    example: 'Ví dụ: Quý 4 bán được 1.285.000.000 ₫, nộp thuế 4.5% tương ứng 57.825.000 ₫ đúng hạn trước ngày 30 của tháng đầu quý sau.'
  },
  {
    techTerm: 'Kê khai tiền mặt cuối ngày',
    plainTerm: 'Chốt tổng tiền mặt 1 lần cuối ngày',
    badge: '💵 Bảng kê cuối ngày',
    explanation: 'Tiền mặt không cần gõ từng bát phở lẻ tẻ. Cuối mỗi ngày bác chỉ cần chốt 1 lần tổng số tiền mặt thu được trong két. Nếu hôm trước quên thì hôm sau phải hoàn thiện của ngày hôm trước riêng biệt, tuyệt đối không gộp chung.',
    example: 'Ví dụ: Tối 07/10 quên chốt 3.950.000 ₫ -> Sáng 08/10 hệ thống nhắc bác chốt riêng sổ 07/10 trước khi mở sổ ngày 08/10.'
  },
  {
    techTerm: 'Tiền cá nhân',
    plainTerm: 'Tiền cá nhân',
    badge: '🛡️ Không tính thuế (0 ₫)',
    explanation: 'Khoản tiền người thân, bạn bè chuyển khoản vào tài khoản ngân hàng không phải là tiền bán phở. Khi bác chọn "Tiền cá nhân", hệ thống sẽ tách riêng và KHÔNG tính vào doanh thu chịu thuế.',
    example: 'Ví dụ: Chị Ba chuyển 500.000 ₫ trả nợ tiền rau củ -> Bác chạm "Tiền cá nhân", số tiền này được miễn thuế 100%.'
  },
  {
    techTerm: 'Blockchain / Hash',
    plainTerm: 'Dấu xác thực chống chỉnh sửa',
    badge: '🛡️ Niêm phong điện tử',
    explanation: 'Như một con dấu mộc đỏ niêm phong điện tử lên toàn bộ số liệu doanh thu của quán. Cơ quan thuế và Ngân hàng quét mã là tin tưởng 100%, duyệt hồ sơ vay tín chấp 300-500 triệu nhanh chóng.',
    example: 'Ví dụ: Bác gửi báo cáo vay Vietcombank mở rộng quán phở, ngân hàng duyệt giải ngân ngay trong ngày nhờ dấu xác thực.'
  }
];

export const AI_FAQ_SAMPLES = [
  {
    q: 'Doanh thu quán phở trên 1 tỷ/năm thì nộp thuế như thế nào?',
    a: 'Dạ với doanh thu trên 1 tỷ/năm (quán mở bán 300 ngày, mỗi ngày 10-20 triệu), quán Bác Ba thuộc diện nộp thuế theo phương pháp KÊ KHAI THEO QUÝ (3 tháng/lần) với mức thuế suất 4,5% trên doanh thu (3% GTGT + 1,5% TNCN) và bắt buộc xuất Hóa đơn điện tử máy tính tiền có mã CQT ạ.'
  },
  {
    q: 'Tiền mặt quán phở ghi thế nào, có phải gõ từng bát không?',
    a: 'Dạ KHÔNG cần gõ từng bát ạ! Tiền mặt chỉ cần kê khai ĐÚNG 1 LẦN tổng số tiền mặt thu được vào CUỐI MỖI NGÀY. Nếu hôm trước bác quên, hệ thống sẽ nhắc bác hoàn thiện riêng cho ngày hôm trước, tuyệt đối không kê khai gộp vào ngày hôm sau.'
  },
  {
    q: 'Tiền người thân chuyển khoản trả nợ thì xử lý sao?',
    a: 'Dạ bác chỉ cần bấm vào giao dịch đó và chọn "Tiền cá nhân". Hệ thống EzTax sẽ tự động ghi chú chứng từ cá nhân an toàn và KHÔNG TÍNH THUẾ (0 ₫) ạ!'
  },
  {
    q: 'Tải file sao kê ngân hàng Vietcombank/VietQR lên như thế nào?',
    a: 'Dạ bác bấm nút "Tải Lên Sao Kê" ở góc trên màn hình, chọn file Excel/PDF sao kê từ Vietcombank hoặc MoMo. EzTax sẽ tự động đọc toàn bộ dòng tiền và đối chiếu với hóa đơn máy tính tiền trong chớp mắt ạ!'
  }
];
