import { api } from "./api";

export const categoriesService = {
  getAll: () => api.get("/categories"),
  create: (category) => api.post("/categories", category),
  update: (id, category) => api.put(`/categories/${id}`, category),
  delete: (id) => api.delete(`/categories/${id}`),
};
