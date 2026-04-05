import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useLogout() {
  const queryClient = useQueryClient()
  return useCallback(async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      queryClient.setQueryData(queryKeys.me, null)
    }
  }, [queryClient])
}
