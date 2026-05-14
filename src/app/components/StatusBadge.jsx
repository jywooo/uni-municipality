const statusStyles = {
  Registered: 'bg-sky-500/15 text-sky-300 border border-sky-500/30',
  Confirmed: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  Attended: 'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  Absent: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
  Draft: 'bg-zinc-700 text-zinc-200 border border-zinc-600',
  Published: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  Closed: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
  Active: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  Inactive: 'bg-zinc-700 text-zinc-200 border border-zinc-600',
};

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${statusStyles[status] || 'bg-zinc-800 text-zinc-200 border border-zinc-700'}`}>
      {status}
    </span>
  );
}
