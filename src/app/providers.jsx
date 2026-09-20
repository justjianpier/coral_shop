import { CartProvider } from "../features/cart/model/cart-provider";

export function AppProviders({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
