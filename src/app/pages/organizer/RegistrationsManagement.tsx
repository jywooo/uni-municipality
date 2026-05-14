import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../context/AppDataContext';

export const RegistrationsManagement = () => {
  const { registrations, events, updateRegistrationStatus } = useAppData();
  const columns = [
    { header: 'Name', accessor: 'participantName' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    {
      header: 'Event',
      accessor: 'eventId',
      render: (value: string) => {
        const event = events.find(e => e.id === value);
        return event?.title || 'Unknown';
      }
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value: any) => <StatusBadge status={value} />
    },
    {
      header: 'Registration Date',
      accessor: 'registrationDate',
      render: (value: string) => new Date(value).toLocaleDateString()
    },
  ];

  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">Registrations Management</h1>
          <p className="opacity-90">View and manage event registrations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity">
            <Download className="w-5 h-5" />
            Export List
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-medium">All Registrations</h2>
          </div>
          <DataTable
            columns={columns}
            data={registrations}
            actions={(row) => (
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    await updateRegistrationStatus(row.id, 'Confirmed');
                    toast.success('Registration confirmed');
                  }}
                  className="px-3 py-1 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity text-xs"
                >
                  Confirm
                </button>
                <button
                  onClick={async () => {
                    await updateRegistrationStatus(row.id, 'Attended');
                    toast.success('Registration marked as attended');
                  }}
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-xs"
                >
                  Attended
                </button>
                <button
                  onClick={async () => {
                    await updateRegistrationStatus(row.id, 'Absent');
                    toast.success('Registration marked as absent');
                  }}
                  className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity text-xs"
                >
                  Absent
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
