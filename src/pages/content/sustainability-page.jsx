import { Earth, Leaf, PackageCheck, Recycle, Scale } from "lucide-react";
import { ContentCard, ContentPage } from "./components/content-page";

const COMMITMENTS = [
  {
    title: "Ethical sourcing",
    description:
      "We partner with studios that guarantee fair wages, safe conditions, and transparent supply chains.",
    icon: Scale,
  },
  {
    title: "Better materials",
    description:
      "We prioritize organically grown fibers, low-impact dyes, and durable materials designed to last.",
    icon: Leaf,
  },
  {
    title: "Thoughtful packaging",
    description:
      "Our packaging is recyclable or compostable, with less material used in every shipment.",
    icon: PackageCheck,
  },
];

export function SustainabilityPage() {
  return (
    <ContentPage
      eyebrow="Our commitment"
      title="Beautiful things should respect the earth"
      description="We are building a more responsible marketplace through better partnerships, materials, and everyday decisions."
      icon={Earth}
    >
      <div className="grid gap-5 md:grid-cols-3">
        {COMMITMENTS.map((commitment) => {
          const Icon = commitment.icon;
          return (
            <ContentCard key={commitment.title} className="p-6 sm:p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-xl font-black tracking-tight text-slate-950">
                {commitment.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {commitment.description}
              </p>
            </ContentCard>
          );
        })}
      </div>

      <ContentCard className="mt-6 overflow-hidden bg-emerald-950 text-white">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-300">
              Progress, not perfection
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
              Every order is a chance to do a little better
            </h2>
            <p className="mt-3 text-sm leading-6 text-emerald-100/75 sm:text-base">
              We continually measure our footprint and work with our maker
              community to reduce waste without compromising craft.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur">
            <Recycle className="h-9 w-9 text-emerald-300" aria-hidden="true" />
            <div>
              <p className="text-3xl font-black">100%</p>
              <p className="text-sm text-emerald-100/70">recyclable packaging</p>
            </div>
          </div>
        </div>
      </ContentCard>
    </ContentPage>
  );
}
