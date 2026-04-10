import { Login, Setup, Users, Connections, AuthCallback, Palette, Logout, Profile, Error } from '@/pages'

export const APP_ROUTES = [
  { path: '/palette',     element: <Palette /> },
  { path: '/users',       element: <Users /> },
  { path: '/:username',   element: <Profile /> },
  { path: '/connections', element: <Connections /> },
]

export const AUTH_ROUTES = [
  { path: '/setup',  element: <Setup /> },
  { path: '/logout', element: <Logout /> },
]

export const PUBLIC_ROUTES = [
  { path: '/login', element: <Login /> },
]

export const OPEN_ROUTES = [
  { path: '/auth/callback', element: <AuthCallback /> },
  { path: '/error', element: <Error /> },
]
