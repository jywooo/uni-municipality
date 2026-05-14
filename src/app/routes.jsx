import { createBrowserRouter, Outlet } from 'react-router';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { DashboardLayout } from './components/DashboardLayout.jsx';
import { Home } from './pages/Home.jsx';
import { EventsCatalog } from './pages/EventsCatalog.jsx';
import { EventDetails } from './pages/EventDetails.jsx';
import { EventRegistration } from './pages/EventRegistration.jsx';
import { Confirmation } from './pages/Confirmation.jsx';
import { ScanCheckIn } from './pages/ScanCheckIn.jsx';
import { Login } from './pages/Login.jsx';
import { SignUp } from './pages/SignUp.jsx';
import { NotFound } from './pages/NotFound.jsx';
import { ParticipantDashboard } from './pages/participant/ParticipantDashboard.jsx';
import { OrganizerDashboard } from './pages/organizer/OrganizerDashboard.jsx';
import { CreateEditEvent } from './pages/organizer/CreateEditEvent.jsx';
import { RegistrationsManagement } from './pages/organizer/RegistrationsManagement.jsx';
import { CheckIn } from './pages/organizer/CheckIn.jsx';
import { Notifications } from './pages/organizer/Notifications.jsx';
import { Analytics } from './pages/organizer/Analytics.jsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.jsx';
import { UsersManagement } from './pages/admin/UsersManagement.jsx';
import { VenuesManagement } from './pages/admin/VenuesManagement.jsx';
import { CategoriesManagement } from './pages/admin/CategoriesManagement.jsx';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'events', element: <EventsCatalog /> },
      { path: 'events/:id', element: <EventDetails /> },
      { path: 'events/:id/register', element: <EventRegistration /> },
      { path: 'confirmation', element: <Confirmation /> },
      { path: 'scan-checkin', element: <ScanCheckIn /> },
      { path: 's/:code', element: <ScanCheckIn /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
    ],
  },
  {
    path: '/participant',
    element: (
      <ProtectedRoute allowedRoles={['Participant']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [{ path: 'dashboard', element: <ParticipantDashboard /> }],
  },
  {
    path: '/organizer',
    element: (
      <ProtectedRoute allowedRoles={['Organizer']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <OrganizerDashboard /> },
      { path: 'events/create', element: <CreateEditEvent /> },
      { path: 'events/:id/edit', element: <CreateEditEvent /> },
      { path: 'registrations', element: <RegistrationsManagement /> },
      { path: 'checkin', element: <CheckIn /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'analytics', element: <Analytics /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['Admin']}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'users', element: <UsersManagement /> },
      { path: 'venues', element: <VenuesManagement /> },
      { path: 'categories', element: <CategoriesManagement /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
