import { UserRole } from '@/shared/types/index'

export interface LoginCredentials {
  email: string
  password: string
  role?: UserRole
}

export interface AuthUser {
  id: string
  name: string
  phone: string
  email: string
  role: UserRole          // dùng enum thay vì string literal
  status: 'active' | 'inactive' | 'locked'
  createdAt: string
  lastLoginAt: string | null
  lastSeenAt: string | null
  passwordChangedAt: string | null
  failedLoginCount: number
  lockedUntil: string | null
}

export interface LoginResponseData {
  accessToken: string
  deviceId: string
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: number
  user: AuthUser
}

export interface LoginApiResponse {
  data: LoginResponseData
}

export interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  deviceId: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}