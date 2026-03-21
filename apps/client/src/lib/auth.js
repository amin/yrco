import api from "./api";
import { queryClient } from "./queryClient";

export async function logout() {
  await api.post("/auth/logout");
  queryClient.setQueryData(["me"], null);
}
