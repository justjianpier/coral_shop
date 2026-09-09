import { useState, useEffect } from "react";
import { categoriesService } from "../services/categories-service";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        const data = await categoriesService.getAll();
        if (!cancelled) setCategories(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  const createCategory = async (category) => {
    await categoriesService.create(category);
    const data = await categoriesService.getAll();
    setCategories(data);
  };

  const updateCategory = async (id, category) => {
    await categoriesService.update(id, category);
    const data = await categoriesService.getAll();
    setCategories(data);
  };

  const deleteCategory = async (id) => {
    await categoriesService.delete(id);
    const data = await categoriesService.getAll();
    setCategories(data);
  };

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
  };
}
