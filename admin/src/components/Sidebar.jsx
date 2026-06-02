import { NavLink } from 'react-router-dom'
import logoFull from '../assets/images/logo-full.png'

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'show' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <img src={logoFull} alt="InfoSocio" className="img-fluid" style={{ width: '100%', maxHeight: '90px' }} />
        </div>
        <nav className="mt-3">
          <NavLink to="/dashboard" className="nav-link" onClick={onClose}>
            <i className="bi bi-speedometer2"></i>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/solicitudes" className="nav-link" onClick={onClose}>
            <i className="bi bi-inbox"></i>
            <span>Solicitudes</span>
          </NavLink>
          <NavLink to="/precio" className="nav-link" onClick={onClose}>
            <i className="bi bi-tag"></i>
            <span>Precio Informe</span>
          </NavLink>
          <NavLink to="/generar-informe" className="nav-link" onClick={onClose}>
            <i className="bi bi-file-earmark-pdf"></i>
            <span>Generar Informe</span>
          </NavLink>
        </nav>
      </aside>
    </>
  )
}
