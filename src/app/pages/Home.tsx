import { Link } from 'react-router';
import { Calendar, Users, QrCode, BarChart3 } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

export const Home = () => {
  const { events } = useAppData();
  const upcomingEvents = events.filter(e => e.status === 'Published').slice(0, 3);

  return (
    <div className="bg-background">
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-medium mb-6">
            Municipality Events Management System
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Streamline event registration, manage attendance, and engage with your community through our comprehensive events platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/events"
              className="px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Browse Events
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-primary rounded-md hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-medium text-center mb-12">System Benefits</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Easy Registration</h3>
              <p className="text-muted-foreground">
                Quick and simple event registration process for all municipal events
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Capacity Management</h3>
              <p className="text-muted-foreground">
                Real-time tracking of registrations and available seats
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">QR Check-In</h3>
              <p className="text-muted-foreground">
                Contactless attendance tracking with QR code technology
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Analytics</h3>
              <p className="text-muted-foreground">
                Comprehensive reports and insights on event performance
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-medium text-center mb-12">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-card border border-border rounded-lg overflow-hidden">
                {event.imageUrl && (
                  <div className="relative h-48 bg-muted">
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
                  <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                  <Link
                    to={`/events/${event.id}`}
                    className="block text-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/events"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-medium text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-medium text-lg">
                1
              </div>
              <h3 className="text-lg font-medium mb-2">Browse Events</h3>
              <p className="text-muted-foreground">
                Explore upcoming municipal events and find activities that interest you
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-medium text-lg">
                2
              </div>
              <h3 className="text-lg font-medium mb-2">Register Online</h3>
              <p className="text-muted-foreground">
                Complete a simple registration form and receive instant confirmation
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-medium text-lg">
                3
              </div>
              <h3 className="text-lg font-medium mb-2">Attend & Check-In</h3>
              <p className="text-muted-foreground">
                Use your QR code for quick check-in and enjoy the event
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
