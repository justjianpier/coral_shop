import { ArrowUpRight, Mail, Newspaper } from "lucide-react";
import { ContentCard, ContentPage } from "./components/content-page";

const RELEASES = [
  {
    date: "October 12, 2026",
    type: "Press release",
    title: "Coral Shop Announces New Spring Collection",
    description:
      "Our latest collection brings together vibrant color, enduring silhouettes, and ethically sourced materials.",
  },
  {
    date: "September 5, 2026",
    type: "In the press",
    title: "Featured in Vogue Artisan Edition",
    description:
      "Coral's commitment to supporting independent artisans was highlighted in Vogue's special edition.",
  },
  {
    date: "July 18, 2026",
    type: "Company news",
    title: "A New Milestone for Our Maker Community",
    description:
      "More than one hundred independent studios now share their work through the Coral marketplace.",
  },
];

export function PressPage() {
  return (
    <ContentPage
      eyebrow="Media & news"
      title="The latest from Coral"
      description="Company updates, collection announcements, and stories from across our community."
      icon={Newspaper}
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <ContentCard className="divide-y divide-stone-200/80 overflow-hidden">
          {RELEASES.map((release) => (
            <article key={release.title} className="p-5 sm:p-7">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="text-[#e94727]">{release.type}</span>
                <span className="text-stone-300" aria-hidden="true">•</span>
                <time className="text-slate-400">{release.date}</time>
              </div>
              <h2 className="mt-3 text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                {release.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                {release.description}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#e94727]">
                Full story coming soon
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </p>
            </article>
          ))}
        </ContentCard>

        <ContentCard className="h-fit bg-slate-950 p-6 text-white lg:sticky lg:top-48">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[#ff7354]">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-xl font-black">Press inquiries</h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Looking for brand assets, interviews, or more information about Coral?
          </p>
          <a
            href="mailto:press@coralshop.com"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#ff5331] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            press@coralshop.com
          </a>
        </ContentCard>
      </div>
    </ContentPage>
  );
}
