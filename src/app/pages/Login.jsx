import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FormInput } from '../components/FormInput.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function Login() {
  const navigate = useNavigate();
  const { login, loginAsRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const redirectByRole = (role) => {
    if (role === 'Participant') navigate('/participant/dashboard');
    if (role === 'Organizer') navigate('/organizer/dashboard');
    if (role === 'Admin') navigate('/admin/dashboard');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    try {
      const user = login({ email, password });
      redirectByRole(user.role);
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">System access</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Login</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Use your email and password to sign in, or use the quick demo buttons below.
        </p>

        <div className="mt-5 rounded-2xl border border-cyan-400/15 bg-cyan-500/5 p-4 text-sm text-zinc-300">
          New public participant?
          <Link to="/signup" className="ml-2 font-semibold text-cyan-300 hover:text-cyan-200">
            Create an account
          </Link>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
          Demo password for seeded accounts:
          <span className="ml-2 font-semibold text-zinc-100">municipality123</span>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <FormInput label="Email address" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <FormInput label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {error ? <p className="mb-4 text-sm text-rose-300">{error}</p> : null}
          <button type="submit" className="w-full rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
            Sign in
          </button>
        </form>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Demo accounts</p>
          <div className="space-y-3">
            {['Participant', 'Organizer', 'Admin'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => redirectByRole(loginAsRole(role).role)}
                className="w-full rounded-xl border border-white/10 px-4 py-3 text-left text-sm text-zinc-200 hover:bg-white/5"
              >
                Login as {role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
