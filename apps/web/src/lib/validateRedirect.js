import { matchPath } from 'react-router-dom'
import { APP_ROUTES, AUTH_ROUTES, PUBLIC_ROUTES, OPEN_ROUTES } from '@/shared/routes'

const STATIC_APP_PATHS = new Set(
  APP_ROUTES.map(r => r.path).filter(p => !p.includes(':')),
)

const RESERVED_SEGMENTS = new Set(
  [...AUTH_ROUTES, ...PUBLIC_ROUTES, ...OPEN_ROUTES]
    .map(r => r.path.split('/')[1])
    .filter(Boolean),
)

export function validateRedirect(raw) {
  if (typeof raw !== 'string') return null
  if (!raw.startsWith('/') || raw.startsWith('//')) return null
  if (raw.length > 200) return null
  if (STATIC_APP_PATHS.has(raw)) return raw

  const match = matchPath('/:username', raw)
  if (!match) return null
  if (RESERVED_SEGMENTS.has(match.params.username)) return null
  return raw
}
