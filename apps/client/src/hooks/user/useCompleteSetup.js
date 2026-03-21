import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setupSchema } from "@yingle/shared";
import api from "../../lib/api";

export function useCompleteSetup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (role) => {
      setupSchema.parse({ role });
      return api.post("/users/me/setup", { role });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
}
