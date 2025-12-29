import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import {
    verifySepaySignature,
    extractOrderIdFromContent,
    isPaymentSuccessful,
    type SepayWebhookPayload,
} from '@/lib/sepay';
import { assignCodeToOrder } from '@/lib/activation-codes';

export async function POST(request: NextRequest) {
    try {
        // Get raw body for signature verification
        const body = await request.text();
        const signature = request.headers.get('x-sepay-signature') || '';
        const secretKey = process.env.SEPAY_SECRET_KEY!;

        // Verify webhook signature
        if (!verifySepaySignature(body, signature, secretKey)) {
            console.error('Invalid webhook signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        // Parse payload
        const payload: SepayWebhookPayload = JSON.parse(body);
        const { transaction_id, amount, content, status } = payload;

        // Extract order ID from payment content
        const orderId = extractOrderIdFromContent(content);
        if (!orderId) {
            console.error('Could not extract order ID from content:', content);
            return NextResponse.json({ error: 'Invalid content format' }, { status: 400 });
        }

        const supabase = await createAdminClient();

        // Check if this transaction has already been processed (idempotency)
        const { data: existingLog } = await supabase
            .from('payment_logs')
            .select('id')
            .eq('sepay_data->>transaction_id', transaction_id)
            .single();

        if (existingLog) {
            console.log('Transaction already processed:', transaction_id);
            return NextResponse.json({ success: true, message: 'Already processed' });
        }

        // Get order details
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*, products (*)')
            .eq('id', orderId)
            .single();

        if (orderError || !order) {
            console.error('Order not found:', orderId);
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Verify payment amount matches order amount
        if (Math.abs(amount - parseFloat(order.amount)) > 0.01) {
            console.error('Amount mismatch:', { expected: order.amount, received: amount });

            // Log the failed payment
            await supabase.from('payment_logs').insert({
                order_id: orderId,
                sepay_data: payload,
                status: 'AMOUNT_MISMATCH',
            });

            return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 });
        }

        // Check if payment is successful
        if (isPaymentSuccessful(status)) {
            // Assign activation code to order
            const codeAssignment = await assignCodeToOrder(orderId, order.product_id);

            if (!codeAssignment) {
                console.error('Failed to assign activation code');

                // Log the error
                await supabase.from('payment_logs').insert({
                    order_id: orderId,
                    sepay_data: payload,
                    status: 'CODE_ASSIGNMENT_FAILED',
                });

                // Update order status to FAILED
                await supabase
                    .from('orders')
                    .update({ status: 'FAILED' })
                    .eq('id', orderId);

                return NextResponse.json(
                    { error: 'Failed to assign activation code' },
                    { status: 500 }
                );
            }

            // Update order status to PAID
            const { error: updateError } = await supabase
                .from('orders')
                .update({
                    status: 'PAID',
                    sepay_transaction_id: transaction_id,
                })
                .eq('id', orderId);

            if (updateError) {
                console.error('Failed to update order:', updateError);
                return NextResponse.json({ error: updateError.message }, { status: 500 });
            }

            // Log successful payment
            await supabase.from('payment_logs').insert({
                order_id: orderId,
                sepay_data: payload,
                status: 'SUCCESS',
            });

            console.log('Payment processed successfully:', {
                orderId,
                transactionId: transaction_id,
                code: codeAssignment.activationCode,
            });

            return NextResponse.json({ success: true });
        } else {
            // Payment failed
            await supabase
                .from('orders')
                .update({ status: 'FAILED' })
                .eq('id', orderId);

            // Log failed payment
            await supabase.from('payment_logs').insert({
                order_id: orderId,
                sepay_data: payload,
                status: 'PAYMENT_FAILED',
            });

            return NextResponse.json({ success: true, message: 'Payment failed' });
        }
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
