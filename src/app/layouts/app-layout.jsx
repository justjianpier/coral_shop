import { Outlet, ScrollRestoration } from "react-router";

export function AppLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
