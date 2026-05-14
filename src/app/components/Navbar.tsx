import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Calendar, LogOut, User } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            <span className="font-medium">Municipality Events</span>
          </Link>

          <div className="flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <Link to="/events" className="hover:opacity-80 transition-opacity">
                  Browse Events
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                {user?.role === 'Participant' && (
                  <>
                    <Link to="/events" className="hover:opacity-80 transition-opacity">
                      Events
                    </Link>
                    <Link to="/participant/dashboard" className="hover:opacity-80 transition-opacity">
                      My Registrations
                    </Link>
                  </>
                )}
                {user?.role === 'Organizer' && (
                  <>
                    <Link to="/organizer/dashboard" className="hover:opacity-80 transition-opacity">
                      Dashboard
                    </Link>
                    <Link to="/organizer/events/create" className="hover:opacity-80 transition-opacity">
                      Create Event
                    </Link>
                    <Link to="/organizer/registrations" className="hover:opacity-80 transition-opacity">
                      Registrations
                    </Link>
                    <Link to="/organizer/checkin" className="hover:opacity-80 transition-opacity">
                      Check-In
                    </Link>
                  </>
                )}
                {user?.role === 'Admin' && (
                  <>
                    <Link to="/admin/dashboard" className="hover:opacity-80 transition-opacity">
                      Dashboard
                    </Link>
                    <Link to="/admin/users" className="hover:opacity-80 transition-opacity">
                      Users
                    </Link>
                    <Link to="/admin/venues" className="hover:opacity-80 transition-opacity">
                      Venues
                    </Link>
                    <Link to="/admin/categories" className="hover:opacity-80 transition-opacity">
                      Categories
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
