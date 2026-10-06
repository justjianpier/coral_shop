const API_BASE_URL = "/api";

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method ?? "GET";
  let csrfHeaders = {};
  if (method !== "GET") {
    const tokenResponse = await fetch("/api/auth/csrf");
    if (!tokenResponse.ok) throw new Error("Unable to verify your session. Please try again.");
    const { token } = await tokenResponse.json();
    csrfHeaders = { "X-CSRF-TOKEN": token };
  }

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...csrfHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.detail || (response.status === 403
      ? "Admin access required. Please sign in again."
      : `Request failed (${response.status})`));
  }

  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) =>
    request(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body) =>
    request(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: "DELETE" }),
};
