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

            // Auto create account
            const { supabase } = await import('@/lib/supabase/client');
            await supabase.auth.signUp({
                email: formData.email,
                password: formData.phone,
            });

            // Create order
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
                        <Link href="/" className="text-slate-400 hover:text-white transition text-sm flex items-center gap-2">
                            <span>←</span>
                            <span>Quay lại</span>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Title */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-white mb-2">Đặt Hàng</h1>
                        <p className="text-slate-400">Điền thông tin để hoàn tất đơn hàng</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Product Selection */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 h-fit">
                            <h2 className="text-lg font-bold text-white mb-4">Chọn Sản Phẩm</h2>

                            {products.length === 0 ? (
                                <p className="text-slate-400 text-center py-8">Đang tải sản phẩm...</p>
                            ) : (
                                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                    {products.map((product) => (
                                        <button
                                            key={product.id}
                                            onClick={() => setSelectedProduct(product)}
                                            className={`w-full text-left p-4 rounded-xl border transition-all ${selectedProduct?.id === product.id
                                                    ? 'bg-amber-400/10 border-amber-400 ring-2 ring-amber-400/30'
                                                    : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                                                    🤖
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-white text-sm">{product.name}</h3>
                                                    <p className="text-amber-400 font-bold">
                                                        {product.price.toLocaleString('vi-VN')} đ
                                                    </p>
                                                </div>
                                                {selectedProduct?.id === product.id && (
                                                    <span className="text-amber-400 text-xl">✓</span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Order Form */}
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                            <h2 className="text-lg font-bold text-white mb-4">Thông Tin Khách Hàng</h2>

                            <div className="mb-5 p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl">
                                <p className="text-amber-400 text-sm">
                                    💡 <strong>Lưu ý:</strong> Tài khoản sẽ được tạo qua Email này.
                                    Mật khẩu mặc định là <strong>Số điện thoại</strong> của bạn.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-slate-300 font-medium mb-2 text-sm">
                                        Họ và tên <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        required
                                        className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-medium mb-2 text-sm">
                                        Số điện thoại <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                        placeholder="0363189699"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-medium mb-2 text-sm">
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-medium mb-2 text-sm">
                                        Ghi chú
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
                                        placeholder="Yêu cầu đặc biệt..."
                                    />
                                </div>

                                {selectedProduct && (
                                    <div className="pt-4 border-t border-slate-700">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-slate-400">Tổng tiền:</span>
                                            <span className="text-2xl font-bold text-amber-400">
                                                {selectedProduct.price.toLocaleString('vi-VN')} đ
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || !selectedProduct}
                                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <CheckoutForm />
        </Suspense>
    );
}
