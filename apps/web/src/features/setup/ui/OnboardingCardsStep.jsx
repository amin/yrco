import { useState } from 'react'
import { Button } from '@/shared/ui/buttons/Button'

const ONBOARDING_CARDS = [
  {
    title: 'Create your palette',
    body: 'Pick your skills and strengths, watch as they turn into your unique color palette.',
  },
  {
    title: 'Find your contrasts & matches',
    body: 'Explore other participants palettes and spot shared, or unexpected, connections.',
  },
  {
    title: 'Turn color into conversation',
    body: 'Need an icebreaker? Tap a color for a conversation starter.',
  },
  {
    title: 'Connect',
    body: 'Search for participants or scan someone\'s QR code to open their profile.',
  },
  {
    title: 'Save your bright spots',
    body: 'Keep the profiles you want to remember in your archive.',
  },
]

export const OnboardingCardsStep = ({ onBack, onComplete }) => {
  const [cardIndex, setCardIndex] = useState(0)
  const card = ONBOARDING_CARDS[cardIndex]
  const isLast = cardIndex === ONBOARDING_CARDS.length - 1

  const handleNext = () => isLast ? onComplete() : setCardIndex(i => i + 1)
  const handleBack = () => cardIndex > 0 ? setCardIndex(i => i - 1) : onBack()

  return (
    <div className="flex flex-col h-full p-base gap-l">
      <div className="bg-yrgo-light-blue rounded-[34px] flex-1" />

      <div className="flex flex-col gap-s">
        <p className="font-sans text-xl leading-xl tracking-tighter font-normal">{card.title}</p>
        <p className="font-sans text-xl leading-xl tracking-tighter font-light">{card.body}</p>
      </div>

      <div className="flex flex-col gap-s">
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
