import apiClient from "@/services/apiClient"
import type { LoginCredentials, LoginApiResponse } from "@/shared/types/auth.types"

export const authService = {
    login: async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
        try {
            const response = await apiClient.post<LoginApiResponse>('/auth/login', credentials)
            return response.data
        } catch (error) {
            throw error as Error
        }
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout')
    },
}