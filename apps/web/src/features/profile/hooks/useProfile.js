import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export function useProfile() {
  const { username } = useParams()
  const { data: user, isLoading } = useQuery({
    queryKey: ['users', username],
    queryFn: () => api.get(`/users/${username}`).then(r => r.data),
  })
  return { user, isLoading }
}
