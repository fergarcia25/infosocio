import { useState, useEffect, useRef } from 'react'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'

const plans = [
  { id: 1, title: 'Datos Personales', description: 'Nombres y Apellidos completos, Fecha de nacimiento, Nacionalidades, Fechas de defunción y otros datos.', icon: 'bi-person-vcard', popular: false },
  { id: 2, title: 'Scoring', description: 'Índice numérico de solvencia del 1 al 999. Analiza el comportamiento de pago histórico y proyecta el nivel de riesgo crediticio.', icon: 'bi-graph-up-arrow', popular: true },
  { id: 3, title: 'Domicilios, Contactos y Emails', description: 'Datos precisos de localización: domicilios actualizados, números de celular vinculados y cuentas de email verificadas.', icon: 'bi-geo-alt', popular: false },
  { id: 4, title: 'Vínculos y Familiares', description: 'Mapeá el entorno de cualquier perfil. Identificá vínculos familiares directos, parejas y otros allegados clave.', icon: 'bi-diagram-3', popular: false },
  { id: 5, title: 'Historial Laboral e Ingresos', description: 'Historial de empleo, situación de contratación actual y niveles estimados de ingresos mensuales.', icon: 'bi-briefcase', popular: false },
  { id: 6, title: 'Historial de Vehículos', description: 'Registro completo de vehículos vinculados a una persona o empresa. Patentes, marcas, modelos y estado registral.', icon: 'bi-truck', popular: false },
  { id: 7, title: 'Situación Financiera', description: 'Informe detallado del Banco Central. Escala del 1 al 6 desde cumplimiento normal hasta deudas en gestión judicial.', icon: 'bi-bank', popular: false },
  { id: 8, title: 'Perfil Fiscal y Comercial', description: 'Detalle de inscripción como Monotributista o Autónomo. Participación en sociedades y registro de cheques rechazados.', icon: 'bi-clipboard-data', popular: false, highlight: true },
]

const sliderItems = [
  { title: 'Datos Personales', icon: 'bi-person-vcard' },
  { title: 'Scoring', icon: 'bi-graph-up-arrow' },
  { title: 'Domicilios, Contactos, Gmails', icon: 'bi-geo-alt' },
  { title: 'Vínculos y Familiares', icon: 'bi-diagram-3' },
  { title: 'Historial laboral e ingresos', icon: 'bi-briefcase' },
  { title: 'Historial de vehículos', icon: 'bi-truck' },
  { title: 'Situación financiera', icon: 'bi-bank' },
  { title: 'Perfil Fiscal y Comercial', icon: 'bi-clipboard-data' },
]

