import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../lib/firebase";

export default function Home() {
  const user = useAuth();

  if (user === undefined) return null;

  if (!user) {
    return (
      <a href={`${import.meta.env.VITE_SERVER_URL}/auth/linkedin`}>
        Sign in with LinkedIn
      </a>
    );
  }

  return (
    <div>
      <Link to="/dashboard">Go to Dashboard</Link>
      <button onClick={logout}>Sign out</button>
    </div>
  );
}
