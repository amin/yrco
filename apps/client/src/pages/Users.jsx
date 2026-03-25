import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../hooks/user";
import Spinner from "../components/Spinner";

export default function Users() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUsers(page);

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>
      <div className="flex flex-col gap-3">
        {data?.users.map((user) => (
          <Link
            key={user.username}
            to={`/@${user.username}`}
            className="bg-white rounded-xl p-5 flex items-center gap-4 border border-gray-100 active:opacity-80 transition-opacity"
          >
            <img src={user.picture} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-lg truncate">{user.firstName} {user.lastName}</p>
              <p className="text-base text-gray-500">@{user.username}</p>
            </div>
            <div className="flex gap-1.5">
              {user.words.map((w) => (
                <span key={w.id} className="w-6 h-6 rounded-full" style={{ backgroundColor: w.color }} />
              ))}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
          className="border border-gray-200 text-gray-700 text-base font-medium px-5 py-3 rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>
        <span className="text-gray-500 text-sm self-center">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data?.hasMore}
          className="border border-gray-200 text-gray-700 text-base font-medium px-5 py-3 rounded-xl bg-white hover:bg-gray-100 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
