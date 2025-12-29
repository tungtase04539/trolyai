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
    <div className="min-h-screen bg-[#0a0f1a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1629]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
                <span className="text-[#0a0f1a] text-xl font-bold">🤖</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">ChatBotVN</span>
            </Link>

            {/* Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              <Link href="/" className="text-amber-400 font-semibold text-sm tracking-wide hover:text-amber-300 transition-colors">
                TRANG CHỦ
              </Link>
              <Link href="#products" className="text-slate-400 font-semibold text-sm tracking-wide hover:text-white transition-colors">
                SẢN PHẨM
              </Link>
              <Link href="#" className="text-slate-400 font-semibold text-sm tracking-wide hover:text-white transition-colors">
                TIN TỨC
              </Link>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-5">
              <a href="tel:0363189699" className="hidden md:flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <span className="text-lg">📞</span>
                <span className="font-semibold">0363 189 699</span>
              </a>
              <Link
                href="/checkout"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a0f1a] font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all duration-300"
              >
                <span>🛒</span>
                <span>MUA NGAY</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <span className="text-amber-400">✨</span>
              <span className="text-amber-400 text-sm font-semibold tracking-wide">#1 CHATBOT AI TẠI VIỆT NAM</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="text-white">CHỌN </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">LĨNH VỰC</span>
              <span className="text-white"> CỦA BẠN</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Chọn lĩnh vực phù hợp để tìm ChatBot AI tối ưu cho ngành nghề của bạn.
              <br className="hidden sm:block" />
              Chỉ từ <span className="text-amber-400 font-bold">29K/tháng!</span>
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`group flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a0f1a] shadow-lg shadow-amber-500/30 scale-105'
                    : 'bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-amber-500/30 hover:bg-slate-800 hover:text-white'
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
      <section id="products" className="relative py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">Tất cả ChatBot</h2>
            <div className="flex items-center gap-6">
              <span className="text-slate-500 text-sm font-medium">
                {products.length} sản phẩm
              </span>
              <Link href="#" className="text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors flex items-center gap-1">
                Xem tất cả
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-14 h-14 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-16 text-center border border-slate-700/30">
              <div className="text-6xl mb-6">📦</div>
              <p className="text-slate-400 text-lg">Chưa có sản phẩm nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/30 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1"
                >
                  {/* Hot Badge */}
                  {idx < 2 && (
                    <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                      HOT 🔥
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative h-48 bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center overflow-hidden">
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-500">🤖</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1.5 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-lg border border-amber-500/20">
                        Kinh doanh
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors duration-300">
                      {product.name}
                    </h3>

                    <p className="text-sm text-slate-400 mb-5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-baseline gap-3 mb-5">
                      <span className="text-2xl font-bold text-amber-400">
                        {product.price.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-sm text-slate-500 line-through">
                        {(product.price * 2).toLocaleString('vi-VN')}đ
                      </span>
                    </div>

                    <Link
                      href={`/checkout?product=${product.id}`}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a0f1a] font-bold rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all duration-300"
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
      <section className="relative py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">TẠI SAO CHỌN CHATBOT VN?</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Cài đặt 5 phút', desc: 'Dễ dàng tích hợp vào website, fanpage trong 5 phút' },
              { icon: '🤖', title: 'Hoạt động 24/7', desc: 'Tự động trả lời khách hàng mọi lúc, không nghỉ ngơi' },
              { icon: '🔒', title: 'Bảo mật cao', desc: 'Dữ liệu được mã hóa và bảo vệ tuyệt đối' },
              { icon: '📈', title: 'Tăng doanh số', desc: 'Chuyển đổi khách hàng tiềm năng thành đơn hàng' },
            ].map((feature, idx) => (
              <div key={idx} className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30 hover:border-amber-500/20 transition-all duration-500 text-center hover:bg-slate-800/50">
                <div className="text-5xl lg:text-6xl mb-5 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-10 lg:p-14">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                  🎁 NHẬN QUÀ MIỄN PHÍ
                </h3>
                <p className="text-white/90 text-lg">
                  Dùng thử 3 ngày miễn phí, không cần thẻ tín dụng
                </p>
              </div>
              <Link
                href="/checkout"
                className="flex items-center gap-3 px-10 py-5 bg-white text-[#0a0f1a] font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/30 hover:scale-[1.02] transition-all duration-300 whitespace-nowrap"
              >
                <span>🚀</span>
                <span>ĐĂNG KÝ NGAY</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">KHÁCH HÀNG NÓI GÌ?</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Nguyễn Văn A', company: 'CEO, Tech Corp', text: 'ChatBot giúp tôi tiết kiệm 50% thời gian tư vấn khách hàng. Rất đáng đầu tư!' },
              { name: 'Trần Thị B', company: 'Shop Online', text: 'Doanh số tăng 30% sau 1 tháng sử dụng. Khách hàng rất hài lòng với tốc độ phản hồi.' },
              { name: 'Lê Văn C', company: 'Startup Founder', text: 'Cài đặt nhanh, hoạt động ổn định. Team support rất nhiệt tình.' },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30 hover:border-amber-500/20 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-amber-500/20">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed mb-4">"{testimonial.text}"</p>
                <div className="text-amber-400 text-lg tracking-wider">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-20 bg-slate-900/50">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">LIÊN HỆ TƯ VẤN</h2>
            <p className="text-slate-400">Để lại thông tin, chúng tôi sẽ liên hệ trong 5 phút</p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-slate-700/30">
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Họ và tên"
                className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              />
              <textarea
                placeholder="Tin nhắn của bạn"
                rows={4}
                className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a0f1a] font-bold text-lg rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.01] transition-all duration-300"
              >
                GỬI TIN NHẮN
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 bg-[#060a12] border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <span className="text-[#0a0f1a] text-xl">🤖</span>
                </div>
                <span className="text-xl font-bold text-white">ChatBotVN</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Giải pháp ChatBot AI hàng đầu Việt Nam. Tự động hóa kinh doanh, tăng doanh số.
              </p>
            </div>

            {/* Links */}
            <div>
              <h5 className="font-bold text-white mb-5 text-sm tracking-wide">SẢN PHẨM</h5>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-amber-400 transition-colors">ChatBot Bán hàng</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">ChatBot Hỗ trợ</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">ChatBot Marketing</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-5 text-sm tracking-wide">HỖ TRỢ</h5>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Hướng dẫn sử dụng</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Câu hỏi thường gặp</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition-colors">Chính sách</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-5 text-sm tracking-wide">LIÊN HỆ</h5>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-3">
                  <span>📞</span>
                  <span>0363 189 699</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>📧</span>
                  <span>support@chatbotvn.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <span>🏢</span>
                  <span>Hà Nội, Việt Nam</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-800/50 text-center text-sm text-slate-500">
            © 2025 ChatBotVN. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
        <Link
          href="/checkout"
          className="group flex items-center gap-3 pl-4 pr-5 py-3.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
        >
          <span className="text-xl">🎁</span>
          <span className="text-sm whitespace-nowrap">TẶNG QUÀ MIỄN PHÍ</span>
        </Link>
        <Link
          href="/checkout"
          className="group flex items-center gap-3 pl-4 pr-5 py-3.5 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold rounded-full shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
        >
          <span className="text-xl">🎉</span>
          <span className="text-sm whitespace-nowrap">KHUYẾN MẠI TẾT</span>
        </Link>
        <Link
          href="/checkout"
          className="group flex items-center gap-3 pl-4 pr-5 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
        >
          <span className="text-xl">🚀</span>
          <span className="text-sm whitespace-nowrap">DÙNG THỬ NGAY</span>
        </Link>
      </div>
    </div>
  );
}
