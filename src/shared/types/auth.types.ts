

export interface LoginCredentials {
  email: string,
  password: string,

}
export interface AuthUser {
  id: string
  name: string
  phone: string
  email: string
  status: 'active' | ' unactive' | ' locked'
  failedLoginCount: number
  lastLoginAt: string | null
  lastSeenAt: string | null
  passwordChangedAt: string | null
  lockedUntil: string | null
  role: 'admin' | 'tenant' | 'landlord'
}

export interface LoginResponseData {
  accessToken: string
  deviceId: string
  accessTokenExpiresIn: number
  refreshTokenExpiresIn: number
  user: AuthUser
}
export interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  deviceId: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface LoginApiResponse {
  data: LoginResponseData
}