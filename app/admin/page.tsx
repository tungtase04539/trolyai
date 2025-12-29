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
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const statCards = [
        { label: 'SẢN PHẨM', value: stats.products, icon: '📦', gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/20' },
        { label: 'ĐƠN HÀNG', value: stats.orders, icon: '🛒', gradient: 'from-amber-400 to-orange-500', shadow: 'shadow-amber-500/20' },
        { label: 'NGƯỜI DÙNG', value: stats.users, icon: '👥', gradient: 'from-green-500 to-emerald-500', shadow: 'shadow-green-500/20' },
        { label: 'DOANH THU', value: `${stats.revenue.toLocaleString('vi-VN')}đ`, icon: '💰', gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/20' },
    ];

    return (
        <div className="min-h-screen bg-[#0a0f1a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1629]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <span className="text-[#0a0f1a] text-xl">🤖</span>
                            </div>
                            <span className="text-xl font-bold text-white">Admin Panel</span>
                        </Link>
                        <div className="flex items-center gap-5">
                            <span className="text-slate-400 text-sm hidden md:block">{user?.email}</span>
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2.5 bg-slate-800/50 text-white rounded-xl hover:bg-slate-700/50 transition-all text-sm font-medium border border-slate-700/50"
                            >
                                Đăng Xuất
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Spacer */}
            <div className="h-20"></div>

            {/* Main Content */}
            <main className="relative py-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-14 h-14 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                                {statCards.map((stat, idx) => (
                                    <div key={idx} className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/30 group hover:border-slate-600/50 transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-slate-400 text-xs font-semibold tracking-wide">{stat.label}</span>
                                            <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg ${stat.shadow} text-lg group-hover:scale-110 transition-transform`}>
                                                {stat.icon}
                                            </div>
                                        </div>
                                        <p className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Quick Actions */}
                                <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30">
                                    <h2 className="text-xl font-bold text-white mb-6">Quản Lý Nhanh</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: '📦', title: 'Sản Phẩm', desc: 'Quản lý sản phẩm', gradient: 'from-blue-500 to-cyan-500' },
                                            { icon: '🛒', title: 'Đơn Hàng', desc: 'Xem đơn hàng', gradient: 'from-amber-400 to-orange-500' },
                                            { icon: '👥', title: 'Người Dùng', desc: 'Quản lý users', gradient: 'from-green-500 to-emerald-500' },
                                            { icon: '🔑', title: 'Mã Code', desc: 'Activation codes', gradient: 'from-purple-500 to-pink-500' },
                                        ].map((item, idx) => (
                                            <button
                                                key={idx}
                                                className="text-left bg-slate-900/30 rounded-2xl p-5 border border-slate-700/30 hover:border-amber-500/30 transition-all duration-300 group"
                                            >
                                                <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                                    {item.icon}
                                                </div>
                                                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                                                <p className="text-slate-400 text-sm">{item.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Orders */}
                                <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30">
                                    <h2 className="text-xl font-bold text-white mb-6">Đơn Hàng Gần Đây</h2>
                                    {recentOrders.length === 0 ? (
                                        <div className="text-center py-12">
                                            <p className="text-slate-400">Chưa có đơn hàng</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {recentOrders.map((order) => (
                                                <div key={order.id} className="flex items-center justify-between p-4 bg-slate-900/30 rounded-2xl border border-slate-700/30">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-slate-700/50 rounded-xl flex items-center justify-center text-xl">
                                                            🤖
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium text-sm">{order.products?.name || 'N/A'}</p>
                                                            <p className="text-slate-400 text-xs">{new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-amber-400 font-bold">{order.amount?.toLocaleString('vi-VN')}đ</p>
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
                            <div className="mt-8 bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-3xl p-8">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <span className="text-2xl">📝</span>
                                    Hướng Dẫn API
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[
                                        { title: 'Tạo sản phẩm', endpoint: 'POST /api/admin/products' },
                                        { title: 'Thêm mã kích hoạt', endpoint: 'POST /api/admin/products/[id]/codes' },
                                        { title: 'Xem đơn hàng', endpoint: 'GET /api/admin/orders' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-slate-900/50 rounded-2xl p-5 border border-slate-700/30">
                                            <p className="text-amber-400 font-semibold mb-2">{item.title}</p>
                                            <code className="text-slate-300 text-sm font-mono">{item.endpoint}</code>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
