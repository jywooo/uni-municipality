import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { AlertCircle } from 'lucide-react';
import { FormInput, FormTextarea } from '../components/FormInput.jsx';
import { useAppData } from '../context/AppDataContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function EventRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, registerForEvent } = useAppData();
  const { user } = useAuth();
  const event = events.find((item) => item.id === id);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    municipality: user?.municipality || '',
    notes: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});

  if (!event) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-white">
        <h1 className="text-3xl font-semibold">Event not found</h1>
        <Link to="/events" className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black">
          Return to catalog
        </Link>
      </div>
    );
  }

  const handleChange = (eventInput) => {
    const { name, value, type, checked } = eventInput.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) nextErrors.email = 'Email is required.';
    if (!formData.phone.trim()) nextErrors.phone = 'Phone is required.';
    if (!formData.municipality.trim()) nextErrors.municipality = 'Municipality is required.';
    if (!formData.consent) nextErrors.consent = 'Consent is required.';
    return nextErrors;
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const registration = registerForEvent(event.id, {
      ...formData,
      participantId: user?.role === 'Participant' ? user.id : undefined,
    });

    navigate('/confirmation', {
      state: {
        event,
        registration,
        email: formData.email,
      },
    });
  };

  const remainingSeats = event.capacity - event.registered;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Public registration</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">{event.title}</h1>
      </div>

      {remainingSeats <= 10 ? (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 text-amber-300" />
          <div>
            <p className="font-semibold text-amber-200">Limited seats available</p>
            <p className="mt-1 text-sm text-amber-100/80">Only {remainingSeats} seats remain for this event.</p>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput label="Full name" name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
            <FormInput label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
            <FormInput label="Phone number" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} required />
            <FormInput label="Municipality / area" name="municipality" value={formData.municipality} onChange={handleChange} error={errors.municipality} required />
          </div>
          <FormTextarea label="Notes" name="notes" value={formData.notes} onChange={handleChange} rows={4} />
          <label className="mb-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/40 p-4">
            <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-1" />
            <span className="text-sm leading-6 text-zinc-300">
              I consent to the use of my information for event registration and attendance administration.
            </span>
          </label>
          {errors.consent ? <p className="mb-4 text-sm text-rose-300">{errors.consent}</p> : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5"
            >
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
              Submit registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
