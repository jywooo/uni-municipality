import { CheckCircle2, TriangleAlert } from 'lucide-react';

export function ToastNotice({ open, title, message, tone = 'success' }) {
  if (!open) {
    return null;
  }

  const isSuccess = tone === 'success';

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[70] w-[min(92vw,24rem)]">
      <div
        className={`rounded-2xl border p-4 shadow-[0_20px_40px_rgba(0,0,0,0.35)] ${
          isSuccess
            ? 'border-emerald-400/25 bg-emerald-500/12'
            : 'border-amber-400/25 bg-amber-500/12'
        }`}
      >
        <div className="flex items-start gap-3">
          {isSuccess ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
          ) : (
            <TriangleAlert className="mt-0.5 h-5 w-5 text-amber-300" />
          )}
          <div>
            <p className={`text-sm font-semibold ${isSuccess ? 'text-emerald-200' : 'text-amber-200'}`}>{title}</p>
            <p className={`mt-1 text-sm ${isSuccess ? 'text-emerald-100/90' : 'text-amber-100/90'}`}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
