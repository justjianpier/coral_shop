import { Outlet, ScrollRestoration } from "react-router";

export function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}
