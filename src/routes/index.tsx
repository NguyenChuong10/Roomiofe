import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/features/auth/pages/LoginPage'
import ProtectedRoute from '@/features/auth/components/ProtectedRoute'

// Lazy load các trang admin (thêm sau)
// const Dashboard = lazy(() => import('@/features/dashboard/pages/DashboardPage'))

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />

            {/* Admin — chỉ role = 'admin' */}
            <Route element={<ProtectedRoute />}>
                <Route path="/admin/*" element={
                    // Placeholder — thay bằng AdminLayout + nested routes
                    <div className="p-8 text-white bg-[#080e1a] min-h-screen">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <p className="text-[#6a8fa8] mt-2">Chào mừng bạn trở lại!</p>
                    </div>
                } />
            </Route>

            {/* Fallback */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}
