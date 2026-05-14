import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { EventsCatalog } from './pages/EventsCatalog';
import { EventDetails } from './pages/EventDetails';
import { EventRegistration } from './pages/EventRegistration';
import { Login } from './pages/Login';
import { ParticipantDashboard } from './pages/participant/ParticipantDashboard';
import { OrganizerDashboard } from './pages/organizer/OrganizerDashboard';
import { CreateEditEvent } from './pages/organizer/CreateEditEvent';
import { RegistrationsManagement } from './pages/organizer/RegistrationsManagement';
import { CheckIn } from './pages/organizer/CheckIn';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UsersManagement } from './pages/admin/UsersManagement';
import { VenuesManagement } from './pages/admin/VenuesManagement';
import { CategoriesManagement } from './pages/admin/CategoriesManagement';
import { Analytics } from './pages/admin/Analytics';
import { Notifications } from './pages/admin/Notifications';
import { NotFound } from './pages/NotFound';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'events', Component: EventsCatalog },
      { path: 'events/:id', Component: EventDetails },
      { path: 'events/:id/register', Component: EventRegistration },
      { path: 'login', Component: Login },
      {
        path: 'participant/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['Participant']}>
            <ParticipantDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'organizer/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['Organizer']}>
            <OrganizerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'organizer/events/create',
        element: (
          <ProtectedRoute allowedRoles={['Organizer']}>
            <CreateEditEvent />
          </ProtectedRoute>
        ),
      },
      {
        path: 'organizer/events/:id/edit',
        element: (
          <ProtectedRoute allowedRoles={['Organizer']}>
            <CreateEditEvent />
          </ProtectedRoute>
        ),
      },
      {
        path: 'organizer/registrations',
        element: (
          <ProtectedRoute allowedRoles={['Organizer']}>
            <RegistrationsManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'organizer/checkin',
        element: (
          <ProtectedRoute allowedRoles={['Organizer']}>
            <CheckIn />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/dashboard',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <UsersManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/venues',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <VenuesManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/categories',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <CategoriesManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/reports',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <Analytics />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/notifications',
        element: (
          <ProtectedRoute allowedRoles={['Admin']}>
            <Notifications />
          </ProtectedRoute>
        ),
      },
      { path: '*', Component: NotFound },
    ],
  },
]);
