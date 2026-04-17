import { matchPath } from 'react-router-dom'

const STATIC_APP_PATHS = new Set(['/palette', '/users', '/connections'])
const RESERVED_SEGMENTS = new Set(['setup', 'logout', 'login', 'auth', 'error'])

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
