import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Trợ Lý AI</h1>
          <div className="space-x-4">
            <Link
              href="/login"
              className="px-6 py-2 text-white hover:bg-white/10 rounded-lg transition"
            >
              Đăng Nhập
            </Link>
            <Link
              href="/register"
              className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-white/90 transition"
            >
              Đăng Ký
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-float">
            Trợ Lý AI Thông Minh
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12">
            Nâng cao năng suất làm việc với trợ lý AI được tùy chỉnh riêng cho bạn
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-3">
                AI Thông Minh
              </h3>
              <p className="text-white/80">
                Được đào tạo với dữ liệu chuyên biệt cho nhu cầu của bạn
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Kích Hoạt Ngay
              </h3>
              <p className="text-white/80">
                Nhận mã kích hoạt ngay sau khi thanh toán thành công
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-3">
                An Toàn & Bảo Mật
              </h3>
              <p className="text-white/80">
                Thanh toán an toàn qua SePay, dữ liệu được mã hóa
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Link
              href="/register"
              className="inline-block px-12 py-4 bg-white text-purple-600 text-lg font-bold rounded-full hover:bg-white/90 transition shadow-2xl hover:shadow-white/50"
            >
              Bắt Đầu Ngay →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20">
        <p className="text-center text-white/60">
          © 2025 Trợ Lý AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
