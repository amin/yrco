import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setupSchema } from "@colyr/shared";
import api from "../../lib/api";

export function useCompleteSetup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      setupSchema.parse(data);
      return api.post("/users/me/setup", data);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
}
