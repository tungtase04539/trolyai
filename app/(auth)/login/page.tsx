'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            const { data: userData } = await supabase
                .from('users')
                .select('role')
                .eq('id', data.user.id)
                .single();

            if (userData?.role === 'ADMIN') {
                router.push('/admin');
            } else {
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>

            <div className="w-full max-w-md relative">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center">
                            <span className="text-slate-900 text-2xl">🤖</span>
                        </div>
                        <span className="text-2xl font-bold text-white">ChatBotVN</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Đăng Nhập
                    </h1>
                    <p className="text-slate-400">
                        Truy cập tài khoản của bạn
                    </p>
                </div>

                {/* Form */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-xl">
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-slate-300 font-medium mb-2 text-sm">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                placeholder="email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-slate-300 font-medium mb-2 text-sm">
                                Mật khẩu
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl hover:shadow-lg hover:shadow-amber-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Chưa có tài khoản?{' '}
                            <Link href="/register" className="text-amber-400 font-semibold hover:text-amber-300 transition">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-slate-400 hover:text-white transition text-sm flex items-center justify-center gap-2">
                        <span>←</span>
                        <span>Quay lại trang chủ</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
