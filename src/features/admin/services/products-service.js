import { api } from "./api";

export const productsService = {
  getAll: () => api.get("/admin/products"),
  getOptions: () => api.get("/admin/catalog-options"),
  create: (product) => api.post("/admin/products", product),
  searchCj: (keyword, page) => api.get(`/admin/cj/search?${new URLSearchParams({ keyword, page })}`),
  getCjProduct: (pid) => api.get(`/admin/cj/product?${new URLSearchParams({ pid })}`),
  importCj: (product) => api.post("/admin/cj/import", product),
};
