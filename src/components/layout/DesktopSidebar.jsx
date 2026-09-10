import React, { useState, useEffect } from 'react';
import { Home, LayoutGrid, Radio, User, BarChart3, Database } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

export default function DesktopSidebar({ activeTab = 'overview', onSelectTab }) {
  const isConfigured = isSupabaseConfigured();
  const [tableReady, setTableReady] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkDb() {
      if (!isConfigured || !supabase) {
        setChecking(false);
        return;
      }
      try {
        const { error } = await supabase.from('live_sessions').select('id').limit(1);
        if (!error) {
          setTableReady(true);
        } else {
          setTableReady(false);
        }
      } catch (err) {
        setTableReady(false);
      } finally {
        setChecking(false);
      }
    }
    checkDb();
  }, [isConfigured]);

  const menuItems = [
    { id: 'overview', label: 'Tổng quan', icon: Home },
    { id: 'inventory', label: 'Kho hàng', icon: LayoutGrid },
    { id: 'live', label: 'Phiên Live', icon: Radio },
    { id: 'customers', label: 'Khách hàng', icon: User },
    { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col justify-between p-4 shrink-0">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 px-3 py-3 mb-6 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-brand-primary flex items-center justify-center text-white font-black text-base shadow-pop">
            L
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">LiveStream Pro</h2>
            <p className="text-[11px] text-slate-400">Quản lý bán hàng</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-brand-primary font-bold shadow-soft'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Supabase Status Footer */}
      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-slate-500" />
            Supabase DB
          </span>
          <span
            className={`w-2 h-2 rounded-full ${
              tableReady
                ? 'bg-emerald-500 animate-pulse'
                : isConfigured
                ? 'bg-amber-400'
                : 'bg-slate-300'
            }`}
          />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {tableReady
            ? 'Đã đồng bộ cơ sở dữ liệu'
            : isConfigured
            ? 'Đã kết nối API (Chưa chạy schema.sql)'
            : 'Chế độ Demo Mock Data'}
        </p>
      </div>
    </aside>
  );
}
