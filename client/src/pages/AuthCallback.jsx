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

  return <div>Signing in...</div>;
}
