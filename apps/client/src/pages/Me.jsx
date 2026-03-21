import { useMe } from "../hooks/useMe";
import { logout } from "../lib/auth";
import Spinner from "../components/Spinner";

export default function Me() {
  const { data: user, isLoading } = useMe();

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
