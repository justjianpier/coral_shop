import { useSearchParams } from "react-router";
import { ProductCard } from "../../features/products/components/product-card";
import { useProducts } from "../../features/products/hooks/use-products";
import { ProductsSkeleton } from "../../features/products/skeletons/products-skeleton";
import { ErrorState } from "../../shared/components/error-state";

export function ProductsPage() {
  const { products, isLoading, error } = useProducts();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  let visibleProducts = category
    ? products.filter((product) => product.categoryName.toLowerCase() === category.toLowerCase())
    : products;

  if (sort === "price-low") {
    visibleProducts = [...visibleProducts].sort(
      (a, b) => a.basePrice - b.basePrice,
    );
  }

  const pageTitle = sort === "price-low"
    ? "Price: Low to High"
    : category
      ? category
      : "All Products";

  if (isLoading) return <ProductsSkeleton />;
  if (error) return <ErrorState message={error} />;

  return (
    <section className="max-w-7xl w-[90%] mx-auto py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold md:text-3xl">{pageTitle}</h1>
        <p>Handpicked items for you</p>
      </div>
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-stone-200 bg-stone-50 px-6 py-14 text-center text-slate-500">
          No products were found in this category.
        </div>
      )}
    </section>
  );
}
