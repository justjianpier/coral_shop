import { createBrowserRouter } from "react-router";
import { Root } from "./root";

import { Home } from "../app/home/home";
import { Login } from "../app/login/login";
import { Products } from "../app/products/products";
import { ProductDetail } from "../features/products/pages/product-detail";

import { Blogs } from "../pages/blogs";
import { Press } from "../pages/press";
import { Careers } from "../pages/careers";
import { OurStory } from "../pages/our-story";
import { Sustainability } from "../pages/sustainability";

import { FAQ } from "../pages/faq";
import { Returns } from "../pages/returns";
import { SizeGuide } from "../pages/size-guide";
import { ContactUs } from "../pages/contact-us";
import { ShippingInfo } from "../pages/shipping-info";
import { PrivacyPolicy } from "../pages/privacy-policy";
import { TermsOfService } from "../pages/terms-of-service";
import { Cart } from "../features/cart/pages/cart";

import { AdminLayout } from "../features/admin/components/admin-layout";
import { Overview } from "../features/admin/pages/overview";
import { Users } from "../features/admin/pages/users";
import { Products as AdminProducts } from "../features/admin/pages/products";
import { ProductForm } from "../features/admin/pages/product-form";
import { Orders } from "../features/admin/pages/orders";
import { Categories } from "../features/admin/pages/categories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "products", Component: Products },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },

      // About us
      { path: "blogs", Component: Blogs },
      { path: "press", Component: Press },
      { path: "careers", Component: Careers },
      { path: "our_story", Component: OurStory },
      { path: "sustainability", Component: Sustainability },

      // Customer Service
      { path: "faq", Component: FAQ },
      { path: "returns", Component: Returns },
      { path: "size_guide", Component: SizeGuide },
      { path: "contact_us", Component: ContactUs },
      { path: "shipping_info", Component: ShippingInfo },

      // Legal
      { path: "privacy_policy", Component: PrivacyPolicy },
      { path: "terms_of_service", Component: TermsOfService },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, Component: Overview },
      { path: "users", Component: Users },
      { path: "products", Component: AdminProducts },
      { path: "products/new", Component: ProductForm },
      { path: "products/:id/edit", Component: ProductForm },
      { path: "orders", Component: Orders },
      { path: "categories", Component: Categories },
    ],
  },
]);
