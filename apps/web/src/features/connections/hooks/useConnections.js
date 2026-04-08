import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { useAuth } from '@/providers/AuthProvider'

export function useConnections(username) {
  const { user: me } = useAuth()
  const queryClient = useQueryClient()
  const [showEmailOptIn, setShowEmailOptIn] = useState(false)

  const { data: connections } = useQuery({
    queryKey: queryKeys.connections,
    queryFn: () => api.get('/users/me/connections').then(r => r.data),
  })

  const addConnection = useMutation({
    mutationFn: (u) => api.post('/users/me/connections', { username: u }),
    onSuccess: () => {
      if (connections?.length === 0 && me?.emailOptIn === null) {
        setShowEmailOptIn(true)
      }
      queryClient.invalidateQueries({ queryKey: queryKeys.connections })
    },
  })

  const removeConnection = useMutation({
    mutationFn: (u) => api.delete(`/users/me/connections/${u}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.connections }),
  })

  const emailOptInMutation = useMutation({
    mutationFn: (optIn) => api.patch('/users/me/email-opt-in', { optIn }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.me }),
  })

  const isOwnProfile = me?.username === username
  const isConnected = connections?.some(c => c.username === username) ?? false
  const isPending = addConnection.isPending || removeConnection.isPending

  const onToggle = () => {
    if (!username) return
    isConnected ? removeConnection.mutate(username) : addConnection.mutate(username)
  }

  const onEmailOptIn = (optIn) => {
    emailOptInMutation.mutate(optIn)
    setShowEmailOptIn(false)
  }

  return { connections, isOwnProfile, isConnected, isPending, onToggle, showEmailOptIn, onEmailOptIn }
}
