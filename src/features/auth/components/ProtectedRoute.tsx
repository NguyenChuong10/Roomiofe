import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/app/hooks'

/**
 * Bảo vệ các route admin.
 * Nếu chưa đăng nhập → redirect /login
 * Nếu role không phải admin → redirect /unauthorized
 */
export default function ProtectedRoute() {
    const { isAuthenticated, user } = useAppSelector((state) => state.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}
