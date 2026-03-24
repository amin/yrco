import { useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

export function useLogout() {
  const queryClient = useQueryClient();

  return async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      queryClient.clear();
    }
  };
}
