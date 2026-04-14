import { useState, useEffect } from 'react'
import { useSearchParams, matchPath } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { APP_ROUTES } from '@/shared/routes'

const ANIMATION_URL =
  'https://res.cloudinary.com/dmvfsm0ls/video/upload/q_auto/yrco/login-animation.mp4'

export const Login = () => {
  const [searchParams] = useSearchParams()
  const raw = searchParams.get('redirect')
  const redirect = raw && APP_ROUTES.some(r => matchPath(r.path, raw)) ? raw : null

  const params = new URLSearchParams({ origin: window.location.origin })
  if (redirect) params.set('redirect', redirect)
  const authUrl = `${import.meta.env.VITE_API_URL}/auth/linkedin?${params}`

  const [animationDone, setAnimationDone] = useState(false)
  const done = () => setAnimationDone(true)

  useEffect(() => {
    const t = setTimeout(done, 15000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="h-svh relative bg-white">
      <AnimatePresence>
        {!animationDone && (
          <motion.video
            key="login-animation"
            src={ANIMATION_URL}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={done}
            onError={done}
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full aspect-square"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {animationDone && (
          <motion.div
            key="login-button"
            className="absolute inset-0 flex items-center justify-center p-m"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <a
              href={authUrl}
              className="inline-flex items-center justify-center rounded-full h-11 px-l py-s font-sans text-sm leading-base tracking-tight whitespace-nowrap bg-yrgo-red text-white active:bg-yrgo-red-active"
            >
              Login with Linkedin
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
