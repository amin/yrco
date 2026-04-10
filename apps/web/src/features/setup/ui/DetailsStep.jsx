import { useState } from 'react'
import { studentFieldsSchema } from '@yrco/lib'
import { useAuth } from '@/providers/AuthProvider'
import { InputText } from '@/shared/ui/inputs/InputText'
import { ControllerTwoInput } from '@/shared/ui/inputs/ControllerTwoInput'
import { Button } from '@/shared/ui/buttons/Button'

const toTitleCase = (str) => str.replace(/\b\w/g, c => c.toUpperCase())

const validateUrl = (field, formData, onChange) => {
  let value = formData[field] ?? ''
  if (value && !/^https?:\/\//i.test(value)) {
    value = `https://${value}`
    onChange(field, value)
  }
  const result = studentFieldsSchema.shape[field].safeParse(value)
  return result.success ? '' : result.error.issues[0].message
}

export const DetailsStep = ({ role, formData, onChange, onBack, onNext }) => {
  const { user } = useAuth()
  const isStudent = role === 'student'
  const [websiteError, setWebsiteError] = useState('')
  const [websiteError2, setWebsiteError2] = useState('')

  const targetEducation = formData.targetEducation ?? []
  const toggleTargetEducation = (value) => {
    const next = targetEducation.includes(value)
      ? targetEducation.filter(v => v !== value)
      : [...targetEducation, value]
    onChange('targetEducation', next)
  }

  const canProceed = isStudent
    ? !!formData.education && !websiteError && !websiteError2
    : !!(formData.organizationName && formData.roleAtCompany && targetEducation.length > 0)

  return (
    <div className="flex flex-col h-full p-base">
      <div className="flex-1 flex flex-col justify-center gap-xl">
        <div className="flex flex-col">
          <span className="text-2xl">Hi there,</span>
          <span className="text-xl font-light">{user?.name}</span>
          <span className="text-xl font-light">{user?.email}</span>
        </div>

        <div className="flex flex-col gap-s">
          {isStudent ? (
          <>
            <InputText
              showSearch={false}
              placeholder="Add a link to your personal site (optional)"
              value={formData.website ?? ''}
              onChange={e => { onChange('website', e.target.value); setWebsiteError('') }}
              onBlur={() => setWebsiteError(validateUrl('website', formData, onChange))}
            />
            {websiteError && (
              <span className="font-sans text-xs text-yrgo-red px-base">{websiteError}</span>
            )}
            <InputText
              showSearch={false}
              placeholder="Add a link to your personal site (optional)"
              value={formData.website2 ?? ''}
              onChange={e => { onChange('website2', e.target.value); setWebsiteError2('') }}
              onBlur={() => setWebsiteError2(validateUrl('website2', formData, onChange))}
            />
            {websiteError2 && (
              <span className="font-sans text-xs text-yrgo-red px-base">{websiteError2}</span>
            )}
            <ControllerTwoInput
              label="Program"
              leftLabel="Digital Designer"
              rightLabel="Web Developer"
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
              placeholder="What company do you work for? (optional)"
              value={formData.organizationName ?? ''}
              onChange={e => onChange('organizationName', e.target.value)}
              onBlur={e => onChange('organizationName', toTitleCase(e.target.value))}
            />
            <InputText
              showSearch={false}
              placeholder="What's your title? (optional)"
              value={formData.roleAtCompany ?? ''}
              onChange={e => onChange('roleAtCompany', e.target.value)}
              onBlur={e => onChange('roleAtCompany', toTitleCase(e.target.value))}
            />
            <ControllerTwoInput
              label="Looking to connect with students studying:"
              leftLabel="Digital Designer"
              rightLabel="Web Developer"
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
