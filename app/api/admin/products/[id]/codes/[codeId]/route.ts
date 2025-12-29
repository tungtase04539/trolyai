import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; codeId: string }> }
) {
    try {
        const { codeId } = await params;
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is admin
        const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();

        if (userData?.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Check if code is already used
        const { data: code } = await supabase
            .from('activation_codes')
            .select('is_used')
            .eq('id', codeId)
            .single();

        if (code?.is_used) {
            return NextResponse.json(
                { error: 'Không thể xóa mã đã được sử dụng' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('activation_codes')
            .delete()
            .eq('id', codeId);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
