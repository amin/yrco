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
    navigate(redirect || `/@${user.username}`, { replace: true });
  }, [user, navigate]);

  if (user === undefined) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-end p-6 pb-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-8">Sign in to continue to Colyr</p>
      <a
        href={`${import.meta.env.VITE_SERVER_URL}/auth/linkedin`}
        className="w-full bg-blue-600 text-white text-sm font-medium py-3 rounded-xl text-center hover:bg-blue-500 transition-colors"
      >
        Sign in with LinkedIn
      </a>
    </div>
  );
}
