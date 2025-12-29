'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

interface Order {
    id: string;
    amount: number;
    status: string;
    chatbot_link: string;
    activation_code: string;
    created_at: string;
    products: {
        name: string;
        image_url: string | null;
    };
}

export default function DashboardPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);

            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data.orders || []);
        } catch (error) {
            console.error('Error loading orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Đã sao chép!');
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
                            <h1 className="text-xl font-bold text-white">Dashboard</h1>
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
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Đơn Hàng Của Tôi</h2>
                    <p className="text-slate-400">Quản lý và theo dõi các đơn hàng đã mua</p>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 mt-4">Đang tải...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700">
                        <div className="text-6xl mb-4">📦</div>
                        <p className="text-white text-xl mb-4">Bạn chưa có đơn hàng nào</p>
                        <p className="text-slate-400 mb-6">Khám phá các sản phẩm trợ lý AI của chúng tôi</p>
                        <Link
                            href="/"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                        >
                            Mua Sản Phẩm
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {order.products.name}
                                        </h3>
                                        <p className="text-slate-400 text-sm">
                                            📅 {new Date(order.created_at).toLocaleDateString('vi-VN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-amber-400 mb-2">
                                            {order.amount.toLocaleString('vi-VN')}đ
                                        </p>
                                        <span
                                            className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${order.status === 'PAID'
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : order.status === 'PENDING'
                                                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                }`}
                                        >
                                            {order.status === 'PAID'
                                                ? '✓ Đã thanh toán'
                                                : order.status === 'PENDING'
                                                    ? '⏳ Chờ thanh toán'
                                                    : '✗ Thất bại'}
                                        </span>
                                    </div>
                                </div>

                                {order.status === 'PAID' && (
                                    <div className="space-y-4">
                                        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                                            <label className="block text-slate-400 text-sm mb-2 font-medium">
                                                🔗 Link Trợ Lý Ảo
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={order.chatbot_link}
                                                    readOnly
                                                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm"
                                                />
                                                <button
                                                    onClick={() => copyToClipboard(order.chatbot_link)}
                                                    className="px-4 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition"
                                                >
                                                    📋 Copy
                                                </button>
                                                <a
                                                    href={order.chatbot_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all"
                                                >
                                                    🚀 Mở
                                                </a>
                                            </div>
                                        </div>

                                        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                                            <label className="block text-slate-400 text-sm mb-2 font-medium">
                                                🔑 Mã Kích Hoạt
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={order.activation_code}
                                                    readOnly
                                                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-amber-400 font-mono font-bold text-sm"
                                                />
                                                <button
                                                    onClick={() => copyToClipboard(order.activation_code)}
                                                    className="px-4 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition"
                                                >
                                                    📋 Copy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
