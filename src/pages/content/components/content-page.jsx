export function ContentPage({ eyebrow, title, description, icon: Icon, children }) {
  return (
    <main className="relative min-h-[70vh] overflow-hidden bg-[#faf8f4] py-10 sm:py-14 lg:py-18">
      <div
        className="pointer-events-none absolute -right-36 -top-36 h-[28rem] w-[28rem] rounded-full bg-[#ff5331]/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-52 -left-44 h-[32rem] w-[32rem] rounded-full bg-amber-200/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-[92%] max-w-7xl">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          {Icon && (
            <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-[#ff5331]/15 bg-[#fff0eb] text-[#ff5331] shadow-sm">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
          )}
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#e94727]">
            {eyebrow}
          </p>
          <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
              {description}
            </p>
          )}
        </header>

        {children}
      </div>
    </main>
  );
}

export function ContentCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[1.75rem] border border-stone-200/80 bg-white shadow-[0_24px_70px_-48px_rgba(15,23,42,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-6 sm:mb-8">
      {eyebrow && (
        <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#e94727]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
