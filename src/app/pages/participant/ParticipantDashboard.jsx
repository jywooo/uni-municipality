import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useAppData } from '../../context/AppDataContext.jsx';
import { StatusBadge } from '../../components/StatusBadge.jsx';
import { ConfirmDialog } from '../../components/ConfirmDialog.jsx';
import { RegistrationQRCode } from '../../components/RegistrationQRCode.jsx';

export function ParticipantDashboard() {
  const { user } = useAuth();
  const { registrations, events, cancelRegistration } = useAppData();
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [cancelId, setCancelId] = useState(null);

  const userRegistrations = registrations.filter((item) => item.participantId === user?.id);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Participant dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">My registrations</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-950/80">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="text-lg font-semibold text-white">Registered events</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-black/50">
              <tr>
                {['Event', 'Date', 'Status', 'Actions'].map((label) => (
                  <th key={label} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-sm text-zinc-400">
                    No registrations yet.
                  </td>
                </tr>
              ) : (
                userRegistrations.map((registration) => {
                  const event = events.find((item) => item.id === registration.eventId);
                  return (
                    <tr key={registration.id} className="border-t border-white/5">
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">{event?.title}</p>
                        <p className="mt-1 text-sm text-zinc-500">{event?.venue}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-300">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-cyan-300" />
                          <span>{event ? new Date(event.date).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={registration.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setSelectedRegistration({ registration, eventTitle: event?.title })}
                            className="rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/5"
                          >
                            View QR
                          </button>
                          <button
                            onClick={() => setCancelId(registration.id)}
                            className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-200 hover:bg-rose-500/20"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRegistration ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-zinc-950 p-8 text-center">
            <RegistrationQRCode
              registration={selectedRegistration.registration}
              eventTitle={selectedRegistration.eventTitle}
              size={340}
            />
            <button onClick={() => setSelectedRegistration(null)} className="mt-6 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black">
              Close
            </button>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        isOpen={Boolean(cancelId)}
        onClose={() => setCancelId(null)}
        onConfirm={() => cancelRegistration(cancelId)}
        title="Cancel registration"
        message="This will remove the participant from the event list and free one seat."
        confirmText="Cancel registration"
      />
    </div>
  );
}
