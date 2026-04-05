import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useAddConnection() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (username) => api.post('/users/me/connections', { username }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.connections }),
  })
}
