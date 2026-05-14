interface StatusBadgeProps {
  status: 'Registered' | 'Confirmed' | 'Attended' | 'Absent' | 'Draft' | 'Published' | 'Closed' | 'Active' | 'Inactive';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Confirmed':
      case 'Published':
      case 'Active':
        return 'bg-accent text-accent-foreground';
      case 'Registered':
        return 'bg-blue-100 text-blue-800';
      case 'Attended':
        return 'bg-green-100 text-green-800';
      case 'Absent':
      case 'Closed':
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}>
      {status}
    </span>
  );
};
