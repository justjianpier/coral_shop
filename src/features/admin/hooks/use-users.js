import { useState, useEffect } from "react";
import { usersService } from "../services/users-service";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUsers() {
      try {
        const data = await usersService.getAll();
        if (!cancelled) setUsers(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateRole = async (id, roleId) => {
    try {
      await usersService.updateRole(id, roleId);
      const data = await usersService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return { users, loading, error, updateRole };
}
