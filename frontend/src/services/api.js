import axios from 'axios'
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from './auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api',
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Si varias peticiones caducan a la vez, todas esperan al mismo refresh
let refreshPromise = null

const refreshAccessToken = async () => {
  const refresh = getRefreshToken()
  if (!refresh) throw new Error('No refresh token')
  const res = await axios.post(`${api.defaults.baseURL}/login/refresh/`, { refresh })
  saveTokens(res.data)
  return res.data.access
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const url = original?.url ?? ''
    const isAuthRequest = url.includes('/login/') || url.includes('/register/')

    if (error.response?.status !== 401 || isAuthRequest || original._retry) {
      return Promise.reject(error)
    }

    try {
      original._retry = true
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null
      })
      const access = await refreshPromise
      original.headers.Authorization = `Bearer ${access}`
      return api(original)
    } catch {
      clearTokens()
      window.location.href = '/login'
      return Promise.reject(error)
    }
  }
)

export default api
