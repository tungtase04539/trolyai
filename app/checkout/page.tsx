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
        <div className="min-h-screen bg-[#0a0f1a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]"></div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0f1629]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                <span className="text-[#0a0f1a] text-xl">🤖</span>
                            </div>
                            <span className="text-xl font-bold text-white">ChatBotVN</span>
                        </Link>
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span>Quay lại</span>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="relative py-12 lg:py-16">
                <div className="max-w-5xl mx-auto px-6 lg:px-8">
                    {/* Title */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Đặt Hàng</h1>
                        <p className="text-slate-400">Điền thông tin để hoàn tất đơn hàng</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Product Selection */}
                        <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 h-fit">
                            <h2 className="text-xl font-bold text-white mb-6">Chọn Sản Phẩm</h2>

                            {products.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-slate-400">Đang tải sản phẩm...</p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                                    {products.map((product) => (
                                        <button
                                            key={product.id}
                                            onClick={() => setSelectedProduct(product)}
                                            className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${selectedProduct?.id === product.id
                                                    ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                                                    : 'bg-slate-900/30 border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/30'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center text-3xl">
                                                    🤖
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-white mb-1">{product.name}</h3>
                                                    <p className="text-amber-400 font-bold text-lg">
                                                        {product.price.toLocaleString('vi-VN')} đ
                                                    </p>
                                                </div>
                                                {selectedProduct?.id === product.id && (
                                                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-[#0a0f1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                        {/* Order Form */}
                        <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30">
                            <h2 className="text-xl font-bold text-white mb-6">Thông Tin Khách Hàng</h2>

                            <div className="mb-6 p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                <p className="text-amber-400 text-sm flex items-start gap-2">
                                    <span className="text-lg">💡</span>
                                    <span>
                                        <strong>Lưu ý:</strong> Tài khoản sẽ được tạo qua Email này.
                                        Mật khẩu mặc định là <strong>Số điện thoại</strong> của bạn.
                                    </span>
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-2xl text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-slate-300 font-medium mb-3 text-sm">
                                        Họ và tên <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        required
                                        className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-medium mb-3 text-sm">
                                        Số điện thoại <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                        placeholder="0363189699"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-medium mb-3 text-sm">
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-medium mb-3 text-sm">
                                        Ghi chú
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={3}
                                        className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none"
                                        placeholder="Yêu cầu đặc biệt..."
                                    />
                                </div>

                                {selectedProduct && (
                                    <div className="pt-6 border-t border-slate-700/30">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-slate-400">Tổng tiền:</span>
                                            <span className="text-3xl font-bold text-amber-400">
                                                {selectedProduct.price.toLocaleString('vi-VN')} đ
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading || !selectedProduct}
                                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a0f1a] font-bold text-lg rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                <div className="w-14 h-14 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
            </div>
        }>
            <CheckoutForm />
        </Suspense>
    );
}
