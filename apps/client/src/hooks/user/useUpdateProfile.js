import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => api.patch("/account", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      queryClient.invalidateQueries({ queryKey: ["myWords"] });
    },
  });
}
