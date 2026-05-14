import { useState } from 'react';
import { DataTable } from '../../components/DataTable';
import { StatusBadge } from '../../components/StatusBadge';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useAppData } from '../../context/AppDataContext';

export const UsersManagement = () => {
  const { users, updateUserStatus } = useAppData();
  const [disableDialog, setDisableDialog] = useState<{ isOpen: boolean; userId: string | null }>({
    isOpen: false,
    userId: null,
  });

  const handleDisableUser = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      await updateUserStatus(userId, 'Inactive');
      toast.success(`${user.name} has been disabled`);
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
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
          <h1 className="text-3xl font-medium mb-2">User Management</h1>
          <p className="opacity-90">Manage system users and staff members</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity">
            <UserPlus className="w-5 h-5" />
            Add Staff
          </button>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-medium">All Users</h2>
          </div>
          <DataTable
            columns={columns}
            data={users}
            actions={(row) => (
              <div className="flex gap-2">
                <button
                  onClick={() => toast.info('Edit user functionality')}
                  className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDisableDialog({ isOpen: true, userId: row.id })}
                  disabled={row.status === 'Inactive'}
                  className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Disable
                </button>
              </div>
            )}
          />
        </div>

        <ConfirmDialog
          isOpen={disableDialog.isOpen}
          onClose={() => setDisableDialog({ isOpen: false, userId: null })}
          onConfirm={() => {
            if (disableDialog.userId) {
              void handleDisableUser(disableDialog.userId);
            }
          }}
          title="Disable User"
          message="Are you sure you want to disable this user? They will not be able to access the system."
          confirmText="Yes, Disable"
          cancelText="Cancel"
          variant="danger"
        />
      </div>
    </div>
  );
};
