import { Footer } from "../components/footer";
import { Header } from "../components/header";

export function Blogs() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 py-16">
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FFE8E3] px-4 py-2 rounded-full mb-6 font-medium text-[#FF623F]">
              Our Blog
            </span>
            <h1 className="font-semibold text-4xl lg:text-5xl tracking-tight mb-6">
              Latest Articles
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover tips, stories, and insights from the Coral Shop
              community.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Blog Post 1 */}
            <article className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Image Placeholder</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>Design</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  The Art of Handcrafted Jewelry
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Explore the intricate process and deep dedication behind every
                  handcrafted piece of jewelry in our new spring collection.
                </p>
                <button className="text-[#FF623F] font-medium hover:underline">
                  Read Article &rarr;
                </button>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Image Placeholder</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>Sustainability</span>
                  <span>•</span>
                  <span>4 min read</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Eco-Friendly Packaging Guide
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Learn how we are making a difference with our 100% recyclable
                  and compostable packaging materials.
                </p>
                <button className="text-[#FF623F] font-medium hover:underline">
                  Read Article &rarr;
                </button>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Image Placeholder</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>Lifestyle</span>
                  <span>•</span>
                  <span>6 min read</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Decorating with Artisan Goods
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  Bring warmth and personality into your home by incorporating
                  unique artisan-made decor items.
                </p>
                <button className="text-[#FF623F] font-medium hover:underline">
                  Read Article &rarr;
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
