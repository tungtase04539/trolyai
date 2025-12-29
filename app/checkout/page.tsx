'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CheckoutForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('product');

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        notes: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (productId) {
            loadProduct();
        }
    }, [productId]);

    const loadProduct = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            const foundProduct = data.products?.find((p: any) => p.id === productId);
            setProduct(foundProduct);
        } catch (error) {
            console.error('Error loading product:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate
            if (!formData.fullName || !formData.phone || !formData.email) {
                setError('Vui lòng điền đầy đủ thông tin');
                setLoading(false);
                return;
            }

            // Auto create account with phone as password
            const { data: signUpData, error: signUpError } = await (await import('@/lib/supabase/client')).supabase.auth.signUp({
                email: formData.email,
                password: formData.phone, // Phone as default password
            });

            if (signUpError && !signUpError.message.includes('already registered')) {
                throw signUpError;
            }

            // Create order
            const orderResponse = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: productId,
                    customer_info: formData,
                }),
            });

            const orderData = await orderResponse.json();

            if (!orderResponse.ok) {
                throw new Error(orderData.error || 'Tạo đơn hàng thất bại');
            }

            // Redirect to payment/thank you page
            router.push(`/thank-you?order=${orderData.order.id}`);
        } catch (err: any) {
            setError(err.message || 'Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    if (!productId || !product) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">Vui lòng chọn sản phẩm</p>
                    <Link href="/" className="text-amber-400 hover:text-amber-300">
                        ← Quay lại trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 py-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-4">
                            ← Quay lại trang chủ
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Đặt Hàng
                        </h1>
                        <p className="text-slate-400">
                            Điền thông tin để hoàn tất đơn hàng
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Product Info */}
                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 h-fit">
                            <h2 className="text-xl font-bold text-white mb-4">Thông Tin Sản Phẩm</h2>
                            <div className="space-y-4">
                                <div className="text-5xl text-center">🤖</div>
                                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                                <p className="text-slate-400 text-sm">{product.description}</p>
                                <div className="pt-4 border-t border-slate-800">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Giá:</span>
                                        <span className="text-3xl font-bold text-amber-400">
                                            {product.price.toLocaleString('vi-VN')}đ
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm text-right">/tháng</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Form */}
                        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                            <h2 className="text-xl font-bold text-white mb-4">Thông Tin Khách Hàng</h2>

                            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
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
                                    <label className="block text-slate-300 font-medium mb-2">
                                        Họ và tên <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                        placeholder="Nguyễn Văn A"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-medium mb-2">
                                        Số điện thoại <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                        placeholder="0363189699"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-medium mb-2">
                                        Email <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-slate-300 font-medium mb-2">
                                        Ghi chú (tùy chọn)
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                                        placeholder="Yêu cầu đặc biệt..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                                >
                                    {loading ? 'Đang xử lý...' : 'ĐẶT HÀNG NGAY'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-white">Đang tải...</div>
            </div>
        }>
            <CheckoutForm />
        </Suspense>
    );
}
