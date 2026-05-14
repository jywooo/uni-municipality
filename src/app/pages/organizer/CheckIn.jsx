import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, CheckCircle2 } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext.jsx';
import { FormInput } from '../../components/FormInput.jsx';
import { ToastNotice } from '../../components/ToastNotice.jsx';
import { extractCheckInCode } from '../../lib/qr.js';

export function CheckIn() {
  const { registrations, events, updateRegistrationStatus } = useAppData();
  const [code, setCode] = useState('');
  const [recent, setRecent] = useState([]);
  const [message, setMessage] = useState('');
  const [scannerError, setScannerError] = useState('');
  const [cameraActive, setCameraActive] = useState(true);
  const [toast, setToast] = useState({ open: false, title: '', message: '', tone: 'success' });
  const scannerRef = useRef(null);
  const isProcessingRef = useRef(false);
  const toastTimeoutRef = useRef(null);
  const regionId = 'municipality-checkin-reader';

  const registrationsByCode = useMemo(
    () =>
      registrations.reduce((map, registration) => {
        map[registration.qrCode] = registration;
        if (registration.scanToken) {
          map[registration.scanToken] = registration;
        }
        return map;
      }, {}),
    [registrations],
  );

  const handleDecodedValue = useCallback(
    (rawValue) => {
      if (isProcessingRef.current) {
        return;
      }

      const normalizedCode = extractCheckInCode(rawValue);
      const registration = registrationsByCode[normalizedCode];

      if (!registration) {
        setMessage('QR code not found.');
        setToast({
          open: true,
          title: 'Registration not found',
          message: 'This QR code does not match any registration in the current event records.',
          tone: 'warning',
        });
        return;
      }

      isProcessingRef.current = true;
      const eventName = events.find((item) => item.id === registration.eventId)?.title || 'Unknown event';

      if (registration.status === 'Attended') {
        setMessage(`${registration.participantName} has already been marked as attended for ${eventName}.`);
        setToast({
          open: true,
          title: 'Attendance already recorded',
          message: `${registration.participantName} is already checked in for ${eventName}.`,
          tone: 'warning',
        });
        window.setTimeout(() => {
          isProcessingRef.current = false;
        }, 1200);
        return;
      }

      updateRegistrationStatus(registration.id, 'Attended');
      setRecent((current) => [
        {
          ...registration,
          status: 'Attended',
          checkedAt: new Date().toLocaleTimeString(),
        },
        ...current.filter((item) => item.id !== registration.id),
      ].slice(0, 5));
      setCode(normalizedCode);
      setMessage(`${registration.participantName} checked in successfully for ${eventName}.`);
      setToast({
        open: true,
        title: 'Attendance recorded',
        message: `${registration.participantName} is registered in ${eventName}.`,
        tone: 'success',
      });

      window.setTimeout(() => {
        isProcessingRef.current = false;
      }, 1200);
    },
    [events, registrationsByCode, updateRegistrationStatus],
  );

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

  useEffect(() => {
    if (!cameraActive) {
      return undefined;
    }

    let html5QrCode;
    let cancelled = false;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode(regionId);
        scannerRef.current = html5QrCode;
        setScannerError('');

        await html5QrCode.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 220, height: 220 },
            aspectRatio: 1,
          },
          (decodedText) => {
            handleDecodedValue(decodedText);
          },
          () => {},
        );
      } catch (error) {
        if (!cancelled) {
          setScannerError('Camera access is unavailable. You can still use manual QR entry below.');
        }
      }
    };

    void startScanner();

    return () => {
      cancelled = true;

      const stopScanner = async () => {
        if (html5QrCode?.isScanning) {
          await html5QrCode.stop().catch(() => {});
        }

        if (html5QrCode) {
          await html5QrCode.clear().catch(() => {});
        }
      };

      void stopScanner();
    };
  }, [cameraActive, handleDecodedValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleDecodedValue(code);
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Organizer operations</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">QR check-in</h1>
        <p className="mt-3 text-sm text-zinc-400">
          After each scan, the participant will also appear in the registrations list.
          <Link to="/organizer/registrations" className="ml-2 font-medium text-cyan-300 hover:text-cyan-200">
            Open registrations list
          </Link>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">Live QR scanner</h2>
              <p className="mt-1 text-sm text-zinc-400">Scan a participant QR code or check-in link to mark attendance.</p>
            </div>
            <button
              type="button"
              onClick={() => setCameraActive((current) => !current)}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200 hover:bg-white/5"
            >
              {cameraActive ? 'Pause Camera' : 'Resume Camera'}
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-dashed border-white/10 bg-black/50">
            {cameraActive ? (
              <div id={regionId} className="min-h-[256px]" />
            ) : (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center text-zinc-400">
                  <Camera className="mx-auto h-12 w-12 text-cyan-300" />
                  <p className="mt-3 text-sm">Camera scanner paused</p>
                </div>
              </div>
            )}
          </div>
          {scannerError ? <p className="mt-4 text-sm text-amber-300">{scannerError}</p> : null}
          <form onSubmit={handleSubmit} className="mt-6">
            <FormInput label="Manual QR entry or URL" value={code} onChange={(event) => setCode(event.target.value)} required />
            <button type="submit" className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
              Check in participant
            </button>
          </form>
          {message ? <p className="mt-4 text-sm text-zinc-300">{message}</p> : null}
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
          <h2 className="text-lg font-semibold text-white">Recent check-ins</h2>
          <div className="mt-5 space-y-3">
            {recent.length === 0 ? (
              <p className="text-sm text-zinc-400">No check-ins recorded yet.</p>
            ) : (
              recent.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                    <div>
                      <p className="font-medium text-white">{item.participantName}</p>
                      <p className="mt-1 text-sm text-zinc-400">{events.find((event) => event.id === item.eventId)?.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-zinc-500">Checked in at {item.checkedAt}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <ToastNotice open={toast.open} title={toast.title} message={toast.message} tone={toast.tone} />
    </div>
  );
}
