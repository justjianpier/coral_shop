import { Header } from "../common/components/header";
import { Footer } from "../common/components/footer";

export function Returns() {
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
              Returns & Exchanges
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our policy lasts 30 days. We want you to be completely satisfied
              with your purchase.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              How to Return an Item
            </h3>
            <p className="text-gray-600 mb-6">
              If you are not entirely satisfied with your purchase, simply
              return the item within 30 days with your receipt. The item must be
              in its original unused condition to be returned, unless there is a
              manufacturer defect.
            </p>
            <ol className="list-decimal list-inside space-y-3 text-gray-600 mb-6">
              <li>
                Request a Return Authorization Number (RAN) via our Contact Us
                page.
              </li>
              <li>Pack the item securely in its original packaging.</li>
              <li>Include the original receipt or packing slip.</li>
              <li>
                Ship the item to our Returns Department using a trackable
                shipping method.
              </li>
            </ol>
            <h3 className="text-2xl font-semibold mb-4">Refunds</h3>
            <p className="text-gray-600">
              Once your return is received and inspected, we will initiate a
              refund to your credit card (or original method of payment). You
              will receive the credit within a certain amount of days, depending
              on your card issuer's policies.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
