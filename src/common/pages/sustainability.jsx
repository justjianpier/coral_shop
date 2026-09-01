export function Sustainability() {
  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 py-16">
      <div className="max-w-7xl w-[90%] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#FFE8E3] px-4 py-2 rounded-full mb-6 font-medium text-[#FF623F]">
            Our Commitment
          </span>
          <h1 className="font-semibold text-4xl lg:text-5xl tracking-tight mb-6">
            Sustainability
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe in creating beautiful products that don't cost the earth. Learn about our sustainable practices.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-semibold mb-4 text-[#FF623F]">Ethical Sourcing</h3>
            <p className="text-gray-600 leading-relaxed">
              Every item in our store is sourced from partners who guarantee fair wages and safe working conditions for their artisans. We prioritize transparency in our supply chain from start to finish.
            </p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-semibold mb-4 text-[#FF623F]">Eco-Friendly Materials</h3>
            <p className="text-gray-600 leading-relaxed">
              Our packaging is 100% recyclable or compostable. We continually strive to reduce our carbon footprint by opting for low-impact dyes and organically grown fibers in our clothing line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
