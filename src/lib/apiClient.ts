import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { store } from './redux/store'
import { updateAccessToken, logout } from './redux/slices/authSlice'
import { refreshToken as performRefresh } from '../utils/refreshToken'

// keep track of refresh state to avoid multiple calls
let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (err: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else if (token) {
            resolve(token)
        }
    })
    failedQueue = []
}

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    withCredentials: true, // send cookies (refresh token) alongside requests
})

// attach access token before each request
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const state = store.getState()
        const token = state.auth.accessToken
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error:any) => Promise.reject(error)
)

// response interceptor to handle 401
apiClient.interceptors.response.use(
    (res:any) => res,
    async (err: AxiosError) => {
        const originalRequest = err.config as InternalAxiosRequestConfig & { _retry?: boolean }
        if (
            err.response?.status === 401 &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                // queue the request until refresh completes
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then((token) => {
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`
                    }
                    return apiClient(originalRequest)
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const newToken = await performRefresh()
                store.dispatch(updateAccessToken(newToken))
                processQueue(null, newToken)

                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                }
                return apiClient(originalRequest)
            } catch (refreshError) {
                processQueue(refreshError, null)
                store.dispatch(logout())
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(err)
    }
)

export default apiClient
