import { ContentCard } from "./content-page";

export function LegalDocument({ sections, contactEmail }) {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5 lg:sticky lg:top-48">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#e94727]">
          On this page
        </p>
        <nav className="mt-4" aria-label="Document sections">
          <ol className="space-y-1">
            {sections.map((section, index) => (
              <li key={section.title}>
                <a
                  href={`#section-${index + 1}`}
                  className="block rounded-lg px-2 py-2 text-sm font-semibold leading-5 text-slate-500 transition-colors hover:bg-stone-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-[#ff5331]"
                >
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>

      <ContentCard className="divide-y divide-stone-200/80 overflow-hidden">
        {sections.map((section, index) => (
          <section
            key={section.title}
            id={`section-${index + 1}`}
            className="scroll-mt-52 p-5 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#fff0eb] text-xs font-black text-[#e94727]">
                {index + 1}
              </span>
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-950 sm:text-xl">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                  {section.content}
                </p>
              </div>
            </div>
          </section>
        ))}

        <div className="bg-stone-50 p-5 sm:p-8">
          <p className="text-sm leading-6 text-slate-600">
            Questions about this document? Email{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="font-bold text-[#e94727] underline decoration-[#ff5331]/30 underline-offset-4 hover:decoration-[#ff5331] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]"
            >
              {contactEmail}
            </a>
            .
          </p>
        </div>
      </ContentCard>
    </div>
  );
}
