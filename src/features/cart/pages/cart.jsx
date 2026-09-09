import { Link } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Header } from "../../../common/components/header";
import { Footer } from "../../../common/components/footer";
import { useCart } from "../hooks/use-cart";

export function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Header />
      <main className="grow bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 py-12 md:py-16">
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block bg-[#FFE8E3] px-4 py-2 rounded-full mb-4 md:mb-6 font-medium text-[#FF623F] text-sm md:text-base">
              Shopping Cart
            </span>
            <h1 className="font-semibold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4 md:mb-6">
              Your Cart
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl p-6 md:p-12 shadow-xl border border-gray-100 max-w-2xl mx-auto text-center">
              <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-lg md:text-xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6 text-sm md:text-base">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/products"
                className="inline-block py-3 px-8 bg-[#FF623F] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="text-lg md:text-xl font-semibold">
                      Cart Items ({itemCount})
                    </h2>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Clear Cart</span>
                    </button>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-xl"
                      >
                        <div className="flex items-center gap-3 sm:contents">
                          <img
                            className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded-lg bg-gray-50 p-2 shrink-0"
                            src={item.image}
                            alt={item.title}
                          />
                          <div className="flex-1 min-w-0 sm:hidden">
                            <h3 className="font-medium text-sm truncate">
                              {item.title}
                            </h3>
                            <p className="text-[#FF623F] font-semibold text-sm">
                              ${item.price}
                            </p>
                          </div>
                        </div>

                        <div className="hidden sm:block flex-1 min-w-0">
                          <h3 className="font-medium truncate">{item.title}</h3>
                          <p className="text-[#FF623F] font-semibold">
                            ${item.price}
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:contents">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <span className="w-8 text-center font-medium text-sm">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3 sm:gap-4">
                            <p className="font-semibold text-sm sm:text-base">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-96">
                <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100 lg:sticky lg:top-32">
                  <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <div className="flex justify-between text-gray-600 text-sm md:text-base">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>${cartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm md:text-base">
                      <span>Shipping</span>
                      <span className="text-green-500 font-medium">Free</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 md:pt-4 flex justify-between">
                      <span className="font-semibold text-base md:text-lg">
                        Total
                      </span>
                      <span className="font-bold text-base md:text-lg">
                        ${cartTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-3 px-4 bg-[#FF623F] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md cursor-pointer text-sm md:text-base"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/products"
                    className="block text-center mt-3 md:mt-4 text-xs md:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
