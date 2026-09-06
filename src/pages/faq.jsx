import { Header } from "../common/components/header";
import { Footer } from "../common/components/footer";

export function FAQ() {
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
              Frequently Asked Questions
            </h1>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto space-y-6">
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-xl font-semibold mb-2">
                How can I track my order?
              </h3>
              <p className="text-gray-600">
                Once your order ships, you will receive an email with a tracking
                number. You can use that number to track your package on our
                carrier's website.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-xl font-semibold mb-2">
                Do you ship internationally?
              </h3>
              <p className="text-gray-600">
                Yes, we ship to most countries worldwide. International shipping
                rates will be calculated at checkout.
              </p>
            </div>
            <div className="border-b border-gray-100 pb-6">
              <h3 className="text-xl font-semibold mb-2">
                Can I change or cancel my order?
              </h3>
              <p className="text-gray-600">
                We process orders quickly, but if you need to cancel or change
                your order, please contact us immediately. Once the order has
                shipped, it cannot be canceled.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept Visa, MasterCard, American Express, PayPal, and Apple
                Pay.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
