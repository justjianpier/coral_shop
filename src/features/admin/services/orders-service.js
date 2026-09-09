import { api } from "./api";

export const ordersService = {
  getAll: () => api.get("/orders"),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};
