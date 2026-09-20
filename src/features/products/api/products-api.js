const PRODUCTS_API_URL = (
  import.meta.env.VITE_PRODUCTS_API_URL ?? "https://fakestoreapi.com/products"
).replace(/\/$/, "");

async function requestProducts(endpoint = "", { signal } = {}) {
  const response = await fetch(`${PRODUCTS_API_URL}${endpoint}`, { signal });

  if (!response.ok) {
    throw new Error(`Unable to load products (${response.status})`);
  }

  return response.json();
}

export function getProducts(options) {
  return requestProducts("", options);
}

export function getProduct(id, options) {
  return requestProducts(`/${encodeURIComponent(id)}`, options);
}
