import { useCallback, useMemo, useReducer } from "react";
import { CartContext } from "./cart-context";
import { CART_ACTIONS, cartReducer } from "./cart-reducer";

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = useCallback((item) => {
    dispatch({ type: CART_ACTIONS.add, item });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.remove, id });
  }, []);

  const decreaseQuantity = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.decrease, id });
  }, []);

  const increaseQuantity = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.increase, id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.clear });
  }, []);

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
      ),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      cartTotal,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [
      cart,
      cartTotal,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}
