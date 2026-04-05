import { useSearch, SearchHeader, UserSwatch } from '@/features/search'

export const Users = () => {
  const { users, search, setSearch } = useSearch()

  return (
    <div className="h-full flex flex-col">
      <SearchHeader value={search} onChange={e => setSearch(e.target.value)} />
      <div className="flex-1 overflow-y-auto">
        {users.map(user => <UserSwatch key={user.username} user={user} />)}
      </div>
    </div>
  )
}
