import logo from "@/assets/RoomioLogo.png"
import { Star, Home, Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Checkbox } from "@/shared/components/ui/checkbox"


export default function LoginPage() {

  const [showPassword, setShowPassword] = useState(false)
  return (
    <main className="h-screen flex items-center justify-center bg-red-50">
      <div className="w-2/3 h-4/5 flex bg-amber-50 rounded-2xl overflow-hidden border border-solid border-gray-100 shadow-md">
        <div className="w-5/12 h-full flex items-center justify-center bg-[#111C2D]">
          <div className=" w-4/5 h-5/6 bg-[#111C2D] flex flex-col gap-15 ">
            <div className="flex items-center gap-0 ">
              <img src={logo} alt="logo" className="w-18 h-18 rounded-2xl shadow-lg shrink-0" />
              <div className="flex flex-col">
                <h2 className=" -mt-2 text-white font-sans text-lg font-bold tracking-wide">
                  Roomio
                </h2>
                <p className=" text-[#6A8FA8] font-sans text-xs font-bold tracking-wide">
                  Quản lý không gian
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="ml-4 text-[#FFFFFF] font-sans text-xl">Chào mừng trở lại, <br /> Admin DashBoard </h1>
              <p className="text-[#6A8FA8] text-sm ml-4 "> Quản lý toàn bộ hệ thống - phòng, người thuê <br />Và thanh toán tập trung tại một nơi </p>
            </div>
          </div>
        </div>
        <div className="w-7/12 h-full bg-[#FFFFFF] flex items-center justify-center">
          <div className="w-5/6 h-5/6  flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <h3 className="text-[#000000] text-2xl font-sans">Đăng nhập</h3>
              <p className="text-[#000000] text-sm font-sans">Chưa có tài khoản ? <Link className="text-blue-300 hover:text-blue-800 cursor-pointer" to="/register">Đăng ký miễn phí</Link></p>
            </div>
            <div className="w-full h-18 flex gap-3">
              <button className="
                                w-1/2 h-1/2 bg-white font-sans
                                flex gap-1 items-center justify-center
                                hover:border border-gray-300 rounded-lg
                              text-gray-600
                              hover:border-blue-50 hover:text-blue-400 hover:bg-blue-50
                                cursor-pointer transition-colors duration-200">
                <Star size={16} />
                <p>Admin</p>
              </button>

              <button className="
                                  w-1/2 h-1/2 bg-white font-sans
                                  flex gap-1 items-center justify-center
                                  hover:border border-gray-300 rounded-lg
                                text-gray-600
                                hover:border-blue-50 hover:text-blue-400 hover:bg-blue-50
                                  cursor-pointer transition-colors duration-200">
                <Home size={16} />
                <p>Chủ nhà</p>
              </button>
            </div>
            <div className="w-full h-1/2 ">
              <div className=" relative flex flex-col gap-5 ">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-sans text-[#000000]">
                    Email
                  </label>
                  <Mail size={16} className="absolute left-3 text-gray-500 top-9" />
                  <input type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200
                    focus:outline-none focus:ring-1 focus:ring-blue-200
                    text-sm md:text-base placeholder:text-gray-400"
                    placeholder="admin@roomio.com"
                  />
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 text-gray-500 top-9" />
                  <label htmlFor="email" className="block text-sm font-sans text-[#000000]">
                    Mật khẩu
                  </label>
                  <input type={showPassword ? "text" : "password"} id="email" name="email" autoComplete="email" className="w-full px-4 pl-10 py-2.5 pr-10 rounded-lg border border-gray-200 
                       focus:outline-none focus:ring-1 focus:ring-blue-200
                       text-sm md:text-base  " />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top- -translate-y-1/2 flex items-center px-3 text-gray-400 hover:text-gray-600" >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="w-full h-1/2 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Checkbox id="terms-checkbox" name="terms-checkbox" />
                    <label className="font-sans text-sm" htmlFor="terms-checkbox">ghi nhớ đăng nhập</label>
                  </div>
                  <div>
                    <Link className="text-sm font-sans text-blue-300 hover:text-blue-800 cursor-pointer " to="/register">Quên mật khẩu ? </Link>
                  </div>
                </div>
                <button className="w-full h-10 bg-[#1E6ABF] text-white flex gap-2 items-center justify-center rounded-lg cursor-pointer">
                  <LogIn size={16} />
                  <span>Đăng nhập</span>
                </button>
                <div className="flex items-center justify-center">
                  <span className="text-sm">Roomio v1.0 · Hệ thống quản lý không gian </span>
                </div>
                <div className="flex gap-3 mt-4">
                  {/* Facebook */}
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-medium py-2.5 px-4 rounded-xl transition-colors duration-200">
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="white">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.254h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                    </svg>
                     tiếp tục với Facebook
                  </button>

                  {/* Google */}
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-xl border border-gray-200 shadow-sm transition-colors duration-200">
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    tiếp tục với Gmail
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}