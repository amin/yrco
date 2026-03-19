import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const user = useAuth();

  if (user === undefined) return null;
  if (!user) return <Navigate to="/403" />;

  return <Outlet />;
}
