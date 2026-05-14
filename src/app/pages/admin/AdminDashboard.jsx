import { Link } from 'react-router';
import { CalendarDays, MapPin, Tags, Users } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext.jsx';
import { DashboardCard } from '../../components/DashboardCard.jsx';

export function AdminDashboard() {
  const { users, venues, categories, events } = useAppData();

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Administrative control</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Admin dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard title="Users" value={users.length} subtitle={`${users.filter((user) => user.status === 'Active').length} active`} icon={<Users className="h-6 w-6" />} />
        <DashboardCard title="Venues" value={venues.length} subtitle={`${venues.filter((venue) => venue.status === 'Active').length} active`} icon={<MapPin className="h-6 w-6" />} />
        <DashboardCard title="Categories" value={categories.length} icon={<Tags className="h-6 w-6" />} />
        <DashboardCard title="Events" value={events.length} subtitle={`${events.filter((event) => event.status === 'Published').length} published`} icon={<CalendarDays className="h-6 w-6" />} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[
          { to: '/admin/users', title: 'Users management', text: 'Manage municipality staff and participant records.' },
          { to: '/admin/venues', title: 'Venues management', text: 'Review venue capacity and location information.' },
          { to: '/admin/categories', title: 'Categories management', text: 'Keep event classifications organized and consistent.' },
        ].map((item) => (
          <Link key={item.to} to={item.to} className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 hover:bg-white/[0.03]">
            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
