import { Header } from "../common/components/header";
import { Footer } from "../common/components/footer";

export function ShippingInfo() {
  return (
    <>
      <Header />
      <main className="grow bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 py-16">
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FFE8E3] px-4 py-2 rounded-full mb-6 font-medium text-[#FF623F]">
              Customer Service
            </span>
            <h1 className="font-semibold text-4xl lg:text-5xl tracking-tight mb-6">
              Shipping Info
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our delivery methods and times.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-[#FF623F]">
              Standard Shipping
            </h3>
            <p className="text-gray-600 mb-6">
              Our standard shipping takes 5-7 business days. Free on all orders
              over $50. For orders under $50, a flat rate of $5.99 applies.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-[#FF623F]">
              Express Shipping
            </h3>
            <p className="text-gray-600 mb-6">
              Need it faster? Choose express shipping at checkout for 2-3
              business days delivery. Flat rate of $15.99 applies to all express
              orders.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-[#FF623F]">
              International Shipping
            </h3>
            <p className="text-gray-600">
              We ship worldwide! International shipping rates and times vary
              depending on the destination. Please allow up to 14-21 business
              days for international deliveries. Custom fees may apply.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
