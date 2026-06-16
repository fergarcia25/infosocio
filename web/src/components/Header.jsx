import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo-full.png'

export default function Header() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const searchRef = useRef(null)
  const prevScrollY = useRef(0)
  const animating = useRef(false)

  useEffect(() => {
    if (location.pathname !== '/') {
      searchRef.current?.focus()
    }
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const getTarget = () => window.innerHeight

    const blockScroll = (ms) => {
      const handler = (e) => e.preventDefault()
      window.addEventListener('wheel', handler, { passive: false })
      setTimeout(() => {
        window.removeEventListener('wheel', handler)
        animating.current = false
      }, ms)
    }

    const scrollToTarget = () => {
      
      const scroll = (now) => {
        const elapsed = now - startTime
        const t = Math.min(elapsed / duration, 1)
        const easeOut = 1 + Math.pow(1 - t, 3)
        window.scrollTo(0, start + (target - start) * easeOut)
        if (t < 1) {
          requestAnimationFrame(scroll)
        } else {
          blockScroll(1000)
        }
      
      }
      requestAnimationFrame(scroll)  

      if (animating.current) return
      animating.current = true
      const start = window.scrollY
      const target = getTarget()
      const duration = 200
      const startTime = performance.now()

    }

    const onWheel = (e) => {
      if (e.deltaY > 0 && window.scrollY === 0 && !animating.current) {
        e.preventDefault()
        scrollToTarget()
      }
    }

    const onKeyDown = (e) => {
      if (e.key === 'ArrowDown' && window.scrollY === 0) {
        e.preventDefault()
        scrollToTarget()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

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
        <NavLink className="nav-link" to="/infotarget" onClick={handleNavClick}>InfoTarget</NavLink>
      </li>
    </>
  )

  const searchForm = (
    <form onSubmit={handleSubmit} className="d-flex" style={{ background: '#f1f1f1', borderRadius: '16px', padding: '0' }}>
      <input
        ref={searchRef}
        type="text"
        className="form-control border-0"
        placeholder="Buscar.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ background: 'transparent', padding: '6px 10px', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px', }}
      />
      <button className="btn btn-dark fw-bold" type="submit" style={{ borderRadius: '16px', padding: '0.3rem 1rem' }}>
        Buscar
      </button>
    </form>
  )

  return (
    <>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
      <nav className={`container d-flex mx-auto navbar navbar-expand-lg${scrolled ? ' navbar-scrolled' : ''}`}>
        <div className="container-fluid px-0">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="InfoSocio" height="52" />
          </Link>
          <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(true)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`nav-offcanvas ${menuOpen ? 'open' : ''}`}>
            <button className="nav-close-btn" onClick={() => setMenuOpen(false)}>
              <i className="bi bi-x-lg"></i>
            </button>
            <ul className="nav-offcanvas-links">
              {navLinks}
            </ul>
            <div className="nav-offcanvas-search">
              {searchForm}
            </div>
          </div>

          <div className="collapse navbar-collapse">
            <div className="d-flex align-items-center ms-auto gap-3">
              <ul className="navbar-nav">
                {navLinks}
              </ul>
              {searchForm}
            </div>
          </div>
        </div>
      </nav>
    </>)
}
