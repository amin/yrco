import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./useAuth";

export function useUser() {
  const firebaseUser = useAuth();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (firebaseUser === undefined) return;

    if (firebaseUser === null) {
      setUser(null);
      return;
    }

    getDoc(doc(db, "users", firebaseUser.uid)).then((snap) =>
      setUser(snap.data())
    );
  }, [firebaseUser]);

  return user;
}
