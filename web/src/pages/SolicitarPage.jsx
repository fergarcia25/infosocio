import { useParams, useNavigate } from 'react-router-dom'
import RequestForm from '../components/RequestForm'

const staticData = {
  1: { nombre: 'Juan Pérez', dni: '30.123.456', cuil: '20-30123456-7', edad: 35, sexo: 'Masculino', provincia: 'Buenos Aires', ciudad: 'La Plata' },
}

const PRECIO = 500

export default function SolicitarPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const persona = staticData[id]

  if (!persona) {
    return (
      <div className="container py-5 text-center">
        <h3>Persona no encontrada</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    )
  }

  const handleSubmit = ({ email, telefono }) => {
    console.log('Solicitud:', { personaId: id, email, telefono, precio: PRECIO })
    alert('Redirigiendo a MercadoPago para completar el pago...')
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="mb-4">
                <h3 className="fw-bold">{persona.nombre}</h3>
                <p className="text-muted mb-0">DNI: {persona.dni} | CUIL: {persona.cuil}</p>
                <p className="text-muted">{persona.edad} años | {persona.sexo} | {persona.ciudad}, {persona.provincia}</p>
              </div>
              <hr />
              <RequestForm precio={PRECIO} onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
