import { NavLink, useNavigate } from 'react-router';
import { BarChart3, Bell, CalendarDays, FolderKanban, LayoutDashboard, LogOut, MapPin, Menu, QrCode, Tags, Users, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const roleMenus = {
  Participant: [
    { to: '/participant/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ],
  Organizer: [
    { to: '/organizer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/organizer/events/create', label: 'Create Event', icon: CalendarDays },
    { to: '/organizer/registrations', label: 'Registrations', icon: Users },
    { to: '/organizer/checkin', label: 'QR Check-In', icon: QrCode },
    { to: '/organizer/notifications', label: 'Notifications', icon: Bell },
    { to: '/organizer/analytics', label: 'Analytics', icon: BarChart3 },
  ],
  Admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/venues', label: 'Venues', icon: MapPin },
    { to: '/admin/categories', label: 'Categories', icon: Tags },
  ],
};

function SidebarLinks({ items, onNavigate }) {
  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-cyan-500 text-black'
                  : 'text-zinc-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export function Sidebar({ open, onClose, onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menu = roleMenus[user?.role] || [];

  const aside = (
    <aside className="flex h-full w-72 flex-col border-r border-white/10 bg-black">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">{user?.role || 'Dashboard'}</p>
        <h2 className="mt-2 text-lg font-semibold text-white">{user?.name}</h2>
        <p className="mt-1 text-sm text-zinc-400">{user?.email}</p>
      </div>
      <div className="flex-1 px-4 py-5">
        <SidebarLinks items={menu} onNavigate={onClose} />
        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
          <div className="flex items-center gap-3 text-cyan-300">
            <FolderKanban className="h-5 w-5" />
            <span className="text-sm font-semibold">University Thesis Mode</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-zinc-300">
            This frontend uses structured mock data and presentation-ready dashboards for demos and academic defense.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 p-4">
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="border-b border-white/10 bg-black px-4 py-4 md:hidden">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-200"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
      </div>
      <div className="hidden md:block">{aside}</div>
      {open ? (
        <div className="fixed inset-0 z-50 bg-black/70 md:hidden">
          <div className="flex h-full">
            {aside}
            <button type="button" onClick={onClose} className="flex-1 p-6 text-zinc-400">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
