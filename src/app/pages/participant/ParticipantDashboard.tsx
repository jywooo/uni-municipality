import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../../components/StatusBadge';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { Calendar, QrCode, X } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../context/AppDataContext';

export const ParticipantDashboard = () => {
  const { user } = useAuth();
  const { registrations, events, cancelRegistration } = useAppData();
  const [showQR, setShowQR] = useState<string | null>(null);
  const [cancelDialog, setCancelDialog] = useState<{ isOpen: boolean; registrationId: string | null }>({
    isOpen: false,
    registrationId: null,
  });

  const userRegistrations = registrations.filter(
    r => r.participantId === user?.id
  );

  const handleCancelRegistration = async (registrationId: string) => {
    await cancelRegistration(registrationId);
    toast.success('Registration cancelled successfully');
  };

  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">My Registrations</h1>
          <p className="opacity-90">Manage your event registrations and check-in details</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Upcoming Reminders</h2>
          <div className="space-y-3">
            {userRegistrations.filter(r => r.status === 'Confirmed').slice(0, 2).map((registration) => {
              const event = events.find(e => e.id === registration.eventId);
              return event ? (
                <div key={registration.id} className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-medium">Registered Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {userRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                      No registrations yet
                    </td>
                  </tr>
                ) : (
                  userRegistrations.map((registration) => {
                    const event = events.find(e => e.id === registration.eventId);
                    return event ? (
                      <tr key={registration.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.venue}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {new Date(event.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={registration.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowQR(registration.qrCode)}
                              className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
                            >
                              View QR
                            </button>
                            <button
                              onClick={() => setCancelDialog({ isOpen: true, registrationId: registration.id })}
                              className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : null;
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium">Check-In QR Code</h3>
              <button
                onClick={() => setShowQR(null)}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg flex flex-col items-center">
              <div className="bg-gray-100 w-64 h-64 rounded-lg flex items-center justify-center mb-3">
                <QrCode className="w-32 h-32 text-gray-400" />
              </div>
              <p className="text-sm text-muted-foreground">Code: {showQR}</p>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Show this QR code at the event for check-in
            </p>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={cancelDialog.isOpen}
        onClose={() => setCancelDialog({ isOpen: false, registrationId: null })}
        onConfirm={() => {
          if (cancelDialog.registrationId) {
            void handleCancelRegistration(cancelDialog.registrationId);
          }
        }}
        title="Cancel Registration"
        message="Are you sure you want to cancel this registration? This action cannot be undone."
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
        variant="danger"
      />
    </div>
  );
};
