import { useCart } from "../../features/cart/hooks/use-cart";
import { ProductCard } from "../../features/products/components/product-card";
import { useProducts } from "../../features/products/hooks/use-products";
import { ProductsSkeleton } from "../../features/products/skeletons/products-skeleton";
import { ErrorState } from "../../shared/components/error-state";

export function ProductsPage() {
  const { products, isLoading, error } = useProducts();
  const { addToCart } = useCart();

  if (isLoading) return <ProductsSkeleton />;
  if (error) return <ErrorState message={error} />;

  return (
    <section className="max-w-7xl w-[90%] mx-auto py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold md:text-3xl">Featured Products</h1>
        <p>Handpicked items for you</p>
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </section>
  );
}
