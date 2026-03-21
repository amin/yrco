import { useAuth } from "../context/AuthContext";

export function useMe() {
  const user = useAuth();
  return {
    data: user,
    isLoading: user === undefined,
  };
}
