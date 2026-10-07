import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { useCart } from "../../features/cart/hooks/use-cart";
import { MAX_CART_ITEMS } from "../../features/cart/model/cart-reducer";
import { useProduct } from "../../features/products/hooks/use-product";
import { ProductDetailSkeleton } from "../../features/products/skeletons/products-detail-skeleton";
import { ErrorState } from "../../shared/components/error-state";

export function ProductDetailPage() {
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const { addToCart, cart } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [lastAddedVariantId, setLastAddedVariantId] = useState(null);

  if (isLoading) return <ProductDetailSkeleton />;
  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <ErrorState message={error || "Product not found"} />
        <Link to="/products" className="text-sm font-semibold text-gray-600 underline hover:text-black">
          Back to products
        </Link>
      </div>
    );
  }

  const variant = product.variants.find((item) => item.id === Number(selectedVariantId));
  const inCart = cart.find((item) => item.id === variant?.id);
  const availableToAdd = variant
    ? Math.max(0, Math.min(MAX_CART_ITEMS, variant.stock) - (inCart?.quantity ?? 0))
    : 0;
  const selectedQuantity = Math.min(quantity, Math.max(1, availableToAdd));

  function handleAddToCart() {
    if (!variant || availableToAdd < 1) return;
    const added = addToCart({
      id: variant.id,
      productId: product.id,
      title: `${product.name} · ${variant.size} / ${variant.color}`,
      image: product.imageUrl,
      price: product.basePrice,
      maxQuantity: Math.min(MAX_CART_ITEMS, variant.stock),
    }, selectedQuantity);
    if (added) {
      setLastAddedVariantId(variant.id);
      setQuantity(1);
    }
  }

  return (
    <main className="mx-auto w-[90%] max-w-7xl py-12 xl:w-[75%]">
      <section className="flex flex-col items-start gap-12 md:flex-row">
        <div className="flex min-h-100 w-full flex-1 items-center justify-center rounded-2xl border border-gray-100 bg-gray-50 p-8 md:max-h-125">
          {product.imageUrl ? (
            <img className="max-h-95 w-auto object-contain" src={product.imageUrl} alt={product.name} />
          ) : (
            <span className="text-gray-400">Image coming soon</span>
          )}
        </div>

        <div className="flex w-full flex-1 flex-col gap-6">
          <div>
            <span className="mb-3 inline-block rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#e94727]">
              {product.categoryName}{product.brandName ? ` · ${product.brandName}` : ""}
            </span>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">{product.name}</h1>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-900">Description</h2>
            <p className="leading-relaxed text-gray-600">{product.description || "No description yet."}</p>
          </div>

          <div>
            <label htmlFor="product-variant" className="mb-2 block text-sm font-semibold text-gray-900">
              Size and color
            </label>
            <select
              id="product-variant"
              value={selectedVariantId}
              onChange={(event) => {
                setSelectedVariantId(event.target.value);
                setQuantity(1);
                setLastAddedVariantId(null);
              }}
              disabled={product.variants.length === 0}
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-900 focus:border-[#ff5331] focus:outline-none disabled:opacity-50"
            >
              <option value="">Choose a size and color</option>
              {product.variants.map((item) => (
                <option key={item.id} value={item.id} disabled={item.stock < 1}>
                  {item.size} / {item.color} — {item.stock > 0 ? `${item.stock} available` : "Out of stock"}
                </option>
              ))}
            </select>
          </div>

          {variant ? (
            <div>
              <label htmlFor="product-quantity" className="mb-2 block text-sm font-semibold text-gray-900">Quantity</label>
              <select
                id="product-quantity"
                value={selectedQuantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                disabled={availableToAdd === 0}
                className="w-28 rounded-xl border border-stone-200 bg-white px-4 py-3 text-gray-900 focus:border-[#ff5331] focus:outline-none disabled:opacity-50"
              >
                {Array.from({ length: Math.max(1, availableToAdd) }, (_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}</option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500" role="status">
                {availableToAdd === 0 ? "No more units of this option can be added to your bag." : `${availableToAdd} more available to add (maximum ${MAX_CART_ITEMS} per option).`}
              </p>
            </div>
          ) : null}

          <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-4xl font-extrabold text-gray-900">${product.basePrice.toFixed(2)}</p>
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={availableToAdd === 0}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 sm:flex-initial"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              {selectedQuantity > 1 ? `Add ${selectedQuantity} to cart` : "Add to cart"}
            </button>
          </div>
          {lastAddedVariantId === variant?.id ? (
            <div role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              <span>Added to your bag.</span>
              <Link to="/cart" className="font-bold underline underline-offset-2 hover:text-emerald-700">View cart</Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
