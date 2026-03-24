import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";

export function useConnections() {
  const user = useAuth();
  return useQuery({
    queryKey: ["connections"],
    queryFn: () => api.get("/account/connections").then((r) => r.data),
    enabled: !!user,
  });
}
