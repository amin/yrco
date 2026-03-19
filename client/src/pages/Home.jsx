import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../lib/firebase";

export default function Home() {
  const user = useAuth();

  if (user === undefined) return null;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Yingler</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to get started</p>
          <a
            href={`${import.meta.env.VITE_SERVER_URL}/auth/linkedin`}
            className="block w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Sign in with LinkedIn
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Yingler</h1>
        <p className="text-sm text-gray-500 mb-6">Welcome back</p>
        <Link
          to="/dashboard"
          className="block w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors mb-3"
        >
          Go to Dashboard
        </Link>
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
