import { createBrowserRouter } from "react-router";

import { Home } from "../app/home/home";
import { Login } from "../app/login/login";
import { Products } from "../app/products/products";
import { ProductDetail } from "../features/products/pages/product-detail";

import { Blogs } from "../common/pages/blogs";
import { Press } from "../common/pages/press";
import { Careers } from "../common/pages/careers";
import { OurStory } from "../common/pages/our-story";
import { Sustainability } from "../common/pages/sustainability";

import { FAQ } from "../common/pages/faq";
import { Returns } from "../common/pages/returns";
import { SizeGuide } from "../common/pages/size-guide";
import { ContactUs } from "../common/pages/contact-us";
import { ShippingInfo } from "../common/pages/shipping-info";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/login", Component: Login },
  { path: "products", Component: Products },
  { path: "product/:id", Component: ProductDetail },

  // Páginas del footer
  // (About us)
  { path: "blogs", Component: Blogs },
  { path: "/press", Component: Press },
  { path: "/careers", Component: Careers },
  { path: "/our_story", Component: OurStory },
  { path: "/sustainability", Component: Sustainability },

  // (Customer Service)
  { path: "/faq", Component: FAQ },
  { path: "/returns", Component: Returns },
  { path: "/size_guide", Component: SizeGuide },
  { path: "/contact_us", Component: ContactUs },
  { path: "/shipping_info", Component: ShippingInfo },
]);
