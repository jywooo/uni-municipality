import { useAuth } from '../../context/AuthContext.jsx';
import { useAppData } from '../../context/AppDataContext.jsx';
import { DataTable } from '../../components/DataTable.jsx';
import { StatusBadge } from '../../components/StatusBadge.jsx';

export function RegistrationsManagement() {
  const { user } = useAuth();
  const { events, registrations, updateRegistrationStatus } = useAppData();
  const organizerEvents = events.filter((event) => event.organizerId === user?.id);
  const organizerEventIds = organizerEvents.map((event) => event.id);
  const organizerRegistrations = registrations.filter((registration) => organizerEventIds.includes(registration.eventId));

  const columns = [
    { header: 'Participant', accessor: 'participantName' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Event',
      accessor: 'eventId',
      render: (value) => events.find((event) => event.id === value)?.title || 'Unknown',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => <StatusBadge status={value} />,
    },
    {
      header: 'Registered on',
      accessor: 'registrationDate',
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Organizer records</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Registrations management</h1>
      </div>

      <DataTable
        columns={columns}
        data={organizerRegistrations}
        actions={(row) => (
          <div className="flex flex-wrap gap-2">
            {['Confirmed', 'Attended', 'Absent'].map((status) => (
              <button
                key={status}
                onClick={() => updateRegistrationStatus(row.id, status)}
                className="rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/5"
              >
                {status}
              </button>
            ))}
          </div>
        )}
      />
    </div>
  );
}
