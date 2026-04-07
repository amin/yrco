import { useState } from 'react'
import { studentFieldsSchema } from '@yrco/lib'
import { useAuth } from '@/providers/AuthProvider'
import { InputText } from '@/shared/ui/inputs/InputText'
import { ControllerTwoInput } from '@/shared/ui/inputs/ControllerTwoInput'
import { Button } from '@/shared/ui/buttons/Button'

export const DetailsStep = ({ role, formData, onChange, onBack, onNext }) => {
  const { user } = useAuth()
  const isStudent = role === 'student'
  const [websiteError, setWebsiteError] = useState('')

  const targetEducation = formData.targetEducation ?? []
  const toggleTargetEducation = (value) => {
    const next = targetEducation.includes(value)
      ? targetEducation.filter(v => v !== value)
      : [...targetEducation, value]
    onChange('targetEducation', next)
  }

  const validateWebsite = () => {
    let value = formData.website ?? ''
    if (value && !/^https?:\/\//i.test(value)) {
      value = `https://${value}`
      onChange('website', value)
    }
    const result = studentFieldsSchema.shape.website.safeParse(value)
    setWebsiteError(result.success ? '' : result.error.issues[0].message)
  }

  const canProceed = isStudent
    ? !!formData.education && !websiteError
    : !!(formData.organizationName && formData.roleAtCompany && targetEducation.length > 0)

  return (
    <div className="flex flex-col h-full p-base">
      <div className="flex-1 flex flex-col justify-center gap-xl">
        <div className="flex flex-col">
          <span className="text-2xl font-light">{user?.name}</span>
          <span className="text-2xl font-light">{user?.email}</span>
        </div>

        <div className="flex flex-col gap-s">
          {isStudent ? (
          <>
            <InputText
              showSearch={false}
              placeholder="Personal link"
              value={formData.website ?? ''}
              onChange={e => { onChange('website', e.target.value); setWebsiteError('') }}
              onBlur={validateWebsite}
            />
            {websiteError && (
              <span className="font-sans text-xs text-yrgo-red px-base">{websiteError}</span>
            )}
            <ControllerTwoInput
              label="Programme"
              leftLabel="Digital Design"
              rightLabel="Webbutveckling"
              leftPicked={formData.education === 'Digital Designer'}
              rightPicked={formData.education === 'Web Developer'}
              onLeftClick={() => onChange('education', 'Digital Designer')}
              onRightClick={() => onChange('education', 'Web Developer')}
            />
          </>
        ) : (
          <>
            <InputText
              showSearch={false}
              placeholder="Company"
              value={formData.organizationName ?? ''}
              onChange={e => onChange('organizationName', e.target.value)}
            />
            <InputText
              showSearch={false}
              placeholder="Role"
              value={formData.roleAtCompany ?? ''}
              onChange={e => onChange('roleAtCompany', e.target.value)}
            />
            <ControllerTwoInput
              label="Works with"
              leftLabel="Digital Design"
              rightLabel="Webbutveckling"
              leftPicked={targetEducation.includes('Digital Designer')}
              rightPicked={targetEducation.includes('Web Developer')}
              onLeftClick={() => toggleTargetEducation('Digital Designer')}
              onRightClick={() => toggleTargetEducation('Web Developer')}
            />
          </>
        )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>Back</Button>
        <Button disabled={!canProceed} onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}
