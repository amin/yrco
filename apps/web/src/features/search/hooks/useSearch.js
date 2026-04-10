import { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'

export function useSearch() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const query = useInfiniteQuery({
    queryKey: queryKeys.users(debouncedSearch),
    queryFn: ({ pageParam = 1 }) =>
      api.get('/users', { params: { search: debouncedSearch, page: pageParam } }).then(r => r.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasMore ? lastPageParam + 1 : undefined,
  })

  const users = query.data?.pages.flatMap(p => p.users) ?? []

  return {
    users,
    error: query.error,
    hasMore: query.hasNextPage,
    fetchMore: query.fetchNextPage,
    isFetchingMore: query.isFetchingNextPage,
    search,
    setSearch,
  }
}
