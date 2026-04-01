import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthState, LoginCredentials } from '@/shared/types/auth.types'
import { authService } from '@/services/authService'

const TOKEN_KEY = 'token'   
const DEVICE_KEY = 'roomio_device_id'
const USER_KEY = 'roomio_user'

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'),
    accessToken: localStorage.getItem(TOKEN_KEY),
    deviceId: localStorage.getItem(DEVICE_KEY),
    isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
    isLoading: false,
    error: null,
}


export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const res = await authService.login(credentials)
            return res.data          // LoginResponseData (đã camelCase)
        } catch {
            return rejectWithValue('Email hoặc mật khẩu không đúng')
        }
    }
)

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    try { await authService.logout() } catch { /* ignore */ }
})



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthError(state) {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.accessToken = action.payload.accessToken
                state.deviceId = action.payload.deviceId
                state.isAuthenticated = true

                localStorage.setItem(TOKEN_KEY, action.payload.accessToken)
                localStorage.setItem(DEVICE_KEY, action.payload.deviceId)
                localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })

            // logout
            .addCase(logoutThunk.fulfilled, (state) => {
                state.user = null
                state.accessToken = null
                state.deviceId = null
                state.isAuthenticated = false

                localStorage.removeItem(TOKEN_KEY)
                localStorage.removeItem(DEVICE_KEY)
                localStorage.removeItem(USER_KEY)
            })
    },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer
