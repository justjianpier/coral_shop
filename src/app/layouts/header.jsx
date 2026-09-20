import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { CartDropDown } from "../../features/cart/components/cart-dropdown";
import { useCart } from "../../features/cart/hooks/use-cart";
import { MobileMenu } from "./mobile-menu";

const HEADER_LINKS = [
  { id: 1, name: "All Products", url: "/products" },
  {
    id: 2,
    name: "Men's Clothing",
    url: "/products?category=men%27s%20clothing",
  },
  {
    id: 3,
    name: "Women's Clothing",
    url: "/products?category=women%27s%20clothing",
  },
  { id: 4, name: "Jewelry", url: "/products?category=jewelery" },
  { id: 5, name: "Best Sellers", url: "/products?sort=best-sellers" },
];

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartButtonRef = useRef(null);
  const menuButtonRef = useRef(null);

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  const location = useLocation();
  const hideSearch = location.pathname === "/products";

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    window.requestAnimationFrame(() => cartButtonRef.current?.focus());
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      setIsCartOpen(false);
      setIsMobileMenuOpen(true);
    }
  };

  const toggleCart = () => {
    if (isCartOpen) {
      closeCart();
    } else {
      setIsMobileMenuOpen(false);
      setIsCartOpen(true);
    }
  };

  const cartItemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <header className="sticky top-0 z-50">
      <p className="bg-[#ff5331] py-4 text-center text-white">
        ✨ Free shipping on orders over $50 | Spring Sale: Up to 40% Off
      </p>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto w-[90%] py-4">
          <div className="grid items-center grid-cols-2 gap-4 md:grid-cols-[1fr_2.5fr_1fr]">
            <div className="flex items-center gap-4">
              <button
                ref={menuButtonRef}
                type="button"
                className={`grid h-10 w-10 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] md:hidden ${
                  isMobileMenuOpen
                    ? "bg-[#fff0eb] text-[#ff5331]"
                    : "text-slate-700 hover:bg-stone-100"
                }`}
                aria-label={
                  isMobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-haspopup="dialog"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <X aria-hidden="true" />
                ) : (
                  <Menu aria-hidden="true" />
                )}
              </button>
              <Link to="/" className="text-[#ff5331] text-3xl font-semibold">
                Coral
              </Link>
            </div>
            <div className="relative col-start-2 col-end-3 flex justify-end gap-3 md:col-start-3 md:col-end-4">
              <Link
                to="/login"
                className="grid h-10 w-10 place-items-center rounded-full text-slate-700 transition-colors hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
                aria-label="Open account"
              >
                <User aria-hidden="true" />
              </Link>
              <button
                ref={cartButtonRef}
                type="button"
                className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] ${
                  isCartOpen
                    ? "bg-[#fff0eb] text-[#ff5331]"
                    : "text-slate-700 hover:bg-stone-100"
                }`}
                onClick={toggleCart}
                aria-label={`Open shopping cart with ${cartItemCount} ${
                  cartItemCount === 1 ? "item" : "items"
                }`}
                aria-expanded={isCartOpen}
                aria-controls="shopping-cart-panel"
                aria-haspopup="dialog"
              >
                <ShoppingCart aria-hidden="true" />
                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff5331] px-1 text-xs text-white">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </button>
              {isCartOpen && (
                <CartDropDown
                  cart={cart}
                  removeFromCart={removeFromCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  cartTotal={cartTotal}
                  clearCart={clearCart}
                  onClose={closeCart}
                />
              )}
            </div>
            {!hideSearch && (
              <div className="col-span-full md:row-start-1 md:col-start-2 md:col-end-3 flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-orange-200">
                <Search className="text-gray-400 w-4 h-4" />

                <input
                  className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none md:hidden"
                  type="text"
                  placeholder="Search..."
                />

                <input
                  className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none hidden md:block"
                  type="text"
                  placeholder="Search for products..."
                />
              </div>
            )}
            <ul className="hidden md:col-span-full md:flex md:justify-between md:gap-4 md:border-t md:border-gray-200 md:pt-4">
              {HEADER_LINKS.map((link) => (
                <li key={link.id}>
                  <Link to={link.url}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <MobileMenu
          cartItemCount={cartItemCount}
          onClose={closeMobileMenu}
        />
      )}
    </header>
  );
}
