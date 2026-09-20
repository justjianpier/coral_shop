import { Clock3, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { ContentCard, ContentPage } from "./components/content-page";

const CONTACT_DETAILS = [
  { label: "Email us", value: "hello@coralshop.com", icon: Mail },
  { label: "Visit us", value: "48 Mercer Street, New York", icon: MapPin },
  { label: "Support hours", value: "Mon–Fri, 9:00–18:00 EST", icon: Clock3 },
];

export function ContactUsPage() {
  return (
    <ContentPage
      eyebrow="Customer care"
      title="We would love to hear from you"
      description="Questions about an order, a product, or the Coral community? Our team is here to help."
      icon={MessageCircle}
    >
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-4">
          {CONTACT_DETAILS.map((detail) => {
            const Icon = detail.icon;
            return (
              <ContentCard key={detail.label} className="flex items-center gap-4 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fff0eb] text-[#ff5331]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    {detail.label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800 sm:text-base">
                    {detail.value}
                  </p>
                </div>
              </ContentCard>
            );
          })}

          <div className="rounded-[1.75rem] bg-slate-950 p-6 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff7354]">
              Typical response time
            </p>
            <p className="mt-3 text-3xl font-black">Under 24 hours</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              We answer every message personally during support hours.
            </p>
          </div>
        </div>

        <ContentCard className="p-5 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            Send us a message
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tell us how we can help and include your order number when relevant.
          </p>

          <form className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="first-name" label="First name">
                <input id="first-name" name="firstName" type="text" autoComplete="given-name" required className={inputStyles} />
              </FormField>
              <FormField id="last-name" label="Last name">
                <input id="last-name" name="lastName" type="text" autoComplete="family-name" required className={inputStyles} />
              </FormField>
            </div>
            <FormField id="contact-email" label="Email address">
              <input id="contact-email" name="email" type="email" autoComplete="email" required className={inputStyles} />
            </FormField>
            <FormField id="contact-message" label="How can we help?">
              <textarea id="contact-message" name="message" rows="5" required className={`${inputStyles} resize-none`} />
            </FormField>
            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#ff5331] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#ff5331]/20 transition hover:-translate-y-0.5 hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] motion-reduce:transform-none"
            >
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </ContentCard>
      </div>
    </ContentPage>
  );
}

const inputStyles =
  "mt-2 min-h-12 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#ff5331] focus:bg-white focus:ring-4 focus:ring-[#ff5331]/10";

function FormField({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}
