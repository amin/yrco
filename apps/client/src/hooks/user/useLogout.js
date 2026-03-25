import { useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      queryClient.invalidateQueries(undefined, {
        refetchActive: true,
        refetchInactive: true,
      });
      navigate("/login");
    }
  };
}
