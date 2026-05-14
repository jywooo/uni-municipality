export function Footer() {
  return (
    <footer className="border-t-2 border-cyan-400/30 bg-[linear-gradient(180deg,_#111827_0%,_#0f172a_55%,_#020617_100%)] shadow-[0_-20px_45px_rgba(0,0,0,0.35)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-sm sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Municipality Platform</p>
          <h3 className="mt-2 text-lg font-semibold text-white">Municipality Events Management System</h3>
          <p className="mt-3 max-w-md leading-6 text-slate-300">
            A presentation-ready frontend for Lebanese municipalities to publish public events, manage registrations,
            monitor attendance, and support organized civic engagement.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-100">Quick access</h4>
          <div className="mt-4 space-y-2 text-slate-300">
            <p>Public event catalog</p>
            <p>Participant registration management</p>
            <p>Organizer operations and analytics</p>
            <p>Administrative records management</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-100">Municipal contact</h4>
          <div className="mt-4 space-y-2 text-slate-300">
            <p>Municipal Events Office</p>
            <p>Central District, Lebanon</p>
            <p>events@municipality.gov.lb</p>
            <p>+961 1 555 210</p>
          </div>
        </div>
      </div>
      <div className="border-t border-cyan-400/10 bg-black/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 text-xs uppercase tracking-[0.16em] text-slate-400 sm:px-6 lg:px-8">
          <span>Municipality Events System</span>
          <span>Lebanon</span>
        </div>
      </div>
    </footer>
  );
}
