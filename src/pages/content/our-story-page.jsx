import { HeartHandshake, Sparkles, Store, UsersRound } from "lucide-react";
import {
  ContentCard,
  ContentPage,
  SectionHeading,
} from "./components/content-page";

const MILESTONES = [
  ["2018", "A small idea", "Coral began as a neighborhood boutique built around meaningful, artisan-made objects."],
  ["2021", "A wider community", "Independent makers from around the world joined our growing creative network."],
  ["Today", "Made to matter", "We continue connecting thoughtful customers with pieces that carry a human story."],
];

export function OurStoryPage() {
  return (
    <ContentPage
      eyebrow="Our origins"
      title="Every piece begins with a person"
      description="Coral was created to celebrate independent makers, enduring materials, and objects with a story worth sharing."
      icon={Store}
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <ContentCard className="p-6 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why we started"
            title="A slower, more personal way to shop"
          />
          <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              Founded with a passion for unique, artisan-made goods, Coral began
              as a small boutique. We traveled the globe seeking talented
              creators and beautiful, sustainable materials to bring you pieces
              that tell a story.
            </p>
            <p>
              Today, our mission remains simple: support independent artists and
              offer a considered selection of jewelry, clothing, and home decor
              that cannot be found everywhere else.
            </p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#fff0eb] p-5">
              <HeartHandshake className="h-6 w-6 text-[#ff5331]" aria-hidden="true" />
              <p className="mt-3 font-black text-slate-900">Maker first</p>
              <p className="mt-1 text-sm text-slate-500">Fair partnerships built to last.</p>
            </div>
            <div className="rounded-2xl bg-stone-100 p-5">
              <UsersRound className="h-6 w-6 text-slate-700" aria-hidden="true" />
              <p className="mt-3 font-black text-slate-900">Community led</p>
              <p className="mt-1 text-sm text-slate-500">Curated with people in mind.</p>
            </div>
          </div>
        </ContentCard>

        <ContentCard className="p-6 sm:p-8">
          <SectionHeading eyebrow="Our journey" title="Growing with intention" />
          <ol className="relative space-y-7 border-l border-[#ff5331]/20 pl-7">
            {MILESTONES.map(([year, title, text]) => (
              <li key={year} className="relative">
                <span className="absolute -left-[2.12rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-[#ff5331] shadow" />
                <p className="text-xs font-black uppercase tracking-widest text-[#e94727]">
                  {year}
                </p>
                <h3 className="mt-1 text-lg font-black text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
            <Sparkles className="h-5 w-5 shrink-0 text-[#ff5331]" aria-hidden="true" />
            <p className="text-sm font-semibold text-slate-600">
              The best chapter is always the one we create next.
            </p>
          </div>
        </ContentCard>
      </div>
    </ContentPage>
  );
}
