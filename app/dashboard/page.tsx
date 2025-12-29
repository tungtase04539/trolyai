'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

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
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
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
                <h2 className="text-3xl font-bold text-white mb-8">Đơn Hàng Của Tôi</h2>

                {loading ? (
                    <div className="text-center text-white text-xl">Đang tải...</div>
                ) : orders.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/20">
                        <p className="text-white text-xl mb-4">Bạn chưa có đơn hàng nào</p>
                        <a
                            href="/"
                            className="inline-block px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-white/90 transition"
                        >
                            Mua Sản Phẩm
                        </a>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {order.products.name}
                                        </h3>
                                        <p className="text-white/60 text-sm">
                                            {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-white">
                                            {order.amount.toLocaleString('vi-VN')} đ
                                        </p>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${order.status === 'PAID'
                                                    ? 'bg-green-500/20 text-green-100'
                                                    : order.status === 'PENDING'
                                                        ? 'bg-yellow-500/20 text-yellow-100'
                                                        : 'bg-red-500/20 text-red-100'
                                                }`}
                                        >
                                            {order.status === 'PAID'
                                                ? 'Đã thanh toán'
                                                : order.status === 'PENDING'
                                                    ? 'Chờ thanh toán'
                                                    : 'Thất bại'}
                                        </span>
                                    </div>
                                </div>

                                {order.status === 'PAID' && (
                                    <div className="mt-6 space-y-4">
                                        <div className="bg-white/10 rounded-lg p-4">
                                            <label className="block text-white/80 text-sm mb-2">
                                                Link Trợ Lý Ảo
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={order.chatbot_link}
                                                    readOnly
                                                    className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white"
                                                />
                                                <button
                                                    onClick={() => copyToClipboard(order.chatbot_link)}
                                                    className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-white/90 transition"
                                                >
                                                    Sao chép
                                                </button>
                                                <a
                                                    href={order.chatbot_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                                                >
                                                    Mở
                                                </a>
                                            </div>
                                        </div>

                                        <div className="bg-white/10 rounded-lg p-4">
                                            <label className="block text-white/80 text-sm mb-2">
                                                Mã Kích Hoạt
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={order.activation_code}
                                                    readOnly
                                                    className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white font-mono"
                                                />
                                                <button
                                                    onClick={() => copyToClipboard(order.activation_code)}
                                                    className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-white/90 transition"
                                                >
                                                    Sao chép
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
