import { useState } from 'react'
import { Navigate, useNavigate, useSearchParams, matchPath } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/providers/AuthProvider'
import { queryKeys } from '@/lib/queryKeys'
import api from '@/lib/api'
import { APP_ROUTES } from '@/shared/routes'
import { RoleStep, DetailsStep, OnboardingCardsStep, TraitsStep, LoadingStep } from '@/features/setup'

export const Setup = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const raw = searchParams.get('redirect')
  const redirect = raw && APP_ROUTES.some(r => matchPath(r.path, raw)) ? raw : null
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ role: null })

  const { data: traits = [] } = useQuery({
    queryKey: queryKeys.traits,
    queryFn: () => api.get('/traits').then(r => r.data),
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data) => api.post('/users/me/setup', data),
  })

  if (user?.setupComplete) return <Navigate to={redirect || '/palette'} replace />

  const handleSetupComplete = async (traitIds) => {
    const base = { role: formData.role, traitIds }
    const data = formData.role === 'student'
      ? { ...base, education: formData.education, website: formData.website ?? '', website2: formData.website2 ?? '' }
      : { ...base, organizationName: formData.organizationName, roleAtCompany: formData.roleAtCompany, targetEducation: formData.targetEducation }

    setStep(5)

    await Promise.all([
      new Promise(resolve => setTimeout(resolve, 5000)),
      mutateAsync(data),
    ])

    await queryClient.invalidateQueries({ queryKey: queryKeys.me })
    navigate(redirect || '/palette', { replace: true })
  }

  return (
    <div className="flex flex-col h-svh">
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

      {step === 4 && (
        <TraitsStep
          traits={traits}
          onComplete={handleSetupComplete}
        />
      )}

      {step === 5 && <LoadingStep />}

    </div>
  )
}
