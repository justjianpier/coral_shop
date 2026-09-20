import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { MAX_CART_ITEMS } from "../model/cart-reducer";

const FOCUSABLE_ELEMENTS =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CartDropDown({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cartTotal,
  clearCart,
  onClose,
}) {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

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

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <button
        type="button"
        className="cart-backdrop fixed inset-0 z-50 cursor-default bg-slate-950/45 backdrop-blur-[2px] sm:bg-slate-950/10 sm:backdrop-blur-none"
        aria-label="Close shopping cart"
        onClick={onClose}
      />

      <section
        ref={panelRef}
        id="shopping-cart-panel"
        className="cart-sheet fixed inset-x-0 bottom-0 z-60 flex max-h-[min(88dvh,48rem)] flex-col overflow-hidden rounded-t-4xl border border-stone-200/80 bg-[#fffdf9] shadow-[0_-20px_60px_-20px_rgba(15,23,42,0.35)] sm:absolute sm:inset-auto sm:right-0 sm:top-[calc(100%+0.875rem)] sm:w-[27rem] sm:max-w-[calc(100vw-2rem)] sm:max-h-[min(75vh,42rem)] sm:rounded-3xl sm:shadow-[0_24px_70px_-18px_rgba(15,23,42,0.28)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shopping-cart-title"
      >
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-stone-300 sm:hidden" />

        <header className="flex items-center justify-between gap-4 border-b border-stone-200/80 px-5 py-4 sm:px-6 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#fff0eb] text-[#ff5331]">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2
                id="shopping-cart-title"
                className="text-lg font-bold tracking-tight text-slate-900"
              >
                Your bag
              </h2>
              <p className="text-sm text-slate-500">
                {itemCount === 1 ? "1 item selected" : `${itemCount} items selected`}
              </p>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 transition-colors hover:bg-stone-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
            aria-label="Close shopping cart"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:py-14">
            <div className="relative mb-6">
              <div className="absolute inset-0 scale-150 rounded-full bg-[#ff5331]/10 blur-xl" />
              <div className="relative grid h-20 w-20 place-items-center rounded-full border border-[#ff5331]/15 bg-white text-[#ff5331] shadow-sm">
                <ShoppingBag className="h-9 w-9" aria-hidden="true" />
              </div>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              Your bag is waiting
            </h3>
            <p className="mt-2 max-w-64 text-sm leading-6 text-slate-500">
              Discover something special and it will appear right here.
            </p>
            <Link
              to="/products"
              onClick={onClose}
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ff5331] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#ff5331]/20 transition hover:-translate-y-0.5 hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] motion-reduce:transform-none"
            >
              Explore products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 rounded-2xl border border-stone-200/80 bg-white p-3 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.35)] sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-4"
                >
                  <Link
                    to={`/product/${item.id}`}
                    onClick={onClose}
                    className="grid h-20 w-18 place-items-center overflow-hidden rounded-xl bg-stone-50 p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] sm:h-24 sm:w-20"
                  >
                    <img
                      className="h-full w-full object-contain mix-blend-multiply"
                      src={item.image}
                      alt=""
                    />
                  </Link>

                  <div className="flex min-w-0 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          onClick={onClose}
                          className="line-clamp-2 text-sm font-semibold leading-5 text-slate-800 transition-colors hover:text-[#ff5331] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] sm:text-[0.95rem]"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-xs text-slate-400">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <button
                        type="button"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                        aria-label={`Remove ${item.title} from cart`}
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-xl border border-stone-200 bg-stone-50 p-1">
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-[#ff5331]"
                          aria-label={`Decrease quantity of ${item.title}`}
                          disabled={item.quantity <= 1}
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span
                          className="min-w-8 text-center text-sm font-bold tabular-nums text-slate-800"
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-[#ff5331]"
                          aria-label={`Increase quantity of ${item.title}`}
                          disabled={item.quantity >= MAX_CART_ITEMS}
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      <p className="text-base font-extrabold tabular-nums text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <footer className="border-t border-stone-200/80 bg-white/95 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur sm:px-6 sm:pb-6">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Subtotal</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Shipping calculated at checkout
                  </p>
                </div>
                <p className="text-2xl font-black tracking-tight tabular-nums text-slate-900">
                  ${cartTotal.toFixed(2)}
                </p>
              </div>

              <Link
                to="/cart"
                onClick={onClose}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ff5331] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff5331]/20 transition hover:-translate-y-0.5 hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] motion-reduce:transform-none"
              >
                Review your bag
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="mx-auto mt-3 flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Clear shopping bag
              </button>
            </footer>
          </>
        )}
      </section>
    </>
  );
}
