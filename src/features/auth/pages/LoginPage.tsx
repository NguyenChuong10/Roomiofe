import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock, Loader2, LogIn, LayoutDashboard } from 'lucide-react'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/loginSchemas'
import { loginThunk, clearAuthError } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { UserRole } from '@/shared/types'
import { cn } from '@/shared/utils/index'

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

    // Đã auth → vào dashboard
    useEffect(() => {
        if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
    }, [isAuthenticated, navigate])

    // Clear error khi unmount
    useEffect(() => () => { dispatch(clearAuthError()) }, [dispatch])

    const onSubmit = (values: LoginFormValues) => {
        dispatch(loginThunk({ ...values, rule: UserRole.ADMIN }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-[860px] flex rounded-2xl overflow-hidden border border-white/10 shadow-card">

                {/* ══════════════ PANEL TRÁI — dark navy ══════════════ */}
                <div
                    className="hidden md:flex flex-col justify-center gap-20 w-[42%] shrink-0 p-10"
                    style={{ background: '#111c2d' }}
                >
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div
                            className="flex items-center justify-center w-9 h-9 rounded-lg"
                            style={{ background: '#1e6abf' }}
                        >
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-medium text-[15px] leading-none">Roomio</p>
                            <p className="text-[11px] mt-0.5" style={{ color: '#6a8fa8' }}>Quản lý phòng</p>
                        </div>
                    </div>

                    {/* Mid text */}
                    <div>
                        <h2 className="text-white text-[22px] font-medium leading-snug mb-3">
                            Chào mừng trở lại,<br />Admin Dashboard
                        </h2>
                        <p className="text-[13px] leading-relaxed" style={{ color: '#6a8fa8' }}>
                            Quản lý toàn bộ hệ thống nhà — phòng, người thuê và thanh toán tập trung tại một nơi.
                        </p>
                    </div>

                    {/* Stats */}
                    
                </div>

                
                <div className="flex-1 bg-white flex flex-col justify-center px-8 md:px-10 py-10">

                    {/* Tiêu đề */}
                    <h1 className="text-[20px] font-medium text-gray-900 mb-1">Đăng nhập</h1>
                    <p className="text-[13px] text-gray-500 mb-7">Nhập thông tin tài khoản để tiếp tục</p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

                        {/* ── Email ── */}
                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-medium text-gray-600">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <input
                                    type="email"
                                    autoComplete="email"
                                    placeholder="admin@roomio.dev"
                                    {...register('email')}
                                    className={cn(
                                        'w-full h-10 pl-9 pr-4 rounded-lg text-[13px] text-gray-900',
                                        'bg-gray-50 border outline-none transition-all',
                                        'placeholder:text-gray-300',
                                        'focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white',
                                        errors.email
                                            ? 'border-red-400 bg-red-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    )}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[12px] text-red-500 flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block shrink-0" />
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* ── Password ── */}
                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-medium text-gray-600">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    {...register('password')}
                                    className={cn(
                                        'w-full h-10 pl-9 pr-10 rounded-lg text-[13px] text-gray-900',
                                        'bg-gray-50 border outline-none transition-all',
                                        'placeholder:text-gray-300',
                                        'focus:ring-2 focus:ring-brand/20 focus:border-brand focus:bg-white',
                                        errors.password
                                            ? 'border-red-400 bg-red-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    )}
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() => setShowPass(v => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPass
                                        ? <EyeOff className="w-4 h-4" />
                                        : <Eye className="w-4 h-4" />
                                    }
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-[12px] text-red-500 flex items-center gap-1.5">
                                    <span className="w-1 h-1 rounded-full bg-red-400 inline-block shrink-0" />
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* ── Ghi nhớ + Quên mật khẩu ── */}
                        <div className="flex items-center justify-between pt-0.5">
                            <label className="flex items-center gap-2 text-[13px] text-gray-500 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    className="w-3.5 h-3.5 accent-brand rounded"
                                />
                                Ghi nhớ đăng nhập
                            </label>
                            <button
                                type="button"
                                className="text-[13px] text-brand hover:underline"
                            >
                                Quên mật khẩu?
                            </button>
                        </div>

                        {/* ── API error ── */}
                        {error && (
                            <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[13px]">
                                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* ── Submit ── */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={cn(
                                'w-full h-10 mt-1 rounded-lg text-[14px] font-medium text-white',
                                'flex items-center justify-center gap-2',
                                'transition-all duration-150',
                                'disabled:opacity-60 disabled:cursor-not-allowed',
                                'hover:brightness-110 active:scale-[0.98]'
                            )}
                            style={{ background: '#1e6abf' }}
                        >
                            {isLoading
                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Đang đăng nhập...</>
                                : <><LogIn className="w-4 h-4" /> Đăng nhập</>
                            }
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-8 text-center text-[12px] text-gray-300">
                        © {new Date().getFullYear()} Roomio · Hệ thống quản lý phòng trọ
                    </p>
                </div>

            </div>
        </div>
    )
} 