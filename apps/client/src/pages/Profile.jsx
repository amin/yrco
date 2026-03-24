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
          <img src={profile.picture} alt={profile.name} className="w-20 h-20 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-2xl">{profile.firstName} {profile.lastName}</p>
            <p className="text-base text-gray-500">@{profile.username}</p>
          </div>
          {user && !isOwnProfile && (
            isConnected ? (
              <button
                onClick={() => removeConnection.mutate(username)}
                disabled={removeConnection.isPending}
                className="px-5 py-3 rounded-xl text-base font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Connected
              </button>
            ) : (
              <button
                onClick={() => addConnection.mutate({ username })}
                disabled={addConnection.isPending}
                className="px-5 py-3 rounded-xl text-base font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Connect
              </button>
            )
          )}
        </div>
      </div>

      {words.length > 0 && (
        <div className="px-6">
          <div className="flex flex-col gap-3 mb-3">
            {words.map(({ id, word, color, icebreaker }) => (
              <button
                key={id}
                onClick={() => setActiveId(activeId === id ? null : id)}
                className="w-full rounded-2xl px-6 py-5 flex flex-col text-left transition-all active:scale-[0.98] cursor-pointer"
                style={{ backgroundColor: color }}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-white text-xl font-bold tracking-tight">{word}</span>
                  <span className="text-white/60 text-lg">{activeId === id ? "−" : "+"}</span>
                </div>
                {activeId === id && (
                  <>
                    <div className="w-full border-t border-white/20 mt-4 mb-3" />
                    <p className="text-white text-lg font-medium leading-relaxed">"{icebreaker}"</p>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
