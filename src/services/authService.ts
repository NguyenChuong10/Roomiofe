import apiClient from '@/services/apiClient'
import type { LoginCredentials, LoginApiResponse } from '@/shared/types/auth.types'

export const authService = {
    /**
     * POST /api/v1/auth/login
     * Response 201: { data: { access_token, device_id, user, ... } }
     */
    login: async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
        const response = await apiClient.post<LoginApiResponse>('/auth/login', credentials)
        return response.data
    },

    /**
     * POST /api/v1/auth/logout  (nếu backend hỗ trợ)
     */
    logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout')
    },
}
