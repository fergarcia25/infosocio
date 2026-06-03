function fmt(val, start, end) {
  const s = val != null ? String(val) : ''
  return end != null ? s.substring(start, end) : s.substring(start)
}

function v(val) {
  if (val == null || typeof val === 'boolean') return '-'
  if (typeof val === 'object') return '-'
  return String(val)
}

function Field({ label, value }) {
  return (
    <li>
      <span>• {label}:</span>
      {v(value)}
    </li>
  )
}

function Section({ icon, title, children }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center gap-2 mb-3">
          <i className="bi bi-{icon}" style={{ fontSize: '1.25rem' }}></i>
          <h5 className="mb-0 fw-bold">{title}</h5>
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
    <div ref={reportRef} className="bg-white" style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h4 className="fw-bold mb-0">
          {v(dp.apellido)}, {v(dp.nombre)}
        </h4>
        <div className="text-end small">
          <div>FECHA: <span className="fw-bold">{new Date().toLocaleDateString('es-AR')}</span></div>
          <div>INFORME N°: <span className="fw-bold">37028659</span></div>
        </div>
      </div>

      <Section icon="person" title="Datos Personales">
        <ul className="list-unstyled row row-cols-2 mb-0">
          <Field label="Nombre" value={dp.nombre} />
          <Field label="Apellido" value={dp.apellido} />
          <Field label="Cuit / Cuil" value={dp.cuil} />
          <Field label="Versión DNI" value={dp.tipo} />
          <Field label="N° DNI" value={dp.dni} />
          <Field label="Nacionalidad" value={dp.nacionalidad} />
          <Field label="Nacimiento" value={fmt(dp.fechaNacimiento, 0, 10)} />
          <Field label="Defunción" value={fmt(dp.fechaDeceso, 0, 10)} />
          <Field label="Edad" value={dp.edad} />
          <Field label="Sexo" value={dp.sexo} />
        </ul>
      </Section>

      {score != null && (
        <Section icon="star" title="Scoring">
          <p className="mb-0">Score: <strong>{v(score)}</strong> / 999</p>
          <p className="text-muted small mb-0 mt-1">
            Con una escala de 1 a 999, el scoring evalúa el nivel de riesgo de cumplimiento o morosidad de un perfil. Este valor está determinado directamente por la conducta de pago previa y el historial financiero registrado.
          </p>
        </Section>
      )}

      <Section icon="house" title="Domicilio Particular">
        <div className="table-responsive">
          <p className="text-muted small mb-0 mt-1">
            Es la dirección declarada como la residencia principal o el hogar actual de la persona.
          </p>
          <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
                    <td>{fmt(item.fechaNacimiento, 0, 10)}</td>
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
            <p className="text-muted small fst-italic mb-0 mt-1">
               La clasificación de ingresos (escalas A1 a A8) mide la capacidad salarial mensual en base a los antecedentes laborales del perfil. Estos rangos reflejan el progreso y la jerarquía de los cargos ocupados en el mercado de trabajo. Mientras que las categorías más bajas (como A1) indican ingresos mínimos de referencia, los niveles superiores (hasta A8) señalan perfiles con trayectorias más consolidadas o puestos directivos de mayor remuneración.
            </p>
            <table className="table table-sm mb-0">
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
          </div>
        </Section>
      )}

      {bienes.automotores?.datos?.length > 0 && (
        <Section icon="car-front" title="Automotores actuales (Activos Vigentes)">
          <div className="table-responsive">
            <p className="text-muted small mb-0 mt-1">
              Representa los vehículos que el titular posee en la actualidad, con el porcentaje de titularidad sobre cada uno:
            </p>
            <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
                    <td>{v(item.periodo)}</td>
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
            <table className="table table-sm mb-0">
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
                    <td>{v(item.fechaInicio)} - {v(item.fechaHasta)}</td>
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
            <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
            <table className="table table-sm mb-0">
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
                    <td>{v(item.fechaPublicacion)}</td>
                    <td>{v(item.nombre)}</td>
                    <td>{v(item.razonSocial)}</td>
                    <td>{v(item.fechaConstitucion)}</td>
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
            <table className="table table-sm mb-0">
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
                    <td>{v(item.fecha)}</td>
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
            <table className="table table-sm mb-0">
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
                    <td>{fmt(item.fechaRechazo, 0, 10)}</td>
                    <td>{fmt(item.fechaLevantamiento, 0, 10)}</td>
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
            <table className="table table-sm mb-0">
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
