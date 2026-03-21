import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const redirect = sessionStorage.getItem("redirectAfterLogin");
    sessionStorage.removeItem("redirectAfterLogin");
    navigate(redirect || "/me", { replace: true });
  }, [user, navigate]);

  if (user === undefined) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Yingle</h1>
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
