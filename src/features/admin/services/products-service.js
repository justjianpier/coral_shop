import { api } from "./api";

export const productsService = {
  getAll: () => api.get("/admin/products"),
  getOptions: () => api.get("/admin/catalog-options"),
  create: (product) => api.post("/admin/products", product),
};
