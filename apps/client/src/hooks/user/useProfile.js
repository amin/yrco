import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export function useProfile(username) {
  return useQuery({
    queryKey: ["profile", username],
    queryFn: async () => {
      const res = await api.get(`/users/${username}`);
      return res.data;
    },
    enabled: !!username,
    retry: false,
  });
}
