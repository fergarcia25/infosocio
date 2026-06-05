import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { createPaymentPreference } from '../services/paymentApi'

const PRECIO_DEFAULT = 15200

function formatPrice(n) {
  return '$ ' + n.toLocaleString('es-AR')
}

export default function SolicitarPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const persona = location.state?.persona
  const searchQuery = location.state?.query || ''

  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [precio, setPrecio] = useState(PRECIO_DEFAULT)
  const [precioLoading, setPrecioLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/admin/api/index.php?action=precio-publico')
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setPrecio(res.monto)
      })
      .catch(() => {})
      .finally(() => setPrecioLoading(false))
  }, [])

  if (!persona) {
    return (
      <div className="bg-light py-5" style={{ minHeight: '100vh', marginTop: '80px' }}>
        <div className="container text-center">
          <h3>No se encontraron datos de la persona</h3>
          <button className="btn btn-dark mt-3" onClick={() => navigate('/resultados')}>
            Volver a resultados
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (email !== confirmEmail) {
      setError('Los correos electrónicos no coinciden.')
      return
    }

    setLoading(true)

    try {
      const res = await createPaymentPreference({
        cdu: persona.cdu,
        nombre: persona.nombre,
        email,
        whatsapp,
        query: searchQuery,
      })

      if (res.success) {
        window.location.href = res.init_point
      } else {
        setError(res.error || 'Error al generar el pago. Intenta nuevamente.')
      }
    } catch {
      setError('Error de conexión con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-light py-5" style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', marginTop: '80px' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div>
            <h2 className="fw-bold mb-0">Confirmar Solicitud</h2>
            <p className="text-muted mb-0 mt-1">
              Completá los datos para recibir el informe solicitado.
            </p>
          </div>
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left me-1"></i>
            Volver
          </button>
        </div>

       

        {/* Top row — persona + datos requeridos + precio */}
        <div className="row g-4 my-3">
          <div className="col-lg-4 col-sm-12 d-flex">
            <div className="bg-white rounded-3 shadow-sm p-4 flex-fill">
              <div className="mb-3 pb-2 border-bottom">
                {(() => {
                  const parts = (persona.nombre || '').split(',')
                  return (
                    <>
                      <h3 className="fw-bold mb-0" style={{ color: '#b71c1c', fontSize: '1.2rem' }}>
                        {parts[0]?.trim() || persona.nombre}
                      </h3>
                      {parts[1] && (
                        <h5 className="fw-bold mb-0 pb-2" style={{ color: '#b71c1c' }}>
                          {parts[1].trim()}
                        </h5>
                      )}
                    </>
                  )
                })()}
              </div>
              <div>
                <div className="mb-2">
                  <span className="text-muted small d-block">CDU / CUIL</span>
                  <p className='fw-bold fs-5'>{persona.cdu}</p>
                </div>
                <div className="mb-2">
                  <span className="text-muted small d-block">Edad</span>
                  <p className='fw-bold fs-5'>{persona.edad} años</p>
                </div>
                <div className="mb-2">
                  <span className="text-muted small d-block">Provincia</span>
                  <p className='fw-bold fs-5'>{persona.provincia || '-'}</p>
                </div>
                <div className="mb-0">
                  <span className="text-muted small d-block">Ciudad</span>
                  <p className='fw-bold fs-5'>{persona.ciudad || '-'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-sm-12">
            <div className="bg-white rounded-3 shadow-sm p-4 mb-3">
              <h6 className="fw-bold mb-3">Datos requeridos</h6>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email para recibir el informe <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Confirmar Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${error && email !== confirmEmail ? 'is-invalid' : ''}`}
                    placeholder="Repite tu correo electrónico"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">Los correos electrónicos no coinciden.</div>
                </div>

                <div className="mb-0">
                  <label className="form-label fw-semibold">
                    WhatsApp <span className="fw-normal text-secondary">(Opcional)</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Ej: +54 9 11 1234-5678"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                  <div className="form-text text-success mt-1">
                    <i className="bi bi-lightbulb me-1"></i>
                    Recomendamos sumarlo para avisarte apenas el informe esté listo.
                  </div>
                </div>

                {error && (
                  <div className="alert alert-danger py-2 mt-3 mb-0">{error}</div>
                )}
              </form>
            </div>

            <div className="bg-white rounded-3 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <span className="fw-semibold">Valor del informe</span>
                <span className="fs-4 fw-bold" style={{ color: '#b71c1c' }}>
                  {precioLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                  ) : (
                    formatPrice(precio)
                  )}
                </span>
              </div>

              <p className="small mb-4">
                <i className="bi bi-info-circle me-1" style={{ color: '#b71c1c' }}></i>
                <strong>Información importante:</strong> Una vez abonado, procesaremos tu pedido y el informe te llegará al Gmail ingresado en solo 5 minutos.
              </p>

              <div className="text-end">
                <button
                  type="submit"
                  className="about-btn-primary"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm"></span>
                      Procesando...
                    </>
                  ) : (
                    'Pagar con MercadoPago'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
