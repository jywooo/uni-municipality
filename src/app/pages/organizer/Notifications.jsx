import { useAuth } from '../../context/AuthContext.jsx';
import { useAppData } from '../../context/AppDataContext.jsx';
import { DataTable } from '../../components/DataTable.jsx';
import { FormSelect, FormTextarea } from '../../components/FormInput.jsx';

export function Notifications() {
  const { user } = useAuth();
  const { events, notifications, addNotification } = useAppData();
  const organizerEvents = events.filter((event) => event.organizerId === user?.id);
  const organizerEventIds = organizerEvents.map((event) => event.id);
  const organizerNotifications = notifications.filter((notification) => organizerEventIds.includes(notification.eventId));

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    addNotification({
      eventId: formData.get('eventId'),
      type: formData.get('type'),
      message: formData.get('message'),
    });
    event.currentTarget.reset();
  };

  const columns = [
    { header: 'Type', accessor: 'type' },
    {
      header: 'Event',
      accessor: 'eventId',
      render: (value) => events.find((event) => event.id === value)?.title || 'Unknown',
    },
    { header: 'Recipients', accessor: 'recipientCount' },
    {
      header: 'Sent date',
      accessor: 'sentDate',
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Organizer communication</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Notifications</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/80 p-6">
          <h2 className="text-lg font-semibold text-white">Send notification</h2>
          <form onSubmit={handleSubmit} className="mt-5">
            <FormSelect
              label="Event"
              name="eventId"
              options={organizerEvents.map((event) => ({ value: event.id, label: event.title }))}
              required
            />
            <FormSelect
              label="Notification type"
              name="type"
              options={[
                { value: 'Confirmation', label: 'Confirmation' },
                { value: 'Reminder', label: 'Reminder' },
                { value: 'Event update', label: 'Event update' },
                { value: 'Cancellation', label: 'Cancellation' },
              ]}
              required
            />
            <FormTextarea label="Message" name="message" rows={5} required />
            <button type="submit" className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black hover:bg-cyan-400">
              Send notification
            </button>
          </form>
        </div>

        <div>
          <DataTable columns={columns} data={organizerNotifications} />
        </div>
      </div>
    </div>
  );
}
