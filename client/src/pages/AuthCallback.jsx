import { useEffect } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../lib/firebase";
import { redirectToError } from "../lib/errorRedirect";
import Spinner from "../components/Spinner";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      redirectToError("Authentication failed");
      return;
    }

    window.history.replaceState({}, "", "/auth/callback");

    signInWithCustomToken(auth, token)
      .then(() => navigate("/"))
      .catch(() => redirectToError("Authentication failed"));
  }, [searchParams]);

  return <Spinner label="Signing in..." />;
}
