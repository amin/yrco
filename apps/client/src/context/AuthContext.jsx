import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

const AuthContext = createContext(undefined);

async function fetchMe() {
  try {
    const res = await api.get("/account", { _skipAuthRedirect: true });
    return res.data;
  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 404) return null;
    throw err;
  }
}

export function AuthProvider({ children }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  return (
    <AuthContext.Provider value={isLoading ? undefined : user}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
