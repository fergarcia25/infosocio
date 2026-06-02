export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg" />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center min-vh-80">
            <div className="col-lg-7">
              <span className="about-tag">Infosocio Target</span>
              <h1 className="about-hero-title">
                Encontrá a tus próximos clientes con<br />
                <span className="text-gradient">Inteligencia de la Información</span>
              </h1>
              <p className="about-hero-sub">
                Dejá de prospectar a ciegas. Accedé a bases de datos nuevas, actualizadas y segmentadas a la medida de tu negocio.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <a href="#contacto" className="about-btn-primary">Solicitar información</a>
                <a href="#funcionalidades" className="about-btn-outline">Ver funcionalidades</a>
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
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>DATOS EN VIVO</span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>12.4M</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>perfiles activos segmentados</div>
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
              <h2 className="about-title">Infosocio Target</h2>
              <p className="about-text">
                Es nuestra solución de inteligencia comercial y segmentación avanzada. Mediante tecnología Big Data, analizamos millones de señales digitales y demográficas para construir bases de datos de potenciales clientes altamente calificados, optimizando tu presupuesto de marketing y el tiempo de tus vendedores.
              </p>
              <div className="about-stats-row">
                <div>
                  <span className="about-stat-num">10M+</span>
                  <span className="about-stat-label">Señales analizadas</span>
                </div>
                <div>
                  <span className="about-stat-num">98%</span>
                  <span className="about-stat-label">Datos verificados</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <div className="about-targets">
                <h3 className="mb-4" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#b71c1c', letterSpacing: '1px' }}>SERVICIO LLAVE EN MANO PENSADO PARA:</h3>
                <div className="about-target-list">
                  <div className="about-target-item">
                    <div className="about-target-icon" style={{ background: '#fef2f2' }}>
                      <i className="bi bi-building" style={{ color: '#b71c1c', fontSize: '1.3rem' }} />
                    </div>
                    <div>
                      <strong style={{ color: '#1a1a1a' }}>Empresas B2B</strong>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: '#666' }}>Identificá empresas o profesionales que califiquen como clientes potenciales.</p>
                    </div>
                  </div>
                  <div className="about-target-item">
                    <div className="about-target-icon" style={{ background: '#fef2f2' }}>
                      <i className="bi bi-megaphone" style={{ color: '#b71c1c', fontSize: '1.3rem' }} />
                    </div>
                    <div>
                      <strong style={{ color: '#1a1a1a' }}>Agencias de Marketing</strong>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: '#666' }}>Datos precisos para armar buyer personas y planificar campañas efectivas.</p>
                    </div>
                  </div>
                  <div className="about-target-item">
                    <div className="about-target-icon" style={{ background: '#fef2f2' }}>
                      <i className="bi bi-people" style={{ color: '#b71c1c', fontSize: '1.3rem' }} />
                    </div>
                    <div>
                      <strong style={{ color: '#1a1a1a' }}>Equipos Comerciales</strong>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: '#666' }}>Optimizá tu prospección con propuestas personalizadas para nichos concretos.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform section */}
      <section className="about-transform-section">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <span className="about-label" style={{ color: '#b71c1c' }}>NUESTRO ENFOQUE</span>
              <h2 className="about-title" style={{ color: '#fff' }}>Transformamos datos complejos en decisiones estratégicas</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 700, margin: '0 auto' }}>
                Olvidate de integraciones complejas o desarrollos propios. Nosotros nos encargamos de extraer y filtrar la información exacta que tu negocio necesita.
              </p>
            </div>
          </div>
          <div className="about-transform-grid">
            <div className="about-transform-card">
              <div className="about-tc-number">01</div>
              <h4>Extraemos</h4>
              <p>Millones de señales digitales y demográficas de fuentes verificadas.</p>
            </div>
            <div className="about-transform-arrow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b71c1c" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </div>
            <div className="about-transform-card">
              <div className="about-tc-number">02</div>
              <h4>Filtramos</h4>
              <p>Aplicamos segmentación avanzada según los parámetros de tu negocio.</p>
            </div>
            <div className="about-transform-arrow">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b71c1c" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </div>
            <div className="about-transform-card">
              <div className="about-tc-number">03</div>
              <h4>Entregamos</h4>
              <p>Bases de datos listas para usar, optimizadas para tus campañas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="about-section about-features-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="about-label">FUNCIONALIDADES</span>
            <h2 className="about-title">Todo lo que necesitás para encontrar a tus clientes</h2>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="about-feat-card">
                <div className="about-feat-icon">
                  <i className="bi bi-sliders" />
                </div>
                <h4>Segmentación Avanzada</h4>
                <p>Filtrá personas y empresas por múltiples opciones: ubicación, rubro, nivel socioeconómico y más.</p>
                <div className="about-feat-tags">
                  <span>Ubicación</span>
                  <span>Rubro</span>
                  <span>NSE</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-feat-card">
                <div className="about-feat-icon">
                  <i className="bi bi-clock-history" />
                </div>
                <h4>Informes en Tiempo Real</h4>
                <p>Accedé a análisis detallados desde tu computadora con datos siempre actualizados.</p>
                <div className="about-feat-tags">
                  <span>Tiempo real</span>
                  <span>Dashboard</span>
                  <span>Analíticas</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="about-feat-card">
                <div className="about-feat-icon">
                  <i className="bi bi-database" />
                </div>
                <h4>BD Personalizadas y en Línea</h4>
                <p>Adquirí información relevante según tus necesidades actuales de negocio.</p>
                <div className="about-feat-tags">
                  <span>A medida</span>
                  <span>Online</span>
                  <span>Exportable</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="about-benefits-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="about-label" style={{ color: '#b71c1c' }}>BENEFICIOS</span>
            <h2 className="about-title" style={{ color: '#fff' }}>Para equipos de Marketing y Ventas</h2>
          </div>
          <div className="about-benefits-grid">
            <div className="about-benefit-card">
              <i className="bi bi-bullseye" />
              <h4>Decisiones Estratégicas</h4>
              <p>Mejorá el ROI con información precisa y accionable.</p>
            </div>
            <div className="about-benefit-card">
              <i className="bi bi-lightning-charge" />
              <h4>Eficiencia Operativa</h4>
              <p>Reducí tiempo en análisis de mercado con datos listos para usar.</p>
            </div>
            <div className="about-benefit-card">
              <i className="bi bi-search" />
              <h4>Segmentación Precisa</h4>
              <p>Identificá oportunidades de negocio donde antes no veías.</p>
            </div>
            <div className="about-benefit-card">
              <i className="bi bi-graph-up" />
              <h4>Resultados Medibles</h4>
              <p>Tracking y métricas claras del rendimiento de tus campañas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="about-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="about-label">PROCESO</span>
            <h2 className="about-title">El camino hacia tu base de datos ideal</h2>
            <p className="about-text" style={{ maxWidth: 500, margin: '0 auto' }}>
              Conseguí tu listado segmentado en tres simples pasos
            </p>
          </div>
          <div className="about-steps">
            <div className="about-step">
              <div className="about-step-num">1</div>
              <div className="about-step-line" />
              <div className="about-step-content">
                <h4>Definimos tu target</h4>
                <p>Completá el formulario contándonos qué perfil de cliente buscás. Ej: "Empresas de Córdoba del rubro automotor" o "Personas de nivel socioeconómico alto en Buenos Aires".</p>
              </div>
            </div>
            <div className="about-step">
              <div className="about-step-num">2</div>
              <div className="about-step-line" />
              <div className="about-step-content">
                <h4>Procesamos y cotizamos</h4>
                <p>Cruzamos los parámetros con nuestro motor de datos, evaluamos el volumen disponible de la audiencia y te enviamos el presupuesto.</p>
              </div>
            </div>
            <div className="about-step">
              <div className="about-step-num">3</div>
              <div className="about-step-line" />
              <div className="about-step-content">
                <h4>Descargás y vendés</h4>
                <p>Recibís tu base de datos personalizada y optimizada en tiempo récord, lista para poner en marcha tus campañas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta-section">
        <div className="container text-center position-relative" style={{ zIndex: 1 }}>
          <h2 className="about-title" style={{ color: '#fff' }}>Impulsá el rendimiento de tu negocio hoy mismo</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto 2rem' }}>
            Decinos a quién querés venderle y nosotros te ayudamos a encontrarlo.
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
