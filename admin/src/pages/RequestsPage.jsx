import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'dni', label: 'DNI' },
  { key: 'email_destino', label: 'Email Destino' },
  { key: 'estado', label: 'Estado', render: (val) => <StatusBadge status={val} /> },
  { key: 'pago_estado', label: 'Pago', render: (val) => <StatusBadge status={val} /> },
  { key: 'created_at', label: 'Fecha' },
]

export default function RequestsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [estado, setEstado] = useState(searchParams.get('estado') || '')
  const [pagoEstado, setPagoEstado] = useState(searchParams.get('pago_estado') || '')
  const [fechaDesde, setFechaDesde] = useState(searchParams.get('fecha_desde') || '')
  const [fechaHasta, setFechaHasta] = useState(searchParams.get('fecha_hasta') || '')

  const buildQueryString = (filters) => {
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.estado) params.set('estado', filters.estado)
    if (filters.pago_estado) params.set('pago_estado', filters.pago_estado)
    if (filters.fecha_desde) params.set('fecha_desde', filters.fecha_desde)
    if (filters.fecha_hasta) params.set('fecha_hasta', filters.fecha_hasta)
    return params.toString()
  }

  const fetchRequests = (filters) => {
    setLoading(true)
    const qs = buildQueryString(filters)
    fetch(`/admin/api/index.php?action=solicitudes${qs ? '&' + qs : ''}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setRequests(data.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    const filters = {
      search: searchParams.get('search') || '',
      estado: searchParams.get('estado') || '',
      pago_estado: searchParams.get('pago_estado') || '',
      fecha_desde: searchParams.get('fecha_desde') || '',
      fecha_hasta: searchParams.get('fecha_hasta') || '',
    }
    fetchRequests(filters)
  }, [searchParams])

  const handleApplyFilters = (e) => {
    e.preventDefault()
    const filters = { search, estado, pago_estado: pagoEstado, fecha_desde: fechaDesde, fecha_hasta: fechaHasta }
    setSearchParams(filters)
  }

  const handleClearFilters = () => {
    setSearch('')
    setEstado('')
    setPagoEstado('')
    setFechaDesde('')
    setFechaHasta('')
    setSearchParams({})
  }

  const handleAction = (row) => (
    <Link to={`/solicitudes/${row.id}`} className="btn btn-sm btn-outline-primary">Ver</Link>
  )

  const hasActiveFilters = search || estado || pagoEstado || fechaDesde || fechaHasta

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Solicitudes Recibidas</h4>
        <button
          className={`btn ${showFilters ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className="bi bi-funnel me-1"></i>
          Filtros {hasActiveFilters && <span className="badge bg-danger ms-1">!</span>}
        </button>
      </div>

      {showFilters && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <form onSubmit={handleApplyFilters}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Buscar</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre, DNI, CUIL o Email..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-semibold">Estado</label>
                  <select className="form-select" value={estado} onChange={e => setEstado(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="rechazado">Rechazado</option>
                    <option value="finalizado">Finalizado</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-semibold">Estado Pago</label>
                  <select className="form-select" value={pagoEstado} onChange={e => setPagoEstado(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="aprobado">Aprobado</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-semibold">Fecha Desde</label>
                  <input type="date" className="form-control" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} />
                </div>
                <div className="col-md-2">
                  <label className="form-label small fw-semibold">Fecha Hasta</label>
                  <input type="date" className="form-control" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} />
                </div>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button type="submit" className="btn btn-primary btn-sm">Aplicar Filtros</button>
                {hasActiveFilters && (
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleClearFilters}>
                    Limpiar Filtros
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          {hasActiveFilters && (
            <p className="text-muted small mb-3">
              <i className="bi bi-funnel me-1"></i>
              Filtros activados
              {search && ` — Búsqueda: "${search}"`}
              {estado && ` — Estado: ${estado}`}
              {pagoEstado && ` — Pago: ${pagoEstado}`}
              {fechaDesde && ` — Desde: ${fechaDesde}`}
              {fechaHasta && ` — Hasta: ${fechaHasta}`}
            </p>
          )}
          {loading ? (
            <p className="text-muted text-center py-4">Cargando...</p>
          ) : (
            <DataTable columns={columns} data={requests} onAction={handleAction} />
          )}
        </div>
      </div>
    </div>
  )
}
