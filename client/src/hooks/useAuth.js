import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

export function useAuth() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      setUser(snap.data());
    });
  }, []);

  return user;
}
