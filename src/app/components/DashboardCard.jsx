export function DashboardCard({ title, value, subtitle, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          {subtitle ? <p className="mt-2 text-sm text-zinc-400">{subtitle}</p> : null}
        </div>
        {icon ? <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-300">{icon}</div> : null}
      </div>
    </div>
  );
}
