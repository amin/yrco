import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

export function useCompleteSetup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (role) => api.post("/users/me/setup", { role }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
}
