import { useEffect } from "react";
import { signInWithCustomToken } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../lib/firebase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    signInWithCustomToken(auth, token)
      .then(() => navigate("/"))
      .catch((err) => console.error("Auth failed:", err));
  }, []);

  return <div>Signing in...</div>;
}
