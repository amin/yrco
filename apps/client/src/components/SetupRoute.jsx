import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SetupRoute() {
  const user = useAuth();
  const [searchParams] = useSearchParams();

  if (user === undefined) return null;
  if (!user) return <Navigate to="/login" />;
  if (user.setupComplete === true) {
    const redirect = searchParams.get("redirect") || sessionStorage.getItem("redirectAfterLogin");
    sessionStorage.removeItem("redirectAfterLogin");
    return <Navigate to={redirect || `/@${user.username}`} />;
  }

  return <Outlet />;
}
