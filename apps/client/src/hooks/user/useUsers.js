import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

export function useUsers(page, search = "") {
  return useQuery({
    queryKey: ["users", page, search],
    queryFn: () => api.get(`/users?page=${page}&search=${encodeURIComponent(search)}`).then((r) => r.data),
  });
}
