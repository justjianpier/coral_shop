import {
  ChevronDown,
  CircleHelp,
  Home,
  LayoutGrid,
  LogIn,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";

const CATEGORY_LINKS = [
  {
    label: "Men's Clothing",
    to: "/products?category=men%27s%20clothing",
  },
  {
    label: "Women's Clothing",
    to: "/products?category=women%27s%20clothing",
  },
  { label: "Jewelry", to: "/products?category=jewelery" },
  { label: "Electronics", to: "/products?category=electronics" },
  { label: "Best Sellers", to: "/products?sort=best-sellers" },
];

const HELP_LINKS = [
  { label: "Our Story", to: "/our-story" },
  { label: "Frequently Asked Questions", to: "/faq" },
  { label: "Shipping Information", to: "/shipping-info" },
  { label: "Returns & Exchanges", to: "/returns" },
  { label: "Size Guide", to: "/size-guide" },
  { label: "Contact Us", to: "/contact-us" },
];

const FOCUSABLE_ELEMENTS =
  'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ cartItemCount, onClose }) {
  const location = useLocation();
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleDesktopChange = (event) => {
      if (event.matches) onClose();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = panelRef.current?.querySelectorAll(
        FOCUSABLE_ELEMENTS,
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    desktopMedia.addEventListener("change", handleDesktopChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      desktopMedia.removeEventListener("change", handleDesktopChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="mobile-menu-backdrop fixed inset-0 z-[70] cursor-default bg-slate-950/50 backdrop-blur-[2px]"
        aria-label="Close navigation menu"
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        id="mobile-navigation"
        className="mobile-menu-panel fixed inset-y-0 left-0 z-[80] flex h-dvh w-[min(88vw,22rem)] flex-col overflow-hidden border-r border-stone-200 bg-[#fffdf9] shadow-[24px_0_70px_-24px_rgba(15,23,42,0.45)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-navigation-title"
      >
        <header className="flex items-center justify-between border-b border-stone-200/80 px-5 py-5">
          <Link
            to="/"
            onClick={onClose}
            id="mobile-navigation-title"
            className="text-2xl font-black tracking-tight text-[#ff5331] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
          >
            Coral
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-slate-500 transition-colors hover:bg-stone-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
            aria-label="Close navigation menu"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <nav
          className="flex-1 overflow-y-auto overscroll-contain px-4 py-5"
          aria-label="Mobile navigation"
        >
          <p className="mb-2 px-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400">
            Explore
          </p>

          <div className="space-y-1">
            <MobileNavLink
              to="/"
              icon={Home}
              isActive={isCurrentPath("/")}
              onClick={onClose}
            >
              Home
            </MobileNavLink>
            <MobileNavLink
              to="/products"
              icon={LayoutGrid}
              isActive={isCurrentPath("/products") && !location.search}
              onClick={onClose}
            >
              All Products
            </MobileNavLink>

            <details className="group rounded-2xl open:bg-stone-50">
              <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-2xl px-3 text-sm font-bold text-slate-700 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] [&::-webkit-details-marker]:hidden">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-500 shadow-sm">
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex-1">Shop by Category</span>
                <ChevronDown
                  className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <ul className="space-y-1 pb-2 pl-[3.75rem] pr-2 pt-1">
                {CATEGORY_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={onClose}
                      className="block rounded-lg px-2 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-white hover:text-[#ff5331] focus-visible:outline-2 focus-visible:outline-[#ff5331]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <MobileNavLink
              to="/cart"
              icon={ShoppingBag}
              isActive={isCurrentPath("/cart")}
              onClick={onClose}
              badge={cartItemCount}
            >
              Shopping Cart
            </MobileNavLink>
            <MobileNavLink
              to="/login"
              icon={LogIn}
              isActive={isCurrentPath("/login")}
              onClick={onClose}
            >
              My Account
            </MobileNavLink>
          </div>

          <div className="my-5 h-px bg-stone-200" />

          <p className="mb-2 px-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400">
            Support
          </p>
          <details className="group rounded-2xl open:bg-stone-50">
            <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-2xl px-3 text-sm font-bold text-slate-700 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] [&::-webkit-details-marker]:hidden">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-slate-500 shadow-sm">
                <CircleHelp className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1">Help & Information</span>
              <ChevronDown
                className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </summary>
            <ul className="space-y-1 pb-2 pl-[3.75rem] pr-2 pt-1">
              {HELP_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="block rounded-lg px-2 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-white hover:text-[#ff5331] focus-visible:outline-2 focus-visible:outline-[#ff5331]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>

        <footer className="border-t border-stone-200/80 bg-white/80 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-400">
            <Link
              to="/privacy-policy"
              onClick={onClose}
              className="rounded-md py-2 transition-colors hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-[#ff5331]"
            >
              Privacy
            </Link>
            <span aria-hidden="true">•</span>
            <Link
              to="/terms-of-service"
              onClick={onClose}
              className="rounded-md py-2 transition-colors hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-[#ff5331]"
            >
              Terms
            </Link>
            <span className="ml-auto text-[#ff5331]">Coral © 2026</span>
          </div>
        </footer>
      </aside>
    </div>
  );
}

function MobileNavLink({
  to,
  icon: Icon,
  isActive,
  onClick,
  badge,
  children,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] ${
        isActive
          ? "bg-[#fff0eb] text-[#e94727]"
          : "text-slate-700 hover:bg-stone-100"
      }`}
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-xl shadow-sm ${
          isActive ? "bg-white text-[#ff5331]" : "bg-white text-slate-500"
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="flex-1">{children}</span>
      {badge > 0 && (
        <span className="grid min-h-6 min-w-6 place-items-center rounded-full bg-[#ff5331] px-1.5 text-[0.68rem] font-black text-white">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </Link>
  );
}
