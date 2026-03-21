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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">Profile</h1>

        <div className="flex items-center gap-4 mb-6">
          <img src={user.picture} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
          <div>
            <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        {words?.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-col gap-2 mb-3">
              {words.map(({ id, word, color }) => (
                <button
                  key={id}
                  onClick={() => setActiveId(activeId === id ? null : id)}
                  className="w-full rounded-lg py-3 flex items-center justify-between px-4 transition-opacity"
                  style={{ backgroundColor: color }}
                >
                  <span className="text-white text-sm font-semibold">{word}</span>
                  <span className="text-white/70 text-xs font-mono">{color}</span>
                </button>
              ))}
            </div>

            {activeId && (
              <div className="rounded-lg p-3 bg-gray-50 border border-gray-100">
                <p className="text-sm text-gray-600 italic">
                  "{words.find((w) => w.id === activeId)?.icebreaker}"
                </p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={logout}
          className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
