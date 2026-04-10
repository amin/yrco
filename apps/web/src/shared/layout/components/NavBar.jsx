import { useNavigate, useLocation } from 'react-router-dom'
import { QrIcon, HeartIcon, SearchIcon, HomeIcon } from '@/shared/icons'

export const NavBar = ({ onQrToggle, qrActive, onClose }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const go = (path) => {
    onClose?.()
    navigate(path)
  }

  return (
    <nav aria-label="Main navigation" className="absolute bottom-0 right-0 pb-3xl pr-base flex flex-col gap-m items-center z-20">
      <button onClick={onQrToggle} aria-label="QR code" className="w-17 aspect-square rounded-full bg-yrgo-red flex items-center justify-center cursor-pointer">
        <QrIcon active={qrActive} size={20} className="text-white" />
      </button>
      <div className="w-17 flex flex-col">
        <button onClick={() => go('/connections')} aria-label="Connections" aria-current={pathname === '/connections' ? 'page' : undefined} className="w-full h-17 bg-yrgo-red rounded-t-full flex items-center justify-center cursor-pointer">
          <HeartIcon active={pathname === '/connections'} size={20} className="text-white" />
        </button>
        <button onClick={() => go('/users')} aria-label="Search" aria-current={pathname === '/users' ? 'page' : undefined} className="w-full aspect-square bg-yrgo-red flex items-center justify-center cursor-pointer">
          <SearchIcon active={pathname === '/users'} size={20} className="text-white" />
        </button>
        <button onClick={() => go('/palette')} aria-label="Home" aria-current={pathname === '/palette' ? 'page' : undefined} className="w-full aspect-square bg-yrgo-red rounded-b-full flex items-center justify-center cursor-pointer">
          <HomeIcon active={pathname === '/palette'} size={20} className="text-white" />
        </button>
      </div>
    </nav>
  )
}
