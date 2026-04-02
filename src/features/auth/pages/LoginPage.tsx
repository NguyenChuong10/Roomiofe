import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/loginSchemas'
import { loginThunk, clearAuthError } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { UserRole } from '@/shared/types/index'



export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isLoading, error, isAuthenticated } = useAppSelector((s) => s.auth)
    const [showPass, setShowPass] = useState(false)
    const [role, setRole] = useState<UserRole>(UserRole.ADMIN)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    })

    useEffect(() => {
        if (isAuthenticated) navigate('/admin/dashboard', { replace: true })
    }, [isAuthenticated, navigate])

    useEffect(() => () => { dispatch(clearAuthError()) }, [dispatch])

    const onSubmit = (values: LoginFormValues) => {
        dispatch(loginThunk({ ...values, role }))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#080e1a]">
            <div className="w-full max-w-5xl mx-4 flex rounded-2xl overflow-hidden border border-white/[0.07] shadow-2xl">

                {/* ── LEFT PANEL ── */}
                <div className="hidden lg:flex w-[44%] bg-[#111c2d] flex-col justify-between p-10 relative overflow-hidden">
                    {/* Dot grid */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle, rgba(120,80,220,0.10) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    {/* Glow */}
                    <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-purple-700/20 blur-[80px]" />
                    <div className="pointer-events-none absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-blue-600/15 blur-[60px]" />

                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center border border-white/15">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="url(#g1)" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M9 21V12h6v9" stroke="url(#g2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <linearGradient id="g1" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#a855f7" /><stop offset="1" stopColor="#1e6abf" /></linearGradient>
                                    <linearGradient id="g2" x1="9" y1="12" x2="15" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#a855f7" /><stop offset="1" stopColor="#1e6abf" /></linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div>
                            <p className="text-white font-medium text-[17px]">Roomio</p>
                            <p className="text-[#6a8fa8] text-[11px] mt-0.5">Quản lý phòng trọ</p>
                        </div>
                    </div>

                    {/* Mid */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center py-8">
                        <h2 className="text-[21px] font-medium text-white leading-snug mb-2.5">
                            Chào mừng trở lại,<br />Admin Dashboard
                        </h2>
                        <p className="text-[13px] text-[#6a8fa8] leading-relaxed">
                            Quản lý toàn bộ hệ thống nhà trọ — phòng, người thuê và thanh toán tập trung tại một nơi.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="relative z-10 flex gap-2.5">
                        {[{ num: '48', lbl: 'Tổng phòng' }, { num: '36', lbl: 'Đã cho thuê' }, { num: '12', lbl: 'Còn trống' }].map((s) => (
                            <div key={s.lbl} className="flex-1 bg-white/5 border border-white/[0.08] rounded-lg p-3">
                                <p className="text-white text-xl font-medium">{s.num}</p>
                                <p className="text-[#6a8fa8] text-[11px] mt-0.5">{s.lbl}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="flex-1 bg-[#080e1a] flex items-center justify-center p-8 relative overflow-hidden">
                    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-purple-700/8 blur-[60px]" />

                    <div className="relative z-10 w-full max-w-[380px] rounded-2xl border border-white/[0.07] shadow-2xl overflow-hidden"
                        style={{ background: 'linear-gradient(145deg, rgba(17,28,45,0.95) 0%, rgba(10,16,30,0.98) 100%)' }}>
                        {/* Top line */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                        <div className="px-7 py-8">
                            {/* Logo center */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative mb-3">
                                    <div className="absolute inset-0 rounded-xl bg-purple-600/25 blur-xl" />
                                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/40 to-blue-600/30 border border-purple-500/30 flex items-center justify-center">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="url(#g3)" strokeWidth="1.5" strokeLinejoin="round" />
                                            <path d="M9 21V12h6v9" stroke="url(#g4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <defs>
                                                <linearGradient id="g3" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#a855f7" /><stop offset="1" stopColor="#1e6abf" /></linearGradient>
                                                <linearGradient id="g4" x1="9" y1="12" x2="15" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#a855f7" /><stop offset="1" stopColor="#1e6abf" /></linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>
                                <h1 className="text-[21px] font-bold text-white tracking-tight">Roomio</h1>
                                <p className="text-[13px] text-[#6a8fa8] mt-1">Đăng nhập vào trang quản trị</p>
                            </div>

                            {/* Role selector */}
                            <div className="flex gap-2 mb-5">
                                {(['admin', 'landlord'] as UserRole[]).map((r) => (
                                    <button key={r} type="button" onClick={() => setRole(r)}
                                        className={`flex-1 h-9 rounded-lg text-[12px] font-medium border transition-all duration-150 flex items-center justify-center gap-1.5
                      ${role === r
                                                ? 'border-purple-500/50 text-purple-400 bg-purple-600/10'
                                                : 'border-[#1a2d42] text-[#6a8fa8] bg-[#0d1929] hover:border-purple-500/40 hover:text-purple-400'}`}>
                                        {r === 'admin'
                                            ? <><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>Admin</>
                                            : <><svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>Chủ nhà</>}
                                    </button>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-[#8aa8c0]">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6a84] pointer-events-none" />
                                        <input type="email" autoComplete="email" placeholder="admin@roomio.dev"
                                            {...register('email')}
                                            className={`w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white placeholder-[#3a5570]
                        bg-[#0d1929] border transition-all duration-150 outline-none
                        focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50
                        ${errors.email ? 'border-red-500/60 bg-red-900/10' : 'border-[#1a2d42] hover:border-[#2a4060]'}`} />
                                    </div>
                                    {errors.email && (
                                        <p className="text-[12px] text-red-400 flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />{errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-medium text-[#8aa8c0]">Mật khẩu</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a6a84] pointer-events-none" />
                                        <input type={showPass ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••"
                                            {...register('password')}
                                            className={`w-full h-11 pl-10 pr-11 rounded-xl text-sm text-white placeholder-[#3a5570]
                        bg-[#0d1929] border transition-all duration-150 outline-none
                        focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50
                        ${errors.password ? 'border-red-500/60 bg-red-900/10' : 'border-[#1a2d42] hover:border-[#2a4060]'}`} />
                                        <button type="button" tabIndex={-1} onClick={() => setShowPass((v) => !v)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4a6a84] hover:text-[#8aa8c0] transition-colors">
                                            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-[12px] text-red-400 flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />{errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Remember + Forgot */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-1.5 text-[13px] text-[#6a8fa8] cursor-pointer">
                                        <input type="checkbox" className="accent-purple-600 w-3.5 h-3.5" /> Ghi nhớ đăng nhập
                                    </label>
                                    <span className="text-[13px] text-purple-400 cursor-pointer hover:underline">Quên mật khẩu?</span>
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
                                <button type="submit" disabled={isLoading}
                                    className="relative w-full h-11 mt-1 rounded-xl text-sm font-semibold text-white
                    transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group"
                                    style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #1e6abf 100%)', boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}>
                                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-200" />
                                    <span className="relative flex items-center justify-center gap-2">
                                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                    </span>
                                </button>
                            </form>

                            <p className="mt-6 text-center text-[12px] text-[#3a5570]">
                                © {new Date().getFullYear()} Roomio. Hệ thống quản lý phòng trọ.
                            </p>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />
                    </div>
                </div>
            </div>
        </div>
    )
}