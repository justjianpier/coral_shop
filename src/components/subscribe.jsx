import { Mail } from "lucide-react";

export function Subscribe() {
  return (
    <section className="bg-linear-to-br from-[#ff5331] via-[#fa6240] to-[#ff5331] py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/10 blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl w-[90%] mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8 shadow-xl">
          <Mail className="text-white" size={35} />
        </div>
        <h2 className="text-4xl text-white font-semibold mb-4">
          Get 10% Off your First Order
        </h2>
        <p className="text-white/95 mb-10 text-lg max-w-2xl mx-auto">
          Subscribe to our newsletter and stay updated on new arrivals and
          exclusive deals
        </p>
        <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input
            className="flex-1 px-6 py-4 rounded-2xl bg-white text-gray-700 placeholder:text-gray-400 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
            type="text"
            placeholder="Enter your email..."
          />

          <button className="px-10 py-4 rounded-2xl bg-black text-white font-medium shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-900 hover:shadow-black/30 active:scale-100 cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
