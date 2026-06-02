import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import StatusBadge from '../components/StatusBadge'

export default function RequestDetailPage() {
  const { id } = useParams()
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/admin/api/index.php?action=solicitud&id=${id}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setRequest(data.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  const handleChangeStatus = async (nuevoEstado) => {
    const res = await fetch('/admin/api/index.php?action=actualizar-solicitud', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estado: nuevoEstado }),
    })
    const data = await res.json()
    if (data.success) {
      setRequest(prev => ({ ...prev, estado: nuevoEstado }))
    }
  }

  if (loading) return <p className="text-muted">Cargando...</p>
  if (!request) return <p>Solicitud no encontrada</p>

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Solicitud #{request.id}</h4>
        <Link to="/solicitudes" className="btn btn-outline-secondary btn-sm">Volver</Link>
      </div>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Datos de la Solicitud</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr><td className="fw-semibold">Nombre</td><td>{request.nombre}</td></tr>
                  <tr><td className="fw-semibold">DNI</td><td>{request.dni}</td></tr>
                  <tr><td className="fw-semibold">CUIL</td><td>{request.cuil}</td></tr>
                  <tr><td className="fw-semibold">Email Destino</td><td>{request.email_destino}</td></tr>
                  <tr><td className="fw-semibold">Teléfono</td><td>{request.telefono || '-'}</td></tr>
                  <tr><td className="fw-semibold">Estado</td><td><StatusBadge status={request.estado} /></td></tr>
                  <tr><td className="fw-semibold">Fecha</td><td>{request.created_at}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Pago</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr><td className="fw-semibold">Estado del Pago</td><td><StatusBadge status={request.pago_estado} /></td></tr>
                  <tr><td className="fw-semibold">Precio</td><td>${request.precio}</td></tr>
                  <tr><td className="fw-semibold">ID de Pago</td><td>{request.pago_id || '-'}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="card shadow-sm mt-3">
            <div className="card-body">
              <h5 className="fw-bold mb-3">Cambiar Estado</h5>
              <div className="d-flex gap-2">
                {[
                  { value: 'pendiente', label: 'Pendiente', color: 'warning' },
                  { value: 'rechazado', label: 'Rechazado', color: 'danger' },
                  { value: 'finalizado', label: 'Finalizado', color: 'success' },
                ].map(est => (
                  <button
                    key={est.value}
                    className={`btn btn-sm ${request.estado === est.value ? 'btn-' + est.color : 'btn-outline-' + est.color}`}
                    onClick={() => handleChangeStatus(est.value)}
                    disabled={request.estado === est.value}
                  >
                    {est.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
