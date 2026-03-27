import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export function useTraits() {
  return useQuery({
    queryKey: ["traits"],
    queryFn: async () => {
      const res = await api.get("/traits");
      return res.data;
    },
  });
}

export function useMyTraits() {
  return useQuery({
    queryKey: ["myTraits"],
    queryFn: async () => {
      const res = await api.get("/users/me/traits");
      return res.data;
    },
  });
}
