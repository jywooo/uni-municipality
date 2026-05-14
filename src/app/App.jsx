import { RouterProvider } from 'react-router';
import { AppDataProvider } from './context/AppDataContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { router } from './routes.jsx';

export default function App() {
  return (
    <AppDataProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppDataProvider>
  );
}
