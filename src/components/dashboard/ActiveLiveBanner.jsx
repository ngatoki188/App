import React, { useState, useEffect } from 'react';

export default function ActiveLiveBanner({ liveData }) {
  // Đồng hồ đếm thời gian live thực tế theo giây
  const [seconds, setSeconds] = useState(liveData?.initialDurationSeconds || 5076);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format giây thành hh:mm:ss
  const formatTime = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return [
      h.toString().padStart(2, '0'),
      m.toString().padStart(2, '0'),
      s.toString().padStart(2, '0'),
    ].join(':');
  };

  return (
    <div className="mx-4 sm:mx-6 mt-2 mb-4">
      <div className="bg-[#FFF5EE] border border-orange-200/70 rounded-2xl p-4 sm:p-5 shadow-soft transition-all duration-200">
        {/* Hàng trạng thái: ĐANG QUÉT COMMENT & Đồng hồ thời gian */}
        <div className="flex items-center justify-between pb-2 border-b border-orange-100/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E64A19] animate-live-dot inline-block" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-[#E64A19] uppercase">
              {liveData?.statusLabel || 'ĐANG QUÉT COMMENT'}
            </span>
          </div>

          <span className="font-mono text-xs sm:text-sm font-semibold text-slate-700">
            {formatTime(seconds)}
          </span>
        </div>

        {/* Tiêu đề phiên Live */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-3 tracking-tight">
          {liveData?.title || 'Live váy công sở • 27/08/2026'}
        </h2>

        {/* Thông số comment & khách chốt */}
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {liveData?.commentCount || 128} comment &nbsp;·&nbsp; {liveData?.customerCount || 42} khách chốt
        </p>
      </div>
    </div>
  );
}
