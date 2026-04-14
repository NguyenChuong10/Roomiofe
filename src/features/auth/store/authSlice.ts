import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import type { AuthUser, AuthState, LoginCredentials } from "@/shared/types/auth.types"
import { authService } from "@/services/authService"

const TOKEN_KEY = 'token'
const DEVICE_KEY = 'roomio_device_id'
const USER_KEY = 'roomio_user'

const authStorage = {
    save: (token: string, deviceId: string, user: AuthUser) => {
        localStorage.setItem(TOKEN_KEY, token)
        localStorage.setItem(DEVICE_KEY, deviceId)
        localStorage.setItem(USER_KEY, JSON.stringify(user))
    },
    clear: () => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(DEVICE_KEY)
        localStorage.removeItem(USER_KEY)
    },
    load: () => ({
        user: JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'),
        accessToken: localStorage.getItem(TOKEN_KEY),
        deviceId: localStorage.getItem(DEVICE_KEY),
    })
}

const initialState: AuthState = {
    ...authStorage.load(),
    isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
    isLoading: false,
    error: null,
}

const getErrorMessage = (error: unknown, fallback: string): string =>
    axios.isAxiosError(error)
        ? error.response?.data?.message ?? fallback
        : fallback

const clearAuth = (state: AuthState) => {
    Object.assign(state, {
        user: null,
        accessToken: null,
        deviceId: null,
        isAuthenticated: false
    })
    authStorage.clear()
}

export const loginThunk = createAsyncThunk('auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const res = await authService.login(credentials)
            return res.data
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, 'Đăng nhập thất bại'))
        }
    })
export const logoutThunk = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await authService.logout()
    } catch (error) {
        return rejectWithValue(getErrorMessage(error, 'Đăng xuất thất bại'))
    }
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
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                const { user, accessToken, deviceId } = action.payload

                Object.assign(state, {
                    user,
                    accessToken,
                    deviceId,
                    isAuthenticated: true,
                    isLoading: false
                })
                authStorage.save(accessToken, deviceId, user)
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                clearAuth(state)
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                clearAuth(state)
                state.error = action.payload as string
            })
    },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer

