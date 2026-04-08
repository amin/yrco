import { Button } from '@/shared/ui/buttons'

export const EmailOptInPopup = ({ onAccept, onDecline }) => (
  <div className="fixed inset-0 z-50 flex items-end bg-black/40">
    <div className="bg-yrgo-light-blue w-full flex flex-col justify-between min-h-[300px]">
      <div className="flex items-start justify-between">
        <div className="p-m flex-1">
          <p className="font-sans text-2xl leading-xl tracking-tighter font-light text-black text-center">
            Do you want to receive an email with the number of connections you made during the event?
          </p>
        </div>
        <button
          onClick={onDecline}
          className="p-[8px] shrink-0 size-[68px] flex items-center justify-center cursor-pointer"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-end gap-s p-m">
        <Button variant="primary" onClick={onAccept}>Yes</Button>
        <Button variant="secondary" onClick={onDecline}>No</Button>
      </div>
    </div>
  </div>
)
