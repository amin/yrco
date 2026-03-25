import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export function useUsers(page) {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => api.get(`/users?page=${page}`).then((r) => r.data),
  });
}
