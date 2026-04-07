import { ToggleButton } from '@/shared/ui/buttons/ToggleButton'
import { Button } from '@/shared/ui/buttons/Button'

export const RoleStep = ({ role, onSelect, onNext }) => (
  <div className="flex flex-col h-full">
    <div className="flex-1 flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <ToggleButton picked={role === 'student'} onClick={() => onSelect('student')}>
          Student
        </ToggleButton>
        <ToggleButton picked={role === 'organization'} onClick={() => onSelect('organization')}>
          Company
        </ToggleButton>
      </div>
    </div>
    <div className="flex justify-end p-base">
      <Button disabled={!role} onClick={onNext}>Next</Button>
    </div>
  </div>
)
