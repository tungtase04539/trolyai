# Hệ Thống Bán Trợ Lý AI

Hệ thống thương mại điện tử bán sản phẩm trợ lý AI với thanh toán tự động qua SePay.

## Tính Năng

### Admin
- Quản lý sản phẩm (thêm, sửa, xóa)
- Quản lý kho mã kích hoạt (đơn mã hoặc nhiều mã)
- Quản lý đơn hàng
- Quản lý người dùng

### Guest/Khách Hàng
- Xem danh sách sản phẩm
- Mua sản phẩm
- Xem lịch sử đơn hàng
- Nhận link trợ lý ảo và mã kích hoạt sau khi thanh toán

## Công Nghệ

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payment**: SePay
- **Deployment**: Vercel

## Cài Đặt

### 1. Clone và cài đặt dependencies

```bash
cd trolyai
npm install
```

### 2. Thiết lập Supabase

1. Tạo project mới tại [supabase.com](https://supabase.com)
2. Chạy migration SQL từ file `supabase/migrations/001_initial_schema.sql` trong Supabase SQL Editor
3. Lấy API credentials từ Settings > API

### 3. Thiết lập SePay

1. Đăng ký tài khoản SePay
2. Lấy API Key và Secret Key
3. Cấu hình webhook URL: `https://your-domain.vercel.app/api/webhooks/sepay`

### 4. Cấu hình Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

SEPAY_API_KEY=your_sepay_api_key
SEPAY_SECRET_KEY=your_sepay_secret_key

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Chạy Development Server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Tạo Admin User

Sau khi đăng ký tài khoản đầu tiên, cập nhật role trong Supabase:

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Deploy lên Vercel

1. Push code lên GitHub
2. Import project vào Vercel
3. Cấu hình Environment Variables
4. Deploy
5. Cập nhật webhook URL trong SePay dashboard

## Cấu Trúc Database

- **users**: Thông tin người dùng và vai trò
- **products**: Sản phẩm trợ lý AI
- **activation_codes**: Kho mã kích hoạt
- **orders**: Đơn hàng
- **payment_logs**: Lịch sử thanh toán

## Quy Trình Mua Hàng

1. Khách hàng chọn sản phẩm và tạo đơn hàng
2. Hệ thống tạo order với status PENDING
3. Khách hàng thanh toán qua SePay
4. SePay gửi webhook khi thanh toán thành công
5. Hệ thống tự động:
   - Cập nhật order status thành PAID
   - Gán mã kích hoạt (từ kho hoặc mã chung)
   - Lưu link trợ lý ảo và mã kích hoạt vào order
6. Khách hàng xem thông tin trong dashboard

## License

MIT
