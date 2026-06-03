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

        <hr className="my-4" />

        {/* Top row — equal-height cards */}
        <div className="row g-4 mb-4">
          <div className="col-lg-6 d-flex">
            <div className="bg-white rounded-3 shadow-sm p-4 flex-fill">
              <div className="d-flex align-items-center gap-3 mb-3 pb-2 border-bottom">
                {persona.foto ? (
                  <img
                    src={persona.foto}
                    alt=""
                    className="rounded-2 object-fit-cover"
                    style={{ width: '100px', height: '100px' }}
                  />
                ) : (
                  <i className="bi bi-person-fill text-secondary" style={{ fontSize: '100px', lineHeight: 1 }}></i>
                )}
                <h5 className="fw-bold mb-0" style={{ color: '#b71c1c' }}>
                  {persona.nombre}
                </h5>
              </div>
              <div className="row g-3">
                <div className="col-sm-6">
                  <span className="text-muted small d-block">CDU / CUIL</span>
                  <strong>{persona.cdu}</strong>
                </div>
                <div className="col-sm-6">
                  <span className="text-muted small d-block">Edad</span>
                  <strong>{persona.edad} años</strong>
                </div>
                <div className="col-sm-6">
                  <span className="text-muted small d-block">Provincia</span>
                  <strong>{persona.provincia || '-'}</strong>
                </div>
                <div className="col-sm-6">
                  <span className="text-muted small d-block">Ciudad</span>
                  <strong>{persona.ciudad || '-'}</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex">
            <div className="bg-white rounded-3 shadow-sm p-4 flex-fill">
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
          </div>
        </div>

        {/* Bottom card — price + info + button */}
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

          <button
            type="submit"
            className="btn btn-dark btn-lg w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
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
  )
}
