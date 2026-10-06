import { Link } from "react-router";

export function ProductCard({ product }) {
  const { imageUrl, name, basePrice, categoryName, totalStock } = product;

  return (
    <article className="group rounded-2xl bg-gray-50 transition-transform duration-300 hover:-translate-y-2 shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-80 flex items-center justify-center p-4">
          {imageUrl ? (
            <img className="w-full h-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105" src={imageUrl} alt={name} />
          ) : (
            <span className="text-sm text-gray-400">Image coming soon</span>
          )}
        </div>
        <div className="px-5">
          <h3 className="text-xl h-14 font-semibold transition-colors duration-300 group-hover:text-[#ff5331] mb-4 line-clamp-2">
            {name}
          </h3>
          <p className="mb-4 text-sm text-gray-500">{categoryName}</p>
        </div>
      </Link>
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xl text-[#ff5331]">${basePrice.toFixed(2)}</p>
          <Link to={`/product/${product.id}`} className="rounded-md bg-[#ff5331] px-4 py-2 text-sm font-semibold text-white hover:bg-[#e94727]">
            {totalStock > 0 ? "Choose options" : "View product"}
          </Link>
        </div>
      </div>
    </article>
  );
}
