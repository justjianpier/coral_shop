import { Star } from "lucide-react";

export function ProductItem({ product }) {
  const { image, title, price, rating } = product;
  return (
    <div className="group rounded-2xl bg-gray-50 transition-transform duration-300 hover:-translate-y-2 shadow-md">
      <div className="h-80 flex items-center justify-center p-4">
        <img
          className="w-full h-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          src={image}
          alt=""
        />
      </div>
      <div className="p-5">
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
        <div className="flex items-center justify-between">
          <p className="text-xl text-[#ff5331]">${price}</p>
          <button className="bg-[#ff5331] text-white text-lg px-4 py-2 rounded-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
