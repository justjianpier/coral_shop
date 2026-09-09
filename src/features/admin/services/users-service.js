import { api } from "./api";

export const usersService = {
  getAll: () => api.get("/users"),
  updateRole: (id, roleId) => api.put(`/users/${id}/role`, { roleId }),
};
