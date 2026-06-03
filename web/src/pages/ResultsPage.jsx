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
    <div className="bg-light py-5" style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', marginTop: '80px' }}>
      <div className="container">
        <div className="mb-4">
          <h2 className="fw-bold">Resultados de búsqueda</h2>
          <p className="text-muted">
            {query ? (
              <>Mostrando resultados para: <strong>"{query}"</strong></>
            ) : (
              'Ingrese un término de búsqueda'
            )}
          </p>
        </div>

        <div className="d-md-none mb-3">
          <button
            className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className={`bi ${showFilters ? 'bi-funnel-fill' : 'bi-funnel'}`}></i>
            Filtros
          </button>
        </div>

        <div className={`${showFilters ? '' : 'd-none'} d-md-block mb-4`}>
          <div className="p-3 bg-white rounded-3 shadow-sm">
            <FilterSidebar counts={counts} filters={filters} onFilterChange={setFilters} />
          </div>
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Buscando...</span>
            </div>
            <p className="text-muted mt-2">Buscando resultados...</p>
          </div>
        )}

        {error && !loading && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        {!loading && !error && query && (
          <>
            {filteredResults.length > 0 ? (
              <>
                <p className="text-muted small mb-3">
                  Se encontraron {results.length} resultado{results.length !== 1 ? 's' : ''}
                  {filteredResults.length !== results.length
                    ? ` (${filteredResults.length} filtrados)`
                    : ''}
                </p>
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
              <div className="text-center py-5 text-muted">
                <i className="bi bi-search" style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}></i>
                <p>No se encontraron resultados para <strong>"{query}"</strong></p>
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
    </div>
  )
}
