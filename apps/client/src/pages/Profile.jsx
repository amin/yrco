import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useProfile, useConnections, useAddConnection, useRemoveConnection } from "../hooks/user";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import NotFound from "./errors/NotFound";

export default function Profile() {
  const { username: raw } = useParams();

  if (!raw?.startsWith("@")) return <Navigate to={`/@${raw}`} replace />;

  const username = raw.slice(1);
  const { data: profile, isLoading } = useProfile(username);
  const user = useAuth();
  const { data: connections } = useConnections();
  const addConnection = useAddConnection();
  const removeConnection = useRemoveConnection();

  const isOwnProfile = user?.username === username;
  const isConnected = connections?.some((c) => c.username === username);
  const [activeId, setActiveId] = useState(null);

  if (isLoading) return <Spinner />;
  if (!profile) return <NotFound />;

  const words = profile.words ?? [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="p-6 pb-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        <div className="flex items-center gap-4 mb-6">
          <img src={profile.picture} alt={profile.name} className="w-16 h-16 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-lg">{profile.firstName} {profile.lastName}</p>
            <p className="text-sm text-gray-500">@{profile.username}</p>
          </div>
          {user && !isOwnProfile && (
            isConnected ? (
              <button
                onClick={() => removeConnection.mutate(username)}
                disabled={removeConnection.isPending}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Connected
              </button>
            ) : (
              <button
                onClick={() => addConnection.mutate({ username })}
                disabled={addConnection.isPending}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Connect
              </button>
            )
          )}
        </div>
      </div>

      {words.length > 0 && (
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

    </div>
  );
}
