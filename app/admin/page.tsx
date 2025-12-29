'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

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
        <div className="min-h-screen bg-slate-900">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">AI</span>
                            </div>
                            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-slate-400 text-sm">{user?.email}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition border border-slate-700"
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
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-slate-400 text-sm font-semibold">SẢN PHẨM</h3>
                            <div className="text-3xl">📦</div>
                        </div>
                        <p className="text-4xl font-bold text-white">{stats.products}</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-slate-400 text-sm font-semibold">ĐƠN HÀNG</h3>
                            <div className="text-3xl">🛒</div>
                        </div>
                        <p className="text-4xl font-bold text-white">{stats.orders}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-slate-400 text-sm font-semibold">NGƯỜI DÙNG</h3>
                            <div className="text-3xl">👥</div>
                        </div>
                        <p className="text-4xl font-bold text-white">{stats.users}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <h2 className="text-2xl font-bold text-white mb-6">Quản Lý Hệ Thống</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: '📦', title: 'Sản Phẩm', desc: 'Quản lý sản phẩm và mã kích hoạt' },
                        { icon: '🛒', title: 'Đơn Hàng', desc: 'Xem và quản lý đơn hàng' },
                        { icon: '👥', title: 'Người Dùng', desc: 'Quản lý người dùng và phân quyền' },
                        { icon: '⚙️', title: 'Cài Đặt', desc: 'Cấu hình hệ thống' },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all cursor-pointer group"
                        >
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-sm mb-4">{item.desc}</p>
                            <p className="text-amber-400 text-sm font-semibold">Đang phát triển →</p>
                        </div>
                    ))}
                </div>

                {/* Instructions */}
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <span>📝</span> Hướng Dẫn Sử Dụng API
                    </h3>
                    <div className="space-y-4 text-slate-300">
                        <div className="flex items-start gap-3">
                            <span className="text-amber-400 font-bold">1.</span>
                            <div>
                                <strong className="text-white">Tạo sản phẩm:</strong> POST đến{' '}
                                <code className="bg-slate-800 px-2 py-1 rounded text-amber-400">/api/admin/products</code>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-amber-400 font-bold">2.</span>
                            <div>
                                <strong className="text-white">Thêm mã kích hoạt:</strong> POST đến{' '}
                                <code className="bg-slate-800 px-2 py-1 rounded text-amber-400">/api/admin/products/[id]/codes</code>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-amber-400 font-bold">3.</span>
                            <div>
                                <strong className="text-white">Xem đơn hàng:</strong> GET từ{' '}
                                <code className="bg-slate-800 px-2 py-1 rounded text-amber-400">/api/admin/orders</code>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <p className="text-sm text-slate-400">
                                💡 <strong>Tip:</strong> Giao diện quản lý đầy đủ sẽ được phát triển trong phiên bản tiếp theo.
                                Hiện tại bạn có thể sử dụng API endpoints hoặc Supabase Dashboard để quản lý.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
