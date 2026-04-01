// ============================================================
// Request
// ============================================================
export interface LoginCredentials {
    email: string
    password: string
}

// ============================================================
// Response — POST /api/v1/auth/login  (201)
// apiClient dùng camelcase-keys nên snake_case → camelCase tự động
// ============================================================
export interface AuthUser {
    id: string
    name: string
    phone: string
    email: string
    role: 'admin' | 'landlord' | 'tenant'
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
    accessTokenExpiresIn: number   // giây, e.g. 900
    refreshTokenExpiresIn: number  // giây, e.g. 2592000
    user: AuthUser
}

export interface LoginApiResponse {
    data: LoginResponseData
}

// ============================================================
// Redux state
// ============================================================
export interface AuthState {
    user: AuthUser | null
    accessToken: string | null
    deviceId: string | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
}
