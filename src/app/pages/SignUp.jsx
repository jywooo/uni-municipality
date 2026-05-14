import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FormInput } from '../components/FormInput.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function SignUp() {
  const navigate = useNavigate();
  const { registerParticipant } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    municipality: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    if (!formData.phone.trim()) nextErrors.phone = 'Phone number is required.';
    if (!formData.municipality.trim()) nextErrors.municipality = 'Municipality is required.';
    if (!formData.password.trim()) nextErrors.password = 'Password is required.';
    if (formData.password.trim() && formData.password.trim().length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (!formData.confirmPassword.trim()) nextErrors.confirmPassword = 'Please confirm your password.';
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitError('');

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      registerParticipant(formData);
      navigate('/participant/dashboard');
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Participant access</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Create participant account</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Create a participant profile to register for municipality events and keep your QR access in one place.
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <FormInput
            label="Full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
          />
          <FormInput
            label="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <FormInput
            label="Phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
          <FormInput
            label="Municipality / area"
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
            error={errors.municipality}
            required
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <FormInput
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />

          {submitError ? <p className="mb-4 text-sm text-rose-300">{submitError}</p> : null}

          <button type="submit" className="w-full rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
            Create account
          </button>
        </form>

        <div className="mt-6 border-t border-white/10 pt-6 text-sm text-zinc-400">
          Already have access?
          <Link to="/login" className="ml-2 font-semibold text-cyan-300 hover:text-cyan-200">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
