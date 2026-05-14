import { Link } from 'react-router';
import { Calendar, MapPin, Users } from 'lucide-react';
import type { Event } from '../types/models';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const availableSeats = event.capacity - event.registered;
  const percentageFilled = (event.registered / event.capacity) * 100;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {event.imageUrl && (
        <div className="relative h-48 bg-muted overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 right-3 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm shadow-md">
            {event.category}
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-medium text-card-foreground mb-3">{event.title}</h3>

      <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <MapPin className="w-4 h-4" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Users className="w-4 h-4" />
          <span>{event.registered} / {event.capacity} registered</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all"
            style={{ width: `${percentageFilled}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {availableSeats} seats available
        </p>
      </div>

        <Link
          to={`/events/${event.id}`}
          className="block w-full text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
