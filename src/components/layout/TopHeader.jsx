import React from 'react';
import { Plus } from 'lucide-react';

export default function TopHeader({ onAddLive }) {
  return (
    <header className="flex items-center justify-between pt-6 pb-4 px-4 sm:px-6">
      <div>
        <p className="text-xs sm:text-sm font-medium text-slate-400 tracking-tight">
          Xin chào, Nhân viên
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Tổng quan
        </h1>
      </div>

      <button
        id="btn-add-live"
        onClick={onAddLive}
        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-brand-primary hover:bg-brand-accent active:bg-brand-dark text-white font-semibold text-sm shadow-pop transition-all duration-150 active:scale-95 cursor-pointer select-none"
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
        <span>Thêm live</span>
      </button>
    </header>
  );
}
