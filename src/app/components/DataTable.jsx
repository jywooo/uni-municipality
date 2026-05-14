export function DataTable({ columns, data, actions }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/80">
      <table className="min-w-full">
        <thead className="border-b border-white/10 bg-zinc-900/90">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400"
              >
                {column.header}
              </th>
            ))}
            {actions ? (
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                Actions
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-5 py-10 text-center text-sm text-zinc-400"
              >
                No records available.
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.id || index} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.03]">
                {columns.map((column) => (
                  <td key={column.accessor} className="px-5 py-4 text-sm text-zinc-100">
                    {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                  </td>
                ))}
                {actions ? <td className="px-5 py-4 text-sm text-zinc-100">{actions(row)}</td> : null}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
