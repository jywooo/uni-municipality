import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { DashboardCard } from '../../components/DashboardCard';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Calendar, Users, TrendingUp, Target } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export const OrganizerDashboard = () => {
  const { user } = useAuth();
  const { events } = useAppData();

  const organizerEvents = events.filter(e => e.organizerId === user?.id);
  const totalRegistrations = organizerEvents.reduce((sum, event) => sum + event.registered, 0);
  const totalCapacity = organizerEvents.reduce((sum, event) => sum + event.capacity, 0);
  const attendanceRate = 78;

  const columns = [
    { header: 'Event', accessor: 'title' },
    {
      header: 'Date',
      accessor: 'date',
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    {
      header: 'Registrations',
      accessor: 'registered',
      render: (value: number, row: any) => `${value} / ${row.capacity}`
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value: any) => <StatusBadge status={value} />
    },
  ];

  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">Organizer Dashboard</h1>
          <p className="opacity-90">Manage your events and track performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Events"
            value={organizerEvents.length}
            icon={<Calendar className="w-8 h-8" />}
          />
          <DashboardCard
            title="Total Registrations"
            value={totalRegistrations}
            icon={<Users className="w-8 h-8" />}
          />
          <DashboardCard
            title="Attendance Rate"
            value={`${attendanceRate}%`}
            icon={<TrendingUp className="w-8 h-8" />}
          />
          <DashboardCard
            title="Capacity Utilization"
            value={`${totalCapacity === 0 ? 0 : Math.round((totalRegistrations / totalCapacity) * 100)}%`}
            icon={<Target className="w-8 h-8" />}
          />
        </div>

        <div className="mb-6 flex gap-3">
          <Link
            to="/organizer/events/create"
            className="px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Create Event
          </Link>
          <Link
            to="/organizer/registrations"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            View Registrations
          </Link>
          <Link
            to="/organizer/checkin"
            className="px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors"
          >
            Check-In
          </Link>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-medium">My Events</h2>
          </div>
          <DataTable
            columns={columns}
            data={organizerEvents}
            actions={(row) => (
              <Link
                to={`/organizer/events/${row.id}/edit`}
                className="text-primary hover:underline"
              >
                Edit
              </Link>
            )}
          />
        </div>
      </div>
    </div>
  );
};
