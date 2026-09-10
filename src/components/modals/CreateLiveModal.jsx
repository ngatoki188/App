import React, { useState } from 'react';
import { X, Sparkles, Video, Calendar } from 'lucide-react';

export default function CreateLiveModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString('vi-VN'));

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: `${title.trim()} • ${date}`,
      status: 'scanning',
    });
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl border border-slate-100 relative animate-scale-up">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-brand-primary flex items-center justify-center">
            <Video className="w-4 h-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Tạo phiên Live mới</h3>
        </div>
        <p className="text-xs text-slate-500 mb-5">
          Khởi động phiên live và tự động kết nối quét comment chốt đơn.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tên phiên Livestream
            </label>
            <input
              type="text"
              required
              placeholder="VD: Live xả kho đầm thiết kế"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E64A19] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Thời gian phiên
            </label>
            <div className="relative">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E64A19] focus:bg-white transition-all"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            </div>
          </div>

          <div className="pt-2 flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-full bg-brand-primary hover:bg-brand-accent text-white text-sm font-bold shadow-pop transition-all"
            >
              Bắt đầu Live
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
