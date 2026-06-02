import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminHeader({ onToggleSidebar }) {
  const { user, logout } = useAuth()

  return (
    <header className="admin-header">
      <div className="d-flex align-items-center gap-2">
        
        <span className="text-muted small fw-bold"><i className="bi bi-person fs-5"></i> {user?.username}</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <Link to="/login" className="btn btn-outline-danger btn-sm" onClick={logout}>
          <i className="bi bi-box-arrow-right me-1"></i>Salir
        </Link>
        <button className="btn btn-outline-secondary btn-sm sidebar-toggler d-lg-none" onClick={onToggleSidebar}>
          <i className="bi bi-list fs-5"></i>
        </button>
      </div>
    </header>
  )
}
