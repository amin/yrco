import { Login, Setup, Users, Connections, Traits, AuthCallback, Palette, Logout } from '@/pages'

export const PROTECTED_ROUTES = [
  { path: '/palette',     element: <Palette /> },
  { path: '/setup',       element: <Setup /> },
  { path: '/users',       element: <Users /> },
  { path: '/connections', element: <Connections /> },
  { path: '/traits',      element: <Traits /> },
  { path: '/logout',      element: <Logout /> },
]

export const PUBLIC_ROUTES = [
  { path: '/login', element: <Login /> },
]

export const UNGUARDED_ROUTES = [
  { path: '/auth/callback', element: <AuthCallback /> },
]
