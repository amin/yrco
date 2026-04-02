import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { NavBar } from './components/NavBar'
import { QrOverlay } from './components/QrOverlay'

export const ProtectedLayout = ({ children }) => {
  const [qrOpen, setQrOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="relative h-screen">
      <QrOverlay username={user?.username} open={qrOpen} />
      {children}
      <NavBar onQrToggle={() => setQrOpen(prev => !prev)} />
    </div>
  )
}
