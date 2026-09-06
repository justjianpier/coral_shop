import { Header } from "../common/components/header";
import { Footer } from "../common/components/footer";

export function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Last updated: September 2026
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We collect information you provide directly to us, such as when
                you create an account, make a purchase, or contact us. This may
                include your name, email address, shipping address, payment
                information, and any other information you choose to provide.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use the information we collect to process transactions, send
                you order updates, respond to your comments and questions,
                provide customer support, send you marketing communications
                (with your consent), and improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal
                information to outside parties except as described in this
                policy. We may share your information with trusted third parties
                who assist us in operating our website and conducting our
                business, as long as those parties agree to keep this
                information confidential.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement a variety of security measures to maintain the
                safety of your personal information. Your personal data is
                stored in secured networks and is only accessible by a limited
                number of authorized personnel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies to enhance your experience on our website. You
                can choose to have your computer warn you each time a cookie is
                being sent, or you can choose to turn off all cookies through
                your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed">
                You have the right to access, correct, or delete your personal
                information at any time. You may also unsubscribe from our
                marketing communications at any time by clicking the
                "unsubscribe" link in our emails.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at privacy@coralshop.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
