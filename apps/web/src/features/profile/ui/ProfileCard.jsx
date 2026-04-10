import { HeartButton } from '@/shared/ui/buttons'

export const ProfileCard = ({ user, isConnected = false, isOwnProfile = false, onToggle, isPending = false }) => (
  <div className="bg-yrgo-red flex flex-col justify-end shrink-0 h-[252px]">
    <div className="flex flex-col justify-between pb-base">
      <div className="flex flex-col gap-s px-base">
        <p className="font-sans text-xl leading-xl tracking-tighter text-white font-light">{user.name}</p>
        {user.role === 'student' ? (
          user.education && (
            <p className="font-sans text-xl leading-xl tracking-tighter text-white font-light">{user.education}</p>
          )
        ) : (
          (user.roleAtCompany && user.organizationName) ? (
            <div className="flex gap-s items-start">
              <p className="font-sans text-xl leading-xl tracking-tighter text-white font-light whitespace-nowrap shrink-0">{user.roleAtCompany} at</p>
              <p className="font-sans text-xl leading-xl tracking-tighter text-white font-light">{user.organizationName}</p>
            </div>
          ) : (user.roleAtCompany || user.organizationName) ? (
            <p className="font-sans text-xl leading-xl tracking-tighter text-white font-light">
              {user.roleAtCompany || user.organizationName}
            </p>
          ) : null
        )}
      </div>
      <div className="flex items-center justify-end gap-m pr-base pt-base">
        {(user.website || user.website2) && (
          <div className="flex flex-col gap-s items-end">
            {user.website && (
              <a href={user.website} target="_blank" rel="noreferrer" className="text-white underline font-sans text-xl leading-xl tracking-tighter font-light cursor-pointer">
                Link
              </a>
            )}
            {user.website2 && (
              <a href={user.website2} target="_blank" rel="noreferrer" className="text-white underline font-sans text-xl leading-xl tracking-tighter font-light cursor-pointer">
                Link
              </a>
            )}
          </div>
        )}
        {!isOwnProfile && (
          <HeartButton active={isConnected} disabled={isPending} onClick={onToggle} />
        )}
      </div>
    </div>
  </div>
)
