import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useUserSearch() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const { data } = useQuery({
    queryKey: queryKeys.users(debouncedSearch),
    queryFn: () => api.get('/users', { params: { search: debouncedSearch } }).then(r => r.data),
  })

  return { users: data?.users ?? [], search, setSearch }
}
