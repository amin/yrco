import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState(undefined);

  useEffect(() => {
    return onAuthStateChanged(auth, setFirebaseUser);
  }, []);

  return firebaseUser;
}
