import { useAuth } from "../context/AuthContext";
import { logout } from "../lib/firebase";

export default function Dashboard() {
  const user = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <img src={user.picture} alt={user.name} />
      <p>{user.firstName} {user.lastName}</p>
      <p>{user.email}</p>
      <button onClick={logout}>Sign out</button>
    </div>
  );
}
