import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/admin/api/index.php?action=dashboard')
      .then(r => r.json())
      .then(data => {
        if (data.success) setStats(data.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="text-muted">Cargando dashboard...</p>
  if (!stats) return <p className="text-danger">Error al cargar estadísticas</p>

  const statCards = [
    { label: 'Solicitudes Totales', value: stats.totales, color: '#b71c1c', icon: 'bi-inbox', link: '/solicitudes' },
    { label: 'Pendientes', value: stats.pendientes, color: '#ffc107', icon: 'bi-clock', link: '/solicitudes?estado=pendiente' },
    { label: 'Finalizadas', value: stats.finalizadas, color: '#198754', icon: 'bi-check-circle', link: '/solicitudes?estado=finalizado' },
    { label: 'Ingresos', value: `$${parseFloat(stats.ingresos).toLocaleString('es-AR', { minimumFractionDigits: 2 })}`, color: '#0dcaf0', icon: 'bi-currency-dollar', link: '/solicitudes?pago_estado=aprobado' },
  ]

  const chartData = (stats.mensual || []).map(item => {
    const [year, month] = item.mes.split('-')
    return {
      mes: monthNames[parseInt(month) - 1] || item.mes,
      solicitudes: parseInt(item.total),
    }
  })

  return (
    <div>
      <h4 className="fw-bold mb-4">Dashboard</h4>
      <div className="row g-3 mb-4">
        {statCards.map(s => (
          <div key={s.label} className="col-md-3">
            <Link to={s.link} className="text-decoration-none">
              <div className="card stat-card cursor-pointer" style={{ cursor: 'pointer' }}>
                <div className="card-body d-flex align-items-center gap-3">
                  <div className="stat-icon" style={{ backgroundColor: s.color + '20', color: s.color }}>
                    <i className={`bi ${s.icon}`}></i>
                  </div>
                  <div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Solicitudes por Mes</h5>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="solicitudes" fill="#b71c1c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted text-center py-4">No hay datos de solicitudes por mes</p>
          )}
        </div>
      </div>
    </div>
  )
}
