import { QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { buildCheckInPayload } from '../lib/qr.js';

export function RegistrationQRCode({ registration, eventTitle, size = 320, dark = '#000000', light = '#ffffff' }) {
  const payload = buildCheckInPayload(registration);
  const usesLocalhostUrl =
    payload.startsWith('http://localhost') || payload.startsWith('https://localhost') || payload.includes('127.0.0.1');

  return (
    <div className="text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
        <QrCode className="h-4 w-4" />
        Fast scan mode
      </div>
      <div className="mx-auto inline-flex rounded-[2rem] border-8 border-white bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
        <QRCodeSVG
          value={payload}
          size={size}
          bgColor={light}
          fgColor={dark}
          level="L"
          marginSize={8}
          includeMargin
        />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Scan link
      </p>
      <p className="mt-2 text-sm font-medium text-zinc-200">{registration.scanToken || registration.qrCode}</p>
      {eventTitle ? <p className="mt-2 text-sm text-zinc-400">{eventTitle}</p> : null}
      <p className="mt-3 text-xs leading-5 text-zinc-500">
        Short token, larger size, and extra white space for faster phone-camera scanning.
      </p>
      {usesLocalhostUrl ? (
        <p className="mt-3 text-xs leading-5 text-amber-300">
          For phone scanning on Wi-Fi, run <span className="font-semibold text-amber-200">pnpm dev:host</span> and set <span className="font-semibold text-amber-200">VITE_PUBLIC_APP_URL</span> to your laptop address.
        </p>
      ) : null}
    </div>
  );
}
