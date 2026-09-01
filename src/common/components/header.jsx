import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useCart } from "../../features/cart/hooks/use-cart";
import { useState } from "react";
import { CartDropDown } from "../../features/cart/components/cartdropdown";

export function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  const location = useLocation();
  const hideSearch = location.pathname === "/products";

  const links = [
    { id: 1, name: "All Products", url: "/products" },
    { id: 2, name: "Men's Clothing", url: "men" },
    { id: 3, name: "Women's Clothing", url: "women" },
    { id: 4, name: "Jewelry", url: "jewelry" },
    { id: 5, name: "Best Sellers", url: "best_sellers" },
  ];

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50">
      <p className="bg-[#ff5331] py-4 text-center text-white">
        ✨ Free shipping on orders over $50 | Spring Sale: Up to 40% Off
      </p>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto w-[90%] py-4">
          <div className="grid items-center grid-cols-2 gap-4 md:grid-cols-[1fr_2.5fr_1fr]">
            <div className="flex items-center gap-4">
              <button className="md:hidden">
                <Menu />
              </button>
              <Link to="/" className="text-[#ff5331] text-3xl font-semibold">
                Coral
              </Link>
            </div>
            <div className="col-star-2 col-end-3 md:col-star-3 md:col-end-4 flex justify-end gap-4">
              <Link to={"/login"} className="cursor-pointer">
                <User />
              </Link>
              <button
                type="button"
                className="relative cursor-pointer"
                onClick={toggleCart}
              >
                <ShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5331] text-xs text-white">
                    {cart.length}
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
              {links.map((link) => (
                <li key={link.id}>
                  <a href={link.url}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
