import { useState } from 'react';
import { DataTable } from '../../components/DataTable';
import { FormInput, FormTextarea, FormSelect } from '../../components/FormInput';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../context/AppDataContext';
import type { NotificationType } from '../../types/models';

export const Notifications = () => {
  const { notifications, events, sendNotification } = useAppData();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventId: '',
    type: '' as NotificationType | '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const event = events.find(ev => ev.id === formData.eventId);
      if (!event || !formData.type) {
        throw new Error('Please select an event and notification type.');
      }

      await sendNotification({
        eventId: formData.eventId,
        type: formData.type,
        message: formData.message,
      });

      toast.success(`Notification sent to ${event.registered} participants!`);
      setShowForm(false);
      setFormData({ eventId: '', type: '', message: '' });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to send notification.');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Type',
      accessor: 'type',
      render: (value: string) => (
        <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
          {value}
        </span>
      )
    },
    {
      header: 'Event',
      accessor: 'eventId',
      render: (value: string) => {
        const event = events.find(e => e.id === value);
        return event?.title || 'Unknown';
      }
    },
    { header: 'Message', accessor: 'message' },
    {
      header: 'Sent Date',
      accessor: 'sentDate',
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    { header: 'Recipients', accessor: 'recipientCount' },
  ];

  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">Notifications</h1>
          <p className="opacity-90">Manage system notifications and updates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
            {showForm ? 'Cancel' : 'Send Notification'}
          </button>
        </div>

        {showForm && (
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">Send New Notification</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <FormSelect
                  label="Event"
                  name="eventId"
                  value={formData.eventId}
                  onChange={handleChange}
                  options={events.map(e => ({ value: e.id, label: e.title }))}
                  required
                />
                <FormSelect
                  label="Notification Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  options={[
                    { value: 'Confirmation', label: 'Confirmation' },
                    { value: 'Reminder', label: 'Reminder' },
                    { value: 'Event update', label: 'Event Update' },
                    { value: 'Cancellation', label: 'Cancellation' },
                  ]}
                  required
                />
              </div>
              <FormTextarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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
                  Send Notification
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-medium">Sent Notifications</h2>
          </div>
          <DataTable columns={columns} data={notifications} />
        </div>
      </div>
    </div>
  );
};
