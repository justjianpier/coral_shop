import { useEffect, useState } from "react";
import { getProducts } from "../services/get-products";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};
