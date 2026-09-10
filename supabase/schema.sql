-- =======================================================
-- SCHEMA CƠ SỞ DỮ LIỆU SUPABASE CHO ỨNG DỤNG LIVESTREAM
-- Chạy đoạn script này trong Supabase SQL Editor
-- =======================================================

-- 1. Bảng Quản lý Phiên Live (live_sessions)
CREATE TABLE IF NOT EXISTS public.live_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'scanning' CHECK (status IN ('draft', 'scanning', 'completed', 'cancelled')),
    comment_count INT DEFAULT 0,
    customer_count INT DEFAULT 0,
    closed_orders INT DEFAULT 0,
    revenue_display TEXT DEFAULT '0 đ',
    duration_seconds INT DEFAULT 0,
    time_subtitle TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Bảng Đơn Hàng Chốt (orders)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.live_sessions(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    phone TEXT,
    product_code TEXT NOT NULL,
    quantity INT DEFAULT 1,
    amount NUMERIC(12, 2) DEFAULT 0,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'shipped', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Bảng Sản Phẩm & Mã Live (products)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    stock_quantity INT DEFAULT 0,
    price NUMERIC(12, 2) DEFAULT 0,
    is_low_stock BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Kích hoạt Row Level Security (RLS)
ALTER TABLE public.live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Cho phép đọc công khai (hoặc tùy biến theo tài khoản nhân viên)
CREATE POLICY "Cho phép đọc phiên live" ON public.live_sessions FOR SELECT USING (true);
CREATE POLICY "Cho phép thêm phiên live" ON public.live_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Cho phép cập nhật phiên live" ON public.live_sessions FOR UPDATE USING (true);

-- 4. Dữ liệu mẫu ban đầu (Seed data khớp giao diện ảnh đính kèm)
INSERT INTO public.live_sessions (title, status, comment_count, customer_count, closed_orders, revenue_display, duration_seconds, time_subtitle)
VALUES 
  ('Live váy công sở • 27/08/2026', 'scanning', 128, 42, 68, '12,8 tr', 5076, 'Đang diễn ra'),
  ('Live đồ bộ tối', 'completed', 95, 35, 40, '8.450.000đ', 7200, 'Hôm qua • 35 khách'),
  ('Live áo kiểu', 'completed', 78, 28, 30, '6.120.000đ', 5400, '25/08 • 28 khách');
