import { CheckCircle2, PackageOpen, RefreshCcw, RotateCcw } from "lucide-react";
import { Link } from "react-router";
import { ContentCard, ContentPage } from "./components/content-page";

const RETURN_STEPS = [
  ["01", "Start your request", "Contact our care team with your order number and the items you would like to return."],
  ["02", "Pack with care", "Place unused items in their original packaging and include the receipt or packing slip."],
  ["03", "Send it back", "Use a trackable shipping method and keep your receipt until the return is complete."],
  ["04", "Receive your refund", "After inspection, the refund is issued to your original payment method."],
];

export function ReturnsPage() {
  return (
    <ContentPage
      eyebrow="Customer care"
      title="Returns made straightforward"
      description="You have 30 days to decide. We want every Coral purchase to feel completely right."
      icon={RotateCcw}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <ContentCard className="p-5 sm:p-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            How to return an item
          </h2>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2">
            {RETURN_STEPS.map(([number, title, text]) => (
              <li key={number} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
                <span className="text-xs font-black tracking-widest text-[#e94727]">{number}</span>
                <h3 className="mt-2 font-black text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </li>
            ))}
          </ol>
        </ContentCard>

        <div className="space-y-5">
          <ContentCard className="p-6">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-black text-slate-900">Eligible condition</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Items must be unused, unworn, and returned with their original packaging.
            </p>
          </ContentCard>
          <ContentCard className="p-6">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#fff0eb] text-[#ff5331]">
              <RefreshCcw className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-black text-slate-900">Refund timing</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Refunds are initiated after inspection. Processing time varies by bank.
            </p>
          </ContentCard>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[1.75rem] bg-slate-950 p-6 text-center text-white sm:flex-row sm:text-left">
        <div className="flex items-center gap-4">
          <PackageOpen className="hidden h-7 w-7 shrink-0 text-[#ff7354] sm:block" aria-hidden="true" />
          <div>
            <h2 className="font-black">Ready to start a return?</h2>
            <p className="mt-1 text-sm text-slate-300">Have your order number nearby.</p>
          </div>
        </div>
        <Link
          to="/contact-us"
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#ff5331] px-5 py-3 text-sm font-bold transition hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Contact customer care
        </Link>
      </div>
    </ContentPage>
  );
}
