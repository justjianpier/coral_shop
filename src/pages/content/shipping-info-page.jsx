import { Clock3, Globe2, PackageCheck, Plane, Truck } from "lucide-react";
import { ContentCard, ContentPage } from "./components/content-page";

const SHIPPING_OPTIONS = [
  {
    title: "Standard",
    time: "5–7 business days",
    price: "Free over $50",
    description: "Our most economical tracked delivery option for everyday orders.",
    icon: Truck,
  },
  {
    title: "Express",
    time: "2–3 business days",
    price: "$15.99 flat rate",
    description: "A faster tracked service when your order needs to arrive sooner.",
    icon: Plane,
  },
  {
    title: "International",
    time: "14–21 business days",
    price: "Calculated at checkout",
    description: "Worldwide delivery with timing and rates based on destination.",
    icon: Globe2,
  },
];

export function ShippingInfoPage() {
  return (
    <ContentPage
      eyebrow="Delivery guide"
      title="From our makers to your door"
      description="Clear delivery options, reliable tracking, and careful packaging for every Coral order."
      icon={PackageCheck}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {SHIPPING_OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <ContentCard key={option.title} className="p-6 sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff0eb] text-[#ff5331]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-black text-slate-950">{option.title}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm font-bold text-slate-700">
                <Clock3 className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {option.time}
              </p>
              <p className="mt-1 text-sm font-bold text-[#e94727]">{option.price}</p>
              <p className="mt-4 text-sm leading-6 text-slate-500">{option.description}</p>
            </ContentCard>
          );
        })}
      </div>

      <ContentCard className="mt-6 overflow-hidden">
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-3">
          {[
            ["Tracked from dispatch", "A tracking link is emailed as soon as your order leaves us."],
            ["Packed with care", "Each item is protected using recyclable or compostable materials."],
            ["Customs & duties", "International orders may be subject to local import fees."],
          ].map(([title, text], index) => (
            <div key={title} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-black text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="font-black text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentCard>
    </ContentPage>
  );
}
