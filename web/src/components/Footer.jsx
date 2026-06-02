import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">InfoSocio</h5>
            <p className="text-white-50">
              Soluciones de informes personalizados con rapidez y confianza.
            </p>
          </div>
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">Enlaces</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/infoboost" className="text-white-50 text-decoration-none">Infoboost</Link></li>
              <li className="mb-2"><Link to="/infosociotarget" className="text-white-50 text-decoration-none">InfoSocio Target</Link></li>
              <li className="mb-2"><Link to="/terminos-y-condiciones" className="text-white-50 text-decoration-none">Términos y Condiciones</Link></li>
              <li className="mb-2"><Link to="/politicas-de-privacidad" className="text-white-50 text-decoration-none">Políticas de Privacidad</Link></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">Contacto</h5>
            <p className="text-white-50 mb-1">contacto@infosocio.com</p>
            <p className="text-white-50 mb-1">+54 11 1234-5678</p>
          </div>
        </div>
        <hr className="my-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
        <p className="text-center text-white-50 small mb-0">
          &copy; {new Date().getFullYear()} InfoSocio. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
