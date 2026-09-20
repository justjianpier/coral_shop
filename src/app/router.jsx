import { createBrowserRouter, Navigate } from "react-router";
import { AdminLayout } from "../features/admin/components/admin-layout";
import { Categories } from "../features/admin/pages/categories";
import { Orders } from "../features/admin/pages/orders";
import { Overview } from "../features/admin/pages/overview";
import { ProductForm } from "../features/admin/pages/product-form";
import { Products as AdminProducts } from "../features/admin/pages/products";
import { Users } from "../features/admin/pages/users";
import { CartPage } from "../pages/cart/cart-page";
import { BlogsPage } from "../pages/content/blogs-page";
import { CareersPage } from "../pages/content/careers-page";
import { ContactUsPage } from "../pages/content/contact-us-page";
import { FAQPage } from "../pages/content/faq-page";
import { OurStoryPage } from "../pages/content/our-story-page";
import { PressPage } from "../pages/content/press-page";
import { PrivacyPolicyPage } from "../pages/content/privacy-policy-page";
import { ReturnsPage } from "../pages/content/returns-page";
import { ShippingInfoPage } from "../pages/content/shipping-info-page";
import { SizeGuidePage } from "../pages/content/size-guide-page";
import { SustainabilityPage } from "../pages/content/sustainability-page";
import { TermsOfServicePage } from "../pages/content/terms-of-service-page";
import { HomePage } from "../pages/home/home-page";
import { LoginPage } from "../pages/login/login-page";
import { ProductDetailPage } from "../pages/product-detail/product-detail-page";
import { ProductsPage } from "../pages/products/products-page";
import { AppLayout } from "./layouts/app-layout";
import { StoreLayout } from "./layouts/store-layout";

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        Component: StoreLayout,
        children: [
          { index: true, Component: HomePage },
          { path: "products", Component: ProductsPage },
          { path: "product/:id", Component: ProductDetailPage },
          { path: "cart", Component: CartPage },

          // About us
          { path: "blogs", Component: BlogsPage },
          { path: "press", Component: PressPage },
          { path: "careers", Component: CareersPage },
          { path: "our-story", Component: OurStoryPage },
          { path: "sustainability", Component: SustainabilityPage },

          // Customer service
          { path: "faq", Component: FAQPage },
          { path: "returns", Component: ReturnsPage },
          { path: "size-guide", Component: SizeGuidePage },
          { path: "contact-us", Component: ContactUsPage },
          { path: "shipping-info", Component: ShippingInfoPage },

          // Legal
          { path: "privacy-policy", Component: PrivacyPolicyPage },
          { path: "terms-of-service", Component: TermsOfServicePage },

          // Preserve links created before route names were normalized.
          { path: "our_story", element: <Navigate to="/our-story" replace /> },
          { path: "size_guide", element: <Navigate to="/size-guide" replace /> },
          { path: "contact_us", element: <Navigate to="/contact-us" replace /> },
          {
            path: "shipping_info",
            element: <Navigate to="/shipping-info" replace />,
          },
          {
            path: "privacy_policy",
            element: <Navigate to="/privacy-policy" replace />,
          },
          {
            path: "terms_of_service",
            element: <Navigate to="/terms-of-service" replace />,
          },
        ],
      },
      { path: "login", Component: LoginPage },
      {
        path: "admin",
        Component: AdminLayout,
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
    ],
  },
]);
