import { useProfile, ProfileCard } from '@/features/profile'
import { useConnections } from '@/features/connections'
import { TraitList } from '@/features/traits'

export const Profile = () => {
  const { user, isLoading } = useProfile()
  const { isOwnProfile, isConnected, isPending, onToggle } = useConnections(user?.username)

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
        <TraitList traits={user.traits ?? []} />
      </div>
    </div>
  )
}
