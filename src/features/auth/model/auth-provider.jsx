import { useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../api/auth-api";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    getCurrentUser({ signal: controller.signal })
      .then((user) => {
        if (!controller.signal.aborted) setAccount(user);
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setChecking(false);
      });

    return () => controller.abort();
  }, []);

  async function signIn(credentials) {
    const user = await loginUser(credentials);
    setAccount(user);
    setError(null);
    return user;
  }

  async function signOut() {
    await logoutUser();
    setAccount(null);
    setError(null);
  }

  return (
    <AuthContext.Provider value={{ account, checking, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
