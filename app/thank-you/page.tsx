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
        <div className="min-h-screen bg-[#0a0f1a]">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[150px]"></div>
            </div>

            {/* Header */}
            <header className="bg-[#0f1629]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <span className="text-[#0a0f1a] text-base">🤖</span>
                            </div>
                            <span className="text-lg font-bold text-white">ChatBotVN</span>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="relative py-12">
                <div className="max-w-md mx-auto px-4 sm:px-6">
                    {/* Success Card - WHITE */}
                    <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/20 text-center mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Đặt Hàng Thành Công!
                        </h1>
                        <p className="text-gray-500">
                            Vui lòng thanh toán để kích hoạt sản phẩm
                        </p>
                    </div>

                    {/* Order Info - WHITE */}
                    <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/10 mb-6">
                        <h2 className="text-base font-bold text-gray-900 mb-4">Thông Tin Đơn Hàng</h2>
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                            <span className="text-gray-500 text-sm">Mã đơn hàng</span>
                            <span className="text-gray-900 font-mono font-bold text-sm">{orderId?.slice(0, 8)}...</span>
                        </div>
                    </div>

                    {/* Payment Instructions - AMBER */}
                    <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 mb-6">
                        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="text-xl">💳</span>
                            Hướng Dẫn Thanh Toán
                        </h2>
                        <div className="space-y-3 text-gray-700 text-sm">
                            <p className="flex items-start gap-3">
                                <span className="w-6 h-6 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                                <span>Chuyển khoản theo thông tin bên dưới</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="w-6 h-6 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                                <span>Nhập <strong className="text-amber-700">đúng nội dung</strong> chuyển khoản</span>
                            </p>
                            <p className="flex items-start gap-3">
                                <span className="w-6 h-6 bg-amber-400 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                                <span>Hệ thống tự động kích hoạt trong vài phút</span>
                            </p>
                        </div>
                    </div>

                    {/* Bank Info - WHITE */}
                    <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/10 mb-8">
                        <h2 className="text-base font-bold text-gray-900 mb-5">Thông Tin Chuyển Khoản</h2>
                        <div className="space-y-4">
                            {bankInfo.map((item, idx) => (
                                <div key={idx}>
                                    <label className="block text-gray-500 text-xs mb-1.5">{item.label}</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={item.value}
                                            readOnly
                                            className={`flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm ${item.highlight ? 'text-amber-600 font-bold font-mono' : 'text-gray-900'
                                                }`}
                                        />
                                        <button
                                            onClick={() => copyToClipboard(item.value, item.label)}
                                            className={`px-4 py-3 rounded-xl font-medium transition-all text-sm ${copiedField === item.label
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/dashboard"
                            className="py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold text-center rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all duration-300"
                        >
                            Xem Đơn Hàng
                        </Link>
                        <Link
                            href="/"
                            className="py-4 bg-white text-gray-700 font-bold text-center rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all"
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
                <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
            </div>
        }>
            <ThankYouContent />
        </Suspense>
    );
}
