import { createBrowserRouter } from "react-router";

import { Home } from "../app/home/home";
import { Products } from "../app/products/products";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "products",
    Component: Products,
  },
]);
