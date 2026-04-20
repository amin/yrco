import { ToggleButton } from '@/shared/ui/buttons/ToggleButton'
import { Button } from '@/shared/ui/buttons/Button'

export const RoleStep = ({ role, onSelect, onNext }) => (
  <div className="flex flex-col h-full">
    <div className="flex-1 flex items-center justify-center p-base">
      <div className="flex flex-col items-center gap-xl w-full">
        <p className="font-sans font-light text-xl leading-xl tracking-tighter text-black text-center">
          Are you a student or representing a company?
        </p>
        <div className="flex flex-col gap-s">
          <ToggleButton picked={role === 'student'} onClick={() => onSelect('student')}>
            Student
          </ToggleButton>
          <ToggleButton picked={role === 'organization'} onClick={() => onSelect('organization')}>
            Company
          </ToggleButton>
        </div>
      </div>
    </div>
    <div className="flex justify-end p-base">
      <Button disabled={!role} onClick={onNext}>Next</Button>
    </div>
  </div>
)
