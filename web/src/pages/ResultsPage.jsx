import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ResultCard from '../components/ResultCard'
import FilterSidebar from '../components/FilterSidebar'
import Pagination from '../components/Pagination'
import { searchPeople } from '../services/searchApi'

const ITEMS_PER_PAGE = 10

export default function ResultsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [results, setResults] = useState([])
  const [counts, setCounts] = useState({ men: 0, women: 0, firstAge: 0, secondAge: 0, thirdAge: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ sexo: '', edad: '' })

  useEffect(() => {
    if (!query.trim()) return

    let cancelled = false
    setLoading(true)
    setError(null)
    setCurrentPage(1)
    setFilters({ sexo: '', edad: '' })

    searchPeople({ criterio: query.trim() })
      .then(data => {
        if (cancelled) return
        if (data.success) {
          setResults(data.results || [])
          setCounts(data.counts || { men: 0, women: 0, firstAge: 0, secondAge: 0, thirdAge: 0 })
        } else {
          setError(data.message || 'Error en la búsqueda')
        }
      })
      .catch(err => {
        if (cancelled) return
        setError(err.message)
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [query])

  const filteredResults = useMemo(() => {
    let filtered = [...results]

    if (filters.sexo) {
      filtered = filtered.filter(r => r.sexo === filters.sexo)
    }

    if (filters.edad) {
      filtered = filtered.filter(r => {
        const edad = r.edad
        if (filters.edad === '1') return edad >= 18 && edad <= 30
        if (filters.edad === '2') return edad > 30 && edad <= 50
        if (filters.edad === '3') return edad > 50 && edad <= 100
        return true
      })
    }

    return filtered
  }, [results, filters])

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE)
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSolicitar = (result) => {
    const nombreCompleto = `${result.apellidos ? result.apellidos + ', ' : ''}${result.nombres || ''}`
    navigate('/solicitar', {
      state: {
        query: searchParams.get('q') || '',
        persona: {
          nombre: nombreCompleto,
          cdu: result.cuit || result.nrodni || '',
          edad: result.edad ?? '',
          provincia: result.provincia || '',
          ciudad: result.ciudad || '',
          foto: result.foto || '',
        },
      },
    })
  }

  return (
    <>
      {/* Title + Filters section — like about-transform-section */}
      <section className="about-transform-section" style={{ paddingTop: 'calc(3rem + 80px)', paddingBottom: '3rem' }}>
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <span className="about-label" style={{ color: '#b71c1c' }}>RESULTADOS DE BÚSQUEDA</span>
              <h2 className="about-title" style={{ color: '#fff' }}>
                {query ? (
                  <>Resultados para: <strong>"{query}"</strong></>
                ) : (
                  'Ingrese un término de búsqueda'
                )}
              </h2>
              {query && results.length > 0 && (
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 700, margin: '0 auto' }}>
                  Se encontraron {results.length} resultado{results.length !== 1 ? 's' : ''}
                  {filteredResults.length !== results.length
                    ? ` (${filteredResults.length} filtrados)`
                    : ''}
                </p>
              )}
            </div>
          </div>

          <div className="d-md-none mt-4">
            <button
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className={`bi ${showFilters ? 'bi-funnel-fill' : 'bi-funnel'}`}></i>
              Filtros
            </button>
          </div>

          <div className={`row justify-content-center mt-4 ${showFilters ? '' : 'd-none d-md-flex'}`}>
            <div className="col-lg-10">
              <div
                className="p-3 results-filter-wrap"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <FilterSidebar counts={counts} filters={filters} onFilterChange={setFilters} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cards section — like funcionalidades con #e0e0e0 */}
      <section className="about-features-section" style={{ background: '#e0e0e0', padding: '4rem 0' }}>
        <div className="container">
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Buscando...</span>
              </div>
              <p className="text-muted mt-2">Buscando resultados...</p>
            </div>
          )}

          {error && !loading && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {!loading && !error && query && (
            <>
              {filteredResults.length > 0 ? (
                <>
                  <div className="row g-4">
                    {paginatedResults.map((r, i) => (
                      <div className="col-md-6" key={`${r.nrodni}-${i}`}>
                        <ResultCard result={r} onSolicitar={handleSolicitar} />
                      </div>
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-5">
                  <i
                    className="bi bi-search"
                    style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem', color: '#999' }}
                  ></i>
                  <p className="text-muted">
                    No se encontraron resultados para <strong>"{query}"</strong>
                  </p>
                </div>
              )}
            </>
          )}

          {!query && !loading && (
            <div className="text-center py-5 text-muted">
              <p>Realice una búsqueda para ver resultados</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
