import { Link } from "react-router";

export function Category() {
  const categories = [
    {
      id: 1,
      image: "/category_women.jpg",
      title: "Women's Clothing",
      category: "Mujer",
    },
    { id: 2, image: "/category_men.jpg", title: "Men's Clothing", category: "Hombre" },
    { id: 3, image: "/category_women.jpg", title: "Unisex", category: "Unisex" },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl w-[90%] mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl text-center font-semibold mb-3">
            Shop By Category
          </h2>
          <p className="text-gray-600 text-center text-lg">
            Find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              to={`/products?category=${encodeURIComponent(category.category)}`}
              className="relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer group"
              key={category.id}
            >
              <img
                className="w-full transition-transform duration-400 hover:scale-105"
                src={category.image}
                alt={category.title}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-400 group-hover:from-black/95 group-hover:via/black/50 pointer-events-none"></div>

              <div className="absolute z-10 bottom-0 p-8 text-white">
                <h3 className="text-2xl mb-2">{category.title}</h3>
                <span className="text-sm text-white/90">Explore collection</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
