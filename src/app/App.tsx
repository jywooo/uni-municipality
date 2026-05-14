import { RouterProvider } from 'react-router';
import { AppDataProvider } from './context/AppDataContext';
import { AuthProvider } from './context/AuthContext';
import { router } from './routes';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <AppDataProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </AppDataProvider>
  );
}
