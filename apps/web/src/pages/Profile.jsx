import { useProfile, ProfileCard } from '@/features/profile'
import { TraitList } from '@/shared/ui/traits'

export const Profile = () => {
  const { user, isLoading } = useProfile()

  if (isLoading || !user) return null

  return (
    <div className="h-full flex flex-col">
      <ProfileCard user={user} />
      <div className="flex-1 overflow-hidden">
        <TraitList traits={user.traits ?? []} />
      </div>
    </div>
  )
}
