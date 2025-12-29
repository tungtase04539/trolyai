'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CheckoutForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('product');

    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        notes: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        if (productId && products.length > 0) {
            const product = products.find((p: any) => p.id === productId);
            setSelectedProduct(product);
        }
    }, [productId, products]);

    const loadProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!formData.fullName || !formData.phone || !formData.email) {
                setError('Vui lòng điền đầy đủ thông tin');
                setLoading(false);
                return;
            }

            if (!selectedProduct) {
                setError('Vui lòng chọn sản phẩm');
                setLoading(false);
                return;
            }

            const { supabase } = await import('@/lib/supabase/client');
            await supabase.auth.signUp({
                email: formData.email,
                password: formData.phone,
            });

            const orderResponse = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: selectedProduct.id,
                    customer_info: formData,
                }),
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok) {
                throw new Error(orderData.error || 'Tạo đơn hàng thất bại');
            }

            router.push(`/thank-you?order=${orderData.order.id}`);
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1a]">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/8 rounded-full blur-[150px]"></div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0f1629]/90 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <span className="text-[#0a0f1a] text-base">🤖</span>
                            </div>
                            <span className="text-lg font-bold text-white">ChatBotVN</span>
                        </Link>
                        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Quay lại</span>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="relative py-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Đặt Hàng</h1>
                        <p className="text-gray-400">Điền thông tin để hoàn tất đơn hàng</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                        {/* Product Selection - WHITE CARD */}
                        <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/10 order-2 lg:order-1">
                            <h2 className="text-lg font-bold text-gray-900 mb-5">Chọn Sản Phẩm</h2>

                            {products.length === 0 ? (
                                <div className="text-center py-10">
                                    <div className="w-10 h-10 border-3 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-3"></div>
                                    <p className="text-gray-500 text-sm">Đang tải sản phẩm...</p>
                                </div>
                            ) : (
                                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                                    {products.map((product) => (
                                        <button
                                            key={product.id}
                                            onClick={() => setSelectedProduct(product)}
                                            className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${selectedProduct?.id === product.id
                                                    ? 'border-amber-400 bg-amber-50'
                                                    : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-2xl shrink-0">
                                                    🤖
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-bold text-gray-900 text-sm truncate">{product.name}</h3>
                                                    <p className="text-amber-600 font-bold">
                                                        {product.price.toLocaleString('vi-VN')} đ
                                                    </p>
                                                </div>
                                                {selectedProduct?.id === product.id && (
                                                    <div className="w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center shrink-0">
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Order Form - WHITE CARD */}
                        <div className="bg-white rounded-3xl p-6 shadow-2xl shadow-black/10 order-1 lg:order-2">
                            <h2 className="text-lg font-bold text-gray-900 mb-5">Thông Tin Khách Hàng</h2>

                            <div className="mb-5 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                                <p className="text-amber-700 text-sm flex items-start gap-2">
                                    <span className="text-base">💡</span>
                                    <span>
                                        Tài khoản sẽ được tạo qua Email. Mật khẩu mặc định là <strong>Số điện thoại</strong>.
                                    </span>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                                        Họ và tên <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        required
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                                        Số điện thoại <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                        placeholder="0363189699"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2 text-sm">
                                        Ghi chú
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Yêu cầu đặc biệt..."
                                    />
                                </div>

                                {selectedProduct && (
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-gray-600">Tổng tiền:</span>
                                            <span className="text-2xl font-bold text-amber-600">
                                                {selectedProduct.price.toLocaleString('vi-VN')} đ
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || !selectedProduct}
                                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold text-base rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {loading ? 'Đang xử lý...' : 'ĐẶT HÀNG NGAY'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
            </div>
        }>
            <CheckoutForm />
        </Suspense>
    );
}
