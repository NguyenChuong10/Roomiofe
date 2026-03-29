import axios, { AxiosError, type AxiosResponse } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import snackcaseKeys from 'snakecase-keys'
import toast from 'react-hot-toast'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        if (config.data) {
            config.data = snackcaseKeys(config.data, { deep: true })
        }
        if (config.params) {
            config.params = snackcaseKeys(config.params, { deep: true })
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data) {
            response.data = camelcaseKeys(response.data, { deep: true })
        }
        return response
    },
    (error: AxiosError<{ message?: string }>) => {
        const status = error.response?.status
        const message = error.response?.data?.message

        switch (status) {
            case 400:
                toast.error(message ?? "Dữ liệu không hợp lệ")
                break
            case 401:
                toast.error("Phiên đăng nhập hết hạn vui lòng đăng nhập lại")
                localStorage.removeItem("token")
                window.location.href = '/login'
                break
            case 403:
                toast.error("bạn không có quyền thực hiện thao tác này")
                break
            case 404:
                toast.error(message ?? "Không tìm thấy dữ liệu")
                break
            case 500:
                toast.error("Lỗi máy chủ, vui lòng thử lại sau")
                break
            default:
                if (!error.response) {
                    toast.error("không thể kết nối đến máy chủ")
                }
        }
        return Promise.reject(error)
    }
)

export default apiClient