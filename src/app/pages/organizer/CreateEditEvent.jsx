import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FormInput, FormSelect, FormTextarea } from '../../components/FormInput.jsx';
import { useAppData } from '../../context/AppDataContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export function CreateEditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { events, categories, venues, saveEvent } = useAppData();
  const existingEvent = useMemo(() => events.find((event) => event.id === id), [events, id]);

  const [formData, setFormData] = useState({
    title: existingEvent?.title || '',
    description: existingEvent?.description || '',
    category: existingEvent?.category || '',
    venue: existingEvent?.venue || '',
    date: existingEvent?.date || '',
    time: existingEvent?.time || '',
    capacity: existingEvent?.capacity || 100,
    registrationDeadline: existingEvent?.registrationDeadline || '',
    status: existingEvent?.status || 'Draft',
    imageUrl: existingEvent?.imageUrl || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === 'capacity' ? Number(value) : value,
    }));
  };

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    saveEvent(formData, user.id, existingEvent?.id);
    navigate('/organizer/dashboard');
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Organizer editor</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">{existingEvent ? 'Edit event' : 'Create event'}</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <FormInput label="Event title" name="title" value={formData.title} onChange={handleChange} required />
          <FormTextarea label="Description" name="description" value={formData.description} onChange={handleChange} rows={5} required />
          <div className="grid gap-4 md:grid-cols-2">
            <FormSelect
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={categories.map((category) => ({ value: category.name, label: category.name }))}
              required
            />
            <FormSelect
              label="Venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              options={venues.map((venue) => ({ value: venue.name, label: venue.name }))}
              required
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} required />
            <FormInput label="Time" name="time" type="time" value={formData.time} onChange={handleChange} required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormInput label="Capacity" name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
            <FormInput label="Registration deadline" name="registrationDeadline" type="date" value={formData.registrationDeadline} onChange={handleChange} required />
          </div>
          <FormInput label="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
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

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => navigate(-1)} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-200 hover:bg-white/5">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
              {existingEvent ? 'Update event' : 'Create event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
