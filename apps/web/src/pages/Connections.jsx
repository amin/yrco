import { useState } from 'react'
import { useConnections } from '@/features/connections/hooks/useConnections'
import { UserSwatch } from '@/shared/ui'
import { SearchHeader } from '@/shared/layout'

export const Connections = () => {
  const { connections = [] } = useConnections()
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? connections.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        (c.education ?? c.organizationName ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : connections

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <SearchHeader value={query} onChange={e => setQuery(e.target.value)} onClear={() => setQuery('')} />

      <div className="flex-1 overflow-y-auto bg-white">
        {filtered.length > 0 ? (
          filtered.map(user => <UserSwatch key={user.username} user={user} />)
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="font-sans text-sm text-gray-400">
              {connections.length === 0 ? 'No connections yet' : 'No results'}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
