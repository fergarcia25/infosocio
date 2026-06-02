import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ResultCard from '../components/ResultCard'
import FilterSidebar from '../components/FilterSidebar'

const staticResults = [
  { id: 1, nombre: 'Juan Pérez', dni: '30.123.456', cuil: '20-30123456-7', edad: 35, sexo: 'Masculino', provincia: 'Buenos Aires', ciudad: 'La Plata' },
  { id: 2, nombre: 'Juan Pérez', dni: '30.123.456', cuil: '20-30123456-7', edad: 35, sexo: 'Masculino', provincia: 'Buenos Aires', ciudad: 'La Plata' },
]

export default function ResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="mt-5 container py-5">
      <div className="my-4">
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
        <div className="filter-bar p-3 bg-light rounded-3 shadow-sm">
          <FilterSidebar />
        </div>
      </div>

      {query ? (
        <>
          <p className="text-muted small">Se encontraron {staticResults.length} resultados</p>
          <div className="row">
            {staticResults.map((r, i) => (
              <div className="col-md-6 mb-3" key={r.id}>
                <ResultCard result={r} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-5 text-muted">
          <p>Realice una búsqueda para ver resultados</p>
        </div>
      )}
    </div>
  )
}
