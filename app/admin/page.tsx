'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AdminPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);

            // Load basic stats (you can expand this)
            const [productsRes, ordersRes, usersRes] = await Promise.all([
                fetch('/api/admin/products'),
                fetch('/api/admin/orders'),
                fetch('/api/admin/users'),
            ]);

            const [productsData, ordersData, usersData] = await Promise.all([
                productsRes.json(),
                ordersRes.json(),
                usersRes.json(),
            ]);

            setStats({
                products: productsData.products?.length || 0,
                orders: ordersData.orders?.length || 0,
                users: usersData.users?.length || 0,
            });
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-white/80">{user?.email}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition"
                            >
                                Đăng Xuất
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-white/80 text-sm font-semibold mb-2">Sản Phẩm</h3>
                        <p className="text-4xl font-bold text-white">{stats.products}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-white/80 text-sm font-semibold mb-2">Đơn Hàng</h3>
                        <p className="text-4xl font-bold text-white">{stats.orders}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-white/80 text-sm font-semibold mb-2">Người Dùng</h3>
                        <p className="text-4xl font-bold text-white">{stats.users}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="text-2xl font-bold text-white mb-6">Quản Lý</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-xl font-bold text-white mb-2">Sản Phẩm</h3>
                        <p className="text-white/80 text-sm mb-4">
                            Quản lý sản phẩm và mã kích hoạt
                        </p>
                        <p className="text-white/60 text-sm italic">
                            Tính năng đang phát triển
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                        <div className="text-4xl mb-4">🛒</div>
                        <h3 className="text-xl font-bold text-white mb-2">Đơn Hàng</h3>
                        <p className="text-white/80 text-sm mb-4">
                            Xem và quản lý đơn hàng
                        </p>
                        <p className="text-white/60 text-sm italic">
                            Tính năng đang phát triển
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                        <div className="text-4xl mb-4">👥</div>
                        <h3 className="text-xl font-bold text-white mb-2">Người Dùng</h3>
                        <p className="text-white/80 text-sm mb-4">
                            Quản lý người dùng và phân quyền
                        </p>
                        <p className="text-white/60 text-sm italic">
                            Tính năng đang phát triển
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                        <div className="text-4xl mb-4">⚙️</div>
                        <h3 className="text-xl font-bold text-white mb-2">Cài Đặt</h3>
                        <p className="text-white/80 text-sm mb-4">
                            Cấu hình hệ thống
                        </p>
                        <p className="text-white/60 text-sm italic">
                            Tính năng đang phát triển
                        </p>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-12 bg-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold text-white mb-4">📝 Hướng Dẫn Sử Dụng</h3>
                    <div className="text-white/90 space-y-2">
                        <p>1. <strong>Tạo sản phẩm:</strong> Sử dụng API endpoint <code className="bg-white/20 px-2 py-1 rounded">/api/admin/products</code></p>
                        <p>2. <strong>Thêm mã kích hoạt:</strong> POST đến <code className="bg-white/20 px-2 py-1 rounded">/api/admin/products/[id]/codes</code></p>
                        <p>3. <strong>Xem đơn hàng:</strong> GET từ <code className="bg-white/20 px-2 py-1 rounded">/api/admin/orders</code></p>
                        <p className="mt-4 text-sm text-white/70">
                            💡 Giao diện quản lý đầy đủ sẽ được phát triển trong phiên bản tiếp theo.
                            Hiện tại bạn có thể sử dụng API endpoints hoặc Supabase Dashboard để quản lý.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
