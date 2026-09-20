import { CartNotification } from "../features/cart/components/cart-notification";
import { CartProvider } from "../features/cart/model/cart-provider";

export function AppProviders({ children }) {
  return (
    <CartProvider>
      {children}
      <CartNotification />
    </CartProvider>
  );
}
