import { useProfile, ProfileCard } from '@/features/profile'
import { useConnections } from '@/features/connections'
import { EmailOptInPopup } from '@/features/connections/ui/EmailOptInPopup'
import { SwatchList } from '@/shared/ui'

export const Profile = () => {
  const { user, isLoading } = useProfile()
  const { isOwnProfile, isConnected, isPending, onToggle, showEmailOptIn, onEmailOptIn } = useConnections(user?.username)

  if (isLoading || !user) return null

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
          onAccept={() => onEmailOptIn(true)}
          onDecline={() => onEmailOptIn(false)}
        />
      )}
    </div>
  )
}
