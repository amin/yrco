import { ToggleButton } from '@/shared/ui/buttons'

export const ControllerTwoInput = ({
  label,
  leftLabel = 'Label',
  rightLabel = 'Label',
  leftPicked = false,
  rightPicked = false,
  onLeftClick,
  onRightClick,
}) => (
  <div className="flex flex-col gap-m items-start">
    {label && (
      <span className="font-sans text-sm leading-base tracking-tight text-black">{label}</span>
    )}
    <div className="flex gap-s items-center">
      <ToggleButton picked={leftPicked} onClick={onLeftClick}>{leftLabel}</ToggleButton>
      <ToggleButton picked={rightPicked} onClick={onRightClick}>{rightLabel}</ToggleButton>
    </div>
  </div>
)
