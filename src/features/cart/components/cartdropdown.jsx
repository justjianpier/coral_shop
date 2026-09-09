import { Link } from "react-router";
import { Trash2, Minus, Plus } from "lucide-react";

export function CartDropDown({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cartTotal,
  clearCart,
  onClose,
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 sm:absolute sm:inset-auto sm:top-full sm:mt-2 sm:right-0 w-full sm:w-96 max-h-[80vh] sm:max-h-96 rounded-t-2xl sm:rounded-lg border border-gray-400 bg-white shadow-xl z-50 flex flex-col">
      {cart.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          Your cart is empty 🛒
        </div>
      ) : (
        <>
          <div className="p-3 flex-1 overflow-y-auto">
            {/* Desktop header */}
            <div className="hidden sm:grid place-items-center grid-cols-5 text-xs font-semibold text-gray-500">
              <span>Image</span>
              <span>Name</span>
              <span>Price</span>
              <span>Qty</span>
            </div>

            <div className="space-y-3 sm:space-y-0">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 border-b sm:grid sm:grid-cols-5 sm:items-center sm:gap-4"
                >
                  <img
                    className="h-12 w-12 sm:h-10 sm:w-10 object-contain shrink-0"
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="flex-1 min-w-0 sm:contents">
                    <p className="text-sm truncate font-medium">{item.title}</p>
                  </div>

                  <p className="text-sm text-[#ff5331] hidden sm:block text-center">
                    ${item.price}
                  </p>

                  <div className="flex items-center gap-2 sm:gap-1">
                    <button
                      type="button"
                      className="bg-black text-white h-7 w-7 sm:h-6 sm:w-10 rounded flex items-center justify-center cursor-pointer"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus className="w-3 h-3 sm:w-auto sm:h-auto" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      className="bg-black text-white h-7 w-7 sm:h-6 sm:w-10 rounded flex items-center justify-center cursor-pointer"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus className="w-3 h-3 sm:w-auto sm:h-auto" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 sm:contents">
                    <p className="text-sm font-semibold sm:hidden">
                      ${item.price}
                    </p>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 transition cursor-pointer ml-auto sm:ml-0"
                      title="Remove item"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-white rounded-b-2xl sm:rounded-b-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold">Total: ${cartTotal()}</span>
            </div>

            <div className="flex gap-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="flex-1 text-center py-2.5 px-4 bg-[#ff5331] text-white font-semibold rounded-lg hover:bg-[#e6472a] transition-colors"
              >
                View Cart
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="py-2.5 px-4 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
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
