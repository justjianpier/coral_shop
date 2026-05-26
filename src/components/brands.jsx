export function Brands() {
  const brands = [
    { id: 1, name: "Graphic Studio" },
    { id: 2, name: "Salva Art Director" },
    { id: 3, name: "Golden Studio" },
    { id: 4, name: "Furniture Studio" },
    { id: 5, name: "Travel Lookbook" },
  ];

  return (
    <section className="bg-[#F9FAFC] py-16">
      <div className="max-w-7xl w-[90%] mx-auto">
        <h2 className="text-4xl mb-10 font-semibold text-center">
          Trusted by Leanding Brands
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <li
              className="text-center flex items-center justify-center p-8 bg-white rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group"
              key={brand.id}
            >
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
