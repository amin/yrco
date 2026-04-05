import { HeartButton } from '@/shared/ui/buttons'

export const ProfileCard = ({ user, isConnected = false, isOwnProfile = false, onToggle, isPending = false }) => (
  <div className="bg-yrgo-red flex flex-col justify-end shrink-0 h-[252px]">
    <div className="flex flex-col justify-between pb-m">
      <div className="flex flex-col gap-s px-base">
        <p className="font-sans text-xl leading-xl tracking-tighter text-white font-light">{user.name}</p>
        <p className="font-sans text-xl leading-xl tracking-tighter text-white font-light">
          {user.education ?? user.organizationName}
        </p>
      </div>
      <div className="flex items-center justify-end gap-m pr-base pt-m">
        {user.website && (
          <a href={user.website} target="_blank" rel="noreferrer" className="text-white underline font-sans text-xl leading-xl tracking-tighter font-light cursor-pointer">
            Website
          </a>
        )}
        {!isOwnProfile && (
          <HeartButton active={isConnected} disabled={isPending} onClick={onToggle} />
        )}
      </div>
    </div>
  </div>
)
