const plans = [
  {
    id: 1,
    title: 'Datos Personales',
    description: 'Nombres y Apellidos completos, Fecha de nacimiento, Nacionalidades, Fechas de defunción y otros datos.',
    icon: 'bi-person-vcard',
    popular: false,
  },
  {
    id: 2,
    title: 'Scoring',
    description: 'Índice numérico de solvencia del 1 al 999. Analiza el comportamiento de pago histórico y proyecta el nivel de riesgo crediticio.',
    icon: 'bi-graph-up-arrow',
    popular: true,
  },
  {
    id: 3,
    title: 'Domicilios, Contactos y Emails',
    description: 'Datos precisos de localización: domicilios actualizados, números de celular vinculados y cuentas de email verificadas.',
    icon: 'bi-geo-alt',
    popular: false,
  },
  {
    id: 4,
    title: 'Vínculos y Familiares',
    description: 'Mapeá el entorno de cualquier perfil. Identificá vínculos familiares directos, parejas y otros allegados clave.',
    icon: 'bi-diagram-3',
    popular: false,
  },
  {
    id: 5,
    title: 'Historial Laboral e Ingresos',
    description: 'Historial de empleo, situación de contratación actual y niveles estimados de ingresos mensuales.',
    icon: 'bi-briefcase',
    popular: false,
  },
  {
    id: 6,
    title: 'Historial de Vehículos',
    description: 'Registro completo de vehículos vinculados a una persona o empresa. Patentes, marcas, modelos y estado registral.',
    icon: 'bi-truck',
    popular: false,
  },
  {
    id: 7,
    title: 'Situación Financiera',
    description: 'Informe detallado del Banco Central. Escala del 1 al 6 desde cumplimiento normal hasta deudas en gestión judicial.',
    icon: 'bi-bank',
    popular: false,
  },
  {
    id: 8,
    title: 'Perfil Fiscal y Comercial',
    description: 'Detalle de inscripción como Monotributista o Autónomo. Participación en sociedades y registro de cheques rechazados.',
    icon: 'bi-clipboard-data',
    popular: false,
    highlight: true,
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="services-hero">
        <div className="container text-center">
          <h1 className="display-5 fw-bold text-white mb-3">Planes y Servicios</h1>
          <p className="text-white-50 mb-0 mx-auto" style={{ maxWidth: 600 }}>
            Elegí el informe que mejor se adapte a tus necesidades. Todos incluyen datos actualizados y verificación profesional.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {plans.map((plan) => (
              <div key={plan.id} className="col-md-6 col-lg-3">
                <div className={`plan-card ${plan.popular ? 'popular' : ''} ${plan.highlight ? 'highlight' : ''}`}>
                  {plan.popular && <span className="plan-badge">Más solicitado</span>}
                  {plan.highlight && <span className="plan-badge highlight-badge">Completo</span>}

                  <div className="plan-icon"><i className={`bi ${plan.icon}`}></i></div>
                  <h3 className="plan-title">{plan.title}</h3>
                  <p className="plan-desc">{plan.description}</p>

                  <a href={`/solicitar?servicio=${plan.id}`} className="plan-btn mt-auto">
                    Solicitar Informe
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
