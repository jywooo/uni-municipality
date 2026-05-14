import { useAppData } from '../../context/AppDataContext.jsx';
import { DataTable } from '../../components/DataTable.jsx';
import { StatusBadge } from '../../components/StatusBadge.jsx';

export function VenuesManagement() {
  const { venues } = useAppData();

  const columns = [
    { header: 'Venue', accessor: 'name' },
    { header: 'Address', accessor: 'address' },
    { header: 'Capacity', accessor: 'capacity' },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Administration</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Venues management</h1>
      </div>
      <DataTable columns={columns} data={venues} />
    </div>
  );
}
