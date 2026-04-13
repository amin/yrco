import axios from 'axios'
import { redirectToError } from './errorRedirect'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const pathname = window.location.pathname

    if (!error.response) {
      if (pathname !== '/error') redirectToError('Network error')
      return Promise.reject(error)
    }
    if (status === 401 && !error.config?._skipAuthRedirect) {
      if (pathname !== '/login') window.location.href = `/login?redirect=${encodeURIComponent(pathname)}`
      return Promise.reject(error)
    }
    if (status === 403) {
      if (pathname !== '/error') redirectToError('Access denied')
      return Promise.reject(error)
    }
    if (status >= 500) {
      if (pathname !== '/error')
        redirectToError(error?.response?.data?.error ?? 'Server error')
      return Promise.reject(error)
    }

    return Promise.reject(error)
  },
)

export default api
