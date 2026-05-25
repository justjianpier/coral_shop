import HeroImage from "/hero.jpg";

export function Hero() {
  return (
    <section className="bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 overflow-hidden py-16">
      <div className="max-w-7xl w-[90%] mx-auto flex flex-col items-center gap-8 md:flex-row">
        <div className="flex-1">
          <span className="inline-block bg-[#FFE8E3] px-4 py-2 rounded-full mb-6">
            ✨ Spring Collection 2026
          </span>
          <h1 className="font-semibold text-5xl max-w-150 lg:text-6xl tracking-tight mb-6">
            Discover Unique
            <span className="text-[#FF623F]"> Handcrafted Treasures</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mb-6">
            Explore our curated collection of artisan-made jewelry, clothing,
            and home decor. Each piece tells a story.
          </p>
          <div className="flex gap-5">
            <button className="px-8 py-3 bg-[#FF623F] text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg shador-bg-[#FF623F]">
              Shop Now
            </button>
            <button className="px-8 py-3 bg-white font-semibold text-gray-700 rounded-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-300 border border-gray-200">
              View Collections
            </button>
          </div>
        </div>
        <div className="flex-1 rounded-4xl overflow-hidden">
          <img src={HeroImage} alt="HeroImage" />
        </div>
      </div>
    </section>
  );
}
