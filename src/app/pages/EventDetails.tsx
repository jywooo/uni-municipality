import { useParams, Link } from 'react-router';
import { Calendar, MapPin, Users, Clock, Tag, AlertCircle } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

export const EventDetails = () => {
  const { events, venues } = useAppData();
  const { id } = useParams();
  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-2">Event Not Found</h2>
          <Link to="/events" className="text-primary hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const venue = venues.find(v => v.name === event.venue);
  const availableSeats = event.capacity - event.registered;
  const percentageFilled = (event.registered / event.capacity) * 100;

  return (
    <div className="bg-background">
      {event.imageUrl && (
        <div className="relative h-96 bg-muted overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 text-white py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                  {event.category}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {event.status}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-medium">{event.title}</h1>
            </div>
          </div>
        </div>
      )}
      {!event.imageUrl && (
        <div className="bg-primary text-primary-foreground py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">
                {event.category}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {event.status}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-medium">{event.title}</h1>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-medium mb-4">Event Description</h2>
              <p className="text-foreground leading-relaxed">{event.description}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Location</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{event.venue}</span>
                </div>
                {venue && (
                  <p className="text-muted-foreground ml-7">{venue.address}</p>
                )}
                <div className="mt-4 bg-muted rounded-lg h-48 flex items-center justify-center">
                  <p className="text-muted-foreground">Map Placeholder</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 mt-6">
              <h2 className="text-xl font-medium mb-4">Organizer Contact</h2>
              <p className="text-foreground">Municipality Events Department</p>
              <p className="text-muted-foreground">Email: events@municipality.gov</p>
              <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
            </div>
          </div>

          <div>
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h2 className="text-xl font-medium mb-4">Event Details</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{event.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{event.registered} / {event.capacity} registered</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2 mb-1">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${percentageFilled}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {availableSeats} seats available
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Registration Deadline</p>
                <p className="font-medium">{new Date(event.registrationDeadline).toLocaleDateString()}</p>
              </div>
            </div>

            {availableSeats > 0 && event.status === 'Published' ? (
              <Link
                to={`/events/${event.id}/register`}
                className="block w-full text-center px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
              >
                Register Now
              </Link>
            ) : (
              <div className="bg-muted border border-border rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Registration Closed</p>
                  <p className="text-sm text-muted-foreground">
                    {availableSeats === 0 ? 'This event is fully booked' : 'This event is no longer accepting registrations'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
