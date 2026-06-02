import { useState, useEffect } from 'react'

export default function PricePage() {
  const [precio, setPrecio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/admin/api/index.php?action=precio')
      .then(r => r.json())
      .then(data => {
        if (data.success) setPrecio(data.data.monto)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    const res = await fetch('/admin/api/index.php?action=actualizar-precio', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monto: parseFloat(precio) }),
    })
    const data = await res.json()
    setMessage(data.success ? 'Precio actualizado correctamente' : 'Error al actualizar')
    setSaving(false)
  }

  if (loading) return <p className="text-muted">Cargando...</p>

  return (
    <div>
      <h4 className="fw-bold mb-4">Precio del Informe</h4>
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSave}>
                {message && (
                  <div className={`alert alert-${message.includes('Error') ? 'danger' : 'success'} py-2`}>
                    {message}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Monto ($)</label>
                  <input
                    type="number"
                    className="form-control form-control-lg"
                    step="0.01"
                    min="0"
                    value={precio}
                    onChange={e => setPrecio(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg" disabled={saving}>
                    {saving ? 'Guardando...' : 'Guardar Precio'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
