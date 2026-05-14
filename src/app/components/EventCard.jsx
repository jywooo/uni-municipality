import { Link } from 'react-router';
import { Calendar, MapPin, Users } from 'lucide-react';

export function EventCard({ event }) {
  const availableSeats = event.capacity - event.registered;
  const percentageFilled = Math.min(100, Math.round((event.registered / event.capacity) * 100));

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
      {event.imageUrl ? (
        <div className="relative h-52 overflow-hidden border-b border-white/10">
          <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-cyan-400/30 bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            {event.category}
          </div>
        </div>
      ) : null}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">{event.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{event.description}</p>

        <div className="mt-5 space-y-3 text-sm text-zinc-300">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-cyan-300" />
            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-cyan-300" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-4 w-4 text-cyan-300" />
            <span>{event.registered} / {event.capacity} registered</span>
          </div>
        </div>

        <div className="mt-5">
          <div className="h-2 rounded-full bg-white/8">
            <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${percentageFilled}%` }} />
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500">{availableSeats} seats remaining</p>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-black hover:bg-cyan-400"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
