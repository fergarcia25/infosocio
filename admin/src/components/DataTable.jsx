export default function DataTable({ columns, data, onAction }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="fw-semibold">{col.label}</th>
            ))}
            {onAction && <th className="fw-semibold">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onAction ? 1 : 0)} className="text-center text-muted py-4">
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map(row => (
              <tr key={row.id}>
                {columns.map(col => (
                  <td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
                ))}
                {onAction && (
                  <td className="table-actions">
                    {onAction(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
