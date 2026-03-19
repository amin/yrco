import { useEffect } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../lib/firebase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/error?message=auth_failed");
      return;
    }

    window.history.replaceState({}, "", "/auth/callback");

    signInWithCustomToken(auth, token)
      .then(() => navigate("/"))
      .catch(() => navigate("/error?message=auth_failed"));
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm text-center">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-gray-500">Signing in...</p>
      </div>
    </div>
  );
}
