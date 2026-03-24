import { Link } from "react-router-dom";
import { useConnections } from "../hooks/user";
import Spinner from "../components/Spinner";

export default function Connections() {
  const { data: connections, isLoading } = useConnections();

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Connections</h1>
      {connections?.length === 0 && (
        <p className="text-sm text-gray-500">No connections yet.</p>
      )}
      <div className="flex flex-col gap-3">
        {connections?.map((c) => (
          <Link
            key={c.username}
            to={`/@${c.username}`}
            className="bg-white rounded-xl p-5 flex items-center gap-4 border border-gray-100 active:opacity-80 transition-opacity"
          >
            <img src={c.picture} alt={c.name} className="w-14 h-14 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-lg truncate">{c.firstName} {c.lastName}</p>
              <p className="text-base text-gray-500">@{c.username}</p>
            </div>
            <div className="flex gap-1.5">
              {c.words.map((w) => (
                <span key={w.id} className="w-6 h-6 rounded-full" style={{ backgroundColor: w.color }} />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
