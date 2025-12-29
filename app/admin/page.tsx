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
        revenue: 0,
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);

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

            const orders = ordersData.orders || [];
            const paidOrders = orders.filter((o: any) => o.status === 'PAID');
            const revenue = paidOrders.reduce((sum: number, o: any) => sum + o.amount, 0);

            setStats({
                products: productsData.products?.length || 0,
                orders: orders.length,
                users: usersData.users?.length || 0,
                revenue,
            });
            setRecentOrders(orders.slice(0, 5));
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-[#0f172a]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                                <span className="text-slate-900 text-xl">🤖</span>
                            </div>
                            <span className="text-xl font-bold text-white">Admin Panel</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <span className="text-slate-400 text-sm hidden md:block">{user?.email}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition text-sm font-medium"
                            >
                                Đăng Xuất
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-blue-400 text-sm font-medium">SẢN PHẨM</span>
                                <span className="text-3xl">📦</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{stats.products}</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-amber-400 text-sm font-medium">ĐƠN HÀNG</span>
                                <span className="text-3xl">🛒</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{stats.orders}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-green-400 text-sm font-medium">NGƯỜI DÙNG</span>
                                <span className="text-3xl">👥</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{stats.users}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-violet-600/10 border border-purple-500/30 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-purple-400 text-sm font-medium">DOANH THU</span>
                                <span className="text-3xl">💰</span>
                            </div>
                            <p className="text-3xl font-bold text-white">{stats.revenue.toLocaleString('vi-VN')}đ</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Quick Actions */}
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                            <h2 className="text-xl font-bold text-white mb-4">Quản Lý Nhanh</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { icon: '📦', title: 'Sản Phẩm', desc: 'Quản lý sản phẩm' },
                                    { icon: '🛒', title: 'Đơn Hàng', desc: 'Xem đơn hàng' },
                                    { icon: '👥', title: 'Người Dùng', desc: 'Quản lý users' },
                                    { icon: '🔑', title: 'Mã Code', desc: 'Activation codes' },
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        className="text-left bg-slate-900/50 rounded-xl p-4 border border-slate-700 hover:border-amber-400/50 transition-all group"
                                    >
                                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                                        <h3 className="font-bold text-white text-sm">{item.title}</h3>
                                        <p className="text-slate-400 text-xs">{item.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                            <h2 className="text-xl font-bold text-white mb-4">Đơn Hàng Gần Đây</h2>
                            {recentOrders.length === 0 ? (
                                <p className="text-slate-400 text-center py-8">Chưa có đơn hàng</p>
                            ) : (
                                <div className="space-y-3">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                                            <div>
                                                <p className="text-white font-medium text-sm">{order.products?.name || 'N/A'}</p>
                                                <p className="text-slate-400 text-xs">{new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-amber-400 font-bold text-sm">{order.amount?.toLocaleString('vi-VN')}đ</p>
                                                <span className={`text-xs ${order.status === 'PAID' ? 'text-green-400' : 'text-yellow-400'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* API Instructions */}
                    <div className="mt-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span>📝</span> Hướng Dẫn API
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-amber-400 font-semibold mb-2">Tạo sản phẩm</p>
                                <code className="text-slate-300 text-xs">POST /api/admin/products</code>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-amber-400 font-semibold mb-2">Thêm mã kích hoạt</p>
                                <code className="text-slate-300 text-xs">POST /api/admin/products/[id]/codes</code>
                            </div>
                            <div className="bg-slate-900/50 rounded-xl p-4">
                                <p className="text-amber-400 font-semibold mb-2">Xem đơn hàng</p>
                                <code className="text-slate-300 text-xs">GET /api/admin/orders</code>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
