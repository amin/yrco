import { useProfilePage, ProfileCard } from '@/features/profile'
import { TraitList } from '@/features/traits'

export const Profile = () => {
  const { user, isLoading, isOwnProfile, isConnected, isPending, onToggle } = useProfilePage()

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
