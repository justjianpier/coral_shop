import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../../features/cart/hooks/use-cart";
import { MAX_CART_ITEMS } from "../../features/cart/model/cart-reducer";

const FREE_SHIPPING_THRESHOLD = 50;

export function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const remainingForFreeShipping = Math.max(
    FREE_SHIPPING_THRESHOLD - cartTotal,
    0,
  );
  const shippingProgress = Math.min(
    (cartTotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );
  const hasFreeShipping = remainingForFreeShipping === 0;

  return (
    <main className="relative min-h-[70vh] overflow-hidden bg-[#faf8f4] py-8 sm:py-12 lg:py-16">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#ff5331]/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-amber-200/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-[92%] max-w-7xl">
        <Link
          to="/products"
          className="mb-7 inline-flex min-h-10 items-center gap-2 rounded-lg px-1 text-sm font-semibold text-slate-500 transition-colors hover:text-[#ff5331] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Continue shopping
        </Link>

        <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#ff5331]/15 bg-[#fff0eb] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#e94727]">
              <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
              Shopping bag
            </span>
            <h1 className="max-w-2xl text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
              Pieces you&apos;ve chosen
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Review your selection, adjust quantities, and continue when
              everything feels just right.
            </p>
          </div>

          {cart.length > 0 && (
            <div className="inline-flex w-fit items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-stone-100 text-sm font-black text-slate-900">
                {itemCount}
              </span>
              <span className="text-sm font-medium text-slate-600">
                {itemCount === 1 ? "item in your bag" : "items in your bag"}
              </span>
            </div>
          )}
        </header>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_24rem]">
            <section
              className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_24px_70px_-45px_rgba(15,23,42,0.4)]"
              aria-labelledby="cart-items-title"
            >
              <div className="flex items-center justify-between gap-4 border-b border-stone-200/80 px-4 py-4 sm:px-6 sm:py-5">
                <div>
                  <h2
                    id="cart-items-title"
                    className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl"
                  >
                    Your selection
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">
                    Quantities are limited to {MAX_CART_ITEMS} per item.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-bold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 sm:text-sm"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Clear bag</span>
                </button>
              </div>

              <div className="divide-y divide-stone-200/80 px-4 sm:px-6">
                {cart.map((item) => (
                  <article
                    key={item.id}
                    className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5 sm:py-6 md:grid-cols-[7rem_minmax(0,1fr)_auto]"
                  >
                    <Link
                      to={`/product/${item.id}`}
                      className="grid h-28 w-[5.5rem] place-items-center overflow-hidden rounded-2xl border border-stone-100 bg-stone-50 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] sm:h-32 sm:w-28"
                      aria-label={`View ${item.title}`}
                    >
                      <img
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105 motion-reduce:transform-none"
                        src={item.image}
                        alt=""
                      />
                    </Link>

                    <div className="flex min-w-0 flex-col justify-between gap-4">
                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          className="line-clamp-2 text-sm font-bold leading-5 text-slate-900 transition-colors hover:text-[#ff5331] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] sm:text-base sm:leading-6"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1.5 text-xs font-medium text-slate-400 sm:text-sm">
                          ${item.price.toFixed(2)} per item
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 md:justify-start">
                        <div className="inline-flex items-center rounded-xl border border-stone-200 bg-stone-50 p-1">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                            className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-[#ff5331]"
                            aria-label={`Decrease quantity of ${item.title}`}
                          >
                            <Minus className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <span
                            className="min-w-9 text-center text-sm font-extrabold tabular-nums text-slate-900"
                            aria-label={`Quantity: ${item.quantity}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            disabled={item.quantity >= MAX_CART_ITEMS}
                            className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-[#ff5331]"
                            aria-label={`Increase quantity of ${item.title}`}
                          >
                            <Plus className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>

                        <p className="font-extrabold tabular-nums text-slate-900 md:hidden">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 sm:text-sm"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>

                    <div className="hidden min-w-24 text-right md:block">
                      <p className="text-lg font-black tabular-nums text-slate-950">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">Item total</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="lg:sticky lg:top-48" aria-labelledby="order-summary-title">
              <div className="overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)]">
                <div className="border-b border-stone-200/80 px-5 py-5 sm:px-6">
                  <h2
                    id="order-summary-title"
                    className="text-xl font-extrabold tracking-tight text-slate-950"
                  >
                    Order summary
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {itemCount} {itemCount === 1 ? "item" : "items"} selected
                  </p>
                </div>

                <div className="px-5 py-5 sm:px-6">
                  <div className="mb-6 rounded-2xl bg-[#fff6f1] p-4">
                    <div className="flex items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-[#ff5331] shadow-sm">
                        <Truck className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-800">
                          {hasFreeShipping
                            ? "You unlocked free shipping"
                            : `$${remainingForFreeShipping.toFixed(2)} away from free shipping`}
                        </p>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#ff5331]/15">
                          <div
                            className="h-full rounded-full bg-[#ff5331] transition-[width] duration-500 motion-reduce:transition-none"
                            style={{ width: `${shippingProgress}%` }}
                            role="progressbar"
                            aria-label="Progress toward free shipping"
                            aria-valuemin="0"
                            aria-valuemax={FREE_SHIPPING_THRESHOLD}
                            aria-valuenow={Math.min(
                              cartTotal,
                              FREE_SHIPPING_THRESHOLD,
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <dl className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4 text-slate-500">
                      <dt>Subtotal</dt>
                      <dd className="font-semibold tabular-nums text-slate-800">
                        ${cartTotal.toFixed(2)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-slate-500">
                      <dt>Shipping</dt>
                      <dd
                        className={
                          hasFreeShipping
                            ? "font-bold text-emerald-600"
                            : "text-xs font-medium text-slate-500"
                        }
                      >
                        {hasFreeShipping ? "Free" : "Calculated at checkout"}
                      </dd>
                    </div>
                    <div className="flex items-end justify-between gap-4 border-t border-stone-200 pt-4">
                      <dt>
                        <span className="block text-base font-extrabold text-slate-950">
                          Estimated total
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-400">
                          Taxes calculated at checkout
                        </span>
                      </dt>
                      <dd className="text-2xl font-black tracking-tight tabular-nums text-slate-950">
                        ${cartTotal.toFixed(2)}
                      </dd>
                    </div>
                  </dl>

                  <button
                    type="button"
                    className="mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#ff5331] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#ff5331]/20 transition hover:-translate-y-0.5 hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] motion-reduce:transform-none"
                  >
                    Proceed to checkout
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-slate-400">
                    <ShieldCheck
                      className="h-4 w-4 text-emerald-600"
                      aria-hidden="true"
                    />
                    Secure and protected checkout
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

function EmptyCart() {
  return (
    <section className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white px-6 py-12 text-center shadow-[0_30px_80px_-50px_rgba(15,23,42,0.45)] sm:px-12 sm:py-16">
      <div className="relative mx-auto mb-7 w-fit">
        <div className="absolute inset-0 scale-150 rounded-full bg-[#ff5331]/10 blur-2xl" />
        <div className="relative grid h-24 w-24 place-items-center rounded-full border border-[#ff5331]/15 bg-[#fff8f4] text-[#ff5331]">
          <ShoppingBag className="h-10 w-10" aria-hidden="true" />
        </div>
      </div>
      <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
        Your bag is ready for something special
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
        Explore our collection and save the pieces that feel made for you.
      </p>
      <Link
        to="/products"
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#ff5331] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff5331]/20 transition hover:-translate-y-0.5 hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] motion-reduce:transform-none"
      >
        Discover products
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
