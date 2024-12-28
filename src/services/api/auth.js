import api from "@/services/api/apiClient";

const END_POINT = "/auth";

export async function login(email, password) {
  return api.post([END_POINT, "login"].join("/"), { email, password });
}
