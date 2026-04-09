import { Button } from '@/shared/ui/buttons'

export const EmailOptInPopup = ({ onAccept, onDecline }) => (
  <div className="absolute top-[252px] inset-x-0 bottom-0 z-30 bg-yrgo-light-blue flex flex-col justify-between animate-slide-up">
    {/* Text + close */}
    <div className="flex items-start justify-between">
      <div className="flex-1 flex flex-col gap-s p-base">
        <p className="font-sans text-xl leading-xl tracking-tighter font-normal text-black">
          Turn conversations into connections!
        </p>
        <p className="font-sans text-xl leading-xl tracking-tighter font-light text-black">
          Get a recap sent to your e-mail after the event and take the next step.
        </p>
      </div>
      <button
        onClick={onDecline}
        className="shrink-0 size-[68px] flex items-center justify-center cursor-pointer"
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>

    {/* CTA */}
    <div className="flex flex-col items-end gap-s p-base">
      <Button variant="primary" onClick={onAccept}>Yes, sounds great!</Button>
      <Button variant="secondary" onClick={onDecline}>No, I'll pass.</Button>
    </div>
  </div>
)
