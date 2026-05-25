import { Link } from "react-router";
import { ProductItem } from "../features/products/component/product-item";
import { useGetProducts } from "../features/products/hooks/use-get-products";

export function Products() {
  const { products, loading, error } = useGetProducts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="bg-[#FBFBFB] py-16">
      <div className="max-w-7xl w-[90%] mx-auto">
        <div className="flex justify-between mb-10">
          <div className="flex flex-col">
            <h2 className="text-4xl mb-2 font-semibold">Featured Products</h2>
            <p className="text-gray-600">Handpicked items just for you</p>
          </div>
          <Link
            to="/products"
            className="px-6 py-2.5 flex items-center text-[#ff5331] border-2 border-[#ff5331] rounded-lg hover:bg-[#ff5331] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
