import { ArrowUpRight, BriefcaseBusiness, Clock3, MapPin } from "lucide-react";
import { ContentCard, ContentPage } from "./components/content-page";

const OPEN_ROLES = [
  {
    title: "Frontend Developer",
    location: "Remote",
    schedule: "Full-time",
    area: "Product & Technology",
  },
  {
    title: "Marketing Manager",
    location: "New York, NY",
    schedule: "Full-time",
    area: "Brand & Growth",
  },
  {
    title: "Customer Success Specialist",
    location: "Remote",
    schedule: "Part-time",
    area: "Customer Experience",
  },
];

export function CareersPage() {
  return (
    <ContentPage
      eyebrow="Join our team"
      title="Build a more thoughtful marketplace"
      description="We are a curious, collaborative team helping independent makers share meaningful work with the world."
      icon={BriefcaseBusiness}
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          ["Flexible", "Work with autonomy and trust"],
          ["Human", "People come before processes"],
          ["Purposeful", "Build with lasting impact"],
        ].map(([title, text]) => (
          <div
            key={title}
            className="rounded-2xl border border-[#ff5331]/10 bg-[#fff0eb] p-5 text-center"
          >
            <p className="font-black text-slate-900">{title}</p>
            <p className="mt-1 text-sm text-slate-500">{text}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {OPEN_ROLES.map((role) => (
          <ContentCard key={role.title} className="flex flex-col p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#e94727]">
              {role.area}
            </p>
            <h2 className="mt-3 text-xl font-black tracking-tight text-slate-950">
              {role.title}
            </h2>
            <div className="mt-5 space-y-2 text-sm text-slate-500">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {role.location}
              </p>
              <p className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-slate-400" aria-hidden="true" />
                {role.schedule}
              </p>
            </div>
            <a
              href={`mailto:careers@coralshop.com?subject=${encodeURIComponent(role.title)}`}
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#ff5331] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] motion-reduce:transform-none"
            >
              Apply for this role
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </ContentCard>
        ))}
      </div>
    </ContentPage>
  );
}
