import avatarMasculino from '../assets/images/avatar-masculino.png'
import avatarFemenino from '../assets/images/avatar-femenino.png'
import avatarIndefinido from '../assets/images/avatar-indefinido.png'

function avatarSrc(sexo) {
  if (sexo === 'M') return avatarMasculino
  if (sexo === 'F') return avatarFemenino
  return avatarIndefinido
}

export default function ResultCard({ result, onSolicitar }) {
  const nombreCompleto = `${result.apellidos ? result.apellidos + ', ' : ''}${result.nombres || ''}`

  return (
    <div className="about-feat-card d-flex flex-column">
      <div className="d-flex align-items-start gap-3 mb-3">
        <img
          src={avatarSrc(result.sexo)}
          alt=""
          className="flex-shrink-0 object-fit-cover"
          style={{ width: '50px', height: '50px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        />
        <div className="min-w-0">
          <h3 className="fw-bold mb-1 text-gradient" style={{ fontSize: '1.05rem', wordBreak: 'break-word' }}>
            {nombreCompleto || 'Sin nombre'}
          </h3>
          <p className="mb-0 text-muted small">
            {result.provincia || 'Sin provincia'}{result.ciudad ? `, ${result.ciudad}` : ''}
          </p>
        </div>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-sm-6">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            <span className="fw-semibold" style={{ color: '#1a1a1a' }}>DNI</span><br />
            {result.nrodni || '-'}
          </p>
        </div>
        <div className="col-sm-6">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            <span className="fw-semibold" style={{ color: '#1a1a1a' }}>CUIT</span><br />
            {result.cuit || '-'}
          </p>
        </div>
        <div className="col-sm-6">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            <span className="fw-semibold" style={{ color: '#1a1a1a' }}>Edad</span><br />
            {result.edad != null ? `${result.edad} años` : '-'}
          </p>
        </div>
        <div className="col-sm-6">
          <p className="mb-0 text-muted" style={{ fontSize: '0.85rem' }}>
            <span className="fw-semibold" style={{ color: '#1a1a1a' }}>Sexo</span><br />
            {result.sexo === 'M' ? 'Masculino' : result.sexo === 'F' ? 'Femenino' : '-'}
          </p>
        </div>
      </div>

      <button
        onClick={() => onSolicitar(result)}
        className="about-btn-primary mt-auto align-self-start"
        style={{ border: 'none', cursor: 'pointer' }}
      >
        <i className="bi bi-file-earmark-text"></i>
        Solicitar Informe
      </button>
    </div>
  )
}
