import { useState } from 'react'
import { useProfile, ProfileCard } from '@/features/profile'
import { useConnections } from '@/features/connections'
import { EmailOptInPopup } from '@/features/connections/ui/EmailOptInPopup'
import { SwatchList } from '@/shared/ui'

export const Profile = () => {
  const { user, isLoading, notFound } = useProfile()
  const { isOwnProfile, isConnected, isPending, onToggle, shouldPromptEmailOptIn, onEmailOptIn } = useConnections(user?.username)
  const [emailOptInDismissed, setEmailOptInDismissed] = useState(false)

  if (isLoading) return <div className="h-full bg-white" />

  if (notFound || !user) return (
    <div className="h-full bg-white flex flex-col justify-end p-base pb-2xl">
      <p className="font-sans text-xl leading-xl tracking-tighter font-light">User not found</p>
    </div>
  )

  const showEmailOptIn = shouldPromptEmailOptIn && !emailOptInDismissed

  return (
    <div className="h-full flex flex-col">
      <ProfileCard
        user={user}
        isConnected={isConnected}
        isOwnProfile={isOwnProfile}
        onToggle={onToggle}
        isPending={isPending}
      />
      <div className="flex-1 overflow-hidden">
        <SwatchList traits={user.traits ?? []} />
      </div>
      {showEmailOptIn && (
        <EmailOptInPopup
          onAccept={() => { onEmailOptIn(true); setEmailOptInDismissed(true) }}
          onDecline={() => { onEmailOptIn(false); setEmailOptInDismissed(true) }}
        />
      )}
    </div>
  )
}
