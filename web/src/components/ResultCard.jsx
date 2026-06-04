export default function ResultCard({ result, onSolicitar }) {
  const nombreCompleto = `${result.apellidos ? result.apellidos + ', ' : ''}${result.nombres || ''}`

  return (
    <div className="card h-100" style={{ border: '1px solid #e7e7e7', borderRadius: '10px', boxShadow: '0 1px 12px rgba(0,0,0,0.1)' }}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center gap-2 mb-3">
          <i className="bi bi-person" style={{ color: '#b71c1c', fontSize: '1.1rem' }}></i>
          <h5 className="fw-bold mb-0" style={{ fontSize: '1rem', wordBreak: 'break-word' }}>
            {nombreCompleto || 'Sin nombre'}
          </h5>
        </div>

        <div style={{ borderRadius: '8px', padding: '0' }}>
          <div className="row g-2">
            <div className="col-6">
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '6px 12px' }}>
                <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>DNI</div>
                <div className="fw-bold">{result.nrodni || '-'}</div>
              </div>
            </div>
            <div className="col-6">
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '6px 12px' }}>
                <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>CUIT</div>
                <div className="fw-bold">{result.cuit || '-'}</div>
              </div>
            </div>
            <div className="col-6">
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '6px 12px' }}>
                <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Edad</div>
                <div className="fw-bold">{result.edad != null ? `${result.edad} años` : '-'}</div>
              </div>
            </div>
            <div className="col-6">
              <div style={{ backgroundColor: '#f5f5f5', borderRadius: '6px', padding: '6px 12px' }}>
                <div className="text-muted" style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sexo</div>
                <div className="fw-bold">{result.sexo === 'M' ? 'Masculino' : result.sexo === 'F' ? 'Femenino' : '-'}</div>
              </div>
            </div>

          </div>
        </div>

        <div className="text-center mt-3">
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
