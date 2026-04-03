import { useNavigate } from 'react-router-dom'

export const UserSwatch = ({ user }) => {
  const navigate = useNavigate()
  const [first, ...rest] = user.traits

  return (
    <button onClick={() => navigate(`/${user.username}`)} className="flex w-full h-36 overflow-hidden shrink-0 cursor-pointer">
      <div className="flex items-end p-base shrink-0" style={{ backgroundColor: first?.color }}>
        <div className="flex flex-col items-start">
          <span className="font-sans text-sm leading-base tracking-tight">{user.name}</span>
          <span className="font-sans text-sm leading-base tracking-tight">{user.education ?? user.organizationName}</span>
        </div>
      </div>
      {rest.map(({ id, color }) => (
        <div key={id} className="flex-1 h-full" style={{ backgroundColor: color }} />
      ))}
    </button>
  )
}
