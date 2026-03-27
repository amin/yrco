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

