import { useState } from 'react';
import { FormInput } from '../../components/FormInput';
import { Camera, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../context/AppDataContext';
import type { Registration } from '../../types/models';

export const CheckIn = () => {
  const { registrations, events, updateRegistrationStatus } = useAppData();
  const [qrCode, setQrCode] = useState('');
  const [recentCheckIns, setRecentCheckIns] = useState<Array<Registration & { checkInTime: string }>>([]);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const registration = registrations.find(r => r.qrCode === qrCode);
    if (registration) {
      await updateRegistrationStatus(registration.id, 'Attended');
      setRecentCheckIns([
        {
          ...registration,
          status: 'Attended' as const,
          checkInTime: new Date().toLocaleTimeString()
        },
        ...recentCheckIns
      ].slice(0, 5));
      toast.success(`${registration.participantName} checked in successfully!`);
      setQrCode('');
    } else {
      toast.error('Invalid QR code. Please try again.');
    }
  };

  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">QR Check-In</h1>
          <p className="opacity-90">Scan or enter QR codes for participant check-in</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-medium mb-4">QR Scanner</h2>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Camera Scanner Placeholder</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Position QR code within the frame
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Manual Entry</h2>
              <form onSubmit={handleCheckIn}>
                <FormInput
                  label="QR Code"
                  type="text"
                  name="qrCode"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  placeholder="Enter QR code manually"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
                >
                  Check In
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Recent Check-Ins</h2>
              {recentCheckIns.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No check-ins yet
                </p>
              ) : (
                <div className="space-y-3">
                  {recentCheckIns.map((checkIn) => {
                    const event = events.find(e => e.id === checkIn.eventId);
                    return (
                      <div key={checkIn.id} className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium">{checkIn.participantName}</p>
                            <p className="text-sm text-muted-foreground">{event?.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Checked in at {checkIn.checkInTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
