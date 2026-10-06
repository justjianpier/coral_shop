import { CartNotification } from "../features/cart/components/cart-notification";
import { CartProvider } from "../features/cart/model/cart-provider";
import { AuthProvider } from "../features/auth/model/auth-provider";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartNotification />
      </CartProvider>
    </AuthProvider>
  );
}
