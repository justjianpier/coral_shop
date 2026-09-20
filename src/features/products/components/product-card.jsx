import { Star } from "lucide-react";
import { Link } from "react-router";

export function ProductCard({ product, onAddToCart }) {
  const { image, title, price, rating } = product;

  return (
    <article className="group rounded-2xl bg-gray-50 transition-transform duration-300 hover:-translate-y-2 shadow-md">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-80 flex items-center justify-center p-4">
          <img
            className="w-full h-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105 cursor-pointer"
            src={image}
            alt={title}
          />
        </div>
        <div className="px-5">
          <h3 className="text-xl h-14 font-semibold transition-colors duration-300 group-hover:text-[#ff5331] mb-4 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-amber-400" />
              <span>{rating.rate}</span>
            </div>
            <p>({rating.count} reviews)</p>
          </div>
        </div>
      </Link>
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xl text-[#ff5331]">${price}</p>
          <button
            type="button"
            className="bg-[#ff5331] text-white text-lg px-4 py-2 rounded-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 cursor-pointer"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
