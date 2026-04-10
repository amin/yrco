import { useNavigate } from 'react-router-dom'

export const UserSwatch = ({ user }) => {
  const navigate = useNavigate()
  const [first, ...rest] = user.traits ?? []
  const hasTraits = first !== undefined

  return (
    <button onClick={() => navigate(`/${user.username}`)} aria-label={`View ${user.name}'s profile`} className="flex w-full h-36 overflow-hidden shrink-0 cursor-pointer">
      {hasTraits ? (
        <>
          <div className="flex items-end p-base shrink-0 h-full" style={{ backgroundColor: first.color, color: first.colorText }}>
            <div className="flex flex-col items-start">
              <span className="font-sans text-sm leading-base tracking-tight">{user.name}</span>
              <span className="font-sans text-sm leading-base tracking-tight">{user.education ?? user.organizationName}</span>
            </div>
          </div>
          {rest.map(({ id, color }) => (
            <div key={id} className="flex-1 h-full" style={{ backgroundColor: color }} />
          ))}
        </>
      ) : (
        <div className="flex items-end p-base w-full h-full bg-yrgo-light-blue">
          <div className="flex flex-col items-start">
            <span className="font-sans text-sm leading-base tracking-tight">{user.name}</span>
            <span className="font-sans text-sm leading-base tracking-tight text-dark-grey">No traits found</span>
          </div>
        </div>
      )}
    </button>
  )
}
