'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order');
    const [copiedField, setCopiedField] = useState('');

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(''), 2000);
    };

    const bankInfo = [
        { label: 'Ngân hàng', value: 'Vietcombank' },
        { label: 'Số tài khoản', value: '1234567890' },
        { label: 'Chủ tài khoản', value: 'CONG TY CHATBOT VN' },
        { label: 'Nội dung CK', value: `ORDER_${orderId?.slice(0, 8)}`, highlight: true },
    ];

    return (
        <div className="min-h-screen bg-[#0a0f1a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Header */}
            <header className="bg-[#0f1629]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <span className="text-[#0a0f1a] text-xl">🤖</span>
                            </div>
                            <span className="text-xl font-bold text-white">ChatBotVN</span>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="relative py-16">
                <div className="max-w-xl mx-auto px-6 lg:px-8">
                    {/* Success Icon */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mb-6 border-2 border-green-500/50 shadow-lg shadow-green-500/20">
                            <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                            Đặt Hàng Thành Công!
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Vui lòng thanh toán để kích hoạt sản phẩm
                        </p>
                    </div>

                    {/* Order Info */}
                    <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4">Thông Tin Đơn Hàng</h2>
                        <div className="flex justify-between items-center p-4 bg-slate-900/50 rounded-2xl">
                            <span className="text-slate-400">Mã đơn hàng</span>
                            <span className="text-white font-mono font-bold">{orderId?.slice(0, 8)}...</span>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-3xl p-6 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                            <span className="text-2xl">💳</span>
                            Hướng Dẫn Thanh Toán
                        </h2>
                        <div className="space-y-3 text-slate-300">
                            <p className="flex items-start gap-3">
                                <span className="w-6 h-6 bg-amber-500 text-[#0a0f1a] rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
                                <span>Chuyển khoản theo thông tin bên dưới</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="w-6 h-6 bg-amber-500 text-[#0a0f1a] rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
                                <span>Nhập <strong className="text-amber-400">đúng nội dung</strong> chuyển khoản</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="w-6 h-6 bg-amber-500 text-[#0a0f1a] rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
                                <span>Hệ thống tự động kích hoạt trong vài phút</span>
                            </p>
                        </div>
                    </div>

                    {/* Bank Info */}
                    <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/30 mb-8">
                        <h2 className="text-lg font-bold text-white mb-6">Thông Tin Chuyển Khoản</h2>
                        <div className="space-y-4">
                            {bankInfo.map((item, idx) => (
                                <div key={idx}>
                                    <label className="block text-slate-400 text-sm mb-2">{item.label}</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={item.value}
                                            readOnly
                                            className={`flex-1 px-4 py-3.5 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-sm ${item.highlight ? 'text-amber-400 font-bold font-mono' : 'text-white'
                                                }`}
                                        />
                                        <button
                                            onClick={() => copyToClipboard(item.value, item.label)}
                                            className={`px-4 py-3.5 rounded-2xl font-medium transition-all text-sm ${copiedField === item.label
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-slate-700/50 text-white hover:bg-slate-600/50'
                                                }`}
                                        >
                                            {copiedField === item.label ? '✓' : '📋'}
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
                            className="flex-1 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a0f1a] font-bold text-center rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.01] transition-all duration-300"
                        >
                            Xem Đơn Hàng
                        </Link>
                        <Link
                            href="/"
                            className="flex-1 py-4 bg-slate-800/50 text-white font-bold text-center rounded-2xl border border-slate-700/50 hover:bg-slate-700/50 transition-all"
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
            <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
                <div className="w-14 h-14 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    );
}
