import { useContext } from "react";
import { CartContext } from "../context/cart-context";

export const useCart = () => {
  return useContext(CartContext);
};
