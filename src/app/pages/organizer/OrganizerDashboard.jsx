import { Link } from 'react-router';
import { BarChart3, Bell, CalendarDays, QrCode, Target, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useAppData } from '../../context/AppDataContext.jsx';
import { DashboardCard } from '../../components/DashboardCard.jsx';
import { DataTable } from '../../components/DataTable.jsx';
import { StatusBadge } from '../../components/StatusBadge.jsx';

export function OrganizerDashboard() {
  const { user } = useAuth();
  const { events, registrations } = useAppData();

  const organizerEvents = events.filter((event) => event.organizerId === user?.id);
  const organizerEventIds = organizerEvents.map((event) => event.id);
  const organizerRegistrations = registrations.filter((registration) => organizerEventIds.includes(registration.eventId));
  const attendanceRate =
    organizerRegistrations.length === 0
      ? 0
      : Math.round(
          (organizerRegistrations.filter((registration) => registration.status === 'Attended').length /
            organizerRegistrations.length) *
            100,
        );

  const columns = [
    { header: 'Event', accessor: 'title' },
    {
      header: 'Date',
      accessor: 'date',
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      header: 'Registrations',
      accessor: 'registered',
      render: (value, row) => `${value} / ${row.capacity}`,
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Organizer dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Operations overview</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Managed events" value={organizerEvents.length} icon={<CalendarDays className="h-6 w-6" />} />
        <DashboardCard title="Registrations" value={organizerRegistrations.length} icon={<Users className="h-6 w-6" />} />
        <DashboardCard title="Attendance rate" value={`${attendanceRate}%`} icon={<Target className="h-6 w-6" />} />
        <DashboardCard title="Published events" value={organizerEvents.filter((event) => event.status === 'Published').length} icon={<BarChart3 className="h-6 w-6" />} />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/organizer/events/create" className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
          Create event
        </Link>
        <Link to="/organizer/registrations" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5">
          Manage registrations
        </Link>
        <Link to="/organizer/checkin" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5">
          <span className="inline-flex items-center gap-2"><QrCode className="h-4 w-4" /> QR check-in</span>
        </Link>
        <Link to="/organizer/notifications" className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5">
          <span className="inline-flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</span>
        </Link>
      </div>

      <div className="mt-8">
        <DataTable
          columns={columns}
          data={organizerEvents}
          actions={(row) => (
            <Link to={`/organizer/events/${row.id}/edit`} className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              Edit
            </Link>
          )}
        />
      </div>
    </div>
  );
}
