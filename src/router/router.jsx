import { createBrowserRouter } from "react-router";

import { Home } from "../app/home/home";
import { Login } from "../app/login/login";
import { Products } from "../app/products/products";
import { ProductDetail } from "../features/products/pages/product-detail";

import { OurStory } from "../common/pages/our-story";
import { Press } from "../common/pages/press";
import { Careers } from "../common/pages/careers";
import { Sustainability } from "../common/pages/sustainability";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "products",
    Component: Products,
  },
  {
    path: "product/:id",
    Component: ProductDetail,
  },

  // Páginas del footer (About us)
  {
    path: "/careers",
    Component: Careers,
  },
  {
    path: "/press",
    Component: Press,
  },
  {
    path: "/our_story",
    Component: OurStory,
  },
  {
    path: "/sustainability",
    Component: Sustainability,
  },
]);
