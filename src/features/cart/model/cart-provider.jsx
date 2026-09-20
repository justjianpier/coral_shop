import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { CartContext } from "./cart-context";
import { CART_ACTIONS, MAX_CART_ITEMS, cartReducer } from "./cart-reducer";

const NOTIFICATION_DURATION = 3000;

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [notification, setNotification] = useState(null);
  const notificationIdRef = useRef(0);
  const notificationTimerRef = useRef(null);

  const showNotification = useCallback((message, type) => {
    window.clearTimeout(notificationTimerRef.current);
    notificationIdRef.current += 1;

    setNotification({
      id: notificationIdRef.current,
      message,
      type,
    });

    notificationTimerRef.current = window.setTimeout(() => {
      setNotification(null);
      notificationTimerRef.current = null;
    }, NOTIFICATION_DURATION);
  }, []);

  useEffect(
    () => () => window.clearTimeout(notificationTimerRef.current),
    [],
  );

  const addToCart = useCallback(
    (item) => {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem?.quantity >= MAX_CART_ITEMS) return;

      dispatch({ type: CART_ACTIONS.add, item });
      showNotification("Producto agregado al carrito correctamente.", "success");
    },
    [cart, showNotification],
  );

  const removeFromCart = useCallback(
    (id) => {
      const itemExists = cart.some((item) => item.id === id);
      if (!itemExists) return;

      dispatch({ type: CART_ACTIONS.remove, id });
      showNotification("Producto eliminado del carrito.", "error");
    },
    [cart, showNotification],
  );

  const decreaseQuantity = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.decrease, id });
  }, []);

  const increaseQuantity = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.increase, id });
  }, []);

  const clearCart = useCallback(() => {
    if (cart.length === 0) return;

    dispatch({ type: CART_ACTIONS.clear });
    showNotification("Productos eliminados del carrito.", "error");
  }, [cart.length, showNotification]);

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
      notification,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [
      cart,
      cartTotal,
      notification,
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
