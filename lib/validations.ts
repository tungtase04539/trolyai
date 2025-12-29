import { z } from 'zod';

// Product validation schemas
export const createProductSchema = z.object({
    name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
    description: z.string().min(1, 'Mô tả là bắt buộc'),
    price: z.number().min(0, 'Giá phải lớn hơn hoặc bằng 0'),
    chatbot_link: z.string().url('Link trợ lý ảo phải là URL hợp lệ'),
    code_mode: z.enum(['SINGLE', 'MULTIPLE']),
    single_code: z.string().optional().nullable(),
    image_url: z.string().url().optional().nullable(),
    is_active: z.boolean().default(true),
});

export const updateProductSchema = createProductSchema.partial();

// Activation code validation
export const addActivationCodesSchema = z.object({
    codes: z.array(z.string().min(1)).min(1, 'Phải có ít nhất 1 mã kích hoạt'),
});

// Order validation
export const createOrderSchema = z.object({
    product_id: z.string().uuid(),
});

export const updateOrderSchema = z.object({
    status: z.enum(['PENDING', 'PAID', 'FAILED', 'REFUNDED']),
});

// User validation
export const updateUserSchema = z.object({
    role: z.enum(['ADMIN', 'GUEST']),
});

// Auth validation
export const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const registerSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
});
