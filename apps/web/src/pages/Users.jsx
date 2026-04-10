import { useEffect, useRef } from 'react'
import { useSearch } from '@/features/search'
import { UserSwatch } from '@/shared/ui'
import { SearchHeader } from '@/shared/layout'

export const Users = () => {
  const { users, isLoading, error, hasMore, fetchMore, isFetchingMore, search, setSearch } = useSearch()
  const sentinelRef = useRef(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !isFetchingMore) fetchMore()
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, isFetchingMore, fetchMore])

  return (
    <div className="h-full flex flex-col">
      <SearchHeader value={search} onChange={e => setSearch(e.target.value)} />
      <div className="flex-1 overflow-y-auto bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <span className="font-sans text-sm text-gray-400">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <span className="font-sans text-sm text-gray-400">Something went wrong</span>
          </div>
        ) : (
          <>
            {users.map(user => <UserSwatch key={user.username} user={user} />)}
            <div ref={sentinelRef} />
          </>
        )}
      </div>
    </div>
  )
}
