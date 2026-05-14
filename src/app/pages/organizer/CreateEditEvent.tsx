import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FormInput, FormTextarea, FormSelect } from '../../components/FormInput';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../context/AppDataContext';
import { useAuth } from '../../context/AuthContext';
import type { EventStatus } from '../../types/models';

export const CreateEditEvent = () => {
  const { events, categories, venues, saveEvent } = useAppData();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existingEvent = isEdit ? events.find(e => e.id === id) : null;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: existingEvent?.title || '',
    description: existingEvent?.description || '',
    category: existingEvent?.category || '',
    venue: existingEvent?.venue || '',
    date: existingEvent?.date || '',
    time: existingEvent?.time || '',
    capacity: existingEvent?.capacity || 0,
    registrationDeadline: existingEvent?.registrationDeadline || '',
    status: (existingEvent?.status || 'Draft') as EventStatus,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        throw new Error('You must be logged in as an organizer to save an event.');
      }

      await saveEvent(formData, user.id, existingEvent?.id);
      if (isEdit && existingEvent) {
        toast.success('Event updated successfully!');
      } else {
        toast.success('Event created successfully!');
      }
      navigate('/organizer/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">
            {isEdit ? 'Edit Event' : 'Create New Event'}
          </h1>
          <p className="opacity-90">
            {isEdit ? 'Update event details' : 'Fill in the details to create a new event'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Event Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <FormTextarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormSelect
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categories.map(c => ({ value: c.name, label: c.name }))}
                required
              />

              <FormSelect
                label="Venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                options={venues.filter(v => v.status === 'Active').map(v => ({ value: v.name, label: v.name }))}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                label="Capacity"
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                required
              />

              <FormInput
                label="Registration Deadline"
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
                required
              />
            </div>

            <FormSelect
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: 'Draft', label: 'Draft' },
                { value: 'Published', label: 'Published' },
                { value: 'Closed', label: 'Closed' },
              ]}
              required
            />

            <div className="flex gap-3 mt-6">
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
                {isEdit ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
