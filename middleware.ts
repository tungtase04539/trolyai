import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function middleware(request: NextRequest) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;

    // Public routes
    const publicRoutes = ['/', '/login', '/register'];
    const isPublicRoute = publicRoutes.includes(path) || path.startsWith('/api/webhooks');

    // If not logged in and trying to access protected route
    if (!user && !isPublicRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If logged in, get user role
    if (user) {
        const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();

        const userRole = userData?.role;

        // Admin routes protection
        if (path.startsWith('/admin') || path.startsWith('/api/admin')) {
            if (userRole !== 'ADMIN') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        // Guest routes protection
        if (path.startsWith('/dashboard')) {
            if (userRole === 'ADMIN') {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        }

        // Redirect logged-in users from auth pages
        if (path === '/login' || path === '/register') {
            if (userRole === 'ADMIN') {
                return NextResponse.redirect(new URL('/admin', request.url));
            } else {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
