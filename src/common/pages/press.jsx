export function Press() {
  return (
    <div className="min-h-screen bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 py-16">
      <div className="max-w-7xl w-[90%] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#FFE8E3] px-4 py-2 rounded-full mb-6 font-medium text-[#FF623F]">
            Media & News
          </span>
          <h1 className="font-semibold text-4xl lg:text-5xl tracking-tight mb-6">
            Press
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read the latest news, press releases, and media mentions about Coral
            Shop.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="space-y-8">
            <div className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
              <span className="text-sm text-gray-500 font-medium">
                October 12, 2026
              </span>
              <h3 className="text-2xl font-semibold mt-2 mb-3">
                Coral Shop Announces New Spring Collection
              </h3>
              <p className="text-gray-600 mb-4">
                We are thrilled to unveil our highly anticipated Spring
                Collection, featuring vibrant colors and ethically sourced
                materials...
              </p>
              <button className="text-[#FF623F] font-medium hover:underline">
                Read Full Release &rarr;
              </button>
            </div>
            <div className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
              <span className="text-sm text-gray-500 font-medium">
                September 05, 2026
              </span>
              <h3 className="text-2xl font-semibold mt-2 mb-3">
                Featured in Vogue Artisan Edition
              </h3>
              <p className="text-gray-600 mb-4">
                Coral Shop's commitment to supporting independent artisans was
                highlighted in this month's special edition of Vogue.
              </p>
              <button className="text-[#FF623F] font-medium hover:underline">
                Read Article &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
