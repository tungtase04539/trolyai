'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category?: string;
}

const categories = [
  { id: 'all', name: 'Tất cả', emoji: '🤖' },
  { id: 'education', name: 'Giáo dục', emoji: '🎓' },
  { id: 'business', name: 'Kinh doanh', emoji: '💼' },
  { id: 'ecommerce', name: 'Bán hàng', emoji: '🛒' },
  { id: 'support', name: 'Hỗ trợ', emoji: '💬' },
  { id: 'marketing', name: 'Marketing', emoji: '📢' },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-xl font-bold text-white hidden md:block">ChatBotVN</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide">
              <Link href="/" className="text-slate-300 hover:text-amber-400 transition">TRANG CHỦ</Link>
              <Link href="#products" className="text-slate-300 hover:text-amber-400 transition">SẢN PHẨM</Link>
              <Link href="#features" className="text-slate-300 hover:text-amber-400 transition">TÍNH NĂNG</Link>
            </div>

            <div className="flex items-center space-x-4">
              <a href="tel:0363189699" className="hidden md:block text-amber-400 font-bold hover:text-amber-300 transition">
                📞 0363 189 699
              </a>
              <Link
                href="#order"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all"
              >
                MUA NGAY
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-amber-500/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-bold border border-red-500/30 animate-pulse">
                🔥 GIẢM ĐẾN 50% TẤT CẢ CHATBOT
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              CHỌN LĨNH VỰC CỦA BẠN
            </h1>
            <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 font-bold mb-4">
              Chỉ từ 29K/tháng!
            </p>
            <p className="text-lg text-slate-400">
              Cài đặt 5 phút • Hoạt động 24/7 • Tăng doanh số ngay
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-12 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg shadow-amber-500/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
              >
                <span className="text-xl">{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {selectedCategory === 'all' ? 'Tất cả ChatBot' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <span className="px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm font-semibold border border-slate-700">
              {products.length} SẢN PHẨM
            </span>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400 text-lg">Chưa có sản phẩm nào</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className="group relative bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all"
                >
                  {idx < 3 && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      HOT 🔥
                    </div>
                  )}

                  <div className="text-5xl mb-4 text-center">🤖</div>

                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-amber-400">
                        {product.price.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm">/tháng</p>
                  </div>

                  <Link
                    href={`#order?product=${product.id}`}
                    className="block w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all text-center"
                  >
                    XEM VIDEO DEMO
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            TẠI SAO CHỌN CHATBOT VN?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Cài đặt 5 phút', desc: 'Dễ dàng tích hợp vào website, fanpage trong 5 phút' },
              { icon: '🤖', title: 'Hoạt động 24/7', desc: 'Tự động trả lời khách hàng mọi lúc, không nghỉ ngơi' },
              { icon: '🔒', title: 'Bảo mật cao', desc: 'Dữ liệu được mã hóa và bảo vệ tuyệt đối' },
              { icon: '📈', title: 'Tăng doanh số', desc: 'Chuyển đổi khách hàng tiềm năng thành đơn hàng' },
              { icon: '🌐', title: 'Đa nền tảng', desc: 'Hoạt động trên web, Facebook, Zalo, Telegram' },
              { icon: '💬', title: 'Hỗ trợ tận tâm', desc: 'Đội ngũ hỗ trợ 24/7 qua Zalo, Telegram' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 hover:border-amber-500/50 transition-all group text-center"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 border-y border-amber-500/20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block mb-6">
            <span className="px-6 py-3 bg-green-500/20 text-green-400 rounded-full text-lg font-bold border border-green-500/30">
              🎁 NHẬN QUÀ MIỄN PHÍ
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            DÙNG THỬ 3 NGÀY
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Trải nghiệm miễn phí 3 ngày, không cần thẻ tín dụng
          </p>
          <Link
            href="#order"
            className="inline-block px-12 py-5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 text-xl font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all"
          >
            ĐĂNG KÝ NGAY - MIỄN PHÍ
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            KHÁCH HÀNG NÓI GÌ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full"></div>
                  <div>
                    <h4 className="text-white font-bold">Khách hàng {i}</h4>
                    <p className="text-slate-400 text-sm">Doanh nghiệp</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">
                  "ChatBot giúp tôi tiết kiệm rất nhiều thời gian và tăng doanh số đáng kể. Rất đáng đầu tư!"
                </p>
                <div className="mt-4 text-amber-400">⭐⭐⭐⭐⭐</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              CHÚNG TÔI SẴN SÀNG HỖ TRỢ BẠN
            </h2>
            <p className="text-slate-400 mb-8">
              Liên hệ ngay để được tư vấn miễn phí
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0363189699"
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all"
              >
                📞 GỌI NGAY: 0363 189 699
              </a>
              <Link
                href="#order"
                className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
              >
                💬 GỬI TIN NHẮN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="text-white font-bold mb-4 text-sm tracking-wide">SẢN PHẨM</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-amber-400 transition">ChatBot Bán hàng</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">ChatBot Hỗ trợ</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">ChatBot Marketing</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4 text-sm tracking-wide">HỖ TRỢ</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-amber-400 transition">Hướng dẫn sử dụng</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">Câu hỏi thường gặp</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">Liên hệ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4 text-sm tracking-wide">LIÊN HỆ</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>📞 0363 189 699</li>
                <li>📧 support@chatbotvn.com</li>
                <li>🏢 Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-slate-500 pt-8 border-t border-slate-800 text-sm">
            © 2025 ChatBotVN. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Sidebar Buttons */}
      <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-40">
        <Link
          href="#order"
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-full shadow-lg hover:shadow-green-500/50 transition-all flex items-center gap-2"
        >
          <span>🎁</span>
          <span className="hidden md:inline">Tặng quà miễn phí</span>
        </Link>
        <Link
          href="#order"
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-red-500/50 transition-all flex items-center gap-2"
        >
          <span>🎉</span>
          <span className="hidden md:inline">Khuyến mại Tết</span>
        </Link>
        <Link
          href="#order"
          className="px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-full shadow-lg hover:shadow-amber-500/50 transition-all flex items-center gap-2"
        >
          <span>🚀</span>
          <span className="hidden md:inline">Dùng thử ngay</span>
        </Link>
      </div>

      {/* Order Form Modal - Simple Guest Checkout */}
      <div id="order" className="hidden">
        {/* This will be implemented as a separate checkout page */}
      </div>
    </div>
  );
}
