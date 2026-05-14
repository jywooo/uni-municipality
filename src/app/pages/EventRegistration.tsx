import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { FormInput, FormTextarea } from '../components/FormInput';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';
import type { Registration } from '../types/models';

export const EventRegistration = () => {
  const { events, registerForEvent } = useAppData();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    municipality: '',
    notes: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdRegistration, setCreatedRegistration] = useState<Registration | null>(null);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-2">Event Not Found</h2>
          <Link to="/events" className="text-primary hover:underline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.municipality.trim()) {
      newErrors.municipality = 'Municipality/Area is required';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to the data privacy policy';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    if (!event) return;

    const availableSeats = event.capacity - event.registered;
    if (availableSeats <= 0) {
      toast.error('Sorry, this event is fully booked');
      return;
    }

    setLoading(true);

    try {
      const registration = await registerForEvent(event.id, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        municipality: formData.municipality,
        notes: formData.notes,
        participantId: user?.role === 'Participant' ? user.id : undefined,
      });

      setCreatedRegistration(registration);
      setSubmitted(true);
      toast.success('Registration successful!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to complete registration.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-accent" />
            </div>
            <h2 className="text-2xl font-medium mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground mb-6">
              You have successfully registered for {event.title}
            </p>
            <div className="bg-muted rounded-lg p-6 mb-6">
              <div className="bg-white w-48 h-48 mx-auto rounded-lg flex items-center justify-center mb-3">
                <p className="text-muted-foreground">{createdRegistration?.qrCode || 'QR Code'}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Use this QR code for check-in at the event
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              A confirmation email has been sent to {formData.email}
            </p>
            <div className="flex gap-3">
              <Link
                to="/events"
                className="flex-1 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors text-center"
              >
                Browse Events
              </Link>
              <Link
                to="/"
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-center"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">Event Registration</h1>
          <p className="opacity-90">{event.title}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {event && event.capacity - event.registered <= 10 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="font-medium text-amber-900">Limited Seats Available</p>
              <p className="text-sm text-amber-700">
                Only {event.capacity - event.registered} seats remaining for this event.
              </p>
            </div>
          </div>
        )}

        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />

            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <FormInput
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+1 (555) 123-4567"
              required
            />

            <FormInput
              label="Municipality/Area"
              type="text"
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              error={errors.municipality}
              required
            />

            <FormTextarea
              label="Notes (Optional)"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
            />

            <div className="mb-6">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
                <span className="text-sm text-foreground">
                  I agree to the data privacy policy and consent to the collection and processing of my personal information for event registration purposes. <span className="text-destructive">*</span>
                </span>
              </label>
              {errors.consent && <p className="mt-1 text-sm text-destructive ml-7">{errors.consent}</p>}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={loading}
                className="flex-1 px-6 py-3 border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
