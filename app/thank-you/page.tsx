'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order');
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId) {
            loadOrder();
        }
    }, [orderId]);

    const loadOrder = async () => {
        try {
            const response = await fetch(`/api/orders`);
            const data = await response.json();
            const foundOrder = data.orders?.find((o: any) => o.id === orderId);
            setOrder(foundOrder);
        } catch (error) {
            console.error('Error loading order:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Đã sao chép!');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-white">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Success Icon */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
                            <span className="text-5xl">✓</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Đặt Hàng Thành Công!
                        </h1>
                        <p className="text-slate-400">
                            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ sớm nhất.
                        </p>
                    </div>

                    {/* Order Info */}
                    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">Thông Tin Đơn Hàng</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Mã đơn hàng:</span>
                                <span className="text-white font-mono">{orderId?.slice(0, 8)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Trạng thái:</span>
                                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">
                                    Chờ thanh toán
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">Hướng Dẫn Thanh Toán</h2>
                        <div className="space-y-3 text-slate-300">
                            <p>1. Chuyển khoản theo thông tin bên dưới</p>
                            <p>2. Nhập nội dung chuyển khoản: <strong className="text-amber-400">ORDER_{orderId?.slice(0, 8)}</strong></p>
                            <p>3. Sau khi thanh toán, hệ thống tự động kích hoạt trong vài phút</p>
                        </div>
                    </div>

                    {/* Bank Info */}
                    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-6">
                        <h2 className="text-xl font-bold text-white mb-4">Thông Tin Chuyển Khoản</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Ngân hàng</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value="Vietcombank"
                                        readOnly
                                        className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                    />
                                    <button
                                        onClick={() => copyToClipboard('Vietcombank')}
                                        className="px-4 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Số tài khoản</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value="1234567890"
                                        readOnly
                                        className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                                    />
                                    <button
                                        onClick={() => copyToClipboard('1234567890')}
                                        className="px-4 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Chủ tài khoản</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value="CONG TY CHATBOT VN"
                                        readOnly
                                        className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white"
                                    />
                                    <button
                                        onClick={() => copyToClipboard('CONG TY CHATBOT VN')}
                                        className="px-4 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Nội dung chuyển khoản</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={`ORDER_${orderId?.slice(0, 8)}`}
                                        readOnly
                                        className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-amber-400 font-mono font-bold"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(`ORDER_${orderId?.slice(0, 8)}`)}
                                        className="px-4 py-2.5 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition"
                                    >
                                        📋
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/dashboard"
                            className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all text-center"
                        >
                            Xem Đơn Hàng
                        </Link>
                        <Link
                            href="/"
                            className="flex-1 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all text-center border border-slate-700"
                        >
                            Về Trang Chủ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-white">Đang tải...</div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    );
}
