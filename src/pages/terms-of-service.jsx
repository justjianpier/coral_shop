import { Header } from "../common/components/header";
import { Footer } from "../common/components/footer";

export function TermsOfService() {
  return (
    <>
      <Header />
      <main className="grow bg-linear-to-br from-rose-50 via-orange-50 to-rose-50 py-16">
        <div className="max-w-7xl w-[90%] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-[#FFE8E3] px-4 py-2 rounded-full mb-6 font-medium text-[#FF623F]">
              Legal
            </span>
            <h1 className="font-semibold text-4xl lg:text-5xl tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Last updated: September 2026
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using the Coral Shop website and services, you
                agree to be bound by these Terms of Service. If you do not agree
                to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. Account Registration
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To access certain features, you may need to create an account.
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. Products and Pricing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We strive to provide accurate descriptions and pricing for all
                products. However, we do not warrant that product descriptions
                or pricing information is error-free. We reserve the right to
                correct any errors and to change or update information at any
                time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Orders and Payment
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By placing an order, you represent that all information provided
                is accurate. We reserve the right to refuse or cancel any order
                for any reason, including limitations on quantities available or
                inaccuracies in product or pricing information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Shipping and Returns
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Shipping and return policies are outlined in our Shipping Info
                and Returns pages. By making a purchase, you agree to the terms
                and conditions described therein.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                6. Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All content on this website, including text, graphics, logos,
                and images, is the property of Coral Shop and is protected by
                intellectual property laws. You may not reproduce, distribute,
                or create derivative works without our express written
                permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                7. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Coral Shop shall not be liable for any indirect, incidental,
                special, or consequential damages resulting from the use or
                inability to use our services or products.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                8. Changes to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to update these terms at any time.
                Continued use of our services after any changes constitutes
                acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms of Service, please
                contact us at terms@coralshop.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
