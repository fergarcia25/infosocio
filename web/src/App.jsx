import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import InfoboostPage from './pages/InfoboostPage'
import ServicesPage from './pages/ServicesPage'
import ResultsPage from './pages/ResultsPage'
import TyCPage from './pages/TyCPage'
import PrivacidadPage from './pages/PrivacidadPage'
import SolicitarPage from './pages/SolicitarPage'
import CancelacionPage from './pages/CancelacionPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/infosociotarget" element={<AboutPage />} />
        <Route path="/infoboost" element={<InfoboostPage />} />
        <Route path="/servicios" element={<ServicesPage />} />
        <Route path="/resultados" element={<ResultsPage />} />
        <Route path="/solicitar" element={<SolicitarPage />} />
        <Route path="/terminos-y-condiciones" element={<TyCPage />} />
        <Route path="/politicas-de-privacidad" element={<PrivacidadPage />} />
        <Route path="/cancelacion-datos" element={<CancelacionPage />} />
      </Route>
    </Routes>
  )
}
