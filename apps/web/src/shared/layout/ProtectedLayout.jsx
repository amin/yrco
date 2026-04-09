import { useState } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import { NavBar } from './components/NavBar'
import { QrOverlay } from './components/QrOverlay'
import { PageTransition } from './PageTransition'

export const ProtectedLayout = ({ children }) => {
  const [qrOpen, setQrOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="relative h-svh">
      <QrOverlay username={user?.username} open={qrOpen} />
      {qrOpen && (
        <div className="absolute inset-0 z-[9]" onClick={() => setQrOpen(false)} />
      )}
      <PageTransition>
        {children}
      </PageTransition>
      <NavBar onQrToggle={() => setQrOpen(prev => !prev)} qrActive={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  )
}
