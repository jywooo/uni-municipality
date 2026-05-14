import { Link, useLocation } from 'react-router';
import { CheckCircle2 } from 'lucide-react';
import { RegistrationQRCode } from '../components/RegistrationQRCode.jsx';

export function Confirmation() {
  const location = useLocation();
  const event = location.state?.event;
  const registration = location.state?.registration;
  const email = location.state?.email;

  if (!event || !registration) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-white">
        <h1 className="text-3xl font-semibold">No confirmation data available</h1>
        <p className="mt-4 text-zinc-400">Please register for an event first.</p>
        <Link to="/events" className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black">
          Browse events
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 text-center shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Registration confirmed</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">You are registered for {event.title}</h1>
        <p className="mt-4 text-base leading-7 text-zinc-400">
          A confirmation notice can be presented as delivered to <span className="text-zinc-200">{email}</span>.
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-[2rem] border border-white/10 bg-black/40 p-10">
          <RegistrationQRCode registration={registration} eventTitle={event.title} size={360} />
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Present this QR code at the event entrance. A normal phone camera will open the web check-in page.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/events" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5">
            Browse more events
          </Link>
          <Link to="/" className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
