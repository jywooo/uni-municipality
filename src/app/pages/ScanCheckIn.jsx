import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { CheckCircle2, QrCode, ShieldCheck, TriangleAlert } from 'lucide-react';
import { ToastNotice } from '../components/ToastNotice.jsx';
import { useAppData } from '../context/AppDataContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function ScanCheckIn() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { registrations, events, updateRegistrationStatus } = useAppData();
  const { user, loginAsRole } = useAuth();
  const [statusMessage, setStatusMessage] = useState('');
  const toastTimeoutRef = useRef(null);

  const code = params.code?.trim() || searchParams.get('code')?.trim() || '';
  const registration = registrations.find((item) => item.scanToken === code || item.qrCode === code);
  const event = registration ? events.find((item) => item.id === registration.eventId) : null;
  const isOrganizer = user?.role === 'Organizer';
  const [toast, setToast] = useState({ open: false, title: '', message: '', tone: 'success' });

  useEffect(() => {
    if (!toast.open) {
      return undefined;
    }

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((current) => ({ ...current, open: false }));
    }, 2600);

    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, [toast]);

  const handleOrganizerAccess = () => {
    loginAsRole('Organizer');

    if (!registration || registration.status === 'Attended') {
      setStatusMessage('Organizer session opened for this device.');
      setToast({
        open: true,
        title: 'Organizer session ready',
        message: 'You can review this registration from the organizer dashboard.',
        tone: 'success',
      });
      return;
    }

    updateRegistrationStatus(registration.id, 'Attended');
    setStatusMessage(`${registration.participantName} has been marked as attended.`);
    setToast({
      open: true,
      title: 'Attendance recorded',
      message: `${registration.participantName} is registered in ${event.title}.`,
      tone: 'success',
    });
  };

  const handleConfirmAttendance = () => {
    if (!registration || registration.status === 'Attended') {
      return;
    }

    updateRegistrationStatus(registration.id, 'Attended');
    setStatusMessage(`${registration.participantName} has been marked as attended.`);
    setToast({
      open: true,
      title: 'Attendance recorded',
      message: `${registration.participantName} is registered in ${event.title}.`,
      tone: 'success',
    });
  };

  if (!code) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 text-center">
          <TriangleAlert className="mx-auto h-10 w-10 text-amber-300" />
          <h1 className="mt-5 text-3xl font-semibold text-white">Missing check-in code</h1>
          <p className="mt-3 text-zinc-400">This QR link does not include a valid attendance code.</p>
          <Link to="/" className="mt-8 inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  if (!registration || !event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 text-center">
          <TriangleAlert className="mx-auto h-10 w-10 text-amber-300" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Scan review</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Attendance record not found</h1>
          <p className="mt-4 text-zinc-400">
            The QR code was scanned successfully, but no matching registration exists in this demo session.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/organizer/checkin" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5">
              Open organizer scanner
            </Link>
            <Link to="/" className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
              Return home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isAttended = registration.status === 'Attended';

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
            <QrCode className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Attendance scan</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Municipality event check-in</h1>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
            <p className="text-sm font-medium text-zinc-400">Participant</p>
            <p className="mt-2 text-2xl font-semibold text-white">{registration.participantName}</p>
            <p className="mt-5 text-sm font-medium text-zinc-400">Event</p>
            <p className="mt-2 text-xl font-semibold text-white">{event.title}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Check-in code</p>
                <p className="mt-2 text-sm font-medium text-zinc-200">{registration.scanToken || registration.qrCode}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Current status</p>
                <p className="mt-2 text-sm font-medium text-zinc-200">{registration.status}</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-cyan-400/15 bg-cyan-500/5 p-4 text-sm leading-6 text-zinc-300">
              A normal phone camera can open this page directly. To record attendance, use an organizer session on this device.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
              <div>
                <h2 className="text-lg font-semibold text-white">Organizer confirmation</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  This step keeps attendance updates intentional while still working from a normal QR scan.
                </p>
              </div>
            </div>

            {!isOrganizer ? (
              <button
                type="button"
                onClick={handleOrganizerAccess}
                className="mt-6 w-full rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400"
              >
                Continue as organizer
              </button>
            ) : null}

            <button
              type="button"
              onClick={handleConfirmAttendance}
              disabled={!isOrganizer || isAttended}
              className="mt-4 w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-100 transition disabled:cursor-not-allowed disabled:border-white/5 disabled:text-zinc-500 hover:bg-white/5"
            >
              {isAttended ? 'Attendance already recorded' : 'Confirm attendance'}
            </button>

            {statusMessage ? (
              <p className="mt-4 text-sm text-emerald-300">{statusMessage}</p>
            ) : null}

            {isAttended ? (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-200">Attendance recorded</p>
                    <p className="mt-1 text-sm text-emerald-100/80">
                      This participant has already been marked as present for the event.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/organizer/registrations"
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5"
              >
                View registrations list
              </Link>
              <button
                type="button"
                onClick={() => navigate('/organizer/checkin')}
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5"
              >
                Open scanner page
              </button>
              <Link to="/" className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5">
                Return home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ToastNotice open={toast.open} title={toast.title} message={toast.message} tone={toast.tone} />
    </div>
  );
}
