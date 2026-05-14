import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { Plus } from 'lucide-react';
import { useAppData } from '../../context/AppDataContext';

export const VenuesManagement = () => {
  const { venues } = useAppData();
  const columns = [
    { header: 'Venue Name', accessor: 'name' },
    { header: 'Address', accessor: 'address' },
    { header: 'Capacity', accessor: 'capacity' },
    {
      header: 'Status',
      accessor: 'status',
      render: (value: any) => <StatusBadge status={value} />
    },
  ];

  return (
    <div className="bg-background">
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-medium mb-2">Venues Management</h1>
          <p className="opacity-90">Manage event venues and locations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity">
            <Plus className="w-5 h-5" />
            Add Venue
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-medium">All Venues</h2>
          </div>
          <DataTable
            columns={columns}
            data={venues}
            actions={(row) => (
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-xs">
                  Edit
                </button>
                <button className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity text-xs">
                  Delete
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
