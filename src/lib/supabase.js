import { createClient } from '@supabase/supabase-js';
import { initialDashboardData } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-supabase-project.supabase.co'
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Lấy dữ liệu tổng quan:
 * Nếu đã cấu hình Supabase -> truy vấn từ cơ sở dữ liệu.
 * Nếu chưa cấu hình -> trả về dữ liệu mẫu khớp với thiết kế.
 */
export async function fetchDashboardData() {
  if (isSupabaseConfigured() && supabase) {
    try {
      // 1. Lấy phiên live đang hoạt động
      const { data: activeSessions, error: activeErr } = await supabase
        .from('live_sessions')
        .select('*')
        .eq('status', 'scanning')
        .order('created_at', { ascending: false })
        .limit(1);

      // 2. Lấy các phiên live gần đây
      const { data: recentSessions, error: recentErr } = await supabase
        .from('live_sessions')
        .select('*')
        .neq('status', 'scanning')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!activeErr && activeSessions && activeSessions.length > 0) {
        const active = activeSessions[0];
        return {
          user: initialDashboardData.user,
          activeLive: {
            id: active.id,
            status: active.status,
            statusLabel: 'ĐANG QUÉT COMMENT',
            initialDurationSeconds: active.duration_seconds || 5076,
            title: active.title,
            commentCount: active.comment_count || 128,
            customerCount: active.customer_count || 42,
          },
          stats: {
            closedOrders: {
              value: String(active.closed_orders || 68),
              label: 'Đã chốt',
              color: 'text-brand-primary',
            },
            revenue: {
              value: active.revenue_display || '12,8 tr',
              label: 'Doanh thu',
              color: 'text-revenue',
            },
            lowStock: {
              value: `${active.low_stock_count || 6} mã`,
              label: 'Sắp hết',
              color: 'text-slate-900',
            },
          },
          recentSessions: (recentSessions && recentSessions.length > 0)
            ? recentSessions.map(item => ({
                id: item.id,
                title: item.title,
                timeSubtitle: item.time_subtitle,
                revenue: item.revenue_display,
              }))
            : initialDashboardData.recentSessions,
        };
      }
    } catch (e) {
      console.warn('Lỗi khi tải từ Supabase, chuyển sang chế độ dữ liệu mẫu:', e);
    }
  }

  // Fallback về mock data ban đầu
  return initialDashboardData;
}

/**
 * Thêm phiên live mới
 */
export async function createLiveSession(sessionData) {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('live_sessions')
        .insert([
          {
            title: sessionData.title,
            status: 'scanning',
            comment_count: 0,
            customer_count: 0,
            closed_orders: 0,
            revenue_display: '0 đ',
            duration_seconds: 0,
          },
        ])
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.error('Lỗi thêm phiên live vào Supabase:', err);
      return { success: false, error: err.message };
    }
  }

  // Chế độ mô phỏng khi chưa kết nối Supabase
  return {
    success: true,
    data: [{
      id: `live-${Date.now()}`,
      title: sessionData.title,
      status: 'scanning',
      comment_count: 0,
      customer_count: 0,
    }]
  };
}
