import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/providers/AuthProvider'
import { queryKeys } from '@/lib/queryKeys'
import api from '@/lib/api'
import { RoleStep, DetailsStep, OnboardingCardsStep } from '@/features/setup'

export const Setup = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ role: null })

  const { data: traits = [] } = useQuery({
    queryKey: queryKeys.traits,
    queryFn: () => api.get('/traits').then(r => r.data),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => api.post('/users/me/setup', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.me }),
  })

  if (user?.setupComplete) return <Navigate to="/palette" replace />

  const handleQuickSetup = () => {
    if (traits.length < 7) return
    const shuffled = [...traits].sort(() => Math.random() - 0.5)
    const traitIds = shuffled.slice(0, 7).map(t => t.id)
    const role = Math.random() > 0.5 ? 'student' : 'organization'
    mutate(role === 'student'
      ? { role, traitIds, education: 'Web Developer', website: 'https://example.com' }
      : { role, traitIds, organizationName: 'Acme Corp', roleAtCompany: 'Engineer' }
    )
  }

  return (
    <div className="flex flex-col h-dvh">
      {step === 1 && (
        <RoleStep
          role={formData.role}
          onSelect={(role) => setFormData(prev => ({ ...prev, role }))}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <DetailsStep
          role={formData.role}
          formData={formData}
          onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <OnboardingCardsStep
          onBack={() => setStep(2)}
          onComplete={() => setStep(4)}
        />
      )}

      {import.meta.env.DEV && (
        <div className="fixed bottom-4 left-4">
          <button
            onClick={handleQuickSetup}
            disabled={isPending || traits.length < 7}
            className="text-xs text-gray-400 underline"
          >
            {isPending ? 'Setting up...' : 'Quick Setup'}
          </button>
        </div>
      )}
    </div>
  )
}
