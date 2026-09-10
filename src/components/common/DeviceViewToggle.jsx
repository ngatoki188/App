import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export default function DeviceViewToggle({ viewMode, onChangeView }) {
  return (
    <div className="hidden lg:flex items-center gap-1 bg-white/90 backdrop-blur border border-slate-200 shadow-lg rounded-full p-1 fixed top-4 right-6 z-50">
      <button
        onClick={() => onChangeView('mobile')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
          viewMode === 'mobile'
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Xem dạng khung điện thoại Mobile (chuẩn theo ảnh mẫu)"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>Mobile View</span>
      </button>

      <button
        onClick={() => onChangeView('desktop')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
          viewMode === 'desktop'
            ? 'bg-slate-900 text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Xem dạng giao diện Web máy tính rộng rãi"
      >
        <Monitor className="w-3.5 h-3.5" />
        <span>Web Desktop</span>
      </button>
    </div>
  );
}
