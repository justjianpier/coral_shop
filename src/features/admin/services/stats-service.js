import { api } from "./api";

export const statsService = {
  getOverview: () => api.get("/stats/overview"),
};
