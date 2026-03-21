import { useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

export function useLogout() {
  const queryClient = useQueryClient();

  return async () => {
    await api.post("/auth/logout");
    queryClient.setQueryData(["me"], null);
  };
}
