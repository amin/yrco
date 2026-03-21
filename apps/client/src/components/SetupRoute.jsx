import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SetupRoute() {
  const user = useAuth();

  if (user === undefined) return null;
  if (!user) return <Navigate to="/" />;
  if (user.setupComplete !== false) return <Navigate to="/" />;

  return <Outlet />;
}
