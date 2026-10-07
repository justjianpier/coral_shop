import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { CartContext } from "./cart-context";
import { CART_ACTIONS, MAX_CART_ITEMS, cartReducer } from "./cart-reducer";

const NOTIFICATION_DURATION = 3000;
const CART_STORAGE_KEY = "coral-cart-v1";

function loadCart() {
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(CART_STORAGE_KEY));
    if (!Array.isArray(stored)) return [];

    const seen = new Set();
    return stored.filter((item) => {
      if (!item || !Number.isSafeInteger(item.id) || item.id < 1
          || !Number.isSafeInteger(item.productId) || item.productId < 1
          || typeof item.title !== "string" || typeof item.image !== "string"
          || !Number.isFinite(item.price) || item.price < 0
          || !Number.isInteger(item.maxQuantity) || item.maxQuantity < 1
          || !Number.isInteger(item.quantity) || item.quantity < 1
          || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    }).map((item) => ({
      id: item.id,
      productId: item.productId,
      title: item.title,
      image: item.image,
      price: item.price,
      maxQuantity: Math.min(MAX_CART_ITEMS, item.maxQuantity),
      quantity: Math.min(item.quantity, MAX_CART_ITEMS, item.maxQuantity),
    }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadCart);
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

  useEffect(() => {
    try {
      window.sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // El carrito sigue funcionando en memoria si el navegador bloquea el almacenamiento.
    }
  }, [cart]);

  const addToCart = useCallback(
    (item, quantity = 1) => {
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);
      const available = Math.min(MAX_CART_ITEMS, item.maxQuantity ?? MAX_CART_ITEMS)
        - (existingItem?.quantity ?? 0);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > available) {
        showNotification("No hay suficientes unidades disponibles para añadir al carrito.", "error");
        return false;
      }

      dispatch({ type: CART_ACTIONS.add, item, quantity });
      showNotification(quantity === 1 ? "Producto agregado al carrito." : `${quantity} productos agregados al carrito.`, "success");
      return true;
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
