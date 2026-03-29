import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMe } from '../api'

const AuthContext = createContext(null)

const fetchMeOrNull = async () => {
  try {
    return await fetchMe()
  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 404) {
      return null
    }
    throw err
  }
}

export const AuthProvider = ({ children }) => {
  const query = useQuery({
    queryKey: ['me'],
    queryFn: fetchMeOrNull,
    staleTime: 5 * 60 * 1000,
  })

  return (
    <AuthContext.Provider
      value={{
        user: query.data,
        isLoading: query.isLoading,
        error: query.error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