export default function HomePage() {
  const CARD_WIDTH = 228
  const items = [...sliderItems, ...sliderItems]
  const totalSlides = sliderItems.length

  const getGap = () => {
    if (window.innerWidth >= 992) return 24
    if (window.innerWidth >= 768) return 16
    return 12
  }

  const [offset, setOffset] = useState(0)
  const [gap, setGap] = useState(getGap)
  const [dotIndex, setDotIndex] = useState(0)
  const transitionRef = useRef(true)

  useEffect(() => {
    const onResize = () => setGap(getGap())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const step = CARD_WIDTH + gap
    const timer = setInterval(() => {
      setDotIndex((prev) => (prev + 1) % totalSlides)
      setOffset((prev) => {
        const next = prev + step
        if (next >= totalSlides * step) {
          transitionRef.current = false
          return 0
        }
        transitionRef.current = true
        return next
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [gap, totalSlides])

  return (
    <>
      <section className="about-hero home-hero">
        <div className="about-hero-bg" />
        <div className="container position-relative d-flex align-items-center" style={{ zIndex: 1, flex: 1, minHeight: 0 }}>
          <div className="row align-items-center w-100">
            <div className="col-lg-8">
              <h1 className="about-hero-title">
                Información estratégica para <span className="text-gradient">tomar decisiones seguras</span>
              </h1>
              <p className="about-hero-sub">
                Buscá por Nombre y Apellido, DNI o CUIL y obtené el informe más completo de Argentina.
              </p>
              <div className="mt-4 mb-3">
                <SearchBar large />
              </div>
            </div>
            <div className="col-lg-4 d-none d-lg-block">
              <div className="about-hero-visual">
                <div className="about-circle about-circle-1" />
                <div className="about-circle about-circle-2" />
                <div className="about-circle about-circle-3" />
               
              </div>
            </div>
          </div>
        </div>

        {/* Slider - full width outside container */}
        <div className="home-slider">
          <div
            className="home-slider-track"
            style={{
              transform: `translateX(-${offset}px)`,
              transition: transitionRef.current ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
            }}
          >
            {items.map((item, i) => (
              <div key={i} className="home-slide">
                <div className="home-slide-card">
                  <div className="home-slide-icon"><i className={`bi ${item.icon} text-gradient`}></i></div>
                  <h3 className="home-slide-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="home-slider-dots">
          {sliderItems.map((_, i) => (
            <span
              key={i}
                className={`home-slider-dot ${i === dotIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </section>

      {/* Planes y servicios */}
      <section className="about-plans-section" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="about-label">PLANES Y SERVICIOS</div>
            <h2 className="about-title">Elegí la solución que mejor se adapte a tus necesidades</h2>
            <p className="about-text" style={{ maxWidth: 600, margin: '0 auto' }}>
              Dos formas de acceder a la información más completa del mercado.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="about-feat-card">
                <h3 className="fw-bold text-gradient">InfoBoost</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  Subí tu base de DNI, CUIT o patentes y obtené datos de contacto, patrimoniales y comerciales actualizados de forma masiva y 100% autogestionable.
                </p>
                <Link to="/infoboost" className="about-btn-primary">Ver InfoBoost</Link>
              </div>
            </div>
            <div className="col-md-6 col-lg-5">
              <div className="about-feat-card">
                <h3 className="fw-bold text-gradient">Infosocio Target</h3>
                <p style={{ marginBottom: '1.5rem' }}>
                  Mediante tecnología Big Data analizamos millones de señales digitales para construir bases de datos de potenciales clientes altamente calificados.
                </p>
                <Link to="/infosociotarget" className="about-btn-primary">Ver Infosocio Target</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="about-benefits-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="about-title" style={{ color: '#fff' }}>¿Que contiene el informe?</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem' }}>En el informe podrás conocer la siguiente información de la persona.</p>
          </div>
          <div className="about-benefits-grid">
            {plans.map((plan) => (
              <div key={plan.id} className="about-benefit-card">
                <i className={`bi ${plan.icon}`} />
                <h4>{plan.title}</h4>
                <p>{plan.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About section */}
      <section className="about-section">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="about-label">SOBRE NOSOTROS</div>
              <h2 className="about-title">InfoSocio</h2>
              <p className="about-text">
                Somos una plataforma especializada en la generación de informes personalizados.
                Nuestro objetivo es brindarte información confiable y detallada de manera rápida y sencilla.
              </p>
              <p className="about-text">
                Con años de experiencia en el rubro, garantizamos datos precisos y actualizados
                para que puedas tomar las mejores decisiones.
              </p>
              <Link to="/infosociotarget" className="about-btn-primary mt-3 d-inline-flex">Conocé más</Link>
            </div>
            <div className="col-lg-6">
              <div className="home-about-card">
                <div className="home-about-card-header">
                  <i className="bi bi-info-circle"></i>
                  <span>Descubrí todo lo que hacemos</span>
                </div>
                <div className="home-about-list">
                  <Link to="/infosociotarget#funcionalidades" className="home-about-item">
                    <i className="bi bi-bullseye"></i>
                    <span>Infosocio Target</span>
                    <i className="bi bi-chevron-right"></i>
                  </Link>
                  <Link to="/infosociotarget" className="home-about-item">
                    <i className="bi bi-arrow-repeat"></i>
                    <span>Transformamos datos complejos en decisiones estratégicas</span>
                    <i className="bi bi-chevron-right"></i>
                  </Link>
                  <Link to="/infosociotarget#funcionalidades" className="home-about-item">
                    <i className="bi bi-grid-3x3-gap"></i>
                    <span>Todo lo que necesitás para encontrar a tus clientes</span>
                    <i className="bi bi-chevron-right"></i>
                  </Link>
                  <Link to="/infosociotarget" className="home-about-item">
                    <i className="bi bi-people"></i>
                    <span>Para equipos de Marketing y Ventas</span>
                    <i className="bi bi-chevron-right"></i>
                  </Link>
                  <Link to="/infosociotarget" className="home-about-item">
                    <i className="bi bi-signpost-2"></i>
                    <span>El camino hacia tu base de datos ideal</span>
                    <i className="bi bi-chevron-right"></i>
                  </Link>
                  <Link to="/infosociotarget" className="home-about-item">
                    <i className="bi bi-rocket-takeoff"></i>
                    <span>Impulsá el rendimiento de tu negocio hoy mismo</span>
                    <i className="bi bi-chevron-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
