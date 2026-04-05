import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useConnections() {
  return useQuery({
    queryKey: queryKeys.connections,
    queryFn: () => api.get('/users/me/connections').then(r => r.data),
  })
}
