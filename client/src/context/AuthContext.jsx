import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [firebaseUser, setFirebaseUser] = useState(undefined);

  useEffect(() => {
    return onAuthStateChanged(auth, setFirebaseUser);
  }, []);

  return <AuthContext.Provider value={firebaseUser}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
