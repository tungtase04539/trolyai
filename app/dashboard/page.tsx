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
    const [copiedId, setCopiedId] = useState('');

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

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(''), 2000);
    };

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
                            <span className="text-xl font-bold text-white">Dashboard</span>
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
                    <div className="mb-10">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Đơn Hàng Của Tôi</h1>
                        <p className="text-slate-400">Quản lý và theo dõi các đơn hàng đã mua</p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-24">
                            <div className="w-14 h-14 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-16 text-center border border-slate-700/30">
                            <div className="text-7xl mb-6">📦</div>
                            <p className="text-white text-2xl font-bold mb-3">Bạn chưa có đơn hàng nào</p>
                            <p className="text-slate-400 mb-8">Khám phá các sản phẩm trợ lý AI của chúng tôi</p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a0f1a] font-bold rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all duration-300"
                            >
                                <span>🛒</span>
                                <span>Mua Sản Phẩm</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 hover:border-amber-500/20 transition-all duration-300"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center text-4xl">
                                                🤖
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white mb-1">
                                                    {order.products.name}
                                                </h3>
                                                <p className="text-slate-400 text-sm">
                                                    📅 {new Date(order.created_at).toLocaleDateString('vi-VN', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-bold text-amber-400 mb-2">
                                                {order.amount.toLocaleString('vi-VN')}đ
                                            </p>
                                            <span
                                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${order.status === 'PAID'
                                                        ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                                                        : order.status === 'PENDING'
                                                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                                                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                                                    }`}
                                            >
                                                {order.status === 'PAID' ? '✓ Đã thanh toán' : order.status === 'PENDING' ? '⏳ Chờ thanh toán' : '✗ Thất bại'}
                                            </span>
                                        </div>
                                    </div>

                                    {order.status === 'PAID' && (
                                        <div className="space-y-5 pt-6 border-t border-slate-700/30">
                                            <div className="bg-slate-900/50 rounded-2xl p-5">
                                                <label className="block text-slate-400 text-sm mb-3 font-medium">
                                                    🔗 Link Trợ Lý Ảo
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="text"
                                                        value={order.chatbot_link}
                                                        readOnly
                                                        className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white text-sm"
                                                    />
                                                    <button
                                                        onClick={() => copyToClipboard(order.chatbot_link, `link-${order.id}`)}
                                                        className={`px-4 py-3 rounded-xl font-medium transition-all text-sm ${copiedId === `link-${order.id}`
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-slate-700/50 text-white hover:bg-slate-600/50'
                                                            }`}
                                                    >
                                                        {copiedId === `link-${order.id}` ? '✓' : '📋'}
                                                    </button>
                                                    <a
                                                        href={order.chatbot_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a0f1a] font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all text-sm"
                                                    >
                                                        🚀 Mở
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/50 rounded-2xl p-5">
                                                <label className="block text-slate-400 text-sm mb-3 font-medium">
                                                    🔑 Mã Kích Hoạt
                                                </label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="text"
                                                        value={order.activation_code}
                                                        readOnly
                                                        className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-amber-400 font-mono font-bold text-sm"
                                                    />
                                                    <button
                                                        onClick={() => copyToClipboard(order.activation_code, `code-${order.id}`)}
                                                        className={`px-4 py-3 rounded-xl font-medium transition-all text-sm ${copiedId === `code-${order.id}`
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-slate-700/50 text-white hover:bg-slate-600/50'
                                                            }`}
                                                    >
                                                        {copiedId === `code-${order.id}` ? '✓' : '📋'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
