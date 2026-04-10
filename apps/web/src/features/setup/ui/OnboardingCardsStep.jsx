import { useState } from 'react'
import { Button } from '@/shared/ui/buttons/Button'

const ONBOARDING_CARDS = [
  {
    title: 'Create your palette',
    body: 'Pick your skills and strengths, watch as they turn into your unique color palette.',
    video: 'https://res.cloudinary.com/dmvfsm0ls/video/upload/yrco/onboarding/Onboarding_1.mp4',
  },
  {
    title: 'Find your contrasts & matches',
    body: 'Explore other participants palettes and spot shared, or unexpected, connections.',
    video: 'https://res.cloudinary.com/dmvfsm0ls/video/upload/yrco/onboarding/Onboarding_2.mp4',
  },
  {
    title: 'Turn color into conversation',
    body: 'Need an icebreaker? Tap a color for a conversation starter.',
    video: 'https://res.cloudinary.com/dmvfsm0ls/video/upload/yrco/onboarding/Onboarding_3.mp4',
  },
  {
    title: 'Connect',
    body: 'Search for participants or scan someone\'s QR code to open their profile.',
    video: 'https://res.cloudinary.com/dmvfsm0ls/video/upload/yrco/onboarding/Onboarding_4.mp4',
  },
  {
    title: 'Save your bright spots',
    body: 'Keep the profiles you want to remember in your archive.',
    video: 'https://res.cloudinary.com/dmvfsm0ls/video/upload/yrco/onboarding/Onboarding_5.mp4',
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
      <video
        key={card.video}
        src={card.video}
        className="rounded-[34px] h-[482px] shrink-0 object-cover w-full"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="flex flex-col flex-1 justify-between">
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
    </div>
  )
}
