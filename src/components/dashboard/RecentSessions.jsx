import React from 'react';

export default function RecentSessions({ sessions = [], onViewAll }) {
  return (
    <section className="mx-4 sm:mx-6 my-4">
      {/* Tiêu đề mục & Xem tất cả */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          Phiên gần đây
        </h3>
        <button
          onClick={onViewAll}
          className="text-sm font-semibold text-[#E64A19] hover:text-[#C23B12] transition-colors duration-150 cursor-pointer select-none"
        >
          Xem tất cả
        </button>
      </div>

      {/* Danh sách các phiên gần đây */}
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="bg-white border border-slate-200/80 hover:border-slate-300 rounded-2xl p-4 flex items-center justify-between shadow-soft transition-all duration-150 cursor-pointer active:scale-[0.99]"
          >
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                {session.title}
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {session.timeSubtitle}
              </p>
            </div>

            <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {session.revenue}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
