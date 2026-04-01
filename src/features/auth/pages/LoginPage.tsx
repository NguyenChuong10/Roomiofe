import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import { loginSchema, type LoginFormValues } from'@/features/auth/schemas/loginSchemas'
import { loginThunk, clearAuthError } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isLoading, error, isAuthenticated } = useAppSelector((s) => s.auth)
    const [showPass, setShowPass] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    })

    // Nếu đã auth rồi → vào dashboard
    useEffect(() => {
        if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
    }, [isAuthenticated, navigate])

    // Clear error khi unmount
    useEffect(() => () => { dispatch(clearAuthError()) }, [dispatch])

    const onSubmit = (values: LoginFormValues) => {
        dispatch(loginThunk(values))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#080e1a] overflow-hidden relative">

            {/* ── Nền: dot grid ── */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(120,80,220,0.13) 1px, transparent 1px)',
                    backgroundSize: '36px 36px',
                }}
            />

            {/* ── Glow tím – trái ── */}
            <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-purple-700/20 blur-[120px]" />
            {/* ── Glow tím – phải ── */}
            <div className="pointer-events-none absolute -right-32 bottom-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/15 blur-[100px]" />
            {/* ── Glow xanh brand – top center ── */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand/8 blur-[80px]" />

            {/* ── Card ── */}
            <div
                className="relative z-10 w-full max-w-[420px] mx-4 rounded-2xl border border-white/[0.07] shadow-2xl overflow-hidden"
                style={{
                    background: 'linear-gradient(145deg, rgba(17,28,45,0.95) 0%, rgba(10,16,30,0.98) 100%)',
                    backdropFilter: 'blur(24px)',
                }}
            >
                {/* Card top glow line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                <div className="px-8 py-10">

                    {/* ── Logo / Title ── */}
                    <div className="flex flex-col items-center mb-8">
                        {/* Icon box */}
                        <div className="relative mb-4">
                            <div className="absolute inset-0 rounded-xl bg-purple-600/30 blur-xl" />
                            <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/40 to-brand/30 border border-purple-500/30">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="url(#grad1)" strokeWidth="1.5" strokeLinejoin="round"/>
                                    <path d="M9 21V12h6v9" stroke="url(#grad2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <defs>
                                        <linearGradient id="grad1" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#a855f7"/>
                                            <stop offset="1" stopColor="#1e6abf"/>
                                        </linearGradient>
                                        <linearGradient id="grad2" x1="9" y1="12" x2="15" y2="21" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#a855f7"/>
                                            <stop offset="1" stopColor="#1e6abf"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>

                        <h1 className="text-[22px] font-bold text-white tracking-tight">
                            Roomio
                        </h1>
                        <p className="text-[13px] text-[#6a8fa8] mt-1">
                            Đăng nhập vào trang quản trị
                        </p>
                    </div>

                    {/* ── Form ── */}
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-[#8aa8c0]">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6a84] pointer-events-none" />
                                <input
                                    type="email"
                                    autoComplete="email"
                                    placeholder="admin@roomio.dev"
                                    {...register('email')}
                                    className={`
                                        w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white placeholder-[#3a5570]
                                        bg-[#0d1929] border transition-all duration-150 outline-none
                                        focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50
                                        ${errors.email
                                            ? 'border-red-500/60 bg-red-900/10'
                                            : 'border-[#1a2d42] hover:border-[#2a4060]'
                                        }
                                    `}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[12px] text-red-400 flex items-center gap-1 mt-1">
                                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[13px] font-medium text-[#8aa8c0]">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6a84] pointer-events-none" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    {...register('password')}
                                    className={`
                                        w-full h-11 pl-10 pr-11 rounded-xl text-sm text-white placeholder-[#3a5570]
                                        bg-[#0d1929] border transition-all duration-150 outline-none
                                        focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50
                                        ${errors.password
                                            ? 'border-red-500/60 bg-red-900/10'
                                            : 'border-[#1a2d42] hover:border-[#2a4060]'
                                        }
                                    `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass((v) => !v)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a6a84] hover:text-[#8aa8c0] transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-[12px] text-red-400 flex items-center gap-1 mt-1">
                                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* API error */}
                        {error && (
                            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="
                                relative w-full h-11 mt-2 rounded-xl text-sm font-semibold text-white
                                transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                                overflow-hidden group
                            "
                            style={{
                                background: 'linear-gradient(135deg, #7c3aed 0%, #1e6abf 100%)',
                                boxShadow: '0 0 24px rgba(124,58,237,0.35)',
                            }}
                        >
                            {/* Hover shimmer */}
                            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />

                            <span className="relative flex items-center justify-center gap-2">
                                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </span>
                        </button>
                    </form>

                    {/* ── Footer ── */}
                    <p className="mt-8 text-center text-[12px] text-[#3a5570]">
                        © {new Date().getFullYear()} Roomio. Hệ thống quản lý phòng .
                    </p>
                </div>

                {/* Card bottom glow line */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
            </div>
        </div>
    )
}
