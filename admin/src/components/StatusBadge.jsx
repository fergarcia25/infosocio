export default function StatusBadge({ status }) {
  const map = {
    pendiente: { bg: 'bg-warning', text: 'Pendiente' },
    rechazado: { bg: 'bg-danger', text: 'Rechazado' },
    finalizado: { bg: 'bg-success', text: 'Finalizado' },
  }
  const s = map[status] || { bg: 'bg-secondary', text: status }
  return <span className={`badge ${s.bg} badge-estado`}>{s.text}</span>
}
