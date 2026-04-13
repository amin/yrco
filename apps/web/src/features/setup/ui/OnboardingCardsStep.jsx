import { useState, useEffect, useRef } from 'react'
import { Button } from '@/shared/ui/buttons/Button'
import { ONBOARDING_CARDS } from '../data/onboardingCards'

export const OnboardingCardsStep = ({ onBack, onComplete }) => {
  const [cardIndex, setCardIndex] = useState(0)
  const card = ONBOARDING_CARDS[cardIndex]
  const isLast = cardIndex === ONBOARDING_CARDS.length - 1

  const videoRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    clearTimeout(timerRef.current)
    video.pause()
    video.load()
  }, [card.video])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleLoadedData = () => {
    clearTimeout(timerRef.current)
    videoRef.current?.play().catch(() => {})
  }

  const handleEnded = () => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play().catch(() => {})
      }
    }, 500)
  }

  const handleNext = () => isLast ? onComplete() : setCardIndex(i => i + 1)
  const handleBack = () => cardIndex > 0 ? setCardIndex(i => i - 1) : onBack()

  return (
    <div className="flex flex-col h-full p-base gap-l">
      <div className="flex-1 min-h-0">
        <video
          ref={videoRef}
          src={card.video}
          className="rounded-[34px] w-full h-full object-cover bg-yrgo-light-blue"
          preload="auto"
          muted
          playsInline
          onLoadedData={handleLoadedData}
          onEnded={handleEnded}
        />
      </div>

      <div className="flex flex-col gap-s h-30 shrink-0">
        <p className="font-sans text-xl leading-xl tracking-tighter font-normal">{card.title}</p>
        <p className="font-sans text-xl leading-xl tracking-tighter font-light">{card.body}</p>
      </div>

      <div className="mt-auto flex flex-col gap-s shrink-0">
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
