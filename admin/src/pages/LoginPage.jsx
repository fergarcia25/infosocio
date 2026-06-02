import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await login(username, password)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message || 'Credenciales inválidas')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card card p-4">
        <div className="card-body">
          <h3 className="fw-bold text-center mb-4">InfoSocio Admin</h3>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
