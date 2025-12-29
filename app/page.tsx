import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <h1 className="text-xl font-bold text-white">TrợLýAI.VN</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-300 hover:text-amber-400 transition font-medium">
                TRANG CHỦ
              </Link>
              <Link href="#products" className="text-slate-300 hover:text-amber-400 transition font-medium">
                SẢN PHẨM
              </Link>
              <Link href="#features" className="text-slate-300 hover:text-amber-400 transition font-medium">
                TÍNH NĂNG
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 text-slate-300 hover:text-white transition"
              >
                Đăng Nhập
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all"
              >
                MUA NGAY
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold border border-red-500/30">
                🔥 GIẢM ĐẾN 50% - ƯU ĐÃI TẾT 2025
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Trợ Lý AI Thông Minh
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Chỉ Từ 29K/Tháng
              </span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Tự động hóa kinh doanh, tăng doanh số, hoạt động 24/7.
              Cài đặt trong 5 phút, dùng thử miễn phí 3 ngày.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all text-lg"
              >
                DÙNG THỬ MIỄN PHÍ 3 NGÀY
              </Link>
              <Link
                href="#products"
                className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all text-lg border border-slate-700"
              >
                XEM SẢN PHẨM
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Tại Sao Chọn Trợ Lý AI?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Cài Đặt 5 Phút', desc: 'Dễ dàng tích hợp vào website hoặc fanpage' },
              { icon: '🤖', title: 'Hoạt Động 24/7', desc: 'Tự động trả lời khách hàng mọi lúc mọi nơi' },
              { icon: '🔒', title: 'Bảo Mật Cao', desc: 'Dữ liệu được mã hóa và bảo vệ tuyệt đối' },
              { icon: '📈', title: 'Tăng Doanh Số', desc: 'Chuyển đổi khách hàng tiềm năng thành đơn hàng' },
              { icon: '🌐', title: 'Đa Nền Tảng', desc: 'Hoạt động trên web, Facebook, Zalo, Telegram' },
              { icon: '💬', title: 'Hỗ Trợ Tận Tâm', desc: 'Đội ngũ hỗ trợ 24/7 qua Zalo, Telegram' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-amber-500/50 transition-all group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Sản Phẩm Nổi Bật
          </h3>
          <p className="text-slate-400 text-center mb-16 text-lg">
            Chọn gói phù hợp với nhu cầu của bạn
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'AI Basic', price: '29,000', oldPrice: '58,000', hot: false },
              { name: 'AI Pro', price: '49,000', oldPrice: '98,000', hot: true },
              { name: 'AI Premium', price: '99,000', oldPrice: '198,000', hot: false },
            ].map((product, idx) => (
              <div
                key={idx}
                className="relative bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-amber-500/50 transition-all group"
              >
                {product.hot && (
                  <div className="absolute -top-3 -right-3 px-4 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    HOT 🔥
                  </div>
                )}
                <h4 className="text-2xl font-bold text-white mb-4">{product.name}</h4>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-amber-400">{product.price}đ</span>
                    <span className="text-lg text-slate-500 line-through">{product.oldPrice}đ</span>
                  </div>
                  <p className="text-slate-400 text-sm mt-1">/tháng</p>
                </div>
                <Link
                  href="/register"
                  className="block w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all text-center"
                >
                  MUA NGAY
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-y border-amber-500/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sẵn Sàng Tự Động Hóa Kinh Doanh?
          </h3>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Hàng nghìn doanh nghiệp đã tin tưởng và sử dụng
          </p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all text-lg"
          >
            BẮT ĐẦU NGAY - MIỄN PHÍ 3 NGÀY
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="text-white font-bold mb-4">SẢN PHẨM</h5>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-amber-400 transition">AI Basic</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">AI Pro</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">AI Premium</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">HỖ TRỢ</h5>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="#" className="hover:text-amber-400 transition">Hướng dẫn</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">FAQ</Link></li>
                <li><Link href="#" className="hover:text-amber-400 transition">Liên hệ</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">LIÊN HỆ</h5>
              <ul className="space-y-2 text-slate-400">
                <li>📞 0363 189 699</li>
                <li>📧 support@trolyai.vn</li>
                <li>🏢 Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-slate-500 pt-8 border-t border-slate-800">
            © 2025 TrợLýAI.VN. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
