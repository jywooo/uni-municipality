import { Link } from 'react-router';
import { DashboardCard } from '../../components/DashboardCard';
import { Users, MapPin, Tag, Calendar, Settings, BarChart3 } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export const AdminDashboard = () => {
  const { users, venues, categories, events } = useAppData();
  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">Admin Dashboard</h1>
          <p className="opacity-90">System administration and management</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Users"
            value={users.length}
            icon={<Users className="w-8 h-8" />}
            subtitle={`${users.filter(u => u.status === 'Active').length} active`}
          />
          <DashboardCard
            title="Venues"
            value={venues.length}
            icon={<MapPin className="w-8 h-8" />}
            subtitle={`${venues.filter(v => v.status === 'Active').length} active`}
          />
          <DashboardCard
            title="Categories"
            value={categories.length}
            icon={<Tag className="w-8 h-8" />}
          />
          <DashboardCard
            title="Total Events"
            value={events.length}
            icon={<Calendar className="w-8 h-8" />}
            subtitle={`${events.filter(e => e.status === 'Published').length} published`}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-4">Administration</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/admin/users"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Manage Staff</h3>
                <p className="text-sm text-muted-foreground">
                  Add, edit, and manage system users
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/venues"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Manage Venues</h3>
                <p className="text-sm text-muted-foreground">
                  Configure event venues and locations
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/categories"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Tag className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Manage Categories</h3>
                <p className="text-sm text-muted-foreground">
                  Add and edit event categories
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/reports"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">System Reports</h3>
                <p className="text-sm text-muted-foreground">
                  View analytics and reports
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/notifications"
            className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Manage system notifications
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
