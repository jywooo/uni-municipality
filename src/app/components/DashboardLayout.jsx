import { useState } from 'react';
import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar.jsx';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex min-h-screen">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen((value) => !value)}
        />
        <main className="min-w-0 flex-1 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.08),_transparent_35%),linear-gradient(180deg,_#111111_0%,_#0a0a0a_100%)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
