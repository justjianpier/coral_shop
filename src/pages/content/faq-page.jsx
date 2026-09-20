import { ChevronDown, CircleHelp, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { ContentCard, ContentPage } from "./components/content-page";

const QUESTIONS = [
  ["How can I track my order?", "Once your order ships, you will receive an email with a tracking number and a link to the carrier's website."],
  ["Do you ship internationally?", "Yes. We ship to most countries worldwide, with rates and delivery estimates calculated during checkout."],
  ["Can I change or cancel my order?", "Contact us as quickly as possible. Once an order has shipped, it can no longer be changed or cancelled."],
  ["What payment methods do you accept?", "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay."],
  ["How long do returns take?", "Returns are usually inspected within three business days. Your bank may need additional time to post the refund."],
  ["Are Coral products ethically sourced?", "We prioritize partners who provide fair wages, safe working conditions, and transparent sourcing practices."],
];

export function FAQPage() {
  return (
    <ContentPage
      eyebrow="Customer care"
      title="Answers, without the searching"
      description="The most common questions about orders, delivery, returns, and shopping with Coral."
      icon={CircleHelp}
    >
      <ContentCard className="mx-auto max-w-4xl overflow-hidden divide-y divide-stone-200/80">
        {QUESTIONS.map(([question, answer]) => (
          <details key={question} className="group px-5 py-1 sm:px-7">
            <summary className="flex min-h-18 cursor-pointer list-none items-center gap-4 py-5 font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] [&::-webkit-details-marker]:hidden">
              <span className="flex-1 text-sm sm:text-base">{question}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-stone-100 text-slate-500 transition group-open:rotate-180 group-open:bg-[#fff0eb] group-open:text-[#ff5331] motion-reduce:transition-none">
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </summary>
            <p className="max-w-3xl pb-5 pr-10 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              {answer}
            </p>
          </details>
        ))}
      </ContentCard>

      <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl bg-slate-950 p-5 text-center text-white sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-5 w-5 shrink-0 text-[#ff7354]" aria-hidden="true" />
          <p className="text-sm font-semibold">Still need a hand? Our care team is ready.</p>
        </div>
        <Link
          to="/contact-us"
          className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-[#ff5331] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Contact us
        </Link>
      </div>
    </ContentPage>
  );
}
