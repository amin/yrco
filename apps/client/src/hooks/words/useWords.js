import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export function useWords() {
  return useQuery({
    queryKey: ["words"],
    queryFn: async () => {
      const res = await api.get("/words");
      return res.data;
    },
  });
}

export function useMyWords() {
  return useQuery({
    queryKey: ["myWords"],
    queryFn: async () => {
      const res = await api.get("/users/me/words");
      return res.data;
    },
  });
}
