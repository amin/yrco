import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useTraits() {
  return useQuery({
    queryKey: queryKeys.traits,
    queryFn: () => api.get('/traits').then(r => r.data),
  })
}
