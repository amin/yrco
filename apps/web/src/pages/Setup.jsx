import { Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/providers/AuthProvider'
import { queryKeys } from '@/lib/queryKeys'
import api from '@/lib/api'
import { Button } from '@/shared/ui/buttons/Button'

export const Setup = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: traits = [] } = useQuery({
    queryKey: queryKeys.traits,
    queryFn: () => api.get('/traits').then(r => r.data),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => api.post('/users/me/setup', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.me }),
  })

  if (user?.setupComplete) return <Navigate to="/palette" replace />

  const handleRandomSetup = () => {
    const shuffled = [...traits].sort(() => Math.random() - 0.5)
    const traitIds = shuffled.slice(0, 7).map(t => t.id)
    const role = Math.random() > 0.5 ? 'student' : 'organization'

    mutate(role === 'student'
      ? { role, traitIds, education: 'Web Developer', website: 'https://example.com' }
      : { role, traitIds, organizationName: 'Acme Corp', roleAtCompany: 'Engineer' }
    )
  }

  return (
    <div>
      <Button onClick={handleRandomSetup} disabled={isPending || traits.length < 7}>
        {isPending ? 'Setting up...' : 'Quick Setup'}
      </Button>
    </div>
  )
}
