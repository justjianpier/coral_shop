import { AlertCircle, Inbox } from "lucide-react";

export function AdminPageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="mb-7 flex flex-col gap-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="mb-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-[#e94727]">
          {eyebrow}
        </p>
        <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </header>
  );
}

export function AdminPanel({ children, className = "" }) {
  return (
    <section
      className={`overflow-hidden rounded-[1.5rem] border border-stone-200/80 bg-white shadow-[0_24px_65px_-48px_rgba(15,23,42,0.5)] ${className}`}
    >
      {children}
    </section>
  );
}

export function ErrorState({ error, detail }) {
  return (
    <div className="mx-auto flex min-h-[22rem] max-w-xl items-center justify-center px-4 text-center">
      <div>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-600">
          <AlertCircle className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-xl font-black text-slate-950">
          We could not load this view
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>
        {detail ? <p className="mt-1 text-xs text-slate-400">{detail}</p> : null}
      </div>
    </div>
  );
}

export function EmptyState({ title, description }) {
  return (
    <div className="px-5 py-14 text-center">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-stone-100 text-slate-400">
        <Inbox className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 font-black text-slate-900">{title}</p>
      {description ? (
        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{description}</p>
      ) : null}
    </div>
  );
}

const BADGE_STYLES = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/10",
  SHIPPED: "bg-blue-50 text-blue-700 ring-blue-600/10",
  DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  CANCELLED: "bg-red-50 text-red-700 ring-red-600/10",
  ACTIVE: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
  INACTIVE: "bg-stone-100 text-stone-600 ring-stone-600/10",
  ADMIN: "bg-violet-50 text-violet-700 ring-violet-600/10",
  USER: "bg-slate-100 text-slate-600 ring-slate-600/10",
};

export function AdminBadge({ value, label }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-wider ring-1 ring-inset ${
        BADGE_STYLES[value] || BADGE_STYLES.INACTIVE
      }`}
    >
      {label || value}
    </span>
  );
}
