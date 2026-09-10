import React from 'react';
import TopHeader from '../components/layout/TopHeader';
import ActiveLiveBanner from '../components/dashboard/ActiveLiveBanner';
import StatCards from '../components/dashboard/StatCards';
import RecentSessions from '../components/dashboard/RecentSessions';

export default function Dashboard({ data, onAddLive, onViewAllRecent }) {
  return (
    <div className="flex-1 pb-6 animate-fade-in">
      {/* 1. Tiêu đề chào nhân viên & Nút + Thêm live */}
      <TopHeader onAddLive={onAddLive} />

      {/* 2. Banner phiên Live đang quét comment kèm đồng hồ */}
      <ActiveLiveBanner liveData={data?.activeLive} />

      {/* 3. Ba thẻ chỉ số: 68 Đã chốt | 12,8 tr Doanh thu | 6 mã Sắp hết */}
      <StatCards stats={data?.stats} />

      {/* 4. Danh sách phiên gần đây */}
      <RecentSessions
        sessions={data?.recentSessions}
        onViewAll={onViewAllRecent}
      />
    </div>
  );
}
