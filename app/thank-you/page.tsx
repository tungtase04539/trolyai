'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order');
    const [copied, setCopied] = useState('');

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0f172a]">
            {/* Header */}
            <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex justify-between items-center h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                                <span className="text-slate-900 text-xl">🤖</span>
                            </div>
                            <span className="text-xl font-bold text-white">ChatBotVN</span>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="py-12">
                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Icon */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4 border-2 border-green-500/50">
                            <span className="text-4xl">✓</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Đặt Hàng Thành Công!
                        </h1>
                        <p className="text-slate-400">
                            Cảm ơn bạn đã đặt hàng. Vui lòng thanh toán để kích hoạt sản phẩm.
                        </p>
                    </div>

                    {/* Order Info */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4">Thông Tin Đơn Hàng</h2>
                        <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl">
                            <span className="text-slate-400">Mã đơn hàng</span>
                            <span className="text-white font-mono text-sm">{orderId?.slice(0, 8)}...</span>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span>💳</span> Hướng Dẫn Thanh Toán
                        </h2>
                        <div className="space-y-3 text-slate-300 text-sm">
                            <p>1. Chuyển khoản theo thông tin bên dưới</p>
                            <p>2. Nhập <strong className="text-amber-400">đúng nội dung</strong> chuyển khoản</p>
                            <p>3. Sau khi thanh toán, hệ thống tự động kích hoạt trong vài phút</p>
                        </div>
                    </div>

                    {/* Bank Info */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4">Thông Tin Chuyển Khoản</h2>
                        <div className="space-y-4">
                            {[
                                { label: 'Ngân hàng', value: 'Vietcombank' },
                                { label: 'Số tài khoản', value: '1234567890' },
                                { label: 'Chủ tài khoản', value: 'CONG TY CHATBOT VN' },
                                { label: 'Nội dung CK', value: `ORDER_${orderId?.slice(0, 8)}`, highlight: true },
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <label className="block text-slate-400 text-sm mb-2">{item.label}</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={item.value}
                                            readOnly
                                            className={`flex-1 px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-sm ${item.highlight ? 'text-amber-400 font-bold font-mono' : 'text-white'
                                                }`}
                                        />
                                        <button
                                            onClick={() => copyToClipboard(item.value, item.label)}
                                            className={`px-4 py-3 rounded-xl font-medium transition text-sm ${copied === item.label
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-slate-700 text-white hover:bg-slate-600'
                                                }`}
                                        >
                                            {copied === item.label ? '✓' : '📋'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/dashboard"
                            className="flex-1 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-400/30 transition-all text-center"
                        >
                            Xem Đơn Hàng
                        </Link>
                        <Link
                            href="/"
                            className="flex-1 py-3.5 bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-600 transition-all text-center"
                        >
                            Về Trang Chủ
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    );
}
