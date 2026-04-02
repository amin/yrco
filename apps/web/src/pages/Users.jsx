import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { SearchHeader, UserSwatch } from '@/features/search'

export const Users = () => {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const { data } = useQuery({
    queryKey: ['users', debouncedSearch],
    queryFn: () => api.get('/users', { params: { search: debouncedSearch } }).then(r => r.data),
  })

  return (
    <div className="h-full flex flex-col">
      <SearchHeader value={search} onChange={e => setSearch(e.target.value)} />
      <div className="flex-1 overflow-y-auto">
        {data?.users.map(user => <UserSwatch key={user.username} user={user} />)}
      </div>
    </div>
  )
}
