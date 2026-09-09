import { useState, useEffect } from "react";
import { ordersService } from "../services/orders-service";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchOrders() {
      try {
        const data = await ordersService.getAll();
        if (!cancelled) setOrders(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateStatus = async (id, status) => {
    await ordersService.updateStatus(id, status);
    const data = await ordersService.getAll();
    setOrders(data);
  };

  return { orders, loading, error, updateStatus };
}
