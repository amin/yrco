import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { NavBar } from './components/NavBar'
import { QrOverlay } from './components/QrOverlay'
import { PageTransition } from './PageTransition'

export const ProtectedLayout = ({ children }) => {
  const [qrOpen, setQrOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="relative h-screen">
      <QrOverlay username={user?.username} open={qrOpen} />
      <PageTransition>
        {children}
      </PageTransition>
      <NavBar onQrToggle={() => setQrOpen(prev => !prev)} qrActive={qrOpen} />
    </div>
  )
}
