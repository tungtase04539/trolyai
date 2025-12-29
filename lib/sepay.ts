import crypto from 'crypto';

export interface SepayWebhookPayload {
    transaction_id: string;
    amount: number;
    content: string;
    status: string;
    timestamp: string;
    [key: string]: any;
}

/**
 * Verify SePay webhook signature
 */
export function verifySepaySignature(
    payload: string,
    signature: string,
    secretKey: string
): boolean {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(payload);
    const calculatedSignature = hmac.digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(calculatedSignature)
    );
}

/**
 * Extract order ID from payment content
 * Expected format: "ORDER_<order_id>" or similar
 */
export function extractOrderIdFromContent(content: string): string | null {
    const match = content.match(/ORDER[_-]([a-f0-9-]+)/i);
    return match ? match[1] : null;
}

/**
 * Generate payment content for SePay
 */
export function generatePaymentContent(orderId: string): string {
    return `ORDER_${orderId}`;
}

/**
 * Check if payment status is successful
 */
export function isPaymentSuccessful(status: string): boolean {
    return status.toLowerCase() === 'success' || status.toLowerCase() === 'paid';
}
