import { useState } from 'react'
import { useConnections } from '@/features/connections/hooks/useConnections'
import { UserSwatch } from '@/shared/ui'
import { InputText } from '@/shared/ui/inputs/InputText'
import { CloseIcon } from '@/shared/icons'

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
      <div className="bg-yrgo-red flex flex-col justify-end h-[140px] pb-base px-s shrink-0">
        <div className="flex items-center gap-s">
          <InputText
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            showSearch={!query}
            className="flex-1"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-white shrink-0">
              <CloseIcon />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
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
