import { createBrowserRouter } from "react-router";

import { Home } from "../app/home/home";
import { Products } from "../app/products/products";
import { ProductDetail } from "../features/products/pages/product-detail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "products",
    Component: Products,
  },
  {
    path: "product/:id",
    Component: ProductDetail
  }
]);
