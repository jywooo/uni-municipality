import { useAuth } from '../../context/AuthContext.jsx';
import { useAppData } from '../../context/AppDataContext.jsx';
import { DashboardCard } from '../../components/DashboardCard.jsx';
import { BarChart3, CalendarDays, Target, Users } from 'lucide-react';

export function Analytics() {
  const { user } = useAuth();
  const { events, registrations, categories } = useAppData();
  const organizerEvents = events.filter((event) => event.organizerId === user?.id);
  const organizerEventIds = organizerEvents.map((event) => event.id);
  const organizerRegistrations = registrations.filter((registration) => organizerEventIds.includes(registration.eventId));
  const attended = organizerRegistrations.filter((registration) => registration.status === 'Attended').length;
  const attendanceRate = organizerRegistrations.length === 0 ? 0 : Math.round((attended / organizerRegistrations.length) * 100);

  const categoryBreakdown = categories.map((category) => ({
    name: category.name,
    count: organizerEvents.filter((event) => event.category === category.name).length,
  })).filter((item) => item.count > 0);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Organizer reporting</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Analytics</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Total events" value={organizerEvents.length} icon={<CalendarDays className="h-6 w-6" />} />
        <DashboardCard title="Total registrations" value={organizerRegistrations.length} icon={<Users className="h-6 w-6" />} />
        <DashboardCard title="Attendance rate" value={`${attendanceRate}%`} icon={<Target className="h-6 w-6" />} />
        <DashboardCard title="Published events" value={organizerEvents.filter((event) => event.status === 'Published').length} icon={<BarChart3 className="h-6 w-6" />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
          <h2 className="text-lg font-semibold text-white">Category distribution</h2>
          <div className="mt-5 space-y-4">
            {categoryBreakdown.length === 0 ? (
              <p className="text-sm text-zinc-400">No category data available.</p>
            ) : (
              categoryBreakdown.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
                    <span>{item.name}</span>
                    <span>{item.count} event{item.count === 1 ? '' : 's'}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/8">
                    <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${(item.count / organizerEvents.length) * 100}%` }} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
          <h2 className="text-lg font-semibold text-white">Event status summary</h2>
          <div className="mt-5 space-y-4 text-sm text-zinc-300">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
              <span>Draft</span>
              <span>{organizerEvents.filter((event) => event.status === 'Draft').length}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
              <span>Published</span>
              <span>{organizerEvents.filter((event) => event.status === 'Published').length}</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-4">
              <span>Closed</span>
              <span>{organizerEvents.filter((event) => event.status === 'Closed').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
