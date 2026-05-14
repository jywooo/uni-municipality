import { Link } from 'react-router';
import { BarChart3, CalendarDays, QrCode, ShieldCheck, Users } from 'lucide-react';
import { useAppData } from '../context/AppDataContext.jsx';
import { EventCard } from '../components/EventCard.jsx';
import heroImage from '../../assets/municipality-hero.png';

export function Home() {
  const { events } = useAppData();
  const featuredEvents = events.filter((event) => event.status === 'Published').slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[1.12] contrast-[1.06] saturate-[1.04]"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(0,0,0,0.78)_0%,_rgba(0,0,0,0.62)_42%,_rgba(0,0,0,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(3,7,18,0.16)_0%,_rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr,0.85fr] lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Lebanese Municipal Operations</p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-6xl">
              Municipality Events
              <br />
              Management System
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              A clean and professional municipal platform for public event publishing, participant registration,
              QR check-in, attendance tracking, and administrative oversight.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/events" className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
                Browse Events
              </Link>
              <Link to="/login" className="rounded-xl border border-white/10 bg-black/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5">
                Access Dashboard
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-end lg:justify-end">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-black/45 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Operations Snapshot</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Published Events</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{featuredEvents.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Public Access</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">Residents can discover events and complete registration online.</p>
                </div>
                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Presentation Ready</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-200">Built for municipal demos, academic presentations, and structured reporting.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: 'Public Publishing',
              text: 'Municipal teams can publish organized event programs with clear information and capacity tracking.',
              icon: <CalendarDays className="h-6 w-6" />,
            },
            {
              title: 'Participant Management',
              text: 'Residents can register, receive status updates, and manage attendance details from one place.',
              icon: <Users className="h-6 w-6" />,
            },
            {
              title: 'QR Check-In',
              text: 'On-site teams can use QR placeholders to support a streamlined check-in presentation flow.',
              icon: <QrCode className="h-6 w-6" />,
            },
            {
              title: 'Serious Reporting',
              text: 'Organizers and administrators can review attendance, venue usage, and category performance.',
              icon: <BarChart3 className="h-6 w-6" />,
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
              <div className="inline-flex rounded-xl bg-cyan-500/10 p-3 text-cyan-300">{item.icon}</div>
              <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/70">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr,0.8fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Why this system</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Built for structured public administration</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
              The interface is intentionally serious, minimal, and presentation-ready. It is designed for municipality
              event teams, organizers, and academic presentations where clarity and professionalism matter more than decoration.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
            <div className="flex items-center gap-3 text-cyan-300">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-[0.16em]">System highlights</span>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-6 text-zinc-300">
              <p>Role-based navigation for public users, participants, organizers, and administrators.</p>
              <p>Event filtering, registration statuses, QR check-in placeholder flow, and management tables.</p>
              <p>Organized visual language suitable for a municipality and for a university thesis presentation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Upcoming Program</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Published events</h2>
          </div>
          <Link to="/events" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            View all events
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
