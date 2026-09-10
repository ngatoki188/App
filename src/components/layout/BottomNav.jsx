import React from 'react';
import { Home, LayoutGrid, User, BarChart3 } from 'lucide-react';

export default function BottomNav({ activeTab = 'overview', onSelectTab }) {
  const navItems = [
    {
      id: 'overview',
      label: 'Tổng quan',
      icon: (isActive) => (
        <Home
          className={`w-5 h-5 transition-transform duration-150 ${
            isActive ? 'stroke-[#E64A19] stroke-[2.2] scale-105' : 'stroke-slate-400 stroke-[1.8]'
          }`}
        />
      ),
    },
    {
      id: 'inventory',
      label: 'Kho',
      icon: (isActive) => (
        <LayoutGrid
          className={`w-5 h-5 transition-transform duration-150 ${
            isActive ? 'stroke-[#E64A19] stroke-[2.2]' : 'stroke-slate-400 stroke-[1.8]'
          }`}
        />
      ),
    },
    {
      id: 'live',
      label: 'Live',
      icon: (isActive) => (
        <div className="w-5 h-5 flex items-center justify-center">
          <span
            className={`w-3 h-3 rounded-full transition-all duration-150 ${
              isActive ? 'bg-[#E64A19] ring-4 ring-orange-100' : 'bg-slate-400'
            }`}
          />
        </div>
      ),
    },
    {
      id: 'customers',
      label: 'Khách',
      icon: (isActive) => (
        <User
          className={`w-5 h-5 transition-transform duration-150 ${
            isActive ? 'stroke-[#E64A19] stroke-[2.2]' : 'stroke-slate-400 stroke-[1.8]'
          }`}
        />
      ),
    },
    {
      id: 'reports',
      label: 'Báo cáo',
      icon: (isActive) => (
        <BarChart3
          className={`w-5 h-5 transition-transform duration-150 ${
            isActive ? 'stroke-[#E64A19] stroke-[2.2]' : 'stroke-slate-400 stroke-[1.8]'
          }`}
        />
      ),
    },
  ];

  return (
    <nav className="w-full bg-white border-t border-slate-200/90 py-2 px-3 flex items-center justify-around select-none">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => onSelectTab && onSelectTab(item.id)}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-1 text-center group cursor-pointer transition-colors"
          >
            {item.icon(isActive)}
            <span
              className={`text-[11px] leading-none transition-colors duration-150 ${
                isActive ? 'text-[#E64A19] font-bold' : 'text-slate-500 font-medium group-hover:text-slate-700'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
