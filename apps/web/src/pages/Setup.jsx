import { Navigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'
import { RoleStep, DetailsStep, OnboardingCardsStep, TraitsStep, LoadingStep, useSetup } from '@/features/setup'

export const Setup = () => {
  const { user } = useAuth()
  const { step, setStep, formData, onChange, traits, redirect, handleSetupComplete } = useSetup()

  if (user?.setupComplete) return <Navigate to={redirect || '/palette'} replace />

  return (
    <div className="flex flex-col h-svh">
      {step === 1 && (
        <RoleStep
          role={formData.role}
          onSelect={(role) => onChange('role', role)}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <DetailsStep
          role={formData.role}
          formData={formData}
          onChange={onChange}
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
