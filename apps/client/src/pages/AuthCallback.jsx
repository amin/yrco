import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export default function AuthCallback() {
  const user = useAuth();
  const isFetchingMe = useIsFetching({ queryKey: ["me"] });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (user === undefined || isFetchingMe) return;

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (user.setupComplete === false) {
      navigate(redirect ? `/setup?redirect=${encodeURIComponent(redirect)}` : "/setup", { replace: true });
    } else {
      navigate(redirect || `/@${user.username}`, { replace: true });
    }
  }, [user, isFetchingMe, navigate, redirect]);

  return null;
}
