function fmt(val, start, end) {
  const s = val != null ? String(val) : ''
  return end != null ? s.substring(start, end) : s.substring(start)
}

function v(val) {
  if (val == null || typeof val === 'boolean') return '-'
  if (typeof val === 'object') return '-'
  return String(val)
}

function formatDate(val) {
  if (val == null || typeof val === 'boolean') return '-'
  if (typeof val === 'object') return '-'
  const s = String(val).replace('T', ' ').replace('Z', '')
  if (!s.trim()) return '-'
  const parts = s.split(' ')
  const datePart = parts[0]
  const timePart = parts[1]
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datePart)) return s
  const [y, m, d] = datePart.split('-')
  return timePart ? `${d}-${m}-${y} | ${timePart}` : `${d}-${m}-${y}`
}

import ScoringChart from './ScoringChart.jsx'

function Field({ label, value }) {
  return (
    <li>
      <span className="text-muted small">• {label}:</span>
      {v(value)}
    </li>
  )
}

function Section({ icon, title, children, plain }) {
  return (
    <div className="card mb-3" style={plain ? { border: 'none', boxShadow: 'none' } : { border: '1px solid #e7e7e7', borderRadius: '10px', boxShadow: '0 1px 12px rgba(0,0,0,0.1)' }}>
      <div className="card-body">
        <div className="d-flex align-items-center gap-2">
          <i className={`bi bi-${icon}`} style={{ color: '#b71c1c', fontSize: '1.1rem' }}></i>
          <h5 className="fw-bold mb-0">{title}</h5>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function ReportContent({ data, reportRef }) {
  const d = data.data || data
  const dp = d.datosParticulares || {}
  const tel = d.telefonos || {}
  const telCel = d.telefonosCelulares || {}
  const vinculos = d.vinculos?.vinculos || {}
  const laboral = d.datosLaborales || {}
  const bienes = d.bienesPersonales || {}
  const morosidad = d.morosidad || {}
  const boletin = d.boletinOficial || {}
  const participacion = d.participacionSocietaria || {}
  const score = dp.score

  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

  return (
    <div ref={reportRef} className="bg-white report-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', fontFamily: 'Roboto, sans-serif' }}>
      <style>{`
        .report-container h1, .report-container h2, .report-container h3,
        .report-container h4, .report-container h5, .report-container h6 {
          font-family: "Raleway", sans-serif;
          font-weight: 700;
        }
        .report-container .table {
          border-collapse: separate;
          border-spacing: 0;
          border: 1px solid #e7e7e7;
          border-radius: 8px;
          background-color: #fafafa;
          overflow: hidden;
        }
        .report-container .table th,
        .report-container .table td {
          padding: 6px 10px !important;
          border-bottom: 1px solid #e7e7e7;
        }
        .report-container .table tr:last-child td,
        .report-container .table tr:last-child th {
          border-bottom: none;
        }
      `}</style>
      <div className="d-flex justify-content-between align-items-start pb-2 mb-2 border-bottom">
        <h4 className="fw-bold mb-0">
          {v(dp.apellido)}, {v(dp.nombre)}
        </h4>
        <div className="text-end small">
          <div>FECHA: <span className="fw-bold">{new Date().toLocaleDateString('es-AR')}</span></div>
          <div>INFORME N°: <span className="fw-bold">37028659</span></div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6 col-12">
          <Section icon="person" title="Datos Personales">
            <div style={{ borderRadius: '8px', padding: '0' }}>
              <div className="row g-2 mt-3">
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nombre</div>
                    <div className="fw-bold small">{v(dp.nombre)}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Apellido</div>
                    <div className="fw-bold small">{v(dp.apellido)}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CUIT / CUIL</div>
                    <div className="fw-bold small">{v(dp.cuil)}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>DNI</div>
                    <div className="fw-bold small">{v(dp.dni)}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Edad</div>
                    <div className="fw-bold small">{v(dp.edad)}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sexo</div>
                    <div className="fw-bold small">{v(dp.sexo)}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nacimiento</div>
                    <div className="fw-bold small">{formatDate(dp.fechaNacimiento)}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Defunción</div>
                    <div className="fw-bold small">{formatDate(dp.fechaDeceso)}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nacionalidad</div>
                    <div className="fw-bold small">{v(dp.nacionalidad)}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '12px 12px' }}>
                    <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Versión DNI</div>
                    <div className="fw-bold small">{v(dp.tipo)}</div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
        {score != null && (
          <div className="col-6 mb-0">
            <ScoringChart score={parseInt(v(score))} />
          </div>
        )}
      </div>

      <Section icon="house" title="Domicilio Particular">
        <div className="table-responsive">
          <p className="text-muted small mb-0 mt-1">
            Es la dirección declarada como la residencia principal o el hogar actual de la persona.
          </p>
          <table className="table table-sm mt-2 mb-0">
            <thead>
              <tr>
                <th>Ubicación</th>
                <th>Código Postal</th>
                <th>Localidad</th>
                <th>Provincia</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{v(dp.domicilio)}</td>
                <td>{v(dp.cp)}</td>
                <td>{v(dp.localidad)}</td>
                <td>{v(dp.provincia)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {dp.domAlternativos?.datos?.length > 0 && (
        <Section icon="house" title="Otros Domicilios">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              Representa una dirección secundaria, alternativa o histórica que quedó registrada en la base de datos (puede ser un domicilio anterior, laboral, o una propiedad declarada).
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Ubicación</th>
                  <th>Código Postal</th>
                  <th>Localidad</th>
                  <th>Provincia</th>
                </tr>
              </thead>
              <tbody>
                {dp.domAlternativos.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.domicilioAlt)}</td>
                    <td>{v(item.cpAlt)}</td>
                    <td>{v(item.localidadAlt)}</td>
                    <td>{v(item.provinciaAlt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {tel.datos?.length > 0 && (
        <Section icon="telephone" title="Teléfonos principales">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              Son números de teléfono fijos vinculados al historial de la persona.
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Número de teléfono</th>
                  <th>Prestador original</th>
                  <th>Localidad</th>
                </tr>
              </thead>
              <tbody>
                {tel.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.area)} {v(item.nro)}</td>
                    <td>{v(item.operador)}</td>
                    <td>{v(item.localidad)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {telCel.datos?.length > 0 && (
        <Section icon="telephone" title="Teléfonos celulares">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              Registros de líneas móviles asociadas al perfil.
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Número de celular</th>
                  <th>Prestador original</th>
                  <th>Localidad</th>
                </tr>
              </thead>
              <tbody>
                {telCel.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.area)} {v(item.nro)}</td>
                    <td>{v(item.operador)}</td>
                    <td>{v(item.localidad)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {dp.mails?.datos?.length > 0 && (
        <Section icon="envelope" title="Emails">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              Muestra las direcciones de correo electrónico declaradas o vinculadas a la identidad fiscal del titular.
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Cuit</th>
                  <th>DNI</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {dp.mails.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.cuil)}</td>
                    <td>{v(item.dni)}</td>
                    <td>{v(item.email)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {vinculos.datos?.length > 0 && (
        <Section icon="people" title="Análisis de Vínculos / Familiares">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              Esta sección del informe detalla las relaciones familiares directas registradas para el titular, permitiendo reconstruir su grupo familiar primario
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cuil</th>
                  <th>Nacimiento</th>
                  <th>Relación</th>
                  <th>Sexo</th>
                  <th>Edad</th>
                </tr>
              </thead>
              <tbody>
                {vinculos.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.nombre)}</td>
                    <td>{v(item.cuilVinculo)}</td>
                    <td>{formatDate(item.fechaNacimiento)}</td>
                    <td>{v(item.relacion)}</td>
                    <td>{v(item.sexo)}</td>
                    <td>{v(item.edad)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {laboral.datoLaboral?.datos?.length > 0 && (
        <Section icon="briefcase" title="Análisis de Historial Laboral e Ingresos">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
             Esta sección analiza la situación de empleo actual del titular y clasifica su remuneración estimada dentro de una escala de rangos salariales.
            </p>
            
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>CUIT</th>
                  <th>Razón Social</th>
                  <th>Nivel de ingreso</th>
                </tr>
              </thead>
              <tbody>
                {laboral.datoLaboral.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.relacionDependencia?.estado)}</td>
                    <td>{v(item.relacionDependencia?.cuit)}</td>
                    <td>{v(item.relacionDependencia?.razonSocial)}</td>
                    <td>{v(item.relacionDependencia?.sueldo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-muted small fst-italic mb-0 mt-2">
               La clasificación de ingresos (escalas A1 a A8) mide la capacidad salarial mensual en base a los antecedentes laborales del perfil. Estos rangos reflejan el progreso y la jerarquía de los cargos ocupados en el mercado de trabajo. Mientras que las categorías más bajas (como A1) indican ingresos mínimos de referencia, los niveles superiores (hasta A8) señalan perfiles con trayectorias más consolidadas o puestos directivos de mayor remuneración.
            </p>
          </div>
        </Section>
      )}

      {bienes.automotores?.datos?.length > 0 && (
        <Section icon="car-front" title="Automotores actuales (Activos Vigentes)">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              Representa los vehículos que el titular posee en la actualidad, con el porcentaje de titularidad sobre cada uno:
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Año</th>
                  <th>Dominio</th>
                  <th>Tipo</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Origen</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {bienes.automotores.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.anioModelo)}</td>
                    <td>{v(item.dominio)}</td>
                    <td>{v(item.tipo)}</td>
                    <td>{v(item.marca)}</td>
                    <td>{v(item.modelo)}</td>
                    <td>{v(item.origen)}</td>
                    <td>{item.porcentaje != null ? `${v(item.porcentaje)}%` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {bienes.automotores_historial?.datos?.length > 0 && (
        <Section icon="car-front" title="Historial de Automotores (Bienes Anteriores)">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              Registra el historial de vehículos que el titular tuvo a su nombre en el pasado (ya transferidos o dados de baja). 
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Año</th>
                  <th>Dominio</th>
                  <th>Tipo</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>Origen</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {bienes.automotores_historial.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.anioModelo)}</td>
                    <td>{v(item.dominio)}</td>
                    <td>{v(item.tipo)}</td>
                    <td>{v(item.marca)}</td>
                    <td>{v(item.modelo)}</td>
                    <td>{v(item.origen)}</td>
                    <td>{item.porcentaje != null ? `${v(item.porcentaje)}%` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {morosidad.informacionBcra?.datos?.length > 0 && (
        <Section icon="currency-exchange" title="Situación Financiera">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Banco/Financiera</th>
                  <th>Ene</th>
                  <th>Feb</th>
                  <th>Mar</th>
                  <th>Abr</th>
                  <th>May</th>
                  <th>Jun</th>
                  <th>Jul</th>
                  <th>Ago</th>
                  <th>Sep</th>
                  <th>Oct</th>
                  <th>Nov</th>
                  <th>Dic</th>
                </tr>
              </thead>
              <tbody>
                {morosidad.informacionBcra.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.entidad?.entidad)}</td>
                    <td>{formatDate(item.periodo)}</td>
                    <td colSpan={11}>{v(item.prestamo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {laboral.monotributista?.datos?.length > 0 && (
        <Section icon="briefcase" title="Monotributista ó Autonomo">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              El panel muestra el cumplimiento de los pagos mensuales obligatorios de la seguridad social:
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Periodo</th>
                  <th>Tipo</th>
                  <th>Categoria</th>
                  <th>Ganancias</th>
                  <th>IVA</th>
                  <th>Integra Sociedades</th>
                </tr>
              </thead>
              <tbody>
                {laboral.monotributista.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{formatDate(item.fechaInicio)} - {formatDate(item.fechaHasta)}</td>
                    <td>{v(item.tipo)}</td>
                    <td>{v(item.categoria)}</td>
                    <td>{v(item.ganancias)}</td>
                    <td>{v(item.iva)}</td>
                    <td>{v(item.integrasociedades)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {laboral.actividad?.datos?.length > 0 && (
        <Section icon="check-circle" title="Actividades">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {laboral.actividad.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.ciiu)}</td>
                    <td>{v(item.descripcion)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {laboral.obraSocial?.datos?.length > 0 && (
        <Section icon="heart" title="Obra Social">
          <div className="table-responsive">
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {laboral.obraSocial.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.codigo)}</td>
                    <td>{v(item.descripcion)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {laboral.jubilacion?.datos?.length > 0 && (
        <Section icon="clock-history" title="Jubilación">
          <div className="table-responsive">
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Titular</th>
                  <th>Cuil</th>
                  <th>Sueldo Bruto</th>
                  <th>Sueldo Neto</th>
                  <th>Periodo</th>
                  <th>Rango</th>
                </tr>
              </thead>
              <tbody>
                {laboral.jubilacion.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.titular)}</td>
                    <td>{v(item.cuil)}</td>
                    <td>{v(item.sueldoBruto)}</td>
                    <td>{v(item.sueldoNeto)}</td>
                    <td>{v(item.periodo)}</td>
                    <td>{v(item.rango)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {participacion.datos?.length > 0 && (
        <Section icon="handshake" title="Análisis de Situación Fiscal, Previsional y Societaria">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              Este apartado detalla la condición impositiva independiente del titular, su historial de aportes obligatorios y su participación activa en estructuras societarias comerciales.
            </p>
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Archivo</th>
                  <th>Cuit</th>
                  <th>Fuente</th>
                  <th>Boletín</th>
                  <th>Fecha publicación</th>
                  <th>Nombre</th>
                  <th>Razón Social</th>
                  <th>Fecha Constitución</th>
                  <th>Cargo</th>
                </tr>
              </thead>
              <tbody>
                {participacion.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.archivo)}</td>
                    <td>{v(item.cuil)}</td>
                    <td>{v(item.fuente)}</td>
                    <td>{v(item.boletin)}</td>
                    <td>{formatDate(item.fechaPublicacion)}</td>
                    <td>{v(item.nombre)}</td>
                    <td>{v(item.razonSocial)}</td>
                    <td>{formatDate(item.fechaConstitucion)}</td>
                    <td>{v(item.cargo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {boletin.datos?.length > 0 && (
        <Section icon="megaphone" title="Menciones en Boletín Oficial">
          <div className="table-responsive">
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Fuente</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {boletin.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.fuente)}</td>
                    <td>{formatDate(item.fecha)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {morosidad.chequesRechazados?.datos?.length > 0 && (
        <Section icon="exclamation-triangle" title="Cheques rechazados">
          <div className="table-responsive">
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>N° de cheque</th>
                  <th>Monto</th>
                  <th>Causal</th>
                  <th>Fecha rechazo</th>
                  <th>Fecha Levantamiento</th>
                  <th>Multa</th>
                </tr>
              </thead>
              <tbody>
                {morosidad.chequesRechazados.datos.map((item, i) => (
                  <tr key={i}>
                    <td>{v(item.nroCheque)}</td>
                    <td>{item.monto != null ? `$ ${v(item.monto)}` : '-'}</td>
                    <td>{v(item.causal)}</td>
                    <td>{formatDate(item.fechaRechazo)}</td>
                    <td>{formatDate(item.fechaLevantamiento)}</td>
                    <td>{v(item.multa)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {laboral.monotributista?.datos?.length > 0 && (
        <Section icon="briefcase" title="Aportes Monotributista / Autonomo">
          <div className="table-responsive">
            <table className="table table-sm mt-2 mb-0">
              <thead>
                <tr>
                  <th>Año</th>
                  {months.map(m => <th key={m}>{m}</th>)}
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const rows = []
                  const item = laboral.monotributista.datos[0]
                  const anioInicio = parseInt(fmt(item.fechaInicio, 0, 4))
                  const mesInicio = parseInt(fmt(item.fechaInicio, 5, 7))
                  const anioHasta = parseInt(fmt(item.fechaHasta, 0, 4))
                  const mesHasta = parseInt(fmt(item.fechaHasta, 5, 7))
                  const cantidad = anioHasta - anioInicio
                  for (let i = 0; i <= cantidad; i++) {
                    const anio = anioInicio + i
                    const m1 = i === 0 ? mesInicio : 1
                    const m2 = i >= cantidad ? mesHasta : 12
                    rows.push(
                      <tr key={anio}>
                        <td>{anio}</td>
                        {Array.from({ length: 12 }, (_, j) => {
                          const month = j + 1
                          let cls = 'text-danger'
                          if (month >= m1 && month <= m2) cls = 'text-success'
                          if (month < m1 || month > m2) cls = 'text-secondary'
                          return <td key={j} className={cls} style={{ opacity: cls === 'text-secondary' ? 0.5 : 1 }}>■</td>
                        })}
                      </tr>
                    )
                  }
                  return rows
                })()}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-end gap-3 small mt-1">
            <span className="text-success">■ En término</span>
            <span style={{ opacity: 0.5 }}>■ No registra</span>
          </div>
        </Section>
      )}

      <div className="small text-muted mt-4 pt-3 border-top">
        <p className="mb-1">
          El presente informe de INFOSOCIO.COM.AR es un recurso complementario para la evaluación de negocios y no implica ninguna valoración implícita sobre la reputación, capacidad financiera o buen nombre del titular. El análisis final y la toma de decisiones son responsabilidad exclusiva del consultante. Con el fin de salvaguardar la privacidad y cumplir con la Ley 25.326, el usuario asume la obligación de mantener este reporte bajo estricta reserva, comprometiéndose a no exhibirlo ni distribuirlo a terceros, y a destruir las copias impresas inmediatamente después de cumplir su propósito.
        </p>
        <p className="mb-0 mt-2">
          <strong>CONSULTAS:</strong> contacto@infosocio.com.ar
        </p>
      </div>
    </div>
  )
}
