import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createOrderSchema } from '@/lib/validations';
import { generatePaymentContent } from '@/lib/sepay';
import { hasAvailableCodes } from '@/lib/activation-codes';

export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get current user's orders
        const { data: orders, error } = await supabase
            .from('orders')
            .select(`
        *,
        products (name, image_url)
      `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ orders });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const validation = createOrderSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.format() },
                { status: 400 }
            );
        }

        const { product_id } = validation.data;

        // Get product details
        const { data: product, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', product_id)
            .eq('is_active', true)
            .single();

        if (productError || !product) {
            return NextResponse.json(
                { error: 'Sản phẩm không tồn tại hoặc không khả dụng' },
                { status: 404 }
            );
        }

        // Check if product has available codes
        const codesAvailable = await hasAvailableCodes(product_id);
        if (!codesAvailable) {
            return NextResponse.json(
                { error: 'Sản phẩm hiện đã hết mã kích hoạt' },
                { status: 400 }
            );
        }

        // Create order with pending status
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: user.id,
                product_id: product_id,
                amount: product.price,
                status: 'PENDING',
                chatbot_link: product.chatbot_link,
                activation_code: 'PENDING', // Will be assigned after payment
            })
            .select()
            .single();

        if (orderError || !order) {
            return NextResponse.json({ error: orderError?.message }, { status: 500 });
        }

        // Generate payment content
        const paymentContent = generatePaymentContent(order.id);

        return NextResponse.json({
            order,
            payment: {
                amount: product.price,
                content: paymentContent,
                // In production, you would include SePay payment link/QR code here
            },
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
