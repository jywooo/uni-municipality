import { Link, useParams } from 'react-router';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useAppData } from '../context/AppDataContext.jsx';

export function EventDetails() {
  const { id } = useParams();
  const { events, venues } = useAppData();
  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-white">
        <h1 className="text-3xl font-semibold">Event not found</h1>
        <Link to="/events" className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black">
          Return to catalog
        </Link>
      </div>
    );
  }

  const venue = venues.find((item) => item.name === event.venue);
  const availableSeats = event.capacity - event.registered;

  return (
    <div>
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-black/60" />
        <img src={event.imageUrl} alt={event.title} className="h-[420px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-cyan-500/30 bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              {event.category}
            </div>
            <h1 className="text-4xl font-semibold text-white">{event.title}</h1>
            <p className="mt-4 text-base leading-7 text-zinc-200">{event.description}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr,0.9fr] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
            <h2 className="text-xl font-semibold text-white">Event overview</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Calendar className="h-5 w-5 text-cyan-300" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Clock className="h-5 w-5 text-cyan-300" />
                  <span>{event.time}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <MapPin className="h-5 w-5 text-cyan-300" />
                  <span>{event.venue}</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                <div className="flex items-center gap-3 text-zinc-300">
                  <Users className="h-5 w-5 text-cyan-300" />
                  <span>{event.registered} / {event.capacity} registered</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
            <h2 className="text-xl font-semibold text-white">Venue details</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              {venue ? venue.address : 'Venue address will be confirmed by the municipality.'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Registration status</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Attendance capacity</h2>
          <div className="mt-6 h-3 rounded-full bg-white/8">
            <div
              className="h-3 rounded-full bg-cyan-400"
              style={{ width: `${Math.min(100, (event.registered / event.capacity) * 100)}%` }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
            <span>{availableSeats} seats remaining</span>
            <span>Deadline: {new Date(event.registrationDeadline).toLocaleDateString()}</span>
          </div>

          {availableSeats > 0 && event.status === 'Published' ? (
            <Link
              to={`/events/${event.id}/register`}
              className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              Register for this event
            </Link>
          ) : (
            <div className="mt-8 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-300">
              Registration is closed for this event.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
