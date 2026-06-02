import { useState } from 'react'

export default function RequestForm({ precio, onSubmit }) {
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ email, telefono })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <h4 className="fw-bold">Detalle del Informe</h4>
        <p className="text-muted">Complete los datos para recibir el informe solicitado.</p>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Email de destino *</label>
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
        <label className="form-label fw-semibold">Teléfono (opcional)</label>
        <input
          type="tel"
          className="form-control"
          placeholder="+54 11 1234-5678"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div className="mb-4 p-3 bg-light rounded">
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Precio del informe:</span>
          <span className="fs-4 fw-bold text-primary">${precio}</span>
        </div>
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-warning btn-lg fw-bold">
          Pagar con MercadoPago
        </button>
      </div>
    </form>
  )
}
