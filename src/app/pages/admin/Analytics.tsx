import { DashboardCard } from '../../components/DashboardCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Target, XCircle } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export const Analytics = () => {
  const { events, registrations, categories } = useAppData();
  const totalRegistrations = registrations.length;
  const attendedCount = registrations.filter(r => r.status === 'Attended').length;
  const attendanceRate = totalRegistrations === 0 ? 0 : Math.round((attendedCount / totalRegistrations) * 100);
  const noShowRate = 100 - attendanceRate;

  const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);
  const totalRegistered = events.reduce((sum, e) => sum + e.registered, 0);
  const capacityUtilization = totalCapacity === 0 ? 0 : Math.round((totalRegistered / totalCapacity) * 100);

  const categoryData = categories.map(category => {
    const categoryEvents = events.filter(e => e.category === category.name);
    const categoryRegistrations = categoryEvents.reduce((sum, e) => sum + e.registered, 0);
    return {
      name: category.name,
      registrations: categoryRegistrations,
      events: categoryEvents.length,
    };
  });

  const venueData = events.reduce<Array<{ name: string; events: number; registrations: number }>>((acc, event) => {
    const existingVenue = acc.find(v => v.name === event.venue);
    if (existingVenue) {
      existingVenue.events += 1;
      existingVenue.registrations += event.registered;
    } else {
      acc.push({
        name: event.venue,
        events: 1,
        registrations: event.registered,
      });
    }
    return acc;
  }, []);

  const COLORS = ['#1e3a8a', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">Analytics & Reports</h1>
          <p className="opacity-90">System performance and insights</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
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
            title="No-Show Rate"
            value={`${noShowRate}%`}
            icon={<XCircle className="w-8 h-8" />}
          />
          <DashboardCard
            title="Capacity Utilization"
            value={`${capacityUtilization}%`}
            icon={<Target className="w-8 h-8" />}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Registrations by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="registrations" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Event Distribution by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="events"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">Venue Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={venueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="events" fill="#10b981" name="Number of Events" />
              <Bar dataKey="registrations" fill="#3b82f6" name="Total Registrations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
