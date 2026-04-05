import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { useAuth } from '@/providers/AuthProvider'
import { useConnections, useAddConnection, useRemoveConnection } from '@/features/connections'

export function useProfile() {
  const { username } = useParams()
  const { data: user, isLoading } = useQuery({
    queryKey: queryKeys.user(username),
    queryFn: () => api.get(`/users/${username}`).then(r => r.data),
  })
  const { user: me } = useAuth()
  const { data: connections } = useConnections()
  const addConnection = useAddConnection()
  const removeConnection = useRemoveConnection()

  const isOwnProfile = me?.username === user?.username
  const isConnected = connections?.some(c => c.username === user?.username) ?? false
  const isPending = addConnection.isPending || removeConnection.isPending

  const onToggle = () => {
    if (isConnected) {
      removeConnection.mutate(user.username)
    } else {
      addConnection.mutate(user.username)
    }
  }

  return { user, isLoading, isOwnProfile, isConnected, isPending, onToggle }
}
