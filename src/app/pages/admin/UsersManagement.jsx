import { useState } from 'react';
import { useAppData } from '../../context/AppDataContext.jsx';
import { DataTable } from '../../components/DataTable.jsx';
import { StatusBadge } from '../../components/StatusBadge.jsx';
import { ConfirmDialog } from '../../components/ConfirmDialog.jsx';

export function UsersManagement() {
  const { users, updateUserStatus } = useAppData();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
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
        <h1 className="mt-3 text-3xl font-semibold text-white">Users management</h1>
      </div>

      <DataTable
        columns={columns}
        data={users}
        actions={(row) => (
          <button
            onClick={() => setSelectedUserId(row.id)}
            className="rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-white/5"
          >
            Set inactive
          </button>
        )}
      />

      <ConfirmDialog
        isOpen={Boolean(selectedUserId)}
        onClose={() => setSelectedUserId(null)}
        onConfirm={() => updateUserStatus(selectedUserId, 'Inactive')}
        title="Set user inactive"
        message="This changes the selected account status to inactive in the mock records."
        confirmText="Confirm change"
      />
    </div>
  );
}
