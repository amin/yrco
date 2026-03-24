import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

export function useRemoveConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (username) => api.delete(`/account/connections/${username}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["connections"] }),
  });
}
