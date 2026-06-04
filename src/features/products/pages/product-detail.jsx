import { Link, useParams } from "react-router";

import { ShoppingCart, Star } from "lucide-react";

import { Footer } from "../../../common/components/footer";
import { Header } from "../../../common/components/header";

import { useGetProductsById } from "../hooks/use-get-products-by-id";
import { useCart } from "../../cart/hooks/use-cart";

export function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useGetProductsById(id);

  const { addToCart } = useCart();

  if (loading) return <p>Loading...</p>;
  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <p className="text-red-500 font-medium text-lg">Error: {error}</p>
          <Link
            to="/"
            className="text-sm font-semibold underline text-gray-600 hover:text-black"
          >
            Volver a la tienda
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const {
    image,
    title,
    description,
    price,
    rating: { rate, count },
  } = product;
  return (
    <>
      <Header />
      <main className="max-w-7xl w-[90%] xl:w-[75%] mx-auto py-12">
        <section className="flex flex-col gap-12 md:flex-row items-start">
          <div className="w-full md:flex-1 bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-100 max-h-125 border border-gray-100">
            <img
              className="max-h-95 w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-102"
              src={image}
              alt={title}
            />
          </div>

          <div className="w-full md:flex-1 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md inline-block mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-700 font-semibold text-sm">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                {rate.toFixed(1)}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                ({count} customer reviews)
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {description}
              </p>
            </div>

            <div className="mt-4 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Total Price
                </p>
                <p className="text-4xl font-extrabold text-gray-900">
                  ${price.toFixed(2)}
                </p>
              </div>

              <button
                type="button"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow transition-all duration-200 active:scale-98 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(product);
                }}
              >
                <ShoppingCart className="w-5 h-5" />
                Add to cart
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
