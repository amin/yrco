import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { useAuth } from '@/providers/AuthProvider'

export function useConnections(username) {
  const { user: me } = useAuth()
  const queryClient = useQueryClient()

  const { data: connections } = useQuery({
    queryKey: queryKeys.connections,
    queryFn: () => api.get('/users/me/connections').then(r => r.data),
  })

  const addConnection = useMutation({
    mutationFn: (u) => api.post('/users/me/connections', { username: u }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.connections }),
  })

  const removeConnection = useMutation({
    mutationFn: (u) => api.delete(`/users/me/connections/${u}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.connections }),
  })

  const isOwnProfile = me?.username === username
  const isConnected = connections?.some(c => c.username === username) ?? false
  const isPending = addConnection.isPending || removeConnection.isPending

  const onToggle = () => {
    if (!username) return
    isConnected ? removeConnection.mutate(username) : addConnection.mutate(username)
  }

  return { connections, isOwnProfile, isConnected, isPending, onToggle }
}
