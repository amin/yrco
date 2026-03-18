import { signOut } from "firebase/auth";
import { useUser } from "../hooks/useUser";
import { auth } from "../lib/firebase";

export default function Home() {
  const user = useUser();

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
      <img src={user.picture} alt={user.name} />
      <p>{user.name}</p>
      <p>{user.email}</p>
      <button onClick={() => signOut(auth)}>Sign out</button>
    </div>
  );
}
