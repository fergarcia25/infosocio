import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo-full.png'

export default function Header() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    if (query.trim()) {
      navigate(`/resultados?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleNavClick = () => {
    setMenuOpen(false)
  }

  const navLinks = (
    <>
      <li className="nav-item">
        <NavLink className="nav-link" to="/" onClick={handleNavClick}>Inicio</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/infoboost" onClick={handleNavClick}>InfoBoost</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/infosociotarget" onClick={handleNavClick}>Infosocio Target</NavLink>
      </li>
    </>
  )

  const searchForm = (
    <form onSubmit={handleSubmit} className="d-flex" style={{ background: '#f1f1f1', borderRadius: '50px', padding: '0.2rem' }}>
      <input
        type="text"
        className="form-control border-0"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ background: 'transparent', fontSize: '0.85rem' }}
      />
      <button className="btn btn-dark fw-bold" type="submit" style={{ fontSize: '0.8rem', borderRadius: '50px', padding: '0.3rem 1rem' }}>
        Buscar
      </button>
    </form>
  )

  return (
    <>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
      <nav className="container d-flex mx-auto navbar navbar-expand-lg">
        <div className="container-fluid px-0">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="InfoSocio" height="52" />
          </Link>
          <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(true)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`nav-offcanvas ${menuOpen ? 'open' : ''}`}>
            <div className="nav-offcanvas-header">
              <Link className="navbar-brand" to="/" onClick={handleNavClick}>
                <img src={logo} alt="InfoSocio" height="52" />
              </Link>
              <button className="nav-close-btn" onClick={() => setMenuOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <ul className="nav-offcanvas-links">
              {navLinks}
            </ul>
            <div className="nav-offcanvas-search">
              {searchForm}
            </div>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto">
              {navLinks}
            </ul>
            {searchForm}
          </div>
        </div>
      </nav>
    </>)
}
