import { useNavigate, useLocation } from 'react-router-dom'
import { QrIcon, HeartIcon, SearchIcon, HomeIcon } from '@/shared/icons'

export const NavBar = ({ onQrToggle, qrActive }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <div className="absolute bottom-0 right-0 pb-m pr-m flex flex-col gap-m items-center z-20">
      <button onClick={onQrToggle} className="w-17 aspect-square rounded-full bg-yrgo-red flex items-center justify-center">
        <QrIcon active={qrActive} size={20} className="text-white" />
      </button>
      <div className="w-17 flex flex-col">
        <button className="w-full h-17 bg-yrgo-red rounded-t-full flex items-center justify-center">
          <HeartIcon size={20} className="text-white" />
        </button>
        <button onClick={() => navigate('/users')} className="w-full aspect-square bg-yrgo-red flex items-center justify-center">
          <SearchIcon active={pathname === '/users'} size={20} className="text-white" />
        </button>
        <button onClick={() => navigate('/palette')} className="w-full aspect-square bg-yrgo-red rounded-b-full flex items-center justify-center">
          <HomeIcon active={pathname === '/palette'} size={20} className="text-white" />
        </button>
      </div>
    </div>
  )
}
