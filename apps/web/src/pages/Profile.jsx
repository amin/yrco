import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { ProfileCard } from '@/features/profile'
import { TraitList } from '@/shared/ui/traits'

export const Profile = () => {
  const { username } = useParams()
  const { data: user, isLoading } = useQuery({
    queryKey: ['users', username],
    queryFn: () => api.get(`/users/${username}`).then(r => r.data),
  })

  if (isLoading) return null

  return (
    <div className="h-full flex flex-col">
      <ProfileCard user={user} />
      <div className="flex-1 overflow-hidden">
        <TraitList traits={user.traits} />
      </div>
    </div>
  )
}
