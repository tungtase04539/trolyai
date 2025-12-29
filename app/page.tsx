'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
}

const categories = [
  { id: 'all', name: 'Tất cả', emoji: '🤖', color: 'bg-yellow-400 text-slate-900' },
  { id: 'education', name: 'Giáo dục', emoji: '📚', color: 'bg-purple-600 text-white' },
  { id: 'business', name: 'Kinh doanh', emoji: '💼', color: 'bg-blue-600 text-white' },
  { id: 'health', name: 'Y tế - Sức khỏe', emoji: '🏥', color: 'bg-teal-600 text-white' },
  { id: 'travel', name: 'Du lịch - Nhà hàng', emoji: '✈️', color: 'bg-orange-600 text-white' },
  { id: 'ecommerce', name: 'Bất động sản', emoji: '🏠', color: 'bg-green-600 text-white' },
  { id: 'consulting', name: 'Tài chính - Bảo hiểm', emoji: '💰', color: 'bg-indigo-600 text-white' },
  { id: 'support', name: 'Tôn giáo - Tâm linh', emoji: '🙏', color: 'bg-pink-600 text-white' },
  { id: 'other', name: 'Khác', emoji: '📦', color: 'bg-gray-600 text-white' },
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900 shadow-md">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
                <span className="text-slate-900 font-bold">🤖</span>
              </div>
              <span className="text-lg font-bold text-white">ChatBotVN</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <Link href="/" className="text-yellow-400 hover:text-yellow-300 transition">TRANG CHỦ</Link>
              <Link href="#products" className="text-white hover:text-yellow-400 transition">SẢN PHẨM</Link>
              <Link href="#features" className="text-white hover:text-yellow-400 transition">TIN TỨC</Link>
            </div>

            <div className="flex items-center space-x-4">
              <a href="tel:0363189699" className="hidden md:flex items-center gap-2 text-white hover:text-yellow-400 transition">
                <span>📞</span>
                <span className="font-semibold">0363 189 699</span>
              </a>
              <Link
                href="/checkout"
                className="px-6 py-2 bg-yellow-400 text-slate-900 font-bold rounded hover:bg-yellow-500 transition"
              >
                MUA NGAY
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-bold">
                🔥 GIẢM ĐẾN 50% TẤT CẢ CHATBOT
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              CHỌN <span className="text-yellow-500">LĨNH VỰC</span> CỦA BẠN
            </h1>
            <p className="text-lg text-slate-600 mb-2">
              Chọn lĩnh vực phù hợp để tìm ChatBot AI tốt ưu cho ngành nghề của bạn. Chỉ từ <span className="text-yellow-600 font-bold">29K/tháng!</span>
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
              <span>• Cài đặt 5 phút</span>
              <span>• Hoạt động 24/7</span>
              <span>• Tăng doanh số ngay</span>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${selectedCategory === cat.id
                    ? cat.color + ' shadow-lg scale-105'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300'
                  }`}
              >
                <span>{cat.emoji}</span>
                <span className="text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Tất cả ChatBot
            </h2>
            <span className="text-slate-600 font-medium">
              {products.length} SẢN PHẨM
            </span>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-lg">
              <p className="text-slate-500 text-lg">Chưa có sản phẩm nào</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-800 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Product Image/Icon */}
                  <div className="bg-slate-700 h-40 flex items-center justify-center">
                    <span className="text-6xl">🤖</span>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold rounded">
                        Kinh doanh
                      </span>
                    </div>

                    <h3 className="text-white font-bold mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-2xl font-bold text-yellow-400">
                        {product.price.toLocaleString('vi-VN')} đ
                      </span>
                    </div>

                    <Link
                      href={`/checkout?product=${product.id}`}
                      className="block w-full py-2.5 bg-yellow-400 text-slate-900 font-bold rounded text-center hover:bg-yellow-500 transition"
                    >
                      XEM VIDEO DEMO
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            TẠI SAO CHỌN CHATBOT VN?
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '⚡', title: 'Cài đặt 5 phút', desc: 'Dễ dàng tích hợp vào website, fanpage trong 5 phút' },
              { icon: '🤖', title: 'Hoạt động 24/7', desc: 'Tự động trả lời khách hàng mọi lúc, không nghỉ ngơi' },
              { icon: '🔒', title: 'Bảo mật cao', desc: 'Dữ liệu được mã hóa và bảo vệ tuyệt đối' },
              { icon: '📈', title: 'Tăng doanh số', desc: 'Chuyển đổi khách hàng tiềm năng thành đơn hàng' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Sẵn sàng tự động hóa kinh doanh?
          </h2>
          <p className="text-slate-800 text-lg mb-8">
            Hàng nghìn doanh nghiệp đã tin tưởng sử dụng
          </p>
          <Link
            href="/checkout"
            className="inline-block px-10 py-4 bg-slate-900 text-white text-lg font-bold rounded-lg hover:bg-slate-800 transition shadow-lg"
          >
            ĐĂNG KÝ NGAY - MIỄN PHÍ 3 NGÀY
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              CHÚNG TÔI SẴN SÀNG HỖ TRỢ BẠN
            </h2>
            <p className="text-slate-600 mb-8">
              Liên hệ ngay để được tư vấn miễn phí
            </p>
            <div className="bg-slate-50 rounded-lg p-8">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <textarea
                  placeholder="Tin nhắn"
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 text-slate-900 font-bold rounded hover:bg-yellow-500 transition"
                >
                  GỬI TIN NHẮN
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">SẢN PHẨM</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-yellow-400">ChatBot Bán hàng</Link></li>
                <li><Link href="#" className="hover:text-yellow-400">ChatBot Hỗ trợ</Link></li>
                <li><Link href="#" className="hover:text-yellow-400">ChatBot Marketing</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">HỖ TRỢ</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-yellow-400">Hướng dẫn</Link></li>
                <li><Link href="#" className="hover:text-yellow-400">FAQ</Link></li>
                <li><Link href="#" className="hover:text-yellow-400">Liên hệ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">LIÊN HỆ</h5>
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

      {/* Floating Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-50">
        <button className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition flex items-center justify-center">
          <span className="text-2xl">🎁</span>
        </button>
        <button className="w-14 h-14 bg-orange-500 text-white rounded-full shadow-lg hover:scale-110 transition flex items-center justify-center">
          <span className="text-2xl">🎉</span>
        </button>
        <button className="w-14 h-14 bg-yellow-400 text-slate-900 rounded-full shadow-lg hover:scale-110 transition flex items-center justify-center">
          <span className="text-2xl">🚀</span>
        </button>
      </div>
    </div>
  );
}
