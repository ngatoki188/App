import React from 'react';
import { ArrowLeft, Box, Radio, Users, BarChart3 } from 'lucide-react';

export default function PlaceholderScreen({ screenKey, onBack }) {
  const configs = {
    inventory: {
      title: 'Quản lý Kho hàng',
      subtitle: 'Kiểm kê và thiết lập mã chốt đơn livestream',
      icon: Box,
    },
    live: {
      title: 'Phòng Livestream',
      subtitle: 'Tương tác comment thời gian thực và tự động lên đơn',
      icon: Radio,
    },
    customers: {
      title: 'Khách hàng',
      subtitle: 'Danh sách khách chốt đơn và lịch sử mua sắm',
      icon: Users,
    },
    reports: {
      title: 'Báo cáo doanh số',
      subtitle: 'Biểu đồ tăng trưởng và hiệu quả từng phiên live',
      icon: BarChart3,
    },
  };

  const current = configs[screenKey] || {
    title: 'Màn hình chi tiết',
    subtitle: 'Đang phát triển các tính năng tiếp theo',
    icon: Box,
  };

  const IconComponent = current.icon;

  return (
    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-orange-50 text-brand-primary flex items-center justify-center mb-4 shadow-soft">
        <IconComponent className="w-8 h-8" />
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-1">{current.title}</h2>
      <p className="text-xs sm:text-sm text-slate-500 max-w-xs mb-6">
        {current.subtitle}
      </p>

      {/* Minh chứng hệ thống CSS dùng chung hoạt động xuyên suốt */}
      <div className="w-full max-w-sm app-card mb-6 text-left">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Hệ thống CSS dùng chung (Design System)
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Màn hình này kế thừa trực tiếp các tiện ích từ <code className="text-brand-primary font-mono bg-orange-50 px-1 py-0.5 rounded">common.css</code> như <code className="font-mono text-slate-800">.app-card</code>, <code className="font-mono text-slate-800">.btn-brand</code>, <code className="font-mono text-slate-800">.btn-secondary</code>.
        </p>
      </div>

      <button
        onClick={onBack}
        className="btn-secondary flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay về Tổng quan</span>
      </button>
    </div>
  );
}
