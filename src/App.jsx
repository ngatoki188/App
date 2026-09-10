import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import PlaceholderScreen from './pages/PlaceholderScreen';
import BottomNav from './components/layout/BottomNav';
import DesktopSidebar from './components/layout/DesktopSidebar';
import CreateLiveModal from './components/modals/CreateLiveModal';
import DeviceViewToggle from './components/common/DeviceViewToggle';
import { fetchDashboardData, createLiveSession } from './lib/supabase';
import { initialDashboardData } from './data/mockData';

export default function App() {
  const [data, setData] = useState(initialDashboardData);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' | 'desktop'
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    // Tải dữ liệu từ Supabase hoặc mock data
    async function loadData() {
      const result = await fetchDashboardData();
      if (result) setData(result);
    }
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddLiveSubmit = async (sessionData) => {
    // Gọi Supabase helper
    await createLiveSession(sessionData);

    // Cập nhật state hiển thị phiên live mới
    setData((prev) => ({
      ...prev,
      activeLive: {
        ...prev.activeLive,
        title: sessionData.title,
        status: 'scanning',
        initialDurationSeconds: 0,
        commentCount: 0,
        customerCount: 0,
      },
    }));

    showToast(`Đã khởi động: "${sessionData.title}"`);
  };

  const renderActiveScreen = () => {
    if (activeTab === 'overview') {
      return (
        <Dashboard
          data={data}
          onAddLive={() => setIsCreateModalOpen(true)}
          onViewAllRecent={() => showToast('Đang mở toàn bộ lịch sử phiên live...')}
        />
      );
    }
    return (
      <PlaceholderScreen
        screenKey={activeTab}
        onBack={() => setActiveTab('overview')}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start text-slate-900 font-sans selection:bg-orange-100 selection:text-brand-primary">
      {/* Nút chuyển đổi giao diện Mobile App / Web Desktop (Chỉ hiện trên màn hình lớn) */}
      <DeviceViewToggle viewMode={viewMode} onChangeView={setViewMode} />

      {/* Toast thông báo nhanh */}
      {toastMessage && (
        <div className="fixed top-5 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#E64A19]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Giao diện theo ViewMode */}
      {viewMode === 'mobile' ? (
        /* ================= CHẾ ĐỘ MOBILE (KHỚP 100% ẢNH MẪU) ================= */
        <div className="w-full sm:max-w-[412px] sm:my-6 min-h-screen sm:min-h-[860px] bg-white sm:rounded-[36px] sm:shadow-2xl border-0 sm:border sm:border-slate-200/80 flex flex-col justify-between overflow-hidden relative">
          {/* Vạch giả lập tai thỏ / loa trên điện thoại nếu ở dạng xem desktop */}
          <div className="hidden sm:flex justify-center pt-2 pb-1 bg-white">
            <div className="w-28 h-4 bg-slate-100 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            </div>
          </div>

          {/* Nội dung màn hình chính */}
          <main className="flex-1 overflow-y-auto">
            {renderActiveScreen()}
          </main>

          {/* Thanh Bottom Navigation chuẩn xác 5 tab */}
          <footer className="sticky bottom-0 left-0 right-0 z-40 bg-white">
            <BottomNav
              activeTab={activeTab}
              onSelectTab={(tabId) => setActiveTab(tabId)}
            />
          </footer>
        </div>
      ) : (
        /* ================= CHẾ ĐỘ WEB DESKTOP ================= */
        <div className="w-full min-h-screen flex bg-[#F8FAFC]">
          {/* Sidebar máy tính */}
          <DesktopSidebar
            activeTab={activeTab}
            onSelectTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Vùng nội dung Web Desktop rộng rãi */}
          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-orange-100 text-brand-primary">
                  Web Dashboard Mode
                </span>
                <span className="text-xs text-slate-400">
                  Thích ứng tự động đa nền tảng
                </span>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-brand"
              >
                + Thêm live
              </button>
            </header>

            <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-8">
              {renderActiveScreen()}
            </main>
          </div>
        </div>
      )}

      {/* Modal Thêm phiên live mới */}
      <CreateLiveModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleAddLiveSubmit}
      />
    </div>
  );
}
