import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export function useTraits() {
  return useQuery({
    queryKey: ['traits'],
    queryFn: () => api.get('/traits').then(r => r.data),
  })
}
