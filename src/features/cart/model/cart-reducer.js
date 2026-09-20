const MIN_ITEMS = 1;
export const MAX_CART_ITEMS = 5;

export const CART_ACTIONS = {
  add: "cart/add",
  remove: "cart/remove",
  increase: "cart/increase",
  decrease: "cart/decrease",
  clear: "cart/clear",
};

export function cartReducer(cart, action) {
  switch (action.type) {
    case CART_ACTIONS.add: {
      const existingItem = cart.find((item) => item.id === action.item.id);

      if (!existingItem) {
        return [...cart, { ...action.item, quantity: MIN_ITEMS }];
      }

      return cart.map((item) =>
        item.id === action.item.id && item.quantity < MAX_CART_ITEMS
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }

    case CART_ACTIONS.remove:
      return cart.filter((item) => item.id !== action.id);

    case CART_ACTIONS.increase:
      return cart.map((item) =>
        item.id === action.id && item.quantity < MAX_CART_ITEMS
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

    case CART_ACTIONS.decrease:
      return cart.map((item) =>
        item.id === action.id && item.quantity > MIN_ITEMS
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

    case CART_ACTIONS.clear:
      return [];

    default:
      return cart;
  }
}
