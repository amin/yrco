import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useProfile() {
  const { username } = useParams()
  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.user(username),
    queryFn: () => api.get(`/users/${username}`).then(r => r.data),
    enabled: !!username,
  })
  return { user, isLoading }
}
