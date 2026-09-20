import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  ChevronLeft,
  LayoutDashboard,
  LogOut,
  Package,
  PanelLeftClose,
  ShoppingCart,
  Sparkles,
  Tag,
  Users,
  X,
} from "lucide-react";

const MENU_ITEMS = [
  { name: "Overview", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Categories", path: "/admin/categories", icon: Tag },
];

export function Sidebar({ mobileOpen, onMobileClose }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousActiveElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onMobileClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="mobile-menu-backdrop fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
          aria-label="Close admin navigation"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-[min(86vw,20rem)] flex-col overflow-hidden bg-[#111827] text-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:shrink-0 lg:translate-x-0 lg:shadow-none ${
          mobileOpen
            ? "visible translate-x-0"
            : "invisible -translate-x-full pointer-events-none lg:visible lg:pointer-events-auto"
        } ${collapsed ? "lg:w-[5.5rem]" : "lg:w-72"}`}
        aria-label="Admin navigation"
      >
        <div className="flex h-20 items-center justify-between border-b border-white/8 px-5 lg:h-24">
          <Link
            to="/admin"
            onClick={onMobileClose}
            className={`flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7354] ${
              collapsed ? "lg:hidden" : ""
            }`}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#ff5331] shadow-lg shadow-[#ff5331]/20">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-black leading-none tracking-tight">Coral</span>
              <span className="mt-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                Admin studio
              </span>
            </span>
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onMobileClose}
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-400 transition hover:bg-white/8 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7354] lg:hidden"
            aria-label="Close admin navigation"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          {collapsed ? (
            <Link
              to="/admin"
              className="hidden h-11 w-11 place-items-center rounded-2xl bg-[#ff5331] lg:grid"
              title="Coral Admin"
            >
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        <div className={`px-5 pt-7 ${collapsed ? "lg:px-3" : ""}`}>
          <p
            className={`text-[0.62rem] font-black uppercase tracking-[0.2em] text-slate-500 ${
              collapsed ? "lg:sr-only" : ""
            }`}
          >
            Workspace
          </p>
        </div>

        <nav className={`flex-1 space-y-1.5 overflow-y-auto px-4 py-4 ${collapsed ? "lg:px-3" : ""}`}>
          {MENU_ITEMS.map((item) => {
            const isActive =
              item.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={`group flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7354] ${
                  isActive
                    ? "bg-[#ff5331] text-white shadow-lg shadow-[#ff5331]/15"
                    : "text-slate-400 hover:bg-white/7 hover:text-white"
                } ${collapsed ? "lg:justify-center lg:px-0" : ""}`}
                title={collapsed ? item.name : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className={collapsed ? "lg:sr-only" : ""}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className={`border-t border-white/8 p-4 ${collapsed ? "lg:px-3" : ""}`}>
          <Link
            to="/"
            onClick={onMobileClose}
            className={`flex min-h-12 items-center gap-3 rounded-xl px-3.5 text-sm font-bold text-slate-400 transition hover:bg-white/7 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7354] ${
              collapsed ? "lg:justify-center lg:px-0" : ""
            }`}
            title={collapsed ? "Back to store" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className={collapsed ? "lg:sr-only" : ""}>Back to store</span>
          </Link>
          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            className={`mt-2 hidden min-h-11 w-full items-center gap-3 rounded-xl px-3.5 text-sm font-bold text-slate-500 transition hover:bg-white/7 hover:text-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff7354] lg:flex ${
              collapsed ? "justify-center px-0" : ""
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronLeft className="h-5 w-5 rotate-180" aria-hidden="true" />
            ) : (
              <PanelLeftClose className="h-5 w-5" aria-hidden="true" />
            )}
            <span className={collapsed ? "sr-only" : ""}>Collapse menu</span>
          </button>
        </div>
      </aside>
    </>
  );
}
