// Dữ liệu mẫu khởi tạo chuẩn xác theo màn hình thiết kế
export const initialDashboardData = {
  user: {
    role: "Nhân viên",
    name: "Nhân viên",
  },
  activeLive: {
    id: "live-active-01",
    status: "scanning", // "scanning", "live", "ended"
    statusLabel: "ĐANG QUÉT COMMENT",
    initialDurationSeconds: 5076, // 01:24:36 tính bằng giây
    title: "Live váy công sở • 27/08/2026",
    commentCount: 128,
    customerCount: 42,
  },
  stats: {
    closedOrders: {
      value: "68",
      label: "Đã chốt",
      color: "text-brand-primary",
    },
    revenue: {
      value: "12,8 tr",
      rawValue: 12800000,
      label: "Doanh thu",
      color: "text-revenue",
    },
    lowStock: {
      value: "6 mã",
      label: "Sắp hết",
      color: "text-slate-900",
    },
  },
  recentSessions: [
    {
      id: "rec-01",
      title: "Live đồ bộ tối",
      timeSubtitle: "Hôm qua • 35 khách",
      revenue: "8.450.000đ",
      status: "completed",
    },
    {
      id: "rec-02",
      title: "Live áo kiểu",
      timeSubtitle: "25/08 • 28 khách",
      revenue: "6.120.000đ",
      status: "completed",
    },
  ],
};
