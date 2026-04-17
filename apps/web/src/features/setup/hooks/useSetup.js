import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { setupSchema } from '@yrco/lib'
import { queryKeys } from '@/lib/queryKeys'
import api from '@/lib/api'
import { redirectToError } from '@/lib/errorRedirect'
import { validateRedirect } from '@/lib/validateRedirect'

export function useSetup() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = validateRedirect(searchParams.get('redirect'))
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ role: null })

  const { data: traits = [] } = useQuery({
    queryKey: queryKeys.traits,
    queryFn: () => api.get('/traits').then(r => r.data),
  })

  const { mutateAsync } = useMutation({
    mutationFn: (data) => api.post('/users/me/setup', data),
  })

  const handleSetupComplete = async (traitIds) => {
    const base = { role: formData.role, traitIds }
    const data = formData.role === 'student'
      ? { ...base, education: formData.education, website: formData.website ?? '', website2: formData.website2 ?? '' }
      : { ...base, organizationName: formData.organizationName ?? '', roleAtCompany: formData.roleAtCompany ?? '', targetEducation: formData.targetEducation }

    const result = setupSchema.safeParse(data)
    if (!result.success) {
      console.error('Setup validation failed:', result.error)
      redirectToError('Something went wrong, please try again')
      return
    }

    setStep(5)

    await Promise.all([
      new Promise(resolve => setTimeout(resolve, 5000)),
      mutateAsync(data),
    ])

    await queryClient.invalidateQueries({ queryKey: queryKeys.me })
    navigate(redirect || '/palette', { replace: true })
  }

  const onChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

  return {
    step,
    setStep,
    formData,
    onChange,
    traits,
    redirect,
    handleSetupComplete,
  }
}
