export const primaryButtonStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ff5331] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#ff5331]/15 transition hover:-translate-y-0.5 hover:bg-[#e94727] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none";

export const secondaryButtonStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-stone-300 hover:bg-stone-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5331]";

export const fieldStyles =
  "min-h-12 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#ff5331] focus:bg-white focus:ring-4 focus:ring-[#ff5331]/10";

export const selectStyles =
  "min-h-10 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#ff5331] focus:ring-4 focus:ring-[#ff5331]/10";

export function formatAdminDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
