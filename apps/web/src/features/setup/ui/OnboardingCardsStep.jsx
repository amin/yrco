import { useState } from 'react'
import { Button } from '@/shared/ui/buttons/Button'

const ONBOARDING_CARDS = [
  {
    title: 'Label',
    body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    title: 'Label',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]

export const OnboardingCardsStep = ({ onBack, onComplete }) => {
  const [cardIndex, setCardIndex] = useState(0)
  const card = ONBOARDING_CARDS[cardIndex]
  const isLast = cardIndex === ONBOARDING_CARDS.length - 1

  const handleNext = () => isLast ? onComplete() : setCardIndex(i => i + 1)
  const handleBack = () => cardIndex > 0 ? setCardIndex(i => i - 1) : onBack()

  return (
    <div className="flex flex-col h-full">
      <div className="bg-yrgo-light-blue flex-1" />

      <div className="flex flex-col p-base gap-base">
        <span className="text-2xl font-bold">{card.title}</span>
        <p className="text-2xl font-light">{card.body}</p>
      </div>

      <div className="flex flex-col p-base gap-base">
        <div className="flex justify-end">
          <Button onClick={handleNext}>Next</Button>
        </div>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={handleBack}>Back</Button>
          <Button variant="secondary" onClick={onComplete}>Skip</Button>
        </div>
      </div>
    </div>
  )
}
