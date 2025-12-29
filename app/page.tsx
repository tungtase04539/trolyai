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
  { id: 'all', name: 'Tất cả', emoji: '🤖' },
  { id: 'education', name: 'Giáo dục', emoji: '📚' },
  { id: 'business', name: 'Kinh doanh', emoji: '💼' },
  { id: 'health', name: 'Y tế - Sức khỏe', emoji: '🏥' },
  { id: 'travel', name: 'Du lịch - Nhà hàng', emoji: '✈️' },
  { id: 'realestate', name: 'Bất động sản', emoji: '🏠' },
  { id: 'finance', name: 'Tài chính - Bảo hiểm', emoji: '💰' },
  { id: 'spiritual', name: 'Tôn giáo - Tâm linh', emoji: '🙏' },
  { id: 'other', name: 'Khác', emoji: '📦' },
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
    <div className="min-h-screen bg-[#0f172a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1e293b]/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 text-xl">🤖</span>
              </div>
              <span className="text-xl font-bold text-white">ChatBotVN</span>
            </Link>

            {/* Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-amber-400 font-medium hover:text-amber-300 transition">
                TRANG CHỦ
              </Link>
              <Link href="#products" className="text-slate-300 font-medium hover:text-amber-400 transition">
                SẢN PHẨM
              </Link>
              <Link href="#" className="text-slate-300 font-medium hover:text-amber-400 transition">
                TIN TỨC
              </Link>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <a href="tel:0363189699" className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white transition">
                <span className="text-lg">📞</span>
                <span className="font-semibold">0363 189 699</span>
              </a>
              <Link
                href="/checkout"
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-slate-900 font-bold rounded-lg hover:bg-amber-300 transition-all hover:shadow-lg hover:shadow-amber-400/25"
              >
                <span>🛒</span>
                <span>MUA NGAY</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full text-amber-400 text-sm font-medium">
              <span>✨</span>
              <span>#1 CHATBOT AI TẠI VIỆT NAM</span>
            </span>
          </div>

          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-white">CHỌN </span>
              <span className="text-amber-400">LĨNH VỰC</span>
              <span className="text-white"> CỦA BẠN</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Chọn lĩnh vực phù hợp để tìm ChatBot AI tối ưu cho ngành nghề của bạn.
              <br />
              Chỉ từ <span className="text-amber-400 font-bold">29K/tháng!</span>
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/30'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-amber-400/50 hover:text-amber-400'
                  }`}
              >
                <span className="text-lg">{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Tất cả ChatBot</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                {products.length} sản phẩm
              </span>
              <Link href="#" className="text-amber-400 text-sm font-medium hover:text-amber-300 transition flex items-center gap-1">
                Xem tất cả <span>→</span>
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-slate-800/50 rounded-2xl p-12 text-center border border-slate-700">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-slate-400">Chưa có sản phẩm nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-400/5"
                >
                  {/* Product Image */}
                  <div className="relative h-44 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    {idx < 2 && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                        HOT 🔥
                      </span>
                    )}
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🤖</span>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-amber-400/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-400/30">
                        Kinh doanh
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-amber-400">
                        {product.price.toLocaleString('vi-VN')} đ
                      </span>
                      <span className="text-sm text-slate-500 line-through">
                        {(product.price * 2).toLocaleString('vi-VN')} đ
                      </span>
                    </div>

                    <Link
                      href={`/checkout?product=${product.id}`}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-400/30 transition-all"
                    >
                      <span>▶</span>
                      <span>XEM VIDEO DEMO</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-transparent via-slate-800/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">TẠI SAO CHỌN CHATBOT VN?</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Cài đặt 5 phút', desc: 'Dễ dàng tích hợp vào website, fanpage trong 5 phút' },
              { icon: '🤖', title: 'Hoạt động 24/7', desc: 'Tự động trả lời khách hàng mọi lúc, không nghỉ ngơi' },
              { icon: '🔒', title: 'Bảo mật cao', desc: 'Dữ liệu được mã hóa và bảo vệ tuyệt đối' },
              { icon: '📈', title: 'Tăng doanh số', desc: 'Chuyển đổi khách hàng tiềm năng thành đơn hàng' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-amber-400/30 transition-all text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-8 md:p-12">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  🎁 NHẬN QUÀ MIỄN PHÍ
                </h3>
                <p className="text-white/90">
                  Dùng thử 3 ngày miễn phí, không cần thẻ tín dụng
                </p>
              </div>
              <Link
                href="/checkout"
                className="flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:shadow-xl transition-all whitespace-nowrap"
              >
                <span>🚀</span>
                <span>ĐĂNG KÝ NGAY</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">KHÁCH HÀNG NÓI GÌ?</h2>
            <div className="w-20 h-1 bg-amber-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Nguyễn Văn A', company: 'CEO, Tech Corp', text: 'ChatBot giúp tôi tiết kiệm 50% thời gian tư vấn khách hàng. Rất đáng đầu tư!' },
              { name: 'Trần Thị B', company: 'Shop Online', text: 'Doanh số tăng 30% sau 1 tháng sử dụng. Khách hàng rất hài lòng với tốc độ phản hồi.' },
              { name: 'Lê Văn C', company: 'Startup Founder', text: 'Cài đặt nhanh, hoạt động ổn định. Team support rất nhiệt tình.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm italic">"{testimonial.text}"</p>
                <div className="mt-4 text-amber-400">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">CHÚNG TÔI SẴN SÀNG HỖ TRỢ BẠN</h2>
            <p className="text-slate-400">Để lại thông tin, chúng tôi sẽ liên hệ tư vấn miễn phí</p>
          </div>

          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
              <textarea
                placeholder="Tin nhắn của bạn"
                rows={4}
                className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-400/30 transition-all"
              >
                GỬI TIN NHẮN
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
                  <span className="text-slate-900 text-xl">🤖</span>
                </div>
                <span className="text-xl font-bold text-white">ChatBotVN</span>
              </div>
              <p className="text-slate-400 text-sm">
                Giải pháp ChatBot AI hàng đầu Việt Nam. Tự động hóa kinh doanh, tăng doanh số.
              </p>
            </div>

            {/* Products */}
            <div>
              <h5 className="font-bold text-white mb-4">SẢN PHẨM</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-amber-400 transition">ChatBot Bán hàng</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">ChatBot Hỗ trợ</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">ChatBot Marketing</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h5 className="font-bold text-white mb-4">HỖ TRỢ</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-amber-400 transition">Hướng dẫn sử dụng</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">Câu hỏi thường gặp</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">Chính sách</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-bold text-white mb-4">LIÊN HỆ</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>0363 189 699</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>📧</span>
                  <span>support@chatbotvn.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>🏢</span>
                  <span>Hà Nội, Việt Nam</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            © 2025 ChatBotVN. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-50">
        <Link
          href="/checkout"
          className="group relative flex items-center gap-3 pl-4 pr-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full shadow-lg hover:shadow-green-500/40 transition-all"
        >
          <span className="text-xl">🎁</span>
          <span className="text-sm whitespace-nowrap">TẶNG QUÀ MIỄN PHÍ</span>
        </Link>
        <Link
          href="/checkout"
          className="group relative flex items-center gap-3 pl-4 pr-5 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-red-500/40 transition-all"
        >
          <span className="text-xl">🎉</span>
          <span className="text-sm whitespace-nowrap">KHUYẾN MẠI TẾT</span>
        </Link>
        <Link
          href="/checkout"
          className="group relative flex items-center gap-3 pl-4 pr-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/40 transition-all"
        >
          <span className="text-xl">🚀</span>
          <span className="text-sm whitespace-nowrap">DÙNG THỬ NGAY</span>
        </Link>
      </div>
    </div>
  );
}
