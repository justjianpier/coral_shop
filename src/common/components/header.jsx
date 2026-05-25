import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router";

export function Header() {
  const location = useLocation();
  const hideSearch = location.pathname === "/products";

  return (
    <header className="relative">
      <p className="bg-[#ff5331] py-4 text-center text-white">
        ✨ Free shipping on orders over $50 | Spring Sale: Up to 40% Off
      </p>
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto w-[90%] py-4">
          <div className="grid items-center grid-cols-2 gap-4 md:grid-cols-[1fr_2.5fr_1fr]">
            <div className="flex items-center gap-4">
              <Menu />
              <Link to="/" className="text-[#ff5331] text-3xl font-semibold">
                Coral
              </Link>
            </div>
            <div className="col-star-2 col-end-3 md:col-star-3 md:col-end-4 flex justify-end gap-4">
              <User />
              <ShoppingCart />
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
          </div>
        </div>
      </div>
    </header>
  );
}
