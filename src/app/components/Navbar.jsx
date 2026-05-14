import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { CalendarDays, ChevronRight, Menu, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const publicLinks = [
    { label: 'Home', to: '/' },
    { label: 'Events', to: '/events' },
  ];

  const roleLink =
    user?.role === 'Participant'
      ? '/participant/dashboard'
      : user?.role === 'Organizer'
        ? '/organizer/dashboard'
        : '/admin/dashboard';

  const closeMenu = () => setOpen(false);
  const desktopLinks = isAuthenticated
    ? [...publicLinks.filter((link) => link.to !== '/login'), { label: 'Dashboard', to: roleLink }]
    : publicLinks;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white">
          <div className="rounded-2xl border border-cyan-500/25 bg-cyan-500/10 p-2.5 text-cyan-300 shadow-[0_0_0_1px_rgba(6,182,212,0.08)]">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Lebanese Municipality</p>
            <p className="text-sm font-semibold text-white">Events Management System</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {desktopLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white/8 text-white'
                    : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <div className="ml-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2">
              <div className="hidden items-center gap-2 lg:flex">
                <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="pr-2">
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{user?.role}</p>
                  <p className="text-sm font-medium text-zinc-200">{user?.name}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/signup"
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-white/5"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="ml-2 inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/15"
              >
                Access
                <ChevronRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-xl border border-white/10 p-2 text-zinc-200 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-zinc-950 md:hidden">
          <div className="space-y-2 px-4 py-4">
            {desktopLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="block rounded-xl px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    closeMenu();
                    logout();
                    navigate('/');
                  }}
                  className="w-full rounded-xl border border-white/10 px-3 py-3 text-left text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/signup"
                  onClick={closeMenu}
                  className="block rounded-xl border border-white/10 px-3 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white"
                >
                  Create account
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="block rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-3 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/15"
                >
                  Access system
                </NavLink>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
