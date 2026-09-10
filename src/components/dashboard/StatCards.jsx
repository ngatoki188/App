import React from 'react';

export default function StatCards({ stats }) {
  const cards = [
    {
      id: 'stat-closed',
      value: stats?.closedOrders?.value || '68',
      label: stats?.closedOrders?.label || 'Đã chốt',
      valueClass: 'text-[#E64A19]', // Màu cam chuẩn
    },
    {
      id: 'stat-revenue',
      value: stats?.revenue?.value || '12,8 tr',
      label: stats?.revenue?.label || 'Doanh thu',
      valueClass: 'text-[#059669]', // Màu xanh lục chuẩn
    },
    {
      id: 'stat-lowstock',
      value: stats?.lowStock?.value || '6 mã',
      label: stats?.lowStock?.label || 'Sắp hết',
      valueClass: 'text-slate-900', // Màu đen chuẩn
    },
  ];

  return (
    <div className="mx-4 sm:mx-6 my-4">
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-soft flex flex-col justify-center min-h-[90px] transition-all duration-150 hover:border-slate-300"
          >
            <div className={`text-xl sm:text-2xl font-black tracking-tight ${card.valueClass}`}>
              {card.value}
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              {card.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
