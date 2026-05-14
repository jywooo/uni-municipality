import { useAppData } from '../../context/AppDataContext.jsx';
import { DataTable } from '../../components/DataTable.jsx';

export function CategoriesManagement() {
  const { categories } = useAppData();

  const columns = [
    { header: 'Category', accessor: 'name' },
    { header: 'Description', accessor: 'description' },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Administration</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Categories management</h1>
      </div>
      <DataTable columns={columns} data={categories} />
    </div>
  );
}
