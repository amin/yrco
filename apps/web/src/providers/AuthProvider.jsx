import { createContext, useContext, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

const AuthContext = createContext(null)

const fetchMe = () => api.get('/users/me').then(r => r.data)

const fetchMeOrNull = async () => {
  try {
    return await fetchMe()
  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 404) return null
    throw err
  }
}

export const AuthProvider = ({ children }) => {
  const query = useQuery({
    queryKey: queryKeys.me,
    queryFn: fetchMeOrNull,
    staleTime: 5 * 60 * 1000,
  })
  const queryClient = useQueryClient()

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      queryClient.setQueryData(queryKeys.me, null)
    }
  }, [queryClient])

  return (
    <AuthContext.Provider
      value={{
        user: query.data,
        isLoading: query.isLoading,
        error: query.error,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
