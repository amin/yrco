import { useState } from "react";
import { useMe, useLogout } from "../hooks/user";
import { useMyWords } from "../hooks/useWords";
import Spinner from "../components/Spinner";

export default function Me() {
  const { data: user, isLoading } = useMe();
  const { data: words } = useMyWords();
  const logout = useLogout();
  const [activeId, setActiveId] = useState(null);

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-6 pb-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        <div className="flex items-center gap-4 mb-6">
          <img src={user.picture} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-gray-900 text-lg">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {words?.length > 0 && (
        <div className="px-6">
          <div className="flex flex-col gap-2 mb-3">
            {words.map(({ id, word, color }) => (
              <button
                key={id}
                onClick={() => setActiveId(activeId === id ? null : id)}
                className="w-full rounded-xl py-4 flex items-center justify-between px-5 transition-opacity active:opacity-80"
                style={{ backgroundColor: color }}
              >
                <span className="text-white font-semibold">{word}</span>
                <span className="text-white/70 text-xs font-mono">{color}</span>
              </button>
            ))}
          </div>

          {activeId && (
            <div className="rounded-xl p-4 bg-white border border-gray-100 mb-4">
              <p className="text-sm text-gray-600 italic">
                "{words.find((w) => w.id === activeId)?.icebreaker}"
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto p-6">
        <button
          onClick={logout}
          className="w-full border border-gray-200 text-gray-700 text-sm font-medium py-4 rounded-xl hover:bg-gray-100 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
