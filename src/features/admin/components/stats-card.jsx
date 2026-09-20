export function StatsCard({ title, value, icon: Icon, color = "bg-[#fff0eb] text-[#e94727]" }) {
  return (
    <div className="h-full rounded-[1.35rem] border border-stone-200/80 bg-white p-5 shadow-[0_20px_55px_-44px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-42px_rgba(15,23,42,0.45)] motion-reduce:transform-none sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.13em] text-slate-400">{title}</p>
          <p className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{value}</p>
        </div>
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${color}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
