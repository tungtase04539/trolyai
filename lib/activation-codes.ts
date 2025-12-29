import { createAdminClient } from '@/lib/supabase/server';

/**
 * Assign activation code to an order
 * Handles both SINGLE and MULTIPLE code modes
 */
export async function assignCodeToOrder(
    orderId: string,
    productId: string
): Promise<{ chatbotLink: string; activationCode: string } | null> {
    const supabase = await createAdminClient();

    // Get product details
    const { data: product, error: productError } = await supabase
        .from('products')
        .select('chatbot_link, code_mode, single_code')
        .eq('id', productId)
        .single();

    if (productError || !product) {
        console.error('Product not found:', productError);
        return null;
    }

    const chatbotLink = product.chatbot_link;
    let activationCode: string;

    if (product.code_mode === 'SINGLE') {
        // Use the single code for all customers
        activationCode = product.single_code || '';
    } else {
        // MULTIPLE mode: Get an unused code from inventory
        // Use a transaction to prevent race conditions
        const { data: availableCode, error: codeError } = await supabase
            .from('activation_codes')
            .select('id, code')
            .eq('product_id', productId)
            .eq('is_used', false)
            .limit(1)
            .single();

        if (codeError || !availableCode) {
            console.error('No available activation codes:', codeError);
            return null;
        }

        // Mark code as used
        const { error: updateError } = await supabase
            .from('activation_codes')
            .update({
                is_used: true,
                used_by_order_id: orderId,
            })
            .eq('id', availableCode.id);

        if (updateError) {
            console.error('Failed to mark code as used:', updateError);
            return null;
        }

        activationCode = availableCode.code;
    }

    // Update order with chatbot link and activation code
    const { error: orderUpdateError } = await supabase
        .from('orders')
        .update({
            chatbot_link: chatbotLink,
            activation_code: activationCode,
        })
        .eq('id', orderId);

    if (orderUpdateError) {
        console.error('Failed to update order:', orderUpdateError);
        return null;
    }

    return { chatbotLink, activationCode };
}

/**
 * Check if product has available codes (for MULTIPLE mode)
 */
export async function hasAvailableCodes(productId: string): Promise<boolean> {
    const supabase = await createAdminClient();

    const { data: product } = await supabase
        .from('products')
        .select('code_mode')
        .eq('id', productId)
        .single();

    if (!product) return false;

    // SINGLE mode always has codes available
    if (product.code_mode === 'SINGLE') return true;

    // MULTIPLE mode: check inventory
    const { count } = await supabase
        .from('activation_codes')
        .select('*', { count: 'exact', head: true })
        .eq('product_id', productId)
        .eq('is_used', false);

    return (count || 0) > 0;
}
