import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { FormInput } from '../components/FormInput';
import { Calendar, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../context/AppDataContext';

export const Login = () => {
  const { login, loginAsRole } = useAuth();
  const { provider } = useAppData();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const redirectByRole = (role: 'Participant' | 'Organizer' | 'Admin') => {
    if (role === 'Participant') {
      navigate('/participant/dashboard');
    } else if (role === 'Organizer') {
      navigate('/organizer/dashboard');
    } else if (role === 'Admin') {
      navigate('/admin/dashboard');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login({ email, password });
      toast.success(`Welcome back, ${user.name}!`);
      redirectByRole(user.role);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'Participant' | 'Organizer' | 'Admin') => {
    setLoading(true);

    try {
      await loginAsRole(role);
      toast.success(`Logged in as ${role}`);
      redirectByRole(role);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to log in with demo user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-8 h-8 text-primary" />
            <span className="text-2xl font-medium">Municipality Events</span>
          </div>
          <h1 className="text-3xl font-medium mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to manage your events</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <form onSubmit={handleLogin} className="mb-6">
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormInput
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign In
            </button>
          </form>

          {provider === 'mock' && (
            <>
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or try demo login</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Participant')}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Login as Participant
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Organizer')}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Login as Organizer
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('Admin')}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-purple-50 text-purple-700 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Login as Admin
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
