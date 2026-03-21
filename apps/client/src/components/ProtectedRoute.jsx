import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const user = useAuth();
  const location = useLocation();

  if (user === undefined) return null;
  if (!user) {
    sessionStorage.setItem("redirectAfterLogin", location.pathname);
    return <Navigate to="/login" />;
  }
  if (user.setupComplete === false) return <Navigate to="/setup" />;

  return <Outlet />;
}
