import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

export function useAddConnection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ username }) => api.post("/users/me/connections", { username }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["connections"] }),
  });
}
