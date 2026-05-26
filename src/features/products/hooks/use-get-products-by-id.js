import { useEffect, useState } from "react";
import { getProductsById } from "../services/get-products-by-id";

export const useGetProductsById = (id) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductsById(id)
      .then((data) => setProduct(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  return {
    product,
    loading,
    error,
  };
};
