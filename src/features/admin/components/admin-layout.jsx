import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../../auth/hooks/use-auth";
import { Sidebar } from "./sidebar";

export function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { account, checking, error } = useAuth();
  const location = useLocation();

  if (checking) {
    return <div className="grid min-h-screen place-items-center text-slate-600" role="status">Checking admin access...</div>;
  }
  if (error) {
    return <div className="grid min-h-screen place-items-center px-6 text-center text-red-700" role="alert">{error}</div>;
  }
  if (!account) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (account.role !== "ROLE_ADMIN") {
    return (
      <div className="grid min-h-screen place-content-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-bold text-slate-950">Admin access required</h1>
        <p className="text-slate-600">Your account cannot access this dashboard.</p>
        <Link to="/" className="font-semibold text-[#e94727] hover:underline">Back to store</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f1] lg:flex">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200/80 bg-[#f7f5f1]/90 px-4 backdrop-blur-xl lg:hidden">
          <Link
            to="/admin"
            className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-white">
              <Sparkles className="h-4 w-4 text-[#ff7354]" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-black leading-none text-slate-950">Coral</span>
              <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.16em] text-slate-400">
                Admin studio
              </span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-stone-200 bg-white text-slate-700 shadow-sm transition hover:border-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
            aria-label="Open admin navigation"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-7 sm:px-6 sm:py-9 lg:min-h-screen lg:px-8 lg:py-10 xl:px-10">
          <div
            className="pointer-events-none absolute -right-48 -top-52 h-[34rem] w-[34rem] rounded-full bg-[#ff5331]/6 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-[92rem]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
