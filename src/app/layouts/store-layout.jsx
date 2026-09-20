import { Outlet } from "react-router";
import { Footer } from "./footer";
import { Header } from "./header";

export function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
