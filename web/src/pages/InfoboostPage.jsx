export default function InfoboostPage() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center min-vh-80">
            <div className="col-lg-7">
              <span className="about-tag">InfoBoost</span>
              <h1 className="about-hero-title">
                Multiplicá el poder de tus bases de datos<br />
                <span className="text-gradient">en tiempo récord</span>
              </h1>
              <p className="about-hero-sub">
                Transformá listas vacías en información estratégica. Subí tu base de DNI, CUIT o patentes y obtené datos de contacto, patrimoniales y comerciales actualizados de forma masiva y 100% autogestionable.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <a href="#contacto" className="about-btn-primary">Solicitar información</a>
                <a href="#info" className="about-btn-outline">Ver información</a>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="about-hero-visual">
                <div className="about-circle about-circle-1" />
                <div className="about-circle about-circle-2" />
                <div className="about-circle about-circle-3" />
                <div className="about-hero-card">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>ENRIQUECIMIENTO</span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>100%</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>autogestionable y en línea</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is */}
      <section className="about-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <div className="about-label">¿QUÉ ES?</div>
              <h2 className="about-title">InfoBoost</h2>
              <p className="about-text">
                Es nuestra herramienta web inteligente y autogestionable diseñada para optimizar tus tiempos de investigación. Olvidate de buscar uno por uno: ahora podés enriquecer bases completas de datos de manera automatizada.
              </p>
              <div className="about-stats-row">
                <div>
                  <span className="about-stat-num">3</span>
                  <span className="about-stat-label">Pasos simples</span>
                </div>
                <div>
                  <span className="about-stat-num">100%</span>
                  <span className="about-stat-label">Autogestionable</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <div className="about-targets">
                <h3 className="mb-4" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#b71c1c', letterSpacing: '1px' }}>EL PROCESO ES SIMPLE, RÁPIDO Y EN 3 PASOS:</h3>
                <div className="about-target-list">
                  <div className="about-target-item">
                    <div className="about-target-icon" style={{ background: '#fef2f2' }}>
                      <i className="bi bi-upload" style={{ color: '#b71c1c', fontSize: '1.3rem' }} />
                    </div>
                    <div>
                      <strong style={{ color: '#1a1a1a' }}>Subís tu base</strong>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: '#666' }}>Cargás tu archivo con los DNI, CUIL/CUIT o Dominios (patentes) que necesitás investigar.</p>
                    </div>
                  </div>
                  <div className="about-target-item">
                    <div className="about-target-icon" style={{ background: '#fef2f2' }}>
                      <i className="bi bi-search" style={{ color: '#b71c1c', fontSize: '1.3rem' }} />
                    </div>
                    <div>
                      <strong style={{ color: '#1a1a1a' }}>Elegís qué buscar</strong>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: '#666' }}>Seleccionás a la carta la información que te interesa obtener para el enriquecimiento.</p>
                    </div>
                  </div>
                  <div className="about-target-item">
                    <div className="about-target-icon" style={{ background: '#fef2f2' }}>
                      <i className="bi bi-download" style={{ color: '#b71c1c', fontSize: '1.3rem' }} />
                    </div>
                    <div>
                      <strong style={{ color: '#1a1a1a' }}>Descargás los resultados</strong>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: '#666' }}>Nuestro motor procesa la información en tiempo récord y te devuelve la base enriquecida lista para usar.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What info it offers */}
      <section id="info" className="about-transform-section">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <span className="about-label" style={{ color: '#b71c1c' }}>¿QUÉ INFORMACIÓN OFRECE?</span>
              <h2 className="about-title" style={{ color: '#fff' }}>Información estratégica al alcance de un clic</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 700, margin: '0 auto' }}>
                Accedé a la base de datos más completa del mercado para tomar decisiones seguras, segmentar campañas o acelerar procesos de cobranza e investigación.
              </p>
            </div>
          </div>
          <div className="about-transform-grid">
            <div className="about-transform-card">
              <div className="about-tc-number">
                <i className="bi bi-person-badge" style={{ fontSize: '2.2rem' }} />
              </div>
              <h4>Datos Particulares</h4>
              <p>General, domicilios, emails, celulares.</p>
            </div>
            
            <div className="about-transform-card">
              <div className="about-tc-number">
                <i className="bi bi-people" style={{ fontSize: '2.2rem' }} />
              </div>
              <h4>Vínculos</h4>
              <p>Vínculos familiares y otros.</p>
            </div>
            
            <div className="about-transform-card">
              <div className="about-tc-number">
                <i className="bi bi-house" style={{ fontSize: '2.2rem' }} />
              </div>
              <h4>Bienes Personales</h4>
              <p>Viviendas, automotores.</p>
            </div>
            
            <div className="about-transform-card">
              <div className="about-tc-number">
                <i className="bi bi-exclamation-triangle" style={{ fontSize: '2.2rem' }} />
              </div>
              <h4>Morosidad</h4>
              <p>Información BCRA, cheques rechazados, deudas, embargos, juicios demandados, juicios actor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 
      Planes style section 
      <section className="about-section">
        <div className="container">
          <div className="text-center mb-5">
            <div className="about-label">INFORMACIÓN ESTRATÉGICA</div>
            <h2 className="about-title">Información estratégica al alcance de un clic</h2>
            <p className="about-text" style={{ maxWidth: 700, margin: '0 auto' }}>
              Elegí la base de datos de Infoboost y obtener toda la información estratégica que necesitas.  Tomá decisiones seguras, segmentá campañas o acelerá procesos de cobranza e investigación.
            </p>
          </div>
        </div>
      </section>
      */}

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container text-center position-relative" style={{ zIndex: 1 }}>
          <span className="about-label" style={{ color: '#b71c1c' }}>INFORMACIÓN ESTRATÉGICA</span>
          <h2 className="about-title" style={{ color: '#fff' }}>Accedé a la base de datos más completa del mercado</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2rem' }}>
            Elegí Infoboost y obtené toda la información estratégica en tiempo récord.  Tomá decisiones seguras, segmentá campañas o acelerá procesos de cobranza e investigación.
          </p>
          <a href="#contacto" className="about-btn-primary">Solicitar información</a>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contacto" className="about-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center mb-5">
                <span className="about-label">CONTACTO</span>
                <h2 className="about-title">Contáctanos</h2>
                <p className="about-text">Completá el formulario y te responderemos a la brevedad</p>
              </div>
              <form className="about-form">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <input type="text" className="about-input" placeholder="Nombre" />
                  </div>
                  <div className="col-sm-6">
                    <input type="text" className="about-input" placeholder="Apellido" />
                  </div>
                  <div className="col-sm-6">
                    <input type="email" className="about-input" placeholder="Email" />
                  </div>
                  <div className="col-sm-6">
                    <input type="text" className="about-input" placeholder="Localidad" />
                  </div>
                  <div className="col-sm-6">
                    <input type="text" className="about-input" placeholder="DNI" />
                  </div>
                  <div className="col-sm-6">
                    <input type="tel" className="about-input" placeholder="Teléfono" />
                  </div>
                  <div className="col-12">
                    <input type="text" className="about-input" placeholder="Actividad / Ocupación / Profesión" />
                  </div>
                  <div className="col-12">
                    <textarea className="about-input about-textarea" rows={4} placeholder="Mensaje" />
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="about-btn-primary">Enviar mensaje</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
