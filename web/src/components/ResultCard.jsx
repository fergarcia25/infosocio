export default function ResultCard({ result, onSolicitar }) {
  const nombreCompleto = `${result.apellidos ? result.apellidos + ', ' : ''}${result.nombres || ''}`
  const nameParts = nombreCompleto.split(',')

  return (
    <div className="card h-100" style={{ border: '1px solid #e7e7e7', borderRadius: '10px', boxShadow: '0 1px 12px rgba(0,0,0,0.1)' }}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center gap-2 mb-3">
          <i className="bi bi-person" style={{ color: '#000', fontSize: '1.1rem' }}></i>
          <h3 className="mb-0" style={{ fontSize: '1.2rem', wordBreak: 'break-word', color: '#b71c1c' }}>
            {nameParts[0]?.trim() || nombreCompleto}
            {nameParts[1] && <span className="small ps-2" style={{ color: '#000' }}>{nameParts[1].trim()}</span>}
          </h3>
        </div>

        <div style={{ borderRadius: '8px', padding: '0' }}>
          <div className="row g-2">
            <div className="col-6">
              <div style={{ backgroundColor: 'rgb(249 249 249)', borderRadius: '6px', padding: '6px 12px' }}>
                <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>DNI</div>
                <div className="fw-bold">{result.nrodni || '-'}</div>
              </div>
            </div>
            <div className="col-6">
              <div style={{ backgroundColor: 'rgb(249 249 249)', borderRadius: '6px', padding: '6px 12px' }}>
                <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CUIT</div>
                <div className="fw-bold">{result.cuit || '-'}</div>
              </div>
            </div>
            <div className="col-6">
              <div style={{ backgroundColor: 'rgb(249 249 249)', borderRadius: '6px', padding: '6px 12px' }}>
                <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Edad</div>
                <div className="fw-bold">{result.edad != null ? `${result.edad} años` : '-'}</div>
              </div>
            </div>
            <div className="col-6">
              <div style={{ backgroundColor: 'rgb(249 249 249)', borderRadius: '6px', padding: '6px 12px' }}>
                <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sexo</div>
                <div className="fw-bold">{result.sexo === 'M' ? 'Masculino' : result.sexo === 'F' ? 'Femenino' : '-'}</div>
              </div>
            </div>

          </div>
        </div>

        <div className="text-end mt-3">
          <button
            onClick={() => onSolicitar(result)}
            className="about-btn-primary"
          >
            <i className="bi bi-file-earmark-text me-1"></i>
            Solicitar Informe
          </button>
        </div>
      </div>
    </div>
  )
}
