import { useState } from 'react'

export default function CancelacionPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ nombre: '', apellido: '', dni: '', cuil: '', email: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section style={{ background: '#f3f3f3', padding: '8rem 0', minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {submitted ? (
              <div className="text-center" style={{ padding: '4rem 0' }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: '#e8f5e9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}
                >
                  <i className="bi bi-check-lg" style={{ fontSize: '2rem', color: '#2e7d32' }} />
                </div>
                <h2 className="about-title" style={{ color: '#1a1a1a' }}>Solicitud enviada</h2>
                <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
                  Su solicitud se envió correctamente. En los próximos 5 días hábiles será dado de baja del sitio. Muchas gracias.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-5">
                  <span className="about-label">CANCELACIÓN DE DATOS</span>
                  <h2 className="about-title">Solicitar cancelación de mis datos</h2>
                  <p className="about-text">
                    Completá el formulario y solicitá la baja de tus datos personales de nuestro sistema.
                  </p>
                </div>
                <form className="about-form" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="nombre"
                        className="about-input"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="apellido"
                        className="about-input"
                        placeholder="Apellido"
                        value={form.apellido}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="dni"
                        className="about-input"
                        placeholder="DNI"
                        value={form.dni}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="cuil"
                        className="about-input"
                        placeholder="CUIL"
                        value={form.cuil}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <input
                        type="email"
                        name="email"
                        className="about-input"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="about-btn-primary">
                        Enviar Solicitud
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
