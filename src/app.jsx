import { router } from "./router/router";
import { RouterProvider } from "react-router/dom";

export function App() {
  return <RouterProvider router={router} />;
}
