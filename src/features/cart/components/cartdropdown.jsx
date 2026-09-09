import { Link } from "react-router";
import { Trash2 } from "lucide-react";

export function CartDropDown({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cartTotal,
  clearCart,
}) {
  return (
    <div className="absolute top-full mt-2 w-96 rounded-lg border border-gray-400 bg-white shadow-xl z-10">
      {cart.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Your cart is empty 🛒
        </div>
      ) : (
        <>
          <div className="p-3">
            <div className="grid place-items-center grid-cols-5 text-xs font-semibold text-gray-500">
              <span>Image</span>
              <span>Name</span>
              <span>Price</span>
              <span>Qty</span>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 items-center gap-4 p-3 border-b"
                >
                  <img
                    className="h-10 w-10 object-contain"
                    src={item.image}
                    alt={item.title}
                  />
                  <p className="text-sm truncate">{item.title}</p>
                  <p className="text-sm text-[#ff5331] text-center">
                    ${item.price}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="bg-black text-white h-6 w-10 rounded cursor-pointer"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      className="bg-black text-white h-6 w-10 rounded cursor-pointer"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="group-hover:opacity-100 transition text-red-500 hover:text-red-700 text-sm"
                    title="Remove item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold">Total: ${cartTotal()}</span>
            </div>

            <div className="flex gap-2">
              <Link
                to="/cart"
                className="flex-1 text-center py-2 px-4 bg-[#ff5331] text-white font-semibold rounded-lg hover:bg-[#e6472a] transition-colors"
              >
                View Cart
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="py-2 px-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                title="Clear cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
