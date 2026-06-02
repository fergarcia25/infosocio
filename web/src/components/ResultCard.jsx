import { Link } from 'react-router-dom'

export default function ResultCard({ result }) {
  return (
    <div className="about-feat-card d-flex flex-column">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div className="about-feat-icon">
          <i className="bi bi-person-badge"></i>
        </div>
        <div>
          <h3 className="fw-bold mb-0 text-gradient">{result.nombre}</h3>
        </div>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-sm-6">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            <span className="fw-semibold" style={{ color: '#1a1a1a' }}>DNI</span><br />
            {result.dni}
          </p>
        </div>
        <div className="col-sm-6">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            <span className="fw-semibold" style={{ color: '#1a1a1a' }}>CUIL</span><br />
            {result.cuil}
          </p>
        </div>
        <div className="col-12">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            {result.edad} años &middot; {result.sexo} &middot; {result.provincia}, {result.ciudad}
          </p>
        </div>
      </div>

      <Link to={`/solicitar/${result.id}`} className="about-btn-primary mt-auto align-self-start">
        <i className="bi bi-file-earmark-text"></i>
        Solicitar Informe
      </Link>
    </div>
  )
}
